const state = {
    values:{
        n_players: document.getElementById("n_players"),
        n_palitos: document.getElementById("n_palitos")
    },
    telas: {
        tela1: document.getElementById("config"),
        tela2: document.getElementById("palp")
        
    }
}

let players = [];
let palitos = [];
let palpites = {};

const nJogadores = 2;
const n_palitos = 6;

function config_porrinha(){
    
    nJogadores = state.values.n_players.innerText;
    state.telas.tela1.style.display = "none";
    state.telas.tela2.style.display = "block";
    console.log(nJogadores);

    // players.push(prompt("informe o nome do jogador."));

}

function Init(){
    state.telas.tela2.style.display = "none";

}

Init()