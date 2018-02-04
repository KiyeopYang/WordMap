import nconf from 'nconf';
import path from 'path';

nconf
  // 1. CMD Arguments
  .argv()
  // 2. 환경 변수
  .env([
    'MONGO_URL',
    'NODE_ENV',
    'PORT',
    'SECRET',
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, '../', 'config.json') })
  // 4. Defaults
  .defaults({
    PORT: 8080,
    SECRET: 'yangkiyeopsecret',
  });

export default nconf;
