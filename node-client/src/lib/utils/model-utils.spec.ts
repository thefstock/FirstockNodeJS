import "reflect-metadata";
import test from 'ava';
import { Type } from 'class-transformer';

import { ModelUtils } from './model-utils';

// sample model
class User {
  name: string;

  @Type(() => Number)
  age: number;

  @Type(() => Date)
  createdAt: Date;
}

test('should parse json strings', t => {
  const json = `
  {
    "name": "john",
    "age": "56",
    "createdAt": "2021-11-17T14:37:27.260Z"
  }
  `
  const user: User = ModelUtils.parse(User, json);
  t.truthy(user);
  t.is(user.name, "john");
  t.is(user.age, 56);
  t.true(user.createdAt instanceof Date);
  t.is(user.createdAt.toISOString(), "2021-11-17T14:37:27.260Z");
});

test('should parse plain objects', t => {
  const object = {
    name: "john",
    age: "56",
    createdAt: "2021-11-17T14:37:27.260Z"
  };

  const user: User = ModelUtils.parse(User, object);
  t.truthy(user);
  t.is(user.name, "john");
  t.is(user.age, 56);
  t.true(user.createdAt instanceof Date);
  t.is(user.createdAt.toISOString(), "2021-11-17T14:37:27.260Z");
})