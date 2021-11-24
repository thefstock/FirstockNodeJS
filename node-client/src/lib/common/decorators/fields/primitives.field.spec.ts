import "reflect-metadata";
import test from 'ava';

import { ModelUtils } from '../../../utils/model-utils';

import { BoolField, NumberField, StringField } from './primitives.field';

class User {
  @StringField()
  name: string;

  @BoolField()
  blocked: boolean;

  @NumberField()
  age: number;
}

test('should do the type conversion to corresponding primitive type', t => {
  const user = ModelUtils.parse(User, { name: 123456, blocked: 'False', age: "56" });
  t.is(user.name, '123456');
  t.false(user.blocked);
  t.is(user.age, 56);
});

test('should properly parse for correct types', t => {
  const user = ModelUtils.parse(User, { name: "John Doe", blocked: true, age: 25 });
  t.is(user.name, "John Doe");
  t.true(user.blocked);
  t.is(user.age, 25);
});