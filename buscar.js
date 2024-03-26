const barraBusca = document.getElementById('barraBusca');
const botaoBuscar = document.getElementById('botaoBuscar');
const resultadosDiv = document.getElementById('resultados');

botaoBuscar.addEventListener('click', () => {
    const conteudo = barraBusca.value.trim();
    
    fetch(`http://127.0.0.1:8080/buscar?conteudo=${conteudo}`, {
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
