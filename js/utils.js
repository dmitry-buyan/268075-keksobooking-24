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

const onError = (message) => {
  const node = document.createElement('div');
  const errorParagraph = document.createElement('p');
  node.classList.add('error');
  errorParagraph.textContent = message;
  errorParagraph.classList.add('error__message');
  node.append(errorParagraph);
  document.body.insertAdjacentElement('afterbegin', node);
};

export {
  getRandomIntegerFromRange,
  getFormattedInteger,
  getRandomShuffledArray,
  onError
};
