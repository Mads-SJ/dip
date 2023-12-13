const cars = [
    {
        nummerplade: "ABCD1234",
        vægt: 100,
        mærke: "Nissan",
        antalHjul: 4,
    },
    {
        nummerplade: "ABCD1234",
        vægt: 100,
        mærke: "Nissan",
        antalHjul: 4,
    },
    {
        nummerplade: "ABCD4321",
        vægt: 75,
        mærke: "Toyota",
        antalHjul: 3,
    },
    {
        nummerplade: "FDGW1234",
        vægt: 30,
        mærke: "Peguoet",
        antalHjul: 2,
    },
    {
        nummerplade: "FDGW1234",
        vægt: 30,
        mærke: "Peguoet",
        antalHjul: 2,
    },
];

const eightWheels = cars.filter(car => car.antalHjul === 8);
const licensePlates = cars.map(car => car.nummerplade);
/*const lightestCar =
    cars.reduce(
    (weight, current) =>
        !weight || current.vægt < weight ? current.vægt : weight,
    undefined
);*/
const lightestCar = Math.min(...cars.map(car => car.vægt));

/*const maxWheels = Math.max(...cars.map(car => car.antalHjul));
const carsWithMaxWheels = cars.filter(car => car.antalHjul === maxWheels);*/
const carsWithMaxWheels = cars.reduce((acc, curr) => {
    if (acc[0]) {
        const currentMaxWheels = acc[0].antalHjul;
        if (currentMaxWheels < curr.antalHjul) {
            acc = [curr];
        } else if (currentMaxWheels === curr.antalHjul) {
            acc.push(curr);
        }
    } else {
        acc.push(curr);
    }

    return acc;
}, []);

console.log(eightWheels, licensePlates, lightestCar, carsWithMaxWheels);

const carWheelsOverview = cars.reduce((accumulator, current) => {
    const entry = accumulator.find(
        item => item.antalHjul === current.antalHjul
    );
    if (entry) {
        entry.count++;
    } else {
        accumulator.push({
            antalHjul: current.antalHjul,
            count: 1,
        });
    }
    return accumulator;
}, []);

console.log(carWheelsOverview);
