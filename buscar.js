const barraBusca = document.getElementById('barraBusca');
const botaoBuscar = document.getElementById('botaoBuscar');
const resultadosDiv = document.getElementById('resultados');

botaoBuscar.addEventListener('click', () => {
    const conteudo = barraBusca.value.trim();
    
    fetch(`http://127.0.0.1:8080/buscar?conteudo=${conteudo}`, {
        mode: 'cors', // Habilita o modo CORS
        headers: {
            'Origin': 'http://3.129.8.123', // Define a origem da solicitação
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
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
