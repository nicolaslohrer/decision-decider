export function shuffleArray<T>(array: T[]) {
  const shuffledArray = [...array];
  let counter = shuffledArray.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = shuffledArray[counter];
    shuffledArray[counter] = shuffledArray[index];
    shuffledArray[index] = temp;
  }
  return shuffledArray;
}
