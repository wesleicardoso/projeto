

document.addEventListener('DOMContentLoaded', carregarCategorias);


function carregarCategorias() {
    buscarCategorias().then(categorias => {
        const lista = document.getElementById('categorias');
        lista.innerHTML = '';

        categorias.forEach(cat => {
            const li = document.createElement('li');
         
            li.innerHTML = `<i class="fas fa-list"></i> ${cat.category_name}`;
            li.onclick = () => carregarCanais(cat.category_id);
            lista.appendChild(li);
        });
    });
}


function carregarCanais(catId) {
    buscarCanais(catId).then(canais => {
        const lista = document.getElementById('canais');
        lista.innerHTML = '';

        canais.forEach(canal => {
            const li = document.createElement('li');
            
            const iconUrl = canal.stream_icon || 'https://via.placeholder.com/80x60?text=Sem+Logo';

           
            li.innerHTML = `<img src="${iconUrl}" alt="${canal.name}" width="80" height="60"> 
                            <span>${canal.name}</span>`;

            li.onclick = () => assistirCanal(canal.stream_id);
            lista.appendChild(li);
        });
    });
}


function assistirCanal(streamId) {
    const url = gerarUrlAoVivo(streamId);
    const video = document.getElementById('player');
    const playerContainer = document.getElementById('player-container');

   
    playerContainer.style.display = 'block';

    if (Hls.isSupported()) {
        if (window.hls) {
            window.hls.destroy();
        }
        window.hls = new Hls();
        window.hls.loadSource(url);
        window.hls.attachMedia(video);
        window.hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    } else {
        alert('Seu navegador não suporta HLS.');
    }
}



document.getElementById('fechar-player').onclick = () => {
    const video = document.getElementById('player');
    const playerContainer = document.getElementById('player-container');
    
  
    if (window.hls) {
        window.hls.destroy();
        window.hls = null;
    }
    video.pause();
    video.src = '';

   
    playerContainer.style.display = 'none';
};
