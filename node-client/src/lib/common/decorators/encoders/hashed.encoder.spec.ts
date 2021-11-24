import test from 'ava';

import { ModelUtils } from '../../../utils/model-utils';

import { Hashed } from './hashed.encoder';

// sample class
class TestHashed {
  @Hashed()
  password: string;
}

test('should hash properly', async (t) => {
  const test = ModelUtils.parse(TestHashed, { password: "secret" });
  const obj = ModelUtils.serialize(test);
  t.is(obj.password, "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b");
});