const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const getRandomChar = () =>
  CHARS.charAt(Math.floor(Math.random() * CHARS.length));
