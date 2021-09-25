const getRandomIntegerFromRange = (min, max, digits = 2) => {
  const randomNumber = Math.random() * (max - min) + min;
  return +randomNumber.toFixed(digits);
};
