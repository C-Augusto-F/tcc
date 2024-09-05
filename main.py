from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import concurrent.futures
import time

app = Flask(__name__)
CORS(app)

def processar_pagina(conteudo, pagina):
    url = f'https://publicdomainmovie.net/?page={pagina}'
    response = requests.get(url)
    resultados = []
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        elementos_info = soup.find_all('div', class_='info')
        
        for elemento in elementos_info:
            titulo = elemento.find('b').text.strip()
            if conteudo in titulo.lower():
                link = elemento.find_next('a')['href'].strip()
                resultados.append({'titulo': titulo, 'link': link})
    
    return resultados

def buscar_filmes_por_conteudo(conteudo, num_paginas=80):
    lista_de_resultados = []
    conteudo = conteudo.lower().strip()

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        # Processa as 80 páginas em paralelo, limitando a 20 threads simultâneas
        futuros = [executor.submit(processar_pagina, conteudo, pagina) for pagina in range(1, num_paginas + 1)]
        
        for future in concurrent.futures.as_completed(futuros):
            lista_de_resultados.extend(future.result())
    
    return lista_de_resultados

@app.route('/buscar', methods=['GET'])
def buscar():
    conteudo = request.args.get('conteudo')
    inicio_tempo = time.time()  # Marca o início do tempo
    resultados = buscar_filmes_por_conteudo(conteudo)
    tempo_total = time.time() - inicio_tempo  # Calcula o tempo total
    
    print(f"Tempo total de busca: {tempo_total:.4f} segundos")
    
    return jsonify({'resultados': resultados, 'tempo_execucao_segundos': tempo_total})

if __name__ == '__main__':
    app.run(debug=True)