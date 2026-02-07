# Brainstorm de Design — Sistema Solar 3D Interativo

## Contexto
Site 3D interativo do Sistema Solar com Three.js. Tela inicial mostra o sistema estelar completo. Ao clicar em um planeta, animação de aproximação (fly-to) com zoom para visualização detalhada. O usuário pode girar, explorar a superfície e navegar livremente.

---

<response>
<text>

## Ideia 1: "Observatório Espacial" — Sci-Fi Cinematográfico

**Design Movement:** Sci-fi cinematográfico inspirado em filmes como Interstellar e Gravity. Estética de centro de controle espacial com HUD translúcido.

**Core Principles:**
1. Imersão total — a interface desaparece para dar lugar ao espaço
2. Dados como narrativa — informações científicas apresentadas como telemetria de missão
3. Profundidade atmosférica — camadas de luz, partículas e névoa cósmica

**Color Philosophy:** Fundo negro absoluto do espaço com acentos em azul elétrico (#0EA5E9) e ciano (#06B6D4) para elementos de interface, evocando telas de controle de missão. Toques de âmbar (#F59E0B) para alertas e destaques importantes. O branco puro é reservado apenas para estrelas e dados críticos.

**Layout Paradigm:** Canvas 3D ocupa 100% da viewport. Interface sobreposta em camadas translúcidas com backdrop-blur. Painel de informações desliza lateralmente como uma gaveta de dados. Sem headers tradicionais — navegação contextual aparece ao interagir.

**Signature Elements:**
1. Linhas de órbita com efeito de pulso luminoso (glow animado)
2. Partículas de poeira estelar flutuando no background
3. HUD translúcido com bordas de 1px em ciano e cantos cortados (clip-path)

**Interaction Philosophy:** Cada clique é uma "missão" — a câmera viaja pelo espaço com motion blur sutil. Hover nos planetas revela uma aura luminosa. A transição entre visão geral e planeta é cinematográfica, com easing suave e rotação da câmera.

**Animation:** Fly-to com curva de Bézier cúbica (ease-in-out exponencial). Planetas rotacionam continuamente. Estrelas cintilam com variação de opacidade. Painéis de UI entram com fade + translate de 20px. Órbitas pulsam suavemente.

**Typography System:**
- Display: "Orbitron" (Google Fonts) — geométrica, futurista, para títulos e nomes de planetas
- Body: "Exo 2" — legível, técnica, para dados e descrições
- Monospace: "JetBrains Mono" — para dados numéricos (distância, temperatura, etc.)

</text>
<probability>0.08</probability>
</response>

---

<response>
<text>

## Ideia 2: "Atlas Cósmico" — Editorial Científico Elegante

**Design Movement:** Design editorial científico inspirado em publicações da National Geographic e atlas astronômicos clássicos. Elegância tipográfica encontra dados visuais.

**Core Principles:**
1. Tipografia como protagonista — hierarquia visual clara e refinada
2. Dados científicos acessíveis — informações complexas apresentadas com clareza
3. Contraste dramático — escuridão do espaço vs. riqueza tipográfica

**Color Philosophy:** Base em preto profundo (#0A0A0F) com gradientes sutis para azul-marinho (#0F172A). Texto principal em off-white (#E2E8F0) para reduzir fadiga visual. Acentos em dourado suave (#D4A574) para títulos e elementos decorativos, evocando mapas estelares antigos. Cada planeta tem sua cor temática para identificação.

**Layout Paradigm:** Tela dividida assimetricamente — 70% canvas 3D, 30% painel editorial que se expande/contrai. O painel usa layout de revista com colunas, pull-quotes e infográficos. Na visão geral, o painel é mínimo; ao focar em um planeta, expande com conteúdo rico.

**Signature Elements:**
1. Linhas de constelação conectando planetas com traço fino e elegante
2. Cartouches decorativas ao redor de dados importantes (inspiradas em mapas antigos)
3. Transições de página com efeito de "virar página" no painel de informações

**Interaction Philosophy:** Exploração contemplativa — movimentos lentos e deliberados. O cursor muda para uma mira de telescópio ao passar sobre planetas. Scroll no painel revela camadas de informação progressivamente.

**Animation:** Transições lentas e majestosas (1.5-2s). Texto aparece com efeito de máquina de escrever para dados. Planetas têm parallax sutil ao mover o mouse. Fade-in sequencial de elementos do painel.

**Typography System:**
- Display: "Playfair Display" — serifada, elegante, para títulos principais
- Body: "Source Sans 3" — humanista, excelente legibilidade para textos longos
- Data: "IBM Plex Mono" — para valores numéricos e coordenadas

</text>
<probability>0.05</probability>
</response>

---

<response>
<text>

## Ideia 3: "Void Explorer" — Brutalismo Espacial Imersivo

**Design Movement:** Brutalismo digital encontra exploração espacial. Interface crua, sem decoração desnecessária. O espaço é o protagonista absoluto.

**Core Principles:**
1. Zero distração — a interface é quase invisível até ser necessária
2. Brutalidade funcional — cada pixel serve a um propósito
3. Escala como emoção — o vazio do espaço transmite a imensidão real

**Color Philosophy:** Preto puro (#000000) como base absoluta. Texto em branco com opacidade variável (100% para ativo, 40% para secundário, 15% para terciário). Único acento: vermelho alaranjado (#FF4500) para o elemento interativo ativo, representando a energia das estrelas. Sem gradientes na UI — apenas cores sólidas.

**Layout Paradigm:** Canvas 3D em 100% da tela sem qualquer overlay permanente. Informações aparecem apenas on-demand em blocos brutais posicionados nas bordas. Tipografia oversized para nomes de planetas, ocupando a largura total da tela durante transições.

**Signature Elements:**
1. Nome do planeta em tipografia gigante (200px+) que aparece e desaparece durante o fly-to
2. Grid de coordenadas sutil no fundo, como um mapa de navegação
3. Cursor personalizado — ponto mínimo com coordenadas X/Y em tempo real

**Interaction Philosophy:** Direta e sem cerimônia. Clique = vá. Sem hover states elaborados — apenas mudança de cursor. A velocidade da animação comunica distância real. Planetas distantes demoram mais para alcançar.

**Animation:** Fly-to com aceleração realista (ease-in forte, ease-out suave). Tipografia aparece com glitch sutil. Sem transições decorativas — cortes secos para painéis de info. Rotação dos planetas em velocidade real proporcional.

**Typography System:**
- Display: "Space Grotesk" — geométrica, bold, sem serifa, para impacto máximo
- Body: "Space Grotesk" light — mesma família para coesão total
- Data: nenhuma fonte especial — números em Space Grotesk tabular

</text>
<probability>0.07</probability>
</response>
