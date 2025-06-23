
let painel, usuario, senha;

async function carregarDados() {
  const res = await fetch('../backEnd/dados.php');
  const data = await res.json();
  painel = data.painel;
  usuario = data.usuario;
  senha = data.senha;
}

carregarDados();

//Carregar categorias dos canais

function buscarCategorias() {
    return fetch('../backEnd/api.php?action=get_live_categories')
        .then(res => res.json());
}

//Carregar canais da categoria escolhida

function buscarCanais(categoryId) {
    return fetch(`../backEnd/api.php?action=get_live_streams&category_id=${categoryId}`)
        .then(res => res.json());
}

//Gera link para assistir o canal

function gerarUrlAoVivo(streamId) {
    return `${painel}/live/${usuario}/${senha}/${streamId}.m3u8`;

}

