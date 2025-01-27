// cistella.js (Mòdul principal)
//import readlineSync from 'readline-sync';

    
class Producte{
    constructor(preu, descripcio){
        this.preu = preu;
        this.descripcio = descripcio;
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
        let preuTotal = 0;
        let tbody = document.querySelector("#cuerpo");
        let total = document.getElementById("total");
        let fila = document.createElement("tr");
        tbody.innerHTML="";
        
        for(let producte of this.productes){
            let subtotal = producte.producte.preu * producte.quantitat;
            preuTotal += subtotal;
            fila = document.createElement("tr");
            fila.insertAdjacentHTML('beforeend',"<td>"+producte.producte.nom+"</td>");
            fila.insertAdjacentHTML('beforeend',"<td>"+producte.producte.preu.toFixed(2)+" €</td>");
            fila.insertAdjacentHTML('beforeend',"<td>"+producte.quantitat+"</td>");
            fila.insertAdjacentHTML('beforeend',"<td>"+subtotal.toFixed(2)+" €</td>");
            tbody.appendChild(fila);
        }
        total.innerHTML = preuTotal.toFixed(2)+" €";
    }
}

// Funció principal
function iniciarAplicacio() {
    
    let cistella = new Cistella();
    let boto = document.getElementById("afegir");
    boto.addEventListener("click", (event) => {
        event.preventDefault();
        const nom = document.querySelector("#desc").value.trim();
        const preu = document.querySelector("#preu").value.trim();
        const quantitat = document.querySelector("#quantitat").value.trim();
        
        cistella.afegirProducte(new Producte(parseFloat(preu),nom),quantitat);
        cistella.mostrarCistella();

    });
}

// Iniciar l'aplicació
document.addEventListener("DOMContentLoaded",iniciarAplicacio);
