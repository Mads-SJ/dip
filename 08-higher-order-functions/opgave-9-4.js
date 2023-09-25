const compose = (f1, f2, x) => {
  return f1(f2(x));
};

const compose2 = (f1, f2) => {
  return (x) => f1(f2(x));
};

const compose2Test = compose2(
  (x) => x + 1,
  (y) => y + 2
);
console.log(compose2Test(2));

const compose3 = (array) => {
  return (x) => array.reduceRight((result, currFn) => currFn(result), x);
};

const fnArray = [(x) => x + 3, (x) => x * 2, (x) => x - 1];

const compose3Test = compose3(fnArray);
console.log(compose3Test(5));
