

let todosFilmes = [];

document.addEventListener('DOMContentLoaded', carregarCategorias);

async function carregarCategorias() {
    const categorias = await buscarCategorias();
    const lista = document.getElementById('categorias');
    lista.innerHTML = '';

    categorias.forEach(cat => {
        const li = document.createElement('li');
        li.textContent = cat.category_name;
        li.onclick = () => carregarFilmes(cat.category_id);
        lista.appendChild(li);
    });
}


async function carregarFilmes(catId) {
    const filmes = await buscarFilmesPorCategoria(catId);
    const lista = document.getElementById('filmes');
    lista.innerHTML = '';

    todosFilmes = filmes;
    const maxFilmes = 20;

    filmes.slice(0, maxFilmes).forEach(filme => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${filme.stream_icon || 'https://via.placeholder.com/180x240'}" alt="${filme.name}">
            <h3>${filme.name}</h3>
            
        `;
        li.onclick = () => assistirFilme(filme.stream_id);
        lista.appendChild(li);
    });
}

function buscarFilmes() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const lista = document.getElementById('filmes');
    lista.innerHTML = '';

    const filtrados = todosFilmes.filter(f =>
        f.name.toLowerCase().includes(termo)
    );

    filtrados.forEach(filme => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${filme.stream_icon || 'https://via.placeholder.com/180x240'}" alt="${filme.name}">
            <h3>${filme.name}</h3>
            
        `;
        li.onclick = () => assistirFilme(filme.stream_id);
        lista.appendChild(li);
    });
}

function assistirFilme(streamId) {
    const url = gerarUrlFilme(streamId);
    window.open(url, '_blank');
}
