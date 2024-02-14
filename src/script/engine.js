const state = {
    values:{
        n_players: document.querySelector("#n_players"),
        n_palitos: document.querySelector("#n_palitos"),
        jog_palitos: document.querySelector("#player_palito"),
        Jog_palpite: document.querySelector("#player_palpite")
    },

    telas: {
        tela1: document.getElementById("config"),
        tela2: document.getElementById("palp")
    },

    views: {
        lista: document.querySelector("#list_palp"),
        nomeJogador: document.querySelector("#player_name"),
    }
}

let players = [];
let palitos = [];
let palpites = {};

let nJogadores = 2;
let nPalitos = 3;
let contador = 0;

function capturaDados(){
    palpites[players[contador]] = state.values.Jog_palpite.value;
    palitos.push(state.values.jog_palitos.value);

    state.values.Jog_palpite.value = "";
    state.values.jog_palitos.value = "";

    if(contador<(players.length -1)){
        contador++;
        state.views.nomeJogador.innerHTML = players[contador];
        console.log(palpites);
    }else{

    }

    carregaNomesPalpites();
    
}


function carregaNomesPalpites(){
    state.views.lista.innerHTML = "";
    players.forEach((x) =>{
        state.views.lista.innerHTML += `| ${x} >> ${palpites[x]} << <br>`
    });
}

function capturaNomes(num_jogadores){
    for(let i = 0; i<num_jogadores; i++){
        players.push(prompt(`Informe o nome do jogador ${i+1}.`));
        palpites[players[i]] = 0;
    }
}

function config_porrinha(){
    if(state.values.n_players.value === "" || state.values.n_palitos.value === "" ){
        alert("Informe a quantidade de jogadores!!");
        location.reload();
    }else{
        nJogadores = state.values.n_players.value;
        nPalitos = state.values.n_palitos.value;

        capturaNomes(nJogadores);

        state.telas.tela1.style.display = "none";
        state.telas.tela2.style.display = "block";
        
        carregaNomesPalpites();
        state.views.nomeJogador.innerHTML = players[contador];
    }
    
}

function Init(){
    state.telas.tela2.style.display = "none";

}

Init()