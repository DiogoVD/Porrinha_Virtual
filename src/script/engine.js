const state={
    values:{
        n_players: document.getElementById("n_players"),
        n_palitos: document.getElementById("n_palitos")
    },
    telas: {
        tela1: document.getElementsByClassName("config_container"),
        tela2: document.getElementsById("palpites_cont") 
    }
}

let players = [];
let palitos = [];
let palpites = {};

function config_porrinha(){
    
}

function Init(){
    
    config_porrinha()

}


Init()