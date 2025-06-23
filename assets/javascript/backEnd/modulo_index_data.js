const LIMITE_ITENS = 20;
let painel, usuario, senha;

async function carregarDados() {
  const res = await fetch('../backEnd/dados.php');
  const data = await res.json();
  painel = data.painel;
  usuario = data.usuario;
  senha = data.senha;
}

carregarDados();


document.addEventListener('DOMContentLoaded', () => {
  carregar('get_vod_streams'); 
  carregar('get_series'); 
  carregar('get_live_streams');
});

function getAllFilmes() {
    return fetch('../backEnd/api.php?action=get_vod_streams')
        .then(res => res.json());
}


function getAllSeries() {
    return fetch('../backEnd/api.php?action=get_series')
        .then(res => res.json());
}


function getAllLive() {
    return fetch('../backEnd/api.php?action=get_live_streams')
        .then(res => res.json());
}
  




function assistirFilme(streamId) { 
  const url = `${painel}/movie/${usuario}/${senha}/${streamId}.mp4`; 
  window.open(url, '_blank');
}


