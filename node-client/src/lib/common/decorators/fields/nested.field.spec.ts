import "reflect-metadata";
import test from 'ava';

import { ModelUtils } from '../../../utils/model-utils';

import { DateField } from './date.field';
import { Nested } from './nested.field';
import { StringField } from './primitives.field';

/* -------------------------------------------------------------------------- */
/*                               SAMPLE CLASSES                               */
/* -------------------------------------------------------------------------- */
class Wrapper {
  @DateField()
  date: Date;
}

class NestedFirst {

  @StringField()
  name: string;

  @Nested(Wrapper)
  nested: Wrapper;
}

class NestedSecond {
  @StringField()
  name: string;

  @Nested(NestedFirst)
  nested: NestedFirst;
}

/* -------------------------------------------------------------------------- */
/*                                    TESTS                                   */
/* -------------------------------------------------------------------------- */

test('should parse nested models if @Nested decorator is specified', async (t) => {
  const nested1 = ModelUtils.parse(
    NestedFirst,
    { name: 'sample', nested: { date: '31-05-1995' } }
  );

  t.is(nested1.name, 'sample');
  t.true(nested1.nested instanceof Wrapper);
  t.true(nested1.nested.date instanceof Date);

  const nested2 = ModelUtils.parse(NestedSecond, {
    name: 'root',
    nested: {
      name: 'branch',
      nested: {
        date: '31-05-1995'
      }
    }
  })

  t.is(nested2.name, 'root');
  t.true(nested2.nested instanceof NestedFirst);
  t.is(nested2.nested.name, 'branch');
  t.true(nested2.nested.nested instanceof Wrapper);
  t.true(nested2.nested.nested.date instanceof Date);
});

test('should serialize nested models properly', async (t) => {
  const nested1 = ModelUtils.parse(NestedFirst, { name: 'sample', nested: { date: '31-05-1995' } });
  const obj1 = ModelUtils.serialize(nested1);

  t.is(obj1.name, 'sample');
  t.deepEqual(obj1.nested, { date: '31-05-1995' });

  const nested2 = ModelUtils.parse(NestedSecond, {
    name: 'root',
    nested: {
      name: 'branch',
      nested: {
        date: '31-05-1995'
      }
    }
  });
  const obj2 = ModelUtils.serialize(nested2);

  t.is(obj2.name, 'root');
  t.deepEqual(obj2.nested, { name: 'branch', nested: { date: '31-05-1995' } })
});

test('should manage nested arrays properly', async (t) => {
  class NestedArray {
    @StringField()
    name: string;

    @Nested(NestedFirst, { isArray: true })
    nested: NestedFirst[];
  }

  const nested = ModelUtils.parse(NestedArray, {
    name: 'root',
    nested: [
      {
        name: 'branch 1',
        nested: {
          date: '31-05-1995',
        },
      },
      {
        name: 'branch 2',
        nested: {
          date: '16-08-1998',
        },
      },
    ],
  });

  t.true(nested instanceof NestedArray);
  t.true(nested.nested instanceof Array);
  t.is(nested.nested.length, 2);
  t.true(nested.nested[0] instanceof NestedFirst);
  t.is(nested.nested[0].name, 'branch 1');
  t.is(nested.nested[1].name, 'branch 2');
  t.true(nested.nested[0].nested instanceof Wrapper);
  t.true(nested.nested[0].nested.date instanceof Date);

  const obj1 = ModelUtils.serialize(nested);
  t.deepEqual(obj1, {
    name: 'root',
    nested: [
      {
        name: 'branch 1',
        nested: {
          date: '31-05-1995',
        },
      },
      {
        name: 'branch 2',
        nested: {
          date: '16-08-1998',
        },
      },
    ],
  });
});