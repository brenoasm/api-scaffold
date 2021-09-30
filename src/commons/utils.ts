export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateRecoveryCode = () => {
  const code = [
    generateRandomNumber(1, 9),
    generateRandomNumber(1, 9),
    generateRandomNumber(1, 9),
    generateRandomNumber(1, 9),
    generateRandomNumber(1, 9),
    generateRandomNumber(1, 9),
  ];

  return parseInt(code.join(''));
};
