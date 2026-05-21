# ⚡ FLUI — Charge Platform Challenge

Aplicativo mobile desenvolvido para o **Charge Platform Challenge**, com foco em experiência premium para motoristas de veículos elétricos, permitindo encontrar, filtrar e navegar até estações de recarga de forma rápida, intuitiva e moderna.

---

# 📱 Sobre o projeto

A **FLUI** é uma plataforma de mobilidade elétrica inspirada em experiências modernas como Tesla, Rivian e aplicativos premium de mobilidade.

O aplicativo oferece:

- mapa interativo com estações de recarga;
- filtros inteligentes;
- informações detalhadas dos postos;
- interface futurista e responsiva;
- experiência visual premium;
- navegação integrada com Google Maps.

---

# ✨ Funcionalidades

## 🗺️ Mapa Interativo

- Visualização de postos de recarga em tempo real (mockados)
- Marcadores personalizados
- Integração com Google Maps
- Navegação até o posto via Google Maps

---

## ⚡ Estações de Recarga

Cada estação possui:

- Nome
- Distância
- Avaliações
- Tipo de carregador
- Potência (kW)
- Quantidade de carregadores
- Disponibilidade
- Horário de funcionamento
- Comodidades
- Carga rápida ou convencional

---

## 🔎 Sistema de Filtros

Filtros acumulativos para:

- Disponível agora
- Estacionamento
- Wi-Fi
- Café
- Banheiro
- Carga rápida
- Tipo de conector
- Potência

Os filtros funcionam de forma combinada.

Exemplo:

```txt
Disponível agora + Estacionamento
```

retorna apenas postos que atendem ambas condições.

---

## 🚗 Navegação Inteligente

Ao clicar em:

```txt
Iniciar trajeto agora
```

o aplicativo abre automaticamente o Google Maps com a rota até o posto selecionado.

---

## 📊 Aba de Atividades

Histórico completo de:

- recargas realizadas;
- trajetos iniciados;
- estações visitadas;
- tempo médio de carregamento;
- energia consumida.

---

## ⚙️ Aba "Mais"

Sistema de navegação interna contendo:

- Meu veículo
- Favoritos
- Pagamentos
- Configurações
- Suporte
- Atividades

---

# 🎨 Design System

## 🎨 Paleta principal

| Cor | Hex |
|---|---|
| Roxo Neon | `#B748FB` |
| Roxo Profundo | `#480B75` |
| Preto | `#000000` |
| Grafite | `#121212` |
| Verde Neon | `#39FF14` |
| Ouro | `#FFD700` |
| Branco | `#FFFFFF` |

---

# 🚀 Tecnologias utilizadas

## 📱 Mobile

- React Native
- Expo
- Expo Router
- TypeScript
- React Native Maps
- React Native Reanimated
- Expo Linear Gradient

---

## 🎨 UI/UX

- Design responsivo
- Micro animações
- Splash screen animada
- Glow effects
- Interface futurista
- Dark UI premium

---

# 📂 Estrutura do Projeto

```txt
src/
 ├── app/
 │   ├── (tabs)
 │   ├── activities
 │   ├── more
 │   └── vehicle
 │
 ├── components/
 │   ├── splash/
 │   ├── station/
 │   ├── filters/
 │   └── ui/
 │
 ├── constants/
 │   └── colors.ts
 │
 ├── data/
 │   └── stations.ts
 │
 ├── types/
 │   └── station.ts
 │
 └── assets/
     └── images/
```

---

# ⚡ Splash Screen

A aplicação possui uma splash screen cinematográfica animada contendo:

- partículas de energia;
- animações neon;
- loading progress;
- background futurista;
- animações com Reanimated.

---

# 📍 Dados Mockados

O app utiliza atualmente:

- +30 postos espalhados pelo estado de São Paulo;
- dados simulados;
- filtros dinâmicos;
- mock local.

---

# 🛣️ Roadmap Futuro

- Integração com backend real
- Autenticação
- Favoritos persistentes
- Pagamentos
- Reserva de carregadores
- Status em tempo real
- IA para recomendação de postos
- Sistema de avaliações
- Apple Maps / Waze support

---

# 🧠 Conceito

A FLUI foi idealizada para transformar a experiência de recarga elétrica em algo:

```txt
rápido
inteligente
visual
fluido
premium
```

mais próximo de uma experiência automotiva moderna do que apenas um aplicativo utilitário.

---

# 📄 Licença

Projeto desenvolvido para fins educacionais e challenge técnico.