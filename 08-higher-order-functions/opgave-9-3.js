const compareIgnoreCase = (s1, s2) => {
  if (s1.toLowerCase() > s2.toLowerCase()) return 1;
  else if (s1.toLowerCase() < s2.toLowerCase()) return -1;
  else return 0;
};

const compareLength = (s1, s2) => {
  if (s1.length > s2.length) return 1;
  else if (s1.length < s2.length) return -1;
  else return 0;
};

const compareSort = (compare) => {
  return (array) => {
    // Tjek om array er et array
    if (!Array.isArray(array)) throw new Error("Argument er ikke et array >:(");

    // Tjek om elementerne i arrayet er
    const everyElementIsSameType = array.every(
      (element) => typeof element === typeof array[0]
    );
    if (!everyElementIsSameType)
      throw new Error("Elementer i arrayet er ikke samme type.");

    array.sort(compare);
  };
};

const ignoreCaseSort = compareSort(compareIgnoreCase);

let array = ["B", "K", "D", "Z", "A", "L", "P", "a"];
ignoreCaseSort(array);
console.log(array);

const lenSort = compareSort(compareLength);

array = ["asd", "oaksodpka", "a", "alksdælkasældk"];
lenSort(array);
console.log(array);
