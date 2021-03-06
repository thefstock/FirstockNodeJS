import "reflect-metadata";
import test, { ExecutionContext } from 'ava';
import { Type } from 'class-transformer';
import sinon from 'sinon';
import { Container, Inject, Service } from 'typedi';

import { Context } from './context';
import { DataSource } from './data-source';

// test classes
class CreateTodoRequest {
  title: string;
  content: string;
}

class CreateTodoResponse {
  title: string;
  content: string;

  @Type(() => Date)
  createdAt: Date;
}

@Service()
class CustomDataSource extends DataSource {

  @Inject()
  private _context: Context;

  get context() { return this._context };

  constructor() {
    super();
  }
}

let context: Context;
let spy: sinon.SinonSpy;
const sandbox = sinon.createSandbox();

const setup = (t: ExecutionContext) => {
  context = new Context({ apiUrl: 'http://example.com/api', wsUrl: '' });
  Container.set(Context, context);
  spy = sandbox.spy(context.agent, "post");
  t.teardown(() => {
    Container.reset();
    sandbox.restore();
  })
}

test('should send proper request details', t => {
  setup(t);
  const dataSource = Container.get(CustomDataSource);
  dataSource.send({
    endpoint: '/todo',
    data: { title: "Sample title", content: "Sample Content" },
    responseClass: CreateTodoResponse,
    requestClass: CreateTodoRequest
  });

  t.true(spy.calledOnce);
  t.is(spy.getCalls()[0].args[0], 'http://example.com/api/todo');
  t.is(spy.getCalls()[0].args[1], 'jData={"title":"Sample title","content":"Sample Content"}');
  t.deepEqual(spy.getCalls()[0].args[2], { headers: { "content-type": "text/plain" } });
});

test('should get key from context', t => {
  setup(t);
  context.setState('key', 'secret-token');
  const dataSource = Container.get(CustomDataSource);
  dataSource.send({
    endpoint: '/todo',
    data: { title: "Sample title", content: "Sample Content" },
    responseClass: CreateTodoResponse,
    requestClass: CreateTodoRequest
  });

  t.true(spy.calledOnce);
  t.is(spy.getCalls()[0].args[1], 'jData={"title":"Sample title","content":"Sample Content"}&jKey=secret-token');
});