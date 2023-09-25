const subject = () => {
  const observers = [];

  return {
    registerObserver: (observer) => {
      observers.push(observer);
    },
    notifyObservers: () => {
      observers.forEach((observer) => observer());
    },
  };
};

const observer1 = () => console.log("I have been notified!");
const observer2 = () => console.log("Me too!");

const actualSubject = subject();

actualSubject.registerObserver(observer1);
actualSubject.registerObserver(observer2);
actualSubject.notifyObservers();

// Klasse :)
class Subject {
  constructor() {
    this.observers = [];
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer());
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }
}

const subjectObject = new Subject();
subjectObject.registerObserver(observer1);
subjectObject.notifyObservers();
