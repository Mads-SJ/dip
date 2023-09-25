const persons = [
  {
    name: "Albert",
    age: 22,
    phone: "84559203",
  },
  {
    name: "Børge",
    age: 34,
    phone: "23456789",
  },
  {
    name: "Carsten",
    age: 44,
    phone: "12345678",
  },
  {
    name: "Dorthe",
    age: 55,
    phone: "87654321",
  },
  {
    name: "Emil",
    age: 12,
    phone: "84950283",
  },
];

// Find en person med et bestemt mobilnummer
const person = persons.find((person) => person.phone === "12345678");
console.log(person);

// Find den mindste alder
const minAge = persons.reduce((currMin, curr) => {
  return curr.age < currMin.age ? curr : currMin;
});
console.log(minAge);

// Modificér arrayet med personer, så personerne nu får et fortløbende id
persons.forEach((person, i) => (person.id = i + 1));

// Generér en tekststreng, der indeholder personers navne - kommasepareret og i sorteret rækefølge
const nameString = persons.map((person) => person.name).join(", ");
console.log(nameString);

// Generér et array med navn og mobilnummer på de personer, der er yngre end 30.
const namePhoneArray = persons
  .filter((person) => person.age < 30)
  .map((person) => {
    return {
      name: person.name,
      phone: person.phone,
    };
  });
console.log(namePhoneArray, namePhoneArray[0]);
