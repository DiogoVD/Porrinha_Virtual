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
        vencedor_rodada: document.querySelector("#title"),
        set_palito: document.querySelector("#set_palito"),
        set_palpite: document.querySelector("#set_palpite"),
        palpite_btn: document.querySelector("#btn_palpite")
    }
}

let players = [];
let palitos = [];
let palitos_ver = [];
let palpites = [];
let palpites_ver =[];

let nJogadores = 2;
let nPalitos = 3;
let contador = 0;
let ganhadorRodada;
let soma_dos_palitos = 0;



function reiniciaRodada(){
    let indice = players.indexOf(ganhadorRodada);

    console.log(players);
    console.log(palitos);
    console.log(palitos_ver);
    console.log(palpites);
    console.log(palpites_ver);

    players.splice(indice,1);
    // palitos.splice(indice,1);
    palitos_ver.splice(indice,1);
    // palpites.splice(indice,1);
    palpites_ver.splice(indice,1);

    console.log(players);
    console.log(palitos);
    console.log(palitos_ver);
    console.log(palpites);
    console.log(palpites_ver);
}


function exibeResult(){
    state.telas.tela2.style.display = "none";
    state.telas.telaRes.style.display = "block";

    soma_dos_palitos = palitos_ver.reduce((a,b) => a + b);
    console.log(soma_dos_palitos);

    state.views.lista_palp_result.innerHTML = "";
    players.forEach((x) =>{
        state.views.lista_palp_result.innerHTML += `|  ${x}  |  ${palpites[x]}  |  ${palitos[x]}  |<br>`
        if(parseInt(palpites[x]) === soma_dos_palitos){
            state.views.vencedor_rodada.innerHTML = `${x}<br>Ganhou a rodada`;
            ganhadorRodada = x;
        }
    });

}


function capturaDados(){
    if(palpites_ver.includes(state.values.Jog_palpite.value)===true){
        alert("Palpite ja foi registrado. Informe um novo palpite!!")
        state.values.Jog_palpite.value = "";

    }else{
        palpites[players[contador]] = state.values.Jog_palpite.value;
        palitos[players[contador]] = state.values.jog_palitos.value;
        palitos_ver.push(parseInt(state.values.jog_palitos.value));
        palpites_ver.push(state.values.Jog_palpite.value)

        proximoJogador();

        if(contador<(players.length -1)){
            contador++;
            state.views.nomeJogador.innerHTML = players[contador];
        }else{
            state.views.proximo_btn.style.display = "none";
            state.views.resultado_btn.style.display = "block";
            state.views.palpite_btn.style.display = "none";
            state.views.set_palito.style.display = "none";
            state.views.nomeJogador.style.display = "none";

            carregaNomesPalpites("sim");
        }
    }
    
}
function proximoJogador(){

    if(state.values.Jog_palpite.value >=0 && state.values.Jog_palpite.value !==""){

        state.values.Jog_palpite.value = "";
        state.values.jog_palitos.value = "";
    
        state.views.set_palito.style.display = "block";
        state.views.set_palpite.style.display = "none";
        state.views.proximo_btn.style.display = "none";
        state.views.palpite_btn.style.display = "block";
        carregaNomesPalpites("nao");
    
    }else{
        state.values.Jog_palpite.value = "";
        alert(`Informe um número entre 0 e ${state.values.n_players.value * state.values.n_palitos.value}`);
    }

}

function proximoPalpite(){

    if(state.values.jog_palitos.value >=0 && state.values.jog_palitos.value <= state.values.n_palitos.value && state.values.jog_palitos.value !=="" ){

        state.views.set_palito.style.display = "none";
        state.views.set_palpite.style.display = "block";
        state.views.proximo_btn.style.display = "block";
        state.views.palpite_btn.style.display = "none";
        carregaNomesPalpites("sim");

    }else{
        state.values.jog_palitos.value = "";
        alert(`Informe um número entre 0 e ${state.values.n_palitos.value}`);
    }

}


function carregaNomesPalpites(monstraPalpite){
    state.views.lista.innerHTML = "";
    if(monstraPalpite === "sim"){
        players.forEach((x) =>{
            state.views.lista.innerHTML += `| ${x} >> ${palpites[x]} << <br>`
        });
    }
    if(monstraPalpite === "nao"){
        players.forEach((x) =>{
            state.views.lista.innerHTML += `| ${x} >> -- << <br>`
        });
    }
}

function capturaNomes(num_jogadores){
    
    for(let i = 0; i<num_jogadores; i++){
        let nomePlayer = prompt(`Informe o nome do jogador ${i+1}.`)
        if(nomePlayer === ""){
            nomePlayer = `Jogador ${i+1}`
        }
        players.push(nomePlayer);
        palpites[players[i]] = 0;
    }
}

function config_porrinha(){
    if( state.values.n_players.value === "" || state.values.n_palitos.value === "" || 
        state.values.n_players.value < 2 || state.values.n_palitos.value < 3){
            alert("Informe a quantidade de jogadores e palitos por jogador válidos!!");
            location.reload();
    }else{
        nJogadores = state.values.n_players.value;
        nPalitos = state.values.n_palitos.value;

        capturaNomes(nJogadores);

        state.telas.tela1.style.display = "none";
        state.telas.tela2.style.display = "block";
        state.views.resultado_btn.style.display = "none";
        state.views.set_palpite.style.display = "none";
        state.views.proximo_btn.style.display = "none";

        
        carregaNomesPalpites("nao");
        state.views.nomeJogador.innerHTML = players[contador];
    }
    
}

function Init(){
    state.telas.tela2.style.display = "none";
    state.telas.telaRes.style.display = "none";
    state.views.resultado_btn.style.display = "none";
}

Init()



// regras

// - Nao pode sugerir o mesmo palpites.
// - apenas exibir o palpite apos escolha dos palitos.
// - o ultimo bebe
// - quem acerta sai da rodada