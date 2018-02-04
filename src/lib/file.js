import fs from 'fs';

const data = {
  name: 'dataName',
  url: 'https://kiyeop.webpush.kr',
  client: 20424,
};
const id = 12345;
let js = '';
js += `const data = ${JSON.stringify(data)};`;
js += 'console.log(data);';
js += 'function say(i) { console.log("say :", i); };';
js += 'say(data);';
fs.writeFile(`${id}.js`, js, (err) => {
  if (err) throw err;
  console.log('saved');
});
