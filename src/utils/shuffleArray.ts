export function shuffleArray(array: any[]) {
  let shuffledArray = [...array];
  let counter = shuffledArray.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = shuffledArray[counter];
    shuffledArray[counter] = shuffledArray[index];
    shuffledArray[index] = temp;
  }
  return shuffledArray;
}
