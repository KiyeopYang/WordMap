export default function serialize(obj) {
  const str = [];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    str.push(encodeURIComponent(key)+'='+encodeURIComponent(obj[key]));
  }
  return str.join('&');
};
