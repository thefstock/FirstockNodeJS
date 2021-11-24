import "reflect-metadata";
import test from 'ava';
import moment from 'moment';

import { ModelUtils } from '../../../utils/model-utils';

import { DateField } from './date.field';

test('should parse and serialize date properly', (t) => {
  // sample class
  class TestDateField {
    @DateField({ format: 'DD/MM/YYYY' })
    date: Date;
  }

  // parse
  const instance = ModelUtils.parse(TestDateField, { date: "28/02/1997" });
  t.true(instance.date instanceof Date);
  t.true(moment(instance.date).isSame(moment('28/02/1997', 'DD/MM/YYYY'), "day"))
  // serialize
  const obj = ModelUtils.serialize(instance);
  t.is(obj.date, "28/02/1997");
});

test('should parse date with default format if nothing is specified', (t) => {
  class TestDateField {
    @DateField()
    date: Date;
  }
  const instance = ModelUtils.parse(TestDateField, { date: "28-02-1997" });

  t.true(instance.date instanceof Date);
  t.true(moment(instance.date).isSame(moment('28/02/1997', 'DD/MM/YYYY'), "day"))
});

test('should parse date with format if its is specified as the argument', (t) => {
  class TestDateField {
    @DateField('MM/DD/YYYY')
    date: Date;
  }
  const instance = ModelUtils.parse(TestDateField, { date: "02/28/1997" });

  t.true(instance.date instanceof Date);
  t.true(moment(instance.date).isSame(moment('28/02/1997', 'DD/MM/YYYY'), "day"))
});