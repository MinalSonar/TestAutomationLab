import { test, expect } from '@playwright/test';
import { AccessToken } from '../accessToken'; 
import Ajv from 'ajv';
import * as fs from 'fs';
import * as path from 'path';

const ajv = new Ajv();

const schemaPath = path.resolve(__dirname, '../submitOrderResponseSchema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

test('Submit Order API Test', async ({ request }) => {
  const endpoint = 'https://sandbox-partners-api.airalo.com/v2/orders';
  const accessToken = new AccessToken();
  const token = await accessToken.getToken();
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  
  const body = {
    'quantity': 6,
    'package_id': 'merhaba-7days-1gb',
    'type': 'sim', 
    'description': '7 Day Package', 
    
  }; 
  const response = await request.post(endpoint, {
    headers: headers,
    form: body
  });
  console.log('Response status:', response.status());
  
  
  expect(response.status()).toBe(200);  
   
  const responseBody = await response.json();
  console.log(responseBody);

  const validate = ajv.compile(schema);
  const valid = validate(responseBody);

  if (!valid) {
    console.error('Validation errors:', validate.errors);
  }

  expect(responseBody.data.package_id).toEqual(body.package_id);
  expect((responseBody.data.quantity)).toEqual(body.quantity);
  expect(responseBody.data.type).toEqual(body.type);
  expect(responseBody.data.description).toEqual(body.description);
});