import { getPasswordRequestPayload, getUrl } from './utils/request.helpers';

import { Axios } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UsernamePasswordRequestPayload } from './types/common/common.types';

@Injectable()
export class AppService {
  private axios: Axios;
  constructor(private http: HttpService) {
    this.axios = http.axiosRef;
  }

  login({ username, password }: Partial<UsernamePasswordRequestPayload>) {
    const url = getUrl();

    const form = getPasswordRequestPayload({ username, password });

    return this.axios.post(`${url}/token`, form, {
      headers: form.getHeaders(),
    });
  }

  // email verification code -> send -> verification code -> give me new password

  /* Msal was does not return refresh tokens
  async signIn({ username, password }: Partial<Msal.UsernamePasswordRequest>) {
    const msalConfig: Configuration = {
      auth: {
        clientId: '0c9de320-cca6-42e8-9789-cbd406667f6e',
        authority: `https://tforg.b2clogin.com/tfp/tforg.onmicrosoft.com/b2c_1_ropc`,
        clientSecret: '98u8Q~clMmyK3RYO.oelM8wfbxXvakcbbX1T9bL.',
        knownAuthorities: [
          'https://tforg.b2clogin.com/tfp/tforg.onmicrosoft.com/b2c_1_ropc`',
        ],
      },
    };
    const request: Msal.UsernamePasswordRequest = {
      scopes: [
        'https://tforg.onmicrosoft.com/0c9de320-cca6-42e8-9789-cbd406667f6e/auth',
        'offline_access',
        'openid',
      ],
      username,
      password,
    };
    const client = new Msal.ConfidentialClientApplication(msalConfig);
    return await client.acquireTokenByUsernamePassword(request);
  }
  */
}
