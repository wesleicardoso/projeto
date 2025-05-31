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
    const res = await fetch('../backEnd/api.php?action=get_series_categories');
    return await res.json();
}


async function buscarSeriesPorCategoria(catID) {
    const res = await fetch(`../backEnd/api.php?action=get_series&category_id=${catID}`);
    return await res.json();
}



async function buscarDetalhesSerie(seriesId) {
  const res = await fetch(`../backEnd/api.php?action=get_series_info&series_id=${seriesId}`);
  const data = await res.json();
  return data;
}

function gerarUrlSerie(episodeId) {
    const url = `${painel}/series/${usuario}/${senha}/${episodeId}.mp4`;
    window.open(url, '_blank');
}
