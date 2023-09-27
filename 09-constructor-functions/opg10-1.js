function Animal(name, age) {
    this.name = name;
    this.age = age;
}

function Human(name, age, money) {
    Animal.call(this, name, age);
    this.money = money;
    this.canEarn = () => console.log('I can earn Money');
}

Animal.prototype.canRun = () => console.log('I can run');
Human.prototype.__proto__ = Animal.prototype;

const animal = new Animal('Dog', 5);

animal.canRun(); // I can run

const human1 = new Human('John', 25, 1000);
const human2 = new Human('Jane', 22, 2000);

human1.canEarn(); // I can earn Money

human1.canRun(); // TypeError: human1.canRun is not a function
// animal.canEarn(); // TypeError: animal.canEarn is not a function