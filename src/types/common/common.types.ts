export type UsernamePasswordRequestPayload = {
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  scope: string;
  grant_type: 'password';
  response_type: 'id_token';
};
