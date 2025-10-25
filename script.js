// WebGIS - Script principal
// Desenvolvido para o Processo Seletivo Full Ambiental 2025

// Variáveis globais
let map;
let pontosLayer;

// Inicialização do mapa quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadGeoJSONData();
});

// Função para inicializar o mapa Leaflet
function initializeMap() {
    // Configuração inicial do mapa (coordenadas de São Paulo como padrão)
    map = L.map('map', {
        center: [-22.907, -47.061],
        zoom: 13,
        zoomControl: true,
        attributionControl: true
    });

    // Adicionar camada base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Adicionar controle de escala
    L.control.scale({
        position: 'bottomright',
        metric: true,
        imperial: false
    }).addTo(map);

    console.log('Mapa inicializado com sucesso');
}

// Função para carregar dados GeoJSON
async function loadGeoJSONData() {
    try {
        console.log('Carregando dados GeoJSON...');
        
        // Carregar arquivo GeoJSON
        const response = await fetch('data/pontos.geojson');
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        
        const geoJSONData = await response.json();
        console.log('Dados GeoJSON carregados:', geoJSONData);
        
        // Processar e exibir os pontos
        displayPoints(geoJSONData);
        
    } catch (error) {
        console.error('Erro ao carregar dados GeoJSON:', error);
        showErrorMessage('Erro ao carregar os dados do mapa. Verifique se o arquivo pontos.geojson existe.');
    }
}

// Função para exibir pontos no mapa
function displayPoints(geoJSONData) {
    // Remover layer anterior se existir
    if (pontosLayer) {
        map.removeLayer(pontosLayer);
    }

    // Criar ícone personalizado
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #27ae60; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px;">📷</div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });

    // Adicionar pontos ao mapa
    pontosLayer = L.geoJSON(geoJSONData, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, { icon: customIcon });
        },
        onEachFeature: function(feature, layer) {
            // Criar popup com informações do ponto
            const popupContent = createPopupContent(feature.properties);
            layer.bindPopup(popupContent, {
                maxWidth: 350,
                className: 'custom-popup'
            });
        }
    }).addTo(map);

    // Ajustar visualização para mostrar todos os pontos
    if (geoJSONData.features && geoJSONData.features.length > 0) {
        const group = new L.featureGroup(pontosLayer.getLayers());
        map.fitBounds(group.getBounds().pad(0.1));
    }

    console.log(`${geoJSONData.features.length} pontos adicionados ao mapa`);
}

// Função para criar conteúdo do popup
function createPopupContent(properties) {
    const { nome, descricao, imagem } = properties;
    
    // Verificar se a imagem existe
    const imagePath = `fotos/${imagem}`;
    const imageExists = checkImageExists(imagePath);
    
    let imageHtml = '';
    if (imageExists) {
        imageHtml = `
            <div style="text-align: center; margin-bottom: 15px;">
                <img src="${imagePath}" 
                     alt="${nome}" 
                     style="width: 100%; max-width: 300px; height: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display: none; color: #e74c3c; font-size: 0.9rem; padding: 10px; background: #fdf2f2; border-radius: 6px; border: 1px solid #fecaca;">
                    <strong>⚠️ Imagem não encontrada:</strong><br>
                    Arquivo: ${imagem}
                </div>
            </div>
        `;
    } else {
        imageHtml = `
            <div style="color: #e74c3c; font-size: 0.9rem; padding: 10px; background: #fdf2f2; border-radius: 6px; border: 1px solid #fecaca; margin-bottom: 15px;">
                <strong>⚠️ Imagem não encontrada:</strong><br>
                Arquivo: ${imagem}
            </div>
        `;
    }

    return `
        <div style="font-family: 'Inter', sans-serif;">
            <h3 style="color: #27ae60; font-size: 1.2rem; margin-bottom: 10px; font-weight: 600; text-align: center;">
                ${nome}
            </h3>
            ${imageHtml}
            <p style="color: #5a6c7d; line-height: 1.6; margin: 0;">
                <strong>Descrição:</strong><br>
                ${descricao}
            </p>
        </div>
    `;
}

// Função para verificar se a imagem existe (simulação)
function checkImageExists(imagePath) {
    // Em um ambiente real, você poderia fazer uma requisição HEAD para verificar
    // Por enquanto, assumimos que a imagem existe se o caminho está correto
    return imagePath && imagePath.includes('.jpg');
}

// Função para exibir mensagem de erro
function showErrorMessage(message) {
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; border-radius: 12px; color: #e74c3c;">
            <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
            <h3 style="margin-bottom: 15px; text-align: center;">Erro ao carregar o mapa</h3>
            <p style="text-align: center; max-width: 400px; line-height: 1.6;">${message}</p>
        </div>
    `;
}

// Função para adicionar novo ponto (para uso futuro)
function addNewPoint(lat, lng, nome, descricao, imagem) {
    const newPoint = {
        type: "Feature",
        properties: {
            nome: nome,
            descricao: descricao,
            imagem: imagem
        },
        geometry: {
            type: "Point",
            coordinates: [lng, lat]
        }
    };

    // Adicionar ao mapa
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #27ae60; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px;">📷</div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });

    const marker = L.marker([lat, lng], { icon: customIcon });
    const popupContent = createPopupContent(newPoint.properties);
    marker.bindPopup(popupContent, {
        maxWidth: 350,
        className: 'custom-popup'
    });
    
    marker.addTo(map);
    return marker;
}

// Event listeners para melhorar a experiência do usuário
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe de loading ao mapa
    const mapElement = document.getElementById('map');
    mapElement.classList.add('loading');
    
    // Remover loading após um tempo
    setTimeout(() => {
        mapElement.classList.remove('loading');
    }, 1000);
});

// Função para redimensionar o mapa quando a janela for redimensionada
window.addEventListener('resize', function() {
    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
});

console.log('WebGIS carregado com sucesso!');
