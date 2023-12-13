class Bil {
    static antalBiler = 0;
    #bilmaerke;
    #pris;

    constructor(bilmaerke, pris) {
        if (!bilmaerke) {
            throw new Error("Bilmærke skal angives.");
        } else if (!pris) {
            throw new Error("Pris skal angives.");
        } else if (typeof bilmaerke !== "string") {
            throw new Error("Bilmærke skal være af typen string");
        } else if (typeof pris !== "number") {
            throw new Error("Pris skal være af typen number");
        }

        this.#bilmaerke = bilmaerke;
        this.#pris = pris;
        Bil.antalBiler++;
    }

    toString() {
        return `${this.#bilmaerke}, ${this.#pris} kr.`;
    }
}

const bil = new Bil("Toyota", 1000);
class Varevogn extends Bil {
    #lasteevne;
    constructor(bilmaerke, pris, lasteevne) {
        if (!lasteevne) {
            throw new Error("Lasteevne skal angives.");
        }
        super(bilmaerke, pris);
        this.#lasteevne = lasteevne;
    }

    toString() {
        return super.toString() + ", lasteevne: " + this.#lasteevne + " kg.";
    }
}

const varevogn = new Varevogn("Volkswagen", 2000, 100);

const biler = [
    new Bil("Mercedes", 3000),
    new Varevogn("Volkswagen", 2200, 100),
    new Bil("Ferrari", 10000),
];

biler.forEach(bil => console.log(bil.toString()));

console.log(Bil.antalBiler);
