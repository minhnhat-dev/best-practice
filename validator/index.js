const { Validator } = require('express-json-validator-middleware');
const schemas = require('./schemas');

const validator = new Validator({ allErrors: true });
validator.ajv.addSchema(schemas);
const { validate } = validator;
// Define a JSON Schema
const StreetSchema = {
  type: 'object',
  required: ['number', 'name', 'type'],
  properties: {
    number: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: ['Street', 'Avenue', 'Boulevard'],
    },
  },
  additionalProperties: false,
  minProperties: 1,
};

function getSchema(id) {
  const schema = validator.ajv.getSchema(id);
  if (!schema) {
    console.log('Validate id invalid');
    return null;
  }
  return schema;
}

module.exports = {
  validate,
  getSchema,
  test: StreetSchema,
};
