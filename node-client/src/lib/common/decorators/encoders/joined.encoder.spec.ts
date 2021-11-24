import test from 'ava';

import { ModelUtils } from '../../../utils/model-utils';

import { Joined } from './joined.encoder';

test('should join the list properly with the default separator when no option is specified', async (t) => {
  class TestJoined {
    @Joined()
    roles: string[];
  }
  const test = ModelUtils.parse(TestJoined, { roles: ['admin', 'user'] });
  const obj = ModelUtils.serialize(test);

  t.is(obj.roles, 'admin,user');
});

test('should use the argument as the separator option if it is string', async (t) => {
  class TestJoined {
    @Joined('|')
    roles: string[];
  }
  const test = ModelUtils.parse(TestJoined, { roles: ['admin', 'user'] });
  const obj = ModelUtils.serialize(test);

  t.is(obj.roles, 'admin|user');
});

test('should use separator property from the options if argument is passed as object', async (t) => {
  class TestJoined {
    @Joined({ separator: '/' })
    roles: string[];
  }
  const test = ModelUtils.parse(TestJoined, { roles: ['admin', 'user'] });
  const obj = ModelUtils.serialize(test);

  t.is(obj.roles, 'admin/user');
});