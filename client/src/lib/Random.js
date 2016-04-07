export const randomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}