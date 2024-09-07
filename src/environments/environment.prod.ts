import { LOGIN_TYPE } from 'src/app/constant';

export const environment = {
  production: true,
  title: 'Huios Recordings Manager',
  logins: [
    {
      type: LOGIN_TYPE.cognito,
      name: 'Amazon Cognito',
      region: 'us-east-1',
      identityPoolId: 'us-east-1:a4b5805c-0ff3-45f6-bbc4-fcdad255a2ce',
      userPoolId: 'us-east-1_wKo69halQ',
      userPoolWebClientId: '7gir9hpshbtc1n8m1ulsb7b3m7',
    },
    {
      type: LOGIN_TYPE.accessKey,
      name: 'AWS Access Key',
      region: 'us-east-1',
    },
  ],
  accessKey: '${{ secrets.AWS_ACCESS_KEY }}',
  secretKey: '${{ secrets.AWS_SECRET_KEY }}',
  username: '${{ secrets.USERNAME }}',
  password: '${{ secrets.PASSWORD }}',
  bucketNames: [
    'recording-huios',
  ]
};
