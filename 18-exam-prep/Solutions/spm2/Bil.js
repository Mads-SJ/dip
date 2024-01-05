class Bil {
    #bilmaerke;
    #pris;
    static #samletAntal = 0;

    static AntalBilerIalt() {
        return Bil.#samletAntal;
    }

    toString() {
        return "Mærke:" + this.#bilmaerke + ", pris: " + this.#pris;
    }
    constructor(bilmaerke, pris) {
        if (bilmaerke == null || pris == null || typeof(bilmaerke) != 'string' || typeof(pris) != 'number') {
            throw new Error('invalid input');
        }
        Bil.#samletAntal++;
        this.#bilmaerke = bilmaerke;
        this.#pris = pris;
    }
}

class Varevogn extends Bil {
    #lasteevne;
    constructor(bilmaerke, pris, lasteevne) {
        if (lasteevne == null) {
            throw new Error('invalid input');
        }
        super(bilmaerke, pris);
        this.#lasteevne = lasteevne;
    }
    toString() {
        return super.toString() + ", lasteevne: " + this.#lasteevne;
    }
}

let biler = [];
biler.push(new Bil('Ford', 100000));
biler.push(new Bil('Kia', 130000));
biler.push(new Varevogn('Volvo', 300000, 3000));
//biler.push(new Bil(300,300));
//biler.push(new Varevogn('Æv', 210));
//biler.push(new Varevogn('Æv', 210, null));
for (let bil of biler) {
    console.log(bil.toString());
}
// biler[0].toString = () => 'sludder';
// for (let bil of biler) {
//     console.log(bil.toString());
// }
Bil.prototype.toString = () => 'sludder';
for (let bil of biler) {
    console.log(bil.toString());
}
