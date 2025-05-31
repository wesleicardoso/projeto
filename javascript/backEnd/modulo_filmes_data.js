let painel, usuario, senha;

async function carregarDados() {
  const res = await fetch('../backEnd/dados.php');
  const data = await res.json();
  painel = data.painel;
  usuario = data.usuario;
  senha = data.senha;
}

carregarDados();




  
async function buscarCategorias() {
    const res = await fetch('../backEnd/api.php?action=get_vod_categories');
    return res.json();
    
}




async function buscarFilmesPorCategoria(catId) {
    const res = await fetch(`../backEnd/api.php?action=get_vod_streams&category_id=${catId}`);
    return res.json();
}

function gerarUrlFilme(streamId) {    
    return `${painel}/movie/${usuario}/${senha}/${streamId}.mp4`;
    window.open(url, '_blank');
}
