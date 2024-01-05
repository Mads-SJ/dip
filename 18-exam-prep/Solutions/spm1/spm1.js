let biler = [
    {nummerplade:'ab 82 123', vaegt:1000, maerke:'Ford', antalhjul:8}, 
    {nummerplade:'ab 82 234', vaegt:1200, maerke:'Kia', antalhjul:4}, 
    {nummerplade:'ab 82 345', vaegt:1200, maerke:'Opel', antalhjul:4}];

let mindstvaegt=biler.reduce((mindst, b) => mindst>b.vaegt?mindst:b.vaegt,0);


let start = [];
let aggregeretantalEfterHjul = biler.reduce((agg, b) => {
        if (typeof agg[b.antalhjul] === 'undefined') {
            agg[b.antalhjul] = {antalHjul:b.antalhjul, antal:1};
        } else {
            agg[b.antalhjul].antal++;
        }
        return agg;
}, start);
console.log(aggregeretantalEfterHjul);
