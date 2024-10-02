import { test, expect } from '@playwright/test';
import { AccessToken } from '../accessToken'; // Adjust the import path as necessary

test('Get eSIMs List', async ({ request }) => {
    const endpoint = 'https://sandbox-partners-api.airalo.com/v2/sims';
    const accessToken = new AccessToken();
    const token = await accessToken.getToken();
    console.log('Obtained Token:', token);  
    
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };  
   
    const params = {  
    'include': 'order',     
      'filter[package_id]': 'merhaba-7days-1gb',
      'filter[description]': '7 Day Package',
      limit: 6,
      page: 1
    };
  
      const response = await request.get(endpoint, { 
      headers: headers,
      params: params
    });  
        
    const responseData = await response.json();   
    console.log('Response body:', responseData); 
    
    expect(response.status()).toBe(200);
    console.log('Response status:', response.status());
    expect(responseData).toHaveProperty('data');
    
    responseData.data.forEach((simableItem) => {   
    const simable = simableItem.simable;   
    
    expect(simableItem.id).toBeGreaterThan(0);
    console.log('Sim ID:', simableItem.id);            
    expect(simable.description).toBe('7 Day Package');
    console.log('Description:', simable.description); 
    expect(simable.type).toBe('sim');
    console.log('Type:', simable.type);
    expect(simable.package_id).toBe('merhaba-7days-1gb');
    console.log('Package_ID:', simable.package_id);
    expect(simable.quantity).toBe(6);
    console.log('Quantity:', simable.quantity);
    expect(simable.package).toBe('Merhaba-1 GB - 7 Days');
    console.log('Package:', simable.package);
    });
  });