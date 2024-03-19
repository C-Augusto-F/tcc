const barraBusca = document.getElementById('barraBusca');
const botaoBuscar = document.getElementById('botaoBuscar');
const resultadosDiv = document.getElementById('resultados');

botaoBuscar.addEventListener('click', () => {
    const conteudo = barraBusca.value.trim();
    
    fetch(`http://127.0.0.1:8080/buscar?conteudo=${conteudo}`, {
        mode: 'cors', // Habilita o modo CORS
        headers: {
            'Origin': 'http://3.129.8.123/' // Define a origem da solicitação
        }
    })
    .then(response => response.json())
    .then(data => {
        resultadosDiv.innerHTML = '';
        
        data.resultados.forEach(resultado => {
            resultadosDiv.innerHTML += `<p><strong>Título:</strong> ${resultado.titulo} | <strong>Link:</strong> <a href="${resultado.link}">${resultado.link}</a></p>`;
        });
    })
    .catch(error => {
        console.error('Erro ao buscar filmes:', error);
    });
});
