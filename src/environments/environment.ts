
import { LOGIN_TYPE } from 'src/app/constant';

export const environment = {
  production: false,
  title: 'S3 Manager',
  logins: [
    {
      type: LOGIN_TYPE.cognito,
      name: 'Amazon Cognito',
      region: '',
      identityPoolId: '',
      userPoolId: '',
      userPoolWebClientId: '',
    },
    {
      type: LOGIN_TYPE.accessKey,
      name: 'AWS Access Key',
      region: 'us-east-1',
    },
  ],
  accessKey: process.env['NG_APP_ACCESS_KEY'] ,
  secretKey: process.env['NG_APP_SECRET_KEY'],
  username: process.env['NG_APP_USERNAME'] ,
  password: process.env['NG_APP_PASSWORD'] ,
  bucketNames: [
    'recording-huios',
  ]
};
