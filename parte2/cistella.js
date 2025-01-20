// cistella.js (Mòdul principal)
//import readlineSync from 'readline-sync';

    
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
        let respuesta = document.querySelector("#respuesta");
        let taula = document.createElement("table");
        taula.insertAdjacentHTML('beforeend',"<caption>--- Contingut de la Cistella ---</caption>")
        let fila = document.createElement("tr");
        fila.insertAdjacentHTML('beforeend',"<th>identificador</th>");
        fila.insertAdjacentHTML('beforeend',"<th>Producte - Preu</th>");
        fila.insertAdjacentHTML('beforeend',"<th>Quantitat</th>");
        fila.insertAdjacentHTML('beforeend',"<th>Subtotal</th>");
        taula.appendChild(fila);
        
        for(let producte of this.productes){
            let subtotal = producte.producte.preu * producte.quantitat;
            total += subtotal;
            fila = document.createElement("tr");
            fila.insertAdjacentHTML('beforeend',"<td>"+i+"</td>");
            fila.insertAdjacentHTML('beforeend',"<td>"+producte.producte.toString()+"</td>");
            fila.insertAdjacentHTML('beforeend',"<td>"+producte.quantitat+"</td>");
            fila.insertAdjacentHTML('beforeend',"<td>"+subtotal.toFixed(2)+" €</td>");
            taula.appendChild(fila);
            i++;
        }
        fila = document.createElement("tr");
        fila.insertAdjacentHTML("beforeend","<td colspan='4'>Preu total: "+total.toFixed(2)+" €</td>");
        taula.appendChild(fila);
        respuesta.appendChild(taula);
    }
}

function borrarPantalla(){
    let respuesta = document.querySelector("#respuesta");
    while(respuesta.firstChild){
        respuesta.removeChild(respuesta.firstChild);
    }
}



// Funció per mostrar ajuda
function mostraAjuda() {
    let respuesta = document.querySelector("#respuesta");
    borrarPantalla();
    let div = document.createElement('div');
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.insertAdjacentHTML('beforeend',"<p>Ajuda. Ordres permeses:</p>");
    div.insertAdjacentHTML('beforeend',"<p>&emsp;help: Mostra aquesta ajuda</p>");
    div.insertAdjacentHTML('beforeend',"<p>&emsp;exit: Ix de l\'aplicació</p>");
    div.insertAdjacentHTML('beforeend',"<p>&emsp;add: Afig un nou producte a la cistella</p>");
    div.insertAdjacentHTML('beforeend',"<p&emsp;show: Mostra el contingut de la cistella</p>");
    respuesta.appendChild(div);
}

// Funció per afegir un producte
function afegirProducte(cistella) {
    borrarPantalla();
    let respuesta = document.querySelector("#respuesta");
    console.log(respuesta);
    var form = document.createElement("form");
    form.insertAdjacentHTML('beforeend',"<label for='afegir_nom'>Nom del producte</label><input type='text' name ='afegir_nom'><br>")
    form.insertAdjacentHTML('beforeend',"<label for='afegir_preu'>Preu del producte</label><input type='text' name ='afegir_preu'><br>")
    form.insertAdjacentHTML('beforeend',"<label for='afegir_quantitat'>Nombre de productes</label><input type='text' name ='afegir_quantitat'><br>")
    form.insertAdjacentHTML('beforeend',"<button name='boto_add'>Afegir</button><br>")
    respuesta.appendChild(form);
    
    document.querySelector("[name='boto_add']").addEventListener("click", (event) => {
        event.preventDefault();
        const nom = document.querySelector("[name='afegir_nom']").value.trim();
        const preu = document.querySelector("[name='afegir_preu']").value.trim();
        const quantitat = document.querySelector("[name='afegir_quantitat']").value.trim();
        if (!nom || isNaN(preu) || isNaN(quantitat) || preu <= 0 || quantitat <= 0) {
            borrarPantalla();
            respuesta.insertAdjacentHTML('beforeend',"<p> Dades incorrectes</p>");
            setTimeout(() => {

                // Reiniciar la aplicación
                afegirProducte(cistella);
            }, 2000);
        }
        else{
            cistella.afegirProducte(new Producte(parseFloat(preu),nom),quantitat);
            borrarPantalla();
            respuesta.insertAdjacentHTML('beforeend',"<p> producte "+nom+" afegit</p>");
            setTimeout(() => {
                const tituloBienvenida = document.querySelector("#titulo-bienvenida");
                if (tituloBienvenida) {
                    tituloBienvenida.remove();
                }
                borrarPantalla()
                // Reiniciar la aplicación
                bucleApp(cistella);
            }, 2000);
        }
    });
    
}

function bucleApp(cistella){
    let respuesta = document.querySelector("#respuesta");
    let ordre;

    respuesta.insertAdjacentHTML('beforebegin',"<h1 id='titulo-bienvenida'>🎄 Benvingut a l'aplicació de la Cistella de Nadal! 🎄</h1>");
    document.querySelector("[name='boto_ordre']").addEventListener("click", (event) => {
    event.preventDefault();
    ordre = document.querySelector("[name='ordre']").value.trim().toLowerCase();
        
        borrarPantalla();
        switch (ordre) {
            case 'add':
                afegirProducte(cistella); // TO-DO: Descomentar quan es tinga implementat
                break;
            case 'show':
                cistella.mostrarCistella(); // TO-DO: Descomentar quan es tinga implementat
                break;
            case 'help':
                mostraAjuda();
                break;
            case 'exit':
                respuesta.insertAdjacentHTML('beforeend','<p>Bon Nadal.</P>');
                setTimeout(() => {
                    const tituloBienvenida = document.querySelector("#titulo-bienvenida");
                    if (tituloBienvenida) {
                        tituloBienvenida.remove();
                    }

                    borrarPantalla();

                    // Reiniciar la aplicación
                    iniciarAplicacio();
                }, 2000); // 2 segundos
                break;
            default:
                respuesta.insertAdjacentHTML('beforeend','<p>Ordre desconeguda. Escriu "help" per vore les ordres disponibles.</P>');
        }
    });
}

// Funció principal
function iniciarAplicacio() {
    
    let cistella = new Cistella();
    bucleApp(cistella);
}

// Iniciar l'aplicació
document.addEventListener("DOMContentLoaded",iniciarAplicacio);
