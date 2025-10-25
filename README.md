# WebGIS - 2ª Fase Processo Seletivo Full Ambiental 2025

## 📋 Descrição do Projeto

Este é um WebGIS (Sistema de Informação Geográfica Web) desenvolvido para exibir pontos georreferenciados com fotografias ambientais coletadas durante a 2ª Fase do Processo Seletivo Full Ambiental 2025. O sistema permite visualizar pontos de interesse em um mapa interativo, onde cada ponto contém uma fotografia e descrição detalhada.

## 🚀 Características

- **Mapa Interativo**: Utiliza Leaflet.js para visualização de mapas
- **Pontos Georreferenciados**: Exibe pontos com coordenadas geográficas precisas
- **Fotos e Descrições**: Cada ponto contém imagem e descrição detalhada
- **Design Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- **Tema Ambiental**: Interface com cores verdes e design minimalista
- **100% Estático**: Compatível com GitHub Pages

## 🗂️ Estrutura do Projeto

```
/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos do projeto
├── js/
│   └── script.js          # Lógica do mapa e interações
├── data/
│   └── pontos.geojson     # Dados geográficos dos pontos
├── fotos/                 # Pasta com as imagens dos pontos
└── README.md              # Este arquivo
```

## 📊 Dados GeoJSON

O arquivo `data/pontos.geojson` contém os pontos georreferenciados com os seguintes atributos:

- **nome**: Nome identificador do ponto
- **descricao**: Descrição detalhada do local
- **imagem**: Nome do arquivo de imagem (deve estar na pasta `/fotos/`)

### Exemplo de estrutura:

```json
{
  "type": "Feature",
  "properties": {
    "nome": "Ponto 1 - Vegetação Nativa",
    "descricao": "Área de vegetação nativa observada durante a vistoria...",
    "imagem": "ponto1.jpg"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-47.061, -22.907]
  }
}
```

## 🔧 Como Adicionar Novos Pontos

### 1. Exportar do QGIS

1. No QGIS, certifique-se de que sua camada contém os campos:
   - `nome` (texto)
   - `descricao` (texto)
   - `imagem` (texto)

2. Clique com o botão direito na camada → **Exportar** → **Salvar feições como...**

3. Escolha o formato **GeoJSON** e salve como `pontos.geojson` na pasta `/data/`

### 2. Adicionar Imagens

1. Coloque as imagens na pasta `/fotos/`
2. Certifique-se de que o nome do arquivo no campo `imagem` do GeoJSON corresponda ao nome real do arquivo
3. Formatos suportados: `.jpg`, `.jpeg`, `.png`

### 3. Atualizar o Arquivo GeoJSON

Edite o arquivo `data/pontos.geojson` e adicione novos pontos seguindo a estrutura existente.

## 🌐 Publicando no GitHub Pages

### Passo 1: Criar Repositório no GitHub

1. Acesse [GitHub.com](https://github.com)
2. Clique em **"New repository"**
3. Nomeie o repositório (ex: `webgis-ambiental`)
4. Marque como **Público**
5. **NÃO** inicialize com README (já temos um)

### Passo 2: Fazer Upload dos Arquivos

#### Opção A: Via Interface Web do GitHub
1. Clique em **"uploading an existing file"**
2. Arraste todos os arquivos e pastas do projeto
3. Adicione uma mensagem de commit
4. Clique em **"Commit changes"**

#### Opção B: Via Git (linha de comando)
```bash
git init
git add .
git commit -m "Initial commit - WebGIS Ambiental"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

### Passo 3: Ativar GitHub Pages

1. No repositório, vá em **Settings**
2. Role até a seção **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha a branch **main**
5. Clique em **Save**

### Passo 4: Acessar o Site

Após alguns minutos, seu WebGIS estará disponível em:
`https://SEU-USUARIO.github.io/SEU-REPOSITORIO`

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização e design responsivo
- **JavaScript (ES6+)**: Lógica do mapa e interações
- **Leaflet.js**: Biblioteca para mapas interativos
- **GeoJSON**: Formato de dados geográficos
- **Google Fonts**: Tipografia (Inter)

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móveis (iOS/Android)
- ✅ Tablets
- ✅ GitHub Pages

## 🎨 Personalização

### Cores do Tema
- **Verde Principal**: `#27ae60`
- **Verde Secundário**: `#2ecc71`
- **Cinza Escuro**: `#2c3e50`
- **Cinza Claro**: `#5a6c7d`
- **Fundo**: `#f8f9fa`

### Modificar Estilos
Edite o arquivo `css/style.css` para personalizar:
- Cores
- Fontes
- Tamanhos
- Animações

## 🐛 Solução de Problemas

### Imagens não aparecem
- Verifique se o arquivo existe na pasta `/fotos/`
- Confirme se o nome no GeoJSON corresponde ao arquivo
- Teste com diferentes formatos (.jpg, .png)

### Mapa não carrega
- Verifique se o arquivo `pontos.geojson` está na pasta `/data/`
- Confirme se o formato JSON está correto
- Abra o console do navegador para ver erros

### GitHub Pages não funciona
- Certifique-se de que todos os arquivos foram enviados
- Verifique se o GitHub Pages está ativado
- Aguarde alguns minutos para a propagação

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte a documentação do Leaflet.js
3. Abra uma issue no repositório

## 📄 Licença

Este projeto foi desenvolvido para o Processo Seletivo Full Ambiental 2025.

---

**Desenvolvido com ❤️ para o meio ambiente**
