# 🌌 Solar System 3D — Explorador Interativo

![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Uma experiência 3D interativa e cinematográfica do Sistema Solar, construída com **Three.js**, **React** e **TypeScript**. Explore os planetas, navegue pelo espaço e descubra informações fascinantes sobre cada corpo celeste.

## ✨ Demonstração

> Navegue livremente pelo espaço, clique em qualquer planeta para aproximar e explorar em detalhes.

## 🎨 Design: "Observatório Espacial" — Sci-Fi Cinematográfico

Inspirado em filmes como **Interstellar** e **Gravity**, o design segue uma estética de centro de controle espacial com:

- **HUD Translúcido** — Interface de controle com backdrop-blur e bordas ciano sutis
- **Imersão Total** — A interface desaparece para dar lugar ao espaço
- **Dados como Narrativa** — Informações científicas apresentadas como telemetria de missão
- **Profundidade Atmosférica** — Camadas de luz, partículas e névoa cósmica

### 🎨 Paleta de Cores

| Cor | Código | Uso |
|-----|--------|-----|
| 🔵 Electric Blue | `#0EA5E9` | Elementos de interface |
| 🌊 Cyan | `#06B6D4` | Acentos e bordas |
| 🟠 Amber | `#F59E0B` | Alertas e destaques |
| ⚫ Space Black | `#000005` | Fundo do espaço |

### 🔤 Tipografia

- **Orbitron** — Títulos e nomes de planetas (futurista, geométrica)
- **Exo 2** — Textos descritivos (legível, técnica)
- **JetBrains Mono** — Dados numéricos (monospace)

## 🚀 Funcionalidades

- **🌍 8 Planetas + Sol** — Todos os planetas do Sistema Solar com texturas reais da NASA
- **🎬 Animações Fly-To** — Transições cinematográficas com GSAP e câmera suave
- **🖱️ Navegação Livre** — OrbitControls para rotação, zoom e pan
- **📊 Painéis de Informação** — Dados científicos detalhados de cada planeta
- **✨ Efeitos Visuais** — Anéis de Saturno, nuvens na Terra/Vênus, corona solar
- **⭐ Campo Estelar** — 15.000 estrelas cintilantes com cores variadas
- **💫 Órbitas Animadas** — Linhas de órbita com pulso luminoso
- **📱 Responsivo** — Funciona em desktop e dispositivos móveis

## 🛠️ Tech Stack

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | React 19, TypeScript |
| **3D Engine** | Three.js |
| **Animações** | GSAP, Framer Motion |
| **Build Tool** | Vite 7 |
| **Estilização** | Tailwind CSS 4 |
| **Roteamento** | Wouter |
| **UI Components** | Radix UI |
| **Backend** | Express.js |

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/solar-system-3d.git
cd solar-system-3d

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
solar-system-3d/
├── client/
│   ├── public/
│   │   └── textures/          # Texturas dos planetas (NASA)
│   └── src/
│       ├── components/
│       │   ├── SolarSystem.tsx    # Cena 3D principal
│       │   ├── HUD.tsx            # Interface de navegação
│       │   ├── PlanetInfoPanel.tsx # Painel de informações
│       │   └── LoadingScreen.tsx  # Tela de carregamento
│       ├── lib/
│       │   └── planetData.ts      # Dados científicos dos planetas
│       ├── pages/
│       │   └── Home.tsx           # Página principal
│       └── App.tsx
├── server/                    # Backend Express
├── shared/                    # Tipos compartilhados
└── package.json
```

## 🌐 Texturas

As texturas dos planetas são baseadas em dados da **NASA** e servidas via [Solar System Scope](https://www.solarsystemscope.com/) (CC BY 4.0).

## 🎮 Controles

| Ação | Desktop | Mobile |
|------|---------|--------|
| Rotacionar | Arrastar (botão esquerdo) | Arrastar com 1 dedo |
| Zoom | Scroll do mouse | Pinça com 2 dedos |
| Pan | Arrastar (botão direito) | Arrastar com 2 dedos |
| Selecionar | Clique | Toque |

## 📊 Dados dos Planetas

Cada planeta inclui informações científicas detalhadas:

- **Diâmetro** e **Massa**
- **Distância do Sol**
- **Período Orbital** e **Duração do Dia**
- **Temperatura Média**
- **Número de Luas**
- **Tipo de Planeta** (Rochoso, Gigante Gasoso, Gigante de Gelo)

## 🔧 Scripts Disponíveis

```bash
pnpm dev       # Servidor de desenvolvimento
pnpm build     # Build de produção
pnpm preview   # Preview do build
pnpm check     # Type checking
pnpm format    # Formatar código com Prettier
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Créditos

- **Texturas**: [Solar System Scope](https://www.solarsystemscope.com/) (CC BY 4.0)
- **Dados Científicos**: NASA
- **Design Inspiration**: Interstellar, Gravity, interfaces de missões espaciais

---

<p align="center">
  Feito com ❤️ e muita poeira estelar ✨
</p>
