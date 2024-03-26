from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Adiciona a configuração de CORS ao seu aplicativo Flask

def buscar_filmes_por_conteudo(conteudo, num_paginas=80):
    lista_de_resultados = []

    # Loop sobre todas as páginas disponíveis
    for pagina in range(1, num_paginas+1):
        url = f'https://publicdomainmovie.net/?page={pagina}'
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Verifica se não há resultados
            if soup.find('div', class_='no-results-message'):
                break
            
            # Encontra todos os elementos <div class="info"> na página
            elementos_info = soup.find_all('div', class_='info')
            
            for elemento in elementos_info:
                # Verifica se o conteúdo está presente dentro da tag <div class="info">
                if conteudo.lower() in elemento.text.lower():
                    # Encontra o texto dentro da tag <b>
                    titulo = elemento.find('b').text.strip()
                    # Encontra o conteúdo da próxima tag <a>
                    link = elemento.find_next('a')['href'].strip()
                    # Se o conteúdo estiver presente, adiciona à lista de resultados
                    lista_de_resultados.append({'titulo': titulo, 'link': link})
        else:
            print(f'Falha ao buscar filmes na página {pagina}. Código de status:', response.status_code)
    
    return lista_de_resultados

@app.route('/buscar', methods=['GET'])
def buscar():
    # Obtém o conteúdo da barra de busca enviado pela requisição GET
    conteudo = request.args.get('conteudo')
    
    # Chama a função para buscar os filmes com base no conteúdo fornecido
    resultados = buscar_filmes_por_conteudo(conteudo)
    
    # Retorna os resultados como JSON
    return jsonify({'resultados': resultados})

if __name__ == '__main__':
    app.run(debug=True, port 8080)
