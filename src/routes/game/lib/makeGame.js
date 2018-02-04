const OUTPUT_LEN = 20;
function getRandom(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}
function insert(arr, item) {
  let isExist = false;
  arr.forEach((o) => {
    if (o.word === item.word) {
      isExist = true;
    }
  });
  if (isExist) {
    return arr;
  } else {
    arr.push(item);
    return arr;
  }
}
export default function makeGame(words, faults) {
  const wordsLen = words.length;
  const faultsLen = faults.length;
  const output = [];
  while (output.length < OUTPUT_LEN) {
    const rand = Math.floor(Math.random() * 10);
    if (faultsLen > 0 && rand >= 5) {
      const fault = getRandom(faults);
      insert(output, {
        _id: fault.wordId,
        word: fault.word,
        meaning: fault.meaning,
        weight: fault.weight,
      });
    } else {
      insert(output, getRandom(words));
    }
  }
  return output;
}
