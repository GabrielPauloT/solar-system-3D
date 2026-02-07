/**
 * Dados dos planetas do Sistema Solar
 * Design: "Observatório Espacial" — Sci-Fi Cinematográfico
 * Texturas: Solar System Scope (CC BY 4.0) baseadas em dados NASA
 * Servidas localmente via /textures/ para evitar CORS
 */

export interface PlanetData {
  id: string;
  name: string;
  nameEN: string;
  radius: number;
  distance: number;
  orbitalSpeed: number;
  rotationSpeed: number;
  tilt: number;
  textureUrl: string;
  cloudsUrl?: string;
  ringTexture?: string;
  ringInner?: number;
  ringOuter?: number;
  color: string;
  glowColor: string;
  description: string;
  facts: {
    diameter: string;
    mass: string;
    distanceFromSun: string;
    orbitalPeriod: string;
    dayLength: string;
    temperature: string;
    moons: string;
    type: string;
  };
}

export const SUN_DATA = {
  id: 'sun',
  name: 'Sol',
  nameEN: 'Sun',
  radius: 8,
  textureUrl: '/textures/sun.jpg',
  color: '#FDB813',
  glowColor: '#ff8c00',
  description: 'O Sol é a estrela central do nosso sistema solar. É uma esfera quase perfeita de plasma quente, com fusão nuclear em seu núcleo gerando energia que irradia para o espaço. Contém 99,86% de toda a massa do Sistema Solar.',
  facts: {
    diameter: '1.392.700 km',
    mass: '1,989 × 10³⁰ kg',
    temperature: '5.500°C (superfície)',
    type: 'Estrela Anã Amarela (G2V)',
    age: '4,6 bilhões de anos',
    luminosity: '3,828 × 10²⁶ W',
  }
};

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercúrio',
    nameEN: 'Mercury',
    radius: 0.8,
    distance: 18,
    orbitalSpeed: 0.004,
    rotationSpeed: 0.002,
    tilt: 0.034,
    textureUrl: '/textures/mercury.jpg',
    color: '#A0522D',
    glowColor: '#8B7355',
    description: 'Mercúrio é o menor planeta do Sistema Solar e o mais próximo do Sol. Sua superfície é coberta por crateras, semelhante à Lua, e experimenta variações extremas de temperatura entre o dia e a noite.',
    facts: {
      diameter: '4.879 km',
      mass: '3,285 × 10²³ kg',
      distanceFromSun: '57,9 milhões km',
      orbitalPeriod: '88 dias',
      dayLength: '59 dias terrestres',
      temperature: '-180°C a 430°C',
      moons: '0',
      type: 'Planeta Rochoso',
    },
  },
  {
    id: 'venus',
    name: 'Vênus',
    nameEN: 'Venus',
    radius: 1.2,
    distance: 26,
    orbitalSpeed: 0.003,
    rotationSpeed: -0.001,
    tilt: 177.4,
    textureUrl: '/textures/venus_surface.jpg',
    cloudsUrl: '/textures/venus_atmosphere.jpg',
    color: '#DEB887',
    glowColor: '#DAA520',
    description: 'Vênus é o segundo planeta a partir do Sol e o mais quente do Sistema Solar, devido ao seu intenso efeito estufa. Sua rotação é retrógrada — gira no sentido oposto aos outros planetas.',
    facts: {
      diameter: '12.104 km',
      mass: '4,867 × 10²⁴ kg',
      distanceFromSun: '108,2 milhões km',
      orbitalPeriod: '225 dias',
      dayLength: '243 dias terrestres',
      temperature: '462°C (média)',
      moons: '0',
      type: 'Planeta Rochoso',
    },
  },
  {
    id: 'earth',
    name: 'Terra',
    nameEN: 'Earth',
    radius: 1.3,
    distance: 35,
    orbitalSpeed: 0.0025,
    rotationSpeed: 0.005,
    tilt: 23.44,
    textureUrl: '/textures/earth_daymap.jpg',
    cloudsUrl: '/textures/earth_clouds.jpg',
    color: '#4169E1',
    glowColor: '#1E90FF',
    description: 'A Terra é o terceiro planeta a partir do Sol e o único corpo celeste conhecido por abrigar vida. Possui água líquida em sua superfície, uma atmosfera rica em nitrogênio e oxigênio, e um campo magnético protetor.',
    facts: {
      diameter: '12.742 km',
      mass: '5,972 × 10²⁴ kg',
      distanceFromSun: '149,6 milhões km',
      orbitalPeriod: '365,25 dias',
      dayLength: '24 horas',
      temperature: '15°C (média)',
      moons: '1 (Lua)',
      type: 'Planeta Rochoso',
    },
  },
  {
    id: 'mars',
    name: 'Marte',
    nameEN: 'Mars',
    radius: 1.0,
    distance: 45,
    orbitalSpeed: 0.002,
    rotationSpeed: 0.005,
    tilt: 25.19,
    textureUrl: '/textures/mars.jpg',
    color: '#CD5C5C',
    glowColor: '#B22222',
    description: 'Marte é o quarto planeta a partir do Sol, conhecido como "Planeta Vermelho" devido ao óxido de ferro em sua superfície. Possui o maior vulcão (Olympus Mons) e o maior cânion (Valles Marineris) do Sistema Solar.',
    facts: {
      diameter: '6.779 km',
      mass: '6,39 × 10²³ kg',
      distanceFromSun: '227,9 milhões km',
      orbitalPeriod: '687 dias',
      dayLength: '24h 37min',
      temperature: '-65°C (média)',
      moons: '2 (Fobos, Deimos)',
      type: 'Planeta Rochoso',
    },
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    nameEN: 'Jupiter',
    radius: 4.0,
    distance: 62,
    orbitalSpeed: 0.001,
    rotationSpeed: 0.008,
    tilt: 3.13,
    textureUrl: '/textures/jupiter.jpg',
    color: '#DAA520',
    glowColor: '#CD853F',
    description: 'Júpiter é o maior planeta do Sistema Solar, um gigante gasoso com massa mais de duas vezes maior que todos os outros planetas combinados. Sua Grande Mancha Vermelha é uma tempestade que dura há séculos.',
    facts: {
      diameter: '139.820 km',
      mass: '1,898 × 10²⁷ kg',
      distanceFromSun: '778,5 milhões km',
      orbitalPeriod: '11,86 anos',
      dayLength: '9h 56min',
      temperature: '-110°C (topo nuvens)',
      moons: '95 conhecidas',
      type: 'Gigante Gasoso',
    },
  },
  {
    id: 'saturn',
    name: 'Saturno',
    nameEN: 'Saturn',
    radius: 3.5,
    distance: 82,
    orbitalSpeed: 0.0008,
    rotationSpeed: 0.007,
    tilt: 26.73,
    textureUrl: '/textures/saturn.jpg',
    ringTexture: '/textures/saturn_ring.png',
    ringInner: 4.5,
    ringOuter: 8.0,
    color: '#F4A460',
    glowColor: '#DEB887',
    description: 'Saturno é o sexto planeta a partir do Sol, famoso por seu espetacular sistema de anéis compostos principalmente de gelo e rocha. É o segundo maior planeta do Sistema Solar e o menos denso — flutuaria na água.',
    facts: {
      diameter: '116.460 km',
      mass: '5,683 × 10²⁶ kg',
      distanceFromSun: '1,434 bilhão km',
      orbitalPeriod: '29,46 anos',
      dayLength: '10h 42min',
      temperature: '-140°C (topo nuvens)',
      moons: '146 conhecidas',
      type: 'Gigante Gasoso',
    },
  },
  {
    id: 'uranus',
    name: 'Urano',
    nameEN: 'Uranus',
    radius: 2.2,
    distance: 100,
    orbitalSpeed: 0.0005,
    rotationSpeed: 0.005,
    tilt: 97.77,
    textureUrl: '/textures/uranus.jpg',
    color: '#87CEEB',
    glowColor: '#5F9EA0',
    description: 'Urano é o sétimo planeta a partir do Sol. Único entre os planetas, ele orbita o Sol praticamente "deitado", com uma inclinação axial de quase 98 graus. Sua cor azul-esverdeada vem do metano em sua atmosfera.',
    facts: {
      diameter: '50.724 km',
      mass: '8,681 × 10²⁵ kg',
      distanceFromSun: '2,871 bilhões km',
      orbitalPeriod: '84,01 anos',
      dayLength: '17h 14min',
      temperature: '-195°C (topo nuvens)',
      moons: '28 conhecidas',
      type: 'Gigante de Gelo',
    },
  },
  {
    id: 'neptune',
    name: 'Netuno',
    nameEN: 'Neptune',
    radius: 2.1,
    distance: 118,
    orbitalSpeed: 0.0003,
    rotationSpeed: 0.005,
    tilt: 28.32,
    textureUrl: '/textures/neptune.jpg',
    color: '#4169E1',
    glowColor: '#0000CD',
    description: 'Netuno é o oitavo e mais distante planeta do Sistema Solar. Possui os ventos mais fortes de qualquer planeta, atingindo até 2.100 km/h. Sua cor azul intensa é resultado do metano atmosférico.',
    facts: {
      diameter: '49.528 km',
      mass: '1,024 × 10²⁶ kg',
      distanceFromSun: '4,495 bilhões km',
      orbitalPeriod: '164,8 anos',
      dayLength: '16h 6min',
      temperature: '-200°C (topo nuvens)',
      moons: '16 conhecidas',
      type: 'Gigante de Gelo',
    },
  },
];
