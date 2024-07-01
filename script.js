const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es"


let oportunidades = 6;
let listaPalabras = ["CAZAR", "PLUMA", "NIEVE", "RAMPA", "TIGRE", "CIELO", "MANGO", "RADIO", "PISTA", "LLAMA", "SILLA", "FILMA",];
let random = Math.random()*listaPalabras.length
random = Math.floor(random)
let palabraSecreta = listaPalabras[random]
fetch(API).then((response)=>{
    response.json().then((data)=>{
        palabraSecreta = data[0].toUpperCase()
        console.log(palabraSecreta)
    })
}).catch(()=>{
    console.log("ERROR")
})
const BUTTON = document.getElementById("guess-button");
let input = document.getElementById("guess-input")
let grid = document.getElementById("grid")
BUTTON.addEventListener("click", intento)
function intento(){
    let intento = input.value.toUpperCase()

    if(intento == palabraSecreta){
        terminar("ganaste")
    }
    let row = document.createElement("div");
    row.className = "row"
    for(let i in palabraSecreta){
        let letra = document.createElement("span");
        letra.className = "letter"
        letra.innerHTML = intento[i]
        if(palabraSecreta[i] === intento[i]){
            letra.style.backgroundColor = "#27AE60"
        }
        else if(palabraSecreta.includes(intento[i])){
            letra.style.backgroundColor = "#F1C40F"
        }
        else{
            letra.style.backgroundColor = "#BDC3C7"
        }
        row.appendChild(letra)
    }
    grid.appendChild(row)
    oportunidades--
    if(oportunidades == 0){
        terminar("perdiste")
    }
}
function terminar(mensaje){
    BUTTON.disabled = true
    input.disabled = true
    let contenedor = document.getElementById("guesses")
    contenedor.innerHTML = "<h1>"+mensaje+"</>"
}