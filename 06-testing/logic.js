let persons = []

function addPerson(name, age) {
    persons.push({ name, age })
}

function find(name) {
    for (let person of persons) {
        console.log(person.name, name)
        if (person.name === name) {
            return person
        }
    }
    return null
}

function filter(age) {
    return persons.filter(person => person.age === age);
}

export {addPerson, find, filter, persons}