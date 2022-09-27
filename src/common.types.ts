import * as FormData from 'form-data';

import { ConfigService } from '@nestjs/config';

export type UsernamePasswordRequestPayload = {
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  scope: string;
  grant_type: 'password';
  response_type: 'id_token';
};
const config = new ConfigService();

export const getPasswordRequestPayload = ({
  username,
  password,
}: Partial<UsernamePasswordRequestPayload>) => {
  const payload: UsernamePasswordRequestPayload = {
    username,
    password,
    client_id: config.get('client_id'),
    client_secret: config.get('client_secret'),
    scope: config.get('scope'),
    grant_type: 'password',
    response_type: 'id_token',
  };

  const form = new FormData();
  Object.keys(payload).map((key) => {
    form.append(key, payload[key]);
  });
  return form;
};

export const getUrl = () => {
  return `${config.get('b2c_url')}/${config.get(
    'tenant',
  )}/b2c_1_ropc/oauth2/v2.0`;
};
