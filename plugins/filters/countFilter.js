export default (numberLike) => {
  const number = parseInt(numberLike, 10);
  let letter = '';
  let displayValue;
  if (number >= 1000000000) {
    letter = 'B';
    displayValue =
      Math.trunc(number / 100000000) % 10 === 0 ?
        Math.trunc(number / 1000000000) :
        (Math.trunc(number / 100000000) / 10).toFixed(1);
  }
  if (number >= 1000000 && number <= 999999999) {
    letter = 'M';
    displayValue =
      Math.trunc(number / 100000) % 10 === 0 ?
        Math.trunc(number / 1000000) :
        (Math.trunc(number / 100000) / 10).toFixed(1);
  }
  if (number >= 10000 && number <= 999999) {
    letter = 'K';
    displayValue =
      Math.trunc(number / 100) % 10 === 0 ? Math.trunc(number / 1000) : (Math.trunc(number / 100) / 10).toFixed(1);
  }
  if (number < 10000) {
    letter = '';
    displayValue = number.toLocaleString('en-US');
  }
  return `${displayValue}${letter}`;
};
