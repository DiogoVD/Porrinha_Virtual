const state = {
    values:{
        n_players: document.querySelector("#n_players"),
        n_palitos: document.querySelector("#n_palitos"),
        jog_palitos: document.querySelector("#player_palito"),
        Jog_palpite: document.querySelector("#player_palpite")
    },

    telas: {
        tela1: document.getElementById("config"),
        tela2: document.getElementById("palp"),
        telaRes: document.getElementById("res")
    },

    views: {
        lista: document.querySelector("#list_palp"),
        lista_palp_result: document.querySelector("#list_result"),
        nomeJogador: document.querySelector("#player_name"),
        resultado_btn: document.querySelector("#btn_result"),
        proximo_btn: document.querySelector("#btn_next"),
        vencedor_rodada: document.querySelector("#title")
    }
}

let players = [];
let palitos = {};
let palitos_ver = [];
let palpites = {};
let palpites_ver =[];

let nJogadores = 2;
let nPalitos = 3;
let contador = 0;

let soma_dos_palitos = 0;



function exibeResult(){
    state.telas.tela2.style.display = "none";
    state.telas.telaRes.style.display = "block";

    soma_dos_palitos = palitos_ver.reduce((a,b) => a + b);
    console.log(soma_dos_palitos);

    state.views.lista_palp_result.innerHTML = "";
    players.forEach((x) =>{
        state.views.lista_palp_result.innerHTML += `|  ${x}  |  ${palpites[x]}  |  ${palitos[x]}  |<br>`
        if(parseInt(palpites[x]) === soma_dos_palitos){
            state.views.vencedor_rodada.innerHTML = x;
        }
    });


}


function capturaDados(){
    if(palpites_ver.includes(state.values.Jog_palpite.value)===true){
        alert("insira um novo palpite!!")
        state.values.Jog_palpite.value = "";

    }else{
        palpites[players[contador]] = state.values.Jog_palpite.value;
        palitos[players[contador]] = state.values.jog_palitos.value;
        palitos_ver.push(parseInt(state.values.jog_palitos.value));
        palpites_ver.push(state.values.Jog_palpite.value)

        state.values.Jog_palpite.value = "";
        state.values.jog_palitos.value = "";

        if(contador<(players.length -1)){
            contador++;
            state.views.nomeJogador.innerHTML = players[contador];
        }else{
            state.views.proximo_btn.style.display = "none";
            state.views.resultado_btn.style.display = "block";

        }
        carregaNomesPalpites();
    }
    
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
        state.views.resultado_btn.style.display = "none";
        
        carregaNomesPalpites();
        state.views.nomeJogador.innerHTML = players[contador];
    }
    
}

function Init(){
    state.telas.tela2.style.display = "none";
    state.telas.telaRes.style.display = "none";

}

Init()



// regras

// - Nao pode sugerir o mesmo palpites.
// - apenas exibir o palpite apos escolha dos palitos.
// - o ultimo bebe
// - quem acerta sai da rodada