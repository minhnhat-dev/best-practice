const Ajv = require('ajv');

const schema = {

};
const ajv = new Ajv();
ajv.addSchema();
const validate = ajv.compile(schema);
const valid = validate(data);
if (!valid) console.log(validate.errors);
