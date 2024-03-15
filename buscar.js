// Captura o elemento da barra de busca e o botão de busca
const barraBusca = document.getElementById('barraBusca');
const botaoBuscar = document.getElementById('botaoBuscar');
const resultadosDiv = document.getElementById('resultados');

// Adiciona um evento de clique ao botão de busca
botaoBuscar.addEventListener('click', () => {
    // Pega o valor da barra de busca
    const conteudo = barraBusca.value.trim();
    
    // Envia o valor para o script Python usando fetch
    fetch(`http://127.0.0.1:443/buscar?conteudo=${conteudo}`)
        .then(response => response.json())
        .then(data => {
            // Limpa os resultados anteriores
            resultadosDiv.innerHTML = '';
            
            // Adiciona os novos resultados
            data.resultados.forEach(resultado => {
                resultadosDiv.innerHTML += `<p><strong>Título:</strong> ${resultado.titulo} | <strong>Link:</strong> <a href="${resultado.link}">${resultado.link}</a></p>`;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
        });
});
