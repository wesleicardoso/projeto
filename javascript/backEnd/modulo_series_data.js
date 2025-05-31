let painel, usuario, senha;

async function carregarDados() {
  const res = await fetch('../backEnd/dados.php');
  const data = await res.json();
  painel = data.painel;
  usuario = data.usuario;
  senha = data.senha;
}

carregarDados();

//Carrega as categorias das series
async function buscarCategorias() {
    const res = await fetch('../backEnd/api.php?action=get_series_categories');
    return await res.json();
}

//Carrega series das categorias
async function buscarSeriesPorCategoria(catID) {
    const res = await fetch(`../backEnd/api.php?action=get_series&category_id=${catID}`);
    return await res.json();
}


//Carrega detalhes da serie episodios e temporadas
async function buscarDetalhesSerie(seriesId) {
  const res = await fetch(`../backEnd/api.php?action=get_series_info&series_id=${seriesId}`);
  const data = await res.json();
  return data;
}


//Gera link para assistir
function gerarUrlSerie(episodeId) {
    const url = `${painel}/series/${usuario}/${senha}/${episodeId}.mp4`;
    window.open(url, '_blank');
}
