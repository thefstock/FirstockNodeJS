import test from 'ava';
import moment from 'moment';

import { ModelUtils } from '../../utils/model-utils';

import { Decode, Encode, Field } from './common';

// sample class for testing
class User {

  email: string;

  @Decode(({ value }) => value.toUpperCase())
  name: string;

  @Encode(({ value }) => value.replace(/./g, '*'))
  password: string;

  role = 'user';

  @Field({
    encoder: ({ value }) => moment(value).toISOString(),
    decoder: ({ value }) => moment(value).toDate()
  })
  date = new Date();
}

test('should run all the decoders properly', async (t) => {
  const user = ModelUtils.parse(User, {
    email: "johndoe@example.com",
    name: 'john doe',
    password: 'secret',
    role: 'admin',
    date: '2021-10-18T15:09:03.827Z',
  });

  t.is(user.email, 'johndoe@example.com');
  t.is(user.name, 'JOHN DOE');
  t.is(user.role, 'admin');
  t.true(user.date instanceof Date);
  t.true(moment(user.date).isSame(moment('2021-10-18T15:09:03.827Z'), "day"));
});

test('should run all the encoders properly', async (t) => {
  const user = ModelUtils.parse(User, {
    email: "johndoe@example.com",
    name: 'john doe',
    password: 'secret',
    date: '2021-10-18T15:09:03.827Z'
  });

  const userObj = ModelUtils.serialize(user);

  t.is(userObj.date, "2021-10-18T15:09:03.827Z");
  t.is(userObj.password, "******");
});

test('should load default values if not provided', async (t) => {
  const user = ModelUtils.parse(User, {
    email: "johndoe@example.com",
    name: 'john doe',
    password: 'secret',
  });

  t.is(user.role, 'user');
  t.true(user.date instanceof Date);
  t.true(moment(user.date).isSame(moment(), "day"));
});