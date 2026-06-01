# ⚡ FLUI Mobile

Aplicativo mobile desenvolvido para o **Charge Platform Challenge**, oferecendo uma experiência moderna e intuitiva para motoristas de veículos elétricos encontrarem, avaliarem e utilizarem pontos de recarga de forma simples, rápida e inteligente.

---

# 📱 Sobre o Projeto

A FLUI é uma plataforma de mobilidade elétrica criada para auxiliar motoristas durante toda a jornada de recarga.

Mais do que localizar estações no mapa, a aplicação permite gerenciar veículos, encontrar pontos de recarga, navegar até eles, favoritar locais, avaliar experiências e acompanhar o histórico de utilização.

O projeto foi desenvolvido utilizando React Native e Expo, com integração completa a uma API própria responsável por autenticação, gerenciamento de usuários, veículos, avaliações e atividades.

---

# 🎯 Objetivo

Oferecer uma solução digital que facilite a experiência de recarga de veículos elétricos através de:

* Localização de estações próximas;
* Navegação integrada;
* Informações detalhadas dos postos;
* Avaliações da comunidade;
* Gestão de veículos;
* Histórico de utilização;
* Processo de recarga via QR Code.

---

# ✨ Funcionalidades

## 🔐 Autenticação

Sistema completo de autenticação:

* Cadastro de usuários
* Login
* Logout
* Persistência de sessão
* Armazenamento seguro do token

---

## 🚗 Gestão de Veículos

Cada usuário pode gerenciar seus próprios veículos.

Funcionalidades:

* Cadastro durante o onboarding
* Adição de novos veículos
* Edição de veículos
* Remoção de veículos
* Definição do tipo de veículo

---

## 🗺️ Mapa Interativo

Visualização geográfica das estações de recarga.

Recursos:

* Google Maps
* Localização do usuário
* Marcadores personalizados
* Distância até a estação
* Tempo estimado de deslocamento

---

## ⚡ Detalhes da Estação

Cada estação apresenta:

* Nome
* Distância
* Tempo estimado
* Potência disponível
* Quantidade de carregadores
* Horário de funcionamento
* Status de disponibilidade
* Conectores suportados
* Comodidades disponíveis
* Avaliações da comunidade

---

## 🔎 Sistema de Filtros

Filtros acumulativos para facilitar a busca.

Exemplos:

* Disponível agora
* Estacionamento
* Wi-Fi
* Café
* Banheiro
* Carga rápida
* Potência
* Tipo de conector

Os filtros podem ser combinados simultaneamente.

---

## ❤️ Favoritos

Sistema de favoritos personalizado.

Funcionalidades:

* Adicionar estação aos favoritos
* Remover estação dos favoritos
* Tela dedicada para consulta rápida

---

## ⭐ Avaliações

Sistema colaborativo de avaliações.

Funcionalidades:

* Avaliação por estrelas
* Comentário opcional
* Média calculada automaticamente
* Quantidade de avaliações

---

## 📊 Histórico de Atividades

Registro das ações realizadas pelo usuário.

Atividades registradas:

* Trajetos iniciados
* Recargas iniciadas
* Recargas finalizadas
* Interações futuras da plataforma

---

## 🔋 Processo de Recarga

Fluxo de utilização:

1. Abrir tela de recarga
2. Escanear QR Code do carregador
3. Ou inserir código manualmente
4. Validar carregador
5. Iniciar recarga
6. Finalizar recarga
7. Registrar atividade

---

# 🎨 Design System

## Paleta Principal

| Cor            | Hex     |
| -------------- | ------- |
| Roxo Principal | #B748FB |
| Roxo Profundo  | #480B75 |
| Preto          | #000000 |
| Grafite        | #121212 |
| Verde Neon     | #39FF14 |
| Ouro           | #FFD700 |
| Branco         | #FFFFFF |

---

# 📸 Principais Telas

## Splash Screen

Tela inicial animada responsável por apresentar a identidade visual da FLUI.

---

## Login

Acesso seguro à plataforma.

---

## Cadastro

Criação de conta e cadastro inicial do veículo.

---

## Home

Mapa principal contendo os pontos de recarga disponíveis.

---

## Detalhes do Posto

Informações completas da estação selecionada.

---

## Favoritos

Lista personalizada de estações favoritas.

---

## Veículos

Gerenciamento dos veículos cadastrados.

---

## Perfil

Informações do usuário.

---

## Atividades

Histórico de utilização da plataforma.

---

## Recarga

Fluxo de carregamento utilizando QR Code ou código manual.

---

# 🏗 Arquitetura Mobile

```text
app
│
├── (tabs)
│   ├── Home
│   ├── Carregar
│   ├── Veículos
│   └── Perfil
│
├── Login
├── Cadastro
├── Favoritos
├── Atividades
├── Editar Perfil
└── Editar Veículo

components
│
├── SplashScreen
├── BottomSheet
├── StationMarker
├── Filters
└── UI

services
│
├── auth
├── stations
├── vehicles
├── favorites
└── activities

hooks
│
├── useFavorites
└── useStations

constants
│
└── colors

assets
│
└── images
```

---

# 🚀 Tecnologias Utilizadas

## Mobile

* React Native
* Expo
* Expo Router
* TypeScript

---

## Navegação

* Expo Router

---

## Mapas

* React Native Maps

---

## Localização

* Expo Location

---

## QR Code

* Expo Camera

---

## Armazenamento Seguro

* Expo Secure Store

---

## Animações

* React Native Reanimated

---

## Ícones

* Expo Vector Icons

---

# 🔄 Integração com API

O aplicativo consome uma API REST responsável por:

* Autenticação
* Usuários
* Veículos
* Estações
* Favoritos
* Avaliações
* Histórico de atividades

Toda a comunicação é realizada através de requisições HTTP autenticadas utilizando JWT.

---

# ⚙️ Configuração do Projeto

## Instalação

```bash
npm install
```

---

## Executar Aplicação

```bash
npx expo start
```

---

## Variáveis de Ambiente

Criar um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

---

# 💡 Diferenciais da Solução

* Experiência inspirada em plataformas premium de mobilidade
* Processo de recarga por QR Code
* Sistema de avaliações colaborativas
* Favoritos personalizados
* Histórico de utilização
* Interface moderna e intuitiva
* Arquitetura integrada com backend próprio

---

# 🎓 Charge Platform Challenge

Projeto desenvolvido para o Charge Platform Challenge com foco em mobilidade elétrica, experiência do usuário e integração full stack.

---

# 📄 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos e educacionais.
