const getRandomIntegerFromRange = (min, max, digits = 0) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const randomNumber = Math.random() * (upper - lower) + lower;

  return randomNumber.toFixed(digits);
};

const getFormattedInteger = (number) => number < 10 ? `0${number}` : number;

const getRandomShuffledArray = (array) => {
  const newArray = array.slice();
  const randomIndex = getRandomIntegerFromRange(0, array.length - 1);

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray.slice(randomIndex);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomIntegerFromRange,
  getFormattedInteger,
  getRandomShuffledArray,
  isEscapeKey
};