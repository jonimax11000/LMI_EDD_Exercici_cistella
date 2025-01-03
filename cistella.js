// cistella.js (Mòdul principal)
import readlineSync from 'readline-sync';


class Producte{
    constructor(preu, descripcio){
        this.preu = preu;
        this.descripcio = descripcio;
    }

    toString(){
        return (this.descripcio+" - "+this.preu.toFixed(2)+" €");
    }
}

class Cistella{
    constructor(){
        this.productes = new Array();
    }

    afegirProducte(producte,quantitat){
        this.productes.push({ producte, quantitat: parseInt(quantitat) });
    }

    mostrarCistella(){
        let total = 0;
        let i = 1;
        console.log("--- Contingut de la Cistella ---")
        for(let producte of this.productes){
            let subtotal = producte.producte.preu * producte.quantitat;
            total += subtotal;
            console.log(i+". "+producte.producte.toString()+" x "+producte.quantitat+" unitats - Subtotal: "+subtotal.toFixed(2)+" €");
            i++;
        }
        console.log("\nPreu Total: "+total.toFixed(2)+" €");
    }
}





// Funció per mostrar ajuda
function mostraAjuda() {
    console.log('Ajuda. Ordres permeses:\n');
    console.log('\thelp: Mostra aquesta ajuda');
    console.log('\texit: Ix de l\'aplicació');
    console.log('\tadd: Afig un nou producte a la cistella');
    console.log('\tshow: Mostra el contingut de la cistella');
}

// Funció per afegir un producte
function afegirProducte(cistella) {
    const nom = readlineSync.question('Nom del producte: ');
    const preu = readlineSync.question('Preu del producte: ');
    if (isNaN(preu)) {
        console.log('Error: El preu ha de ser un número.');
        return;
    }

    const quantitat = readlineSync.question('Nombre d\'unitats: ');
    if (isNaN(quantitat) || parseInt(quantitat) <= 0) {
        console.log('Error: La quantitat ha de ser un número positiu.');
        return;
    }

    cistella.afegirProducte(new Producte(parseFloat(preu),nom),quantitat);

    
}

// Funció principal
function iniciarAplicacio() {
    
    let cistella = new Cistella();

    let ordre;

    console.log("🎄 Benvingut a l'aplicació de la Cistella de Nadal! 🎄");

    do {
        ordre = readlineSync.question('🎄> ').trim().toLowerCase();

        switch (ordre) {
            case 'add':
                console.log("Funció per implementar");
                afegirProducte(cistella); // TO-DO: Descomentar quan es tinga implementat
                break;
            case 'show':
                console.log("Funció per implementar");
                cistella.mostrarCistella(); // TO-DO: Descomentar quan es tinga implementat
                break;
            case 'help':
                mostraAjuda();
                break;
            case 'exit':
                console.log('Bon Nadal!');
                break;
            default:
                console.log('Ordre desconeguda. Escriu "help" per vore les ordres disponibles.');
        }
    } while (ordre !== 'exit');
}

// Iniciar l'aplicació
iniciarAplicacio();
