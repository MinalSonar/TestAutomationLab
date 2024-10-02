import { request, APIRequestContext } from '@playwright/test';

export class AccessToken {
  private clientId: string = '7e29e2facf83359855f746fc490443e6'; 
  private clientSecret: string = 'e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb';
  private tokenUrl: string = 'https://sandbox-partners-api.airalo.com/v2/token';
  private apiContext: APIRequestContext;

  async initializeContext() {
    this.apiContext = await request.newContext();
  }

  async getToken(): Promise<string> {
    if (!this.apiContext) {
      await this.initializeContext();
    }
    console.log('Sending request to:', this.tokenUrl);
    console.log('Using client ID:', this.clientId);
    console.log('Using client secret:', this.clientSecret);

    const response = await this.apiContext.post(this.tokenUrl, {
      form: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    });

 console.log('Response status:', response.status());

    if (!response.ok()) {
      throw new Error(`Failed to obtain token: ${response.status()}`);
    }

    const responseBody = await response.json();
    console.log('Response body:', responseBody);
    return responseBody.data.access_token;
  }
}