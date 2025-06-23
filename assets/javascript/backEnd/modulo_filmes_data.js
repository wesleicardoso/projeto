let painel, usuario, senha;

async function carregarDados() {
  const res = await fetch('../backEnd/dados.php');
  const data = await res.json();
  painel = data.painel;
  usuario = data.usuario;
  senha = data.senha;
}

carregarDados();



//Carrega as categorias dos filmes
  
async function buscarCategorias() {
    const res = await fetch('../backEnd/api.php?action=get_vod_categories');
    return res.json();
    
}


//Carrega os filmes da categoria

async function buscarFilmesPorCategoria(catId) {
    const res = await fetch(`../backEnd/api.php?action=get_vod_streams&category_id=${catId}`);
    return res.json();
}


//Gera link para assistir o filme
function gerarUrlFilme(streamId) {    
    return `${painel}/movie/${usuario}/${senha}/${streamId}.mp4`;
    window.open(url, '_blank');
}
