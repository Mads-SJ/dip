function flatten(array) {
  return array.reduce((a, b) => a.concat(b))
}

const array = [[1, 2, 3], [4, 5, 6]]
console.log(flatten(array));