import axios from "axios";
import Constants from "expo-constants";
import type { Station } from "@/types/station";

const CHATBOT_KEY = Constants.expoConfig?.extra?.CHATBOT_KEY;
const MODEL_ID = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
Você é o FLUI AI ⚡, o assistente inteligente do Flui, um aplicativo de mobilidade elétrica.

PERSONALIDADE:
- Amigável, inteligente, moderno e prestativo.
- Responda em português brasileiro natural.
- Seja direto, de preferência em 2 a 5 frases.
- Use emojis ocasionalmente: ⚡, 🔋, 🚗 e 📍.

POSTOS DE RECARGA:
- Você recebe dados reais dos postos pela API do Flui.
- Use esses dados para responder perguntas sobre postos e comparar opções.
- Nunca invente postos, endereços, preços, conectores, avaliações ou disponibilidade.
- Só afirme que um posto está disponível ou ocupado conforme o campo status recebido.
- Só informe potência, quantidade de carregadores, horário e comodidades quando existirem nos dados.
- O campo distance é fornecido pela API. Não afirme ter calculado uma distância independente.
- Não existe informação de preço nos dados recebidos. Se perguntarem preços, explique que não há preços disponíveis na base fornecida.
- Não afirme conhecer a localização atual do usuário, a menos que ela seja fornecida.
- Se a lista de postos estiver vazia, diga que nenhum posto foi retornado pela API.
- Se os dados dos postos não puderem ser consultados, diga isso claramente.
- Não misture informações de postos com informações genéricas da internet.
- Ao recomendar postos, cite os nomes exatamente como aparecem nos dados.
- Não afirme que calculou uma rota real sem acesso a um serviço de rotas.

OUTRAS FUNÇÕES:
- Ajudar a planejar viagens com veículos elétricos.
- Explicar autonomia, bateria, conectores e potência de carregamento.
- Distinguir informações confirmadas de estimativas.
- Perguntar naturalmente quando faltarem dados para ajudar o usuário.

SEGURANÇA:
- Nunca incentive o usuário a interagir com o aplicativo enquanto dirige.
- Se a autonomia estiver baixa, recomende parar em local seguro e buscar uma alternativa prudente.

IDENTIDADE:
Você é o copiloto digital do Flui. Ajude o motorista a viajar com mais tranquilidade e menos preocupação com a recarga.

REGRAS OBRIGATÓRIAS PARA RESPOSTAS SOBRE POSTOS E ROTAS:

- Quando o usuário perguntar quais postos existem, quais encontrará no caminho, onde pode recarregar ou quais postos ficam em uma rota, você deve apresentar os postos diretamente na resposta.
- Nunca responda apenas para o usuário consultar o mapa ou outra tela do aplicativo quando os dados dos postos estiverem disponíveis.
- Liste os postos relevantes usando seus nomes reais, exatamente como aparecem nos dados recebidos.
- Para cada posto relevante, apresente, quando disponíveis: nome, status, potência, tipo de carregador, conectores, horário de funcionamento e distância.
- Se o usuário informar uma origem e um destino, use as coordenadas dos postos para identificar candidatos próximos ao trajeto. Entretanto, coordenadas sozinhas não comprovam que um posto está efetivamente na rota: não afirme isso sem dados de uma rota calculada por um serviço de roteamento.
- Se não houver um serviço de roteamento disponível, informe claramente que não foi possível confirmar quais postos ficam exatamente no trajeto. Ainda assim, apresente os postos próximos que puder identificar pelos dados recebidos, sem inventar resultados.
- Se houver vários postos relevantes, liste-os em tópicos, em vez de responder somente com um resumo.
- Se a pergunta for sobre uma viagem, organize a resposta com origem e destino, postos candidatos para parada e os detalhes disponíveis de cada um.
- Só recomende consultar o mapa como complemento, nunca como substituto da resposta.
- Se os dados recebidos contiverem postos suficientes para responder, não diga que não consegue fornecer a lista.


`;

export type ChatMessage = {
  from: "user" | "bot";
  text: string;
};

export async function sendMessageToChatbot(
  messages: ChatMessage[],
  stations: Station[] | null,
): Promise<string> {
  try {
    if (!CHATBOT_KEY) {
      console.error("CHATBOT_KEY não configurada.");
      return "Não consegui iniciar o assistente Flui agora. ⚡ Verifique a configuração do serviço e tente novamente.";
    }

    const stationContext =
      stations === null
        ? `ERRO AO CARREGAR POSTOS: os dados não foram recebidos.
Não invente nomes de postos. Informe que não foi possível carregar
a lista neste momento.`
        : stations.length === 0
          ? `A API retornou zero postos. Informe isso com clareza,
sem inventar resultados.`
          : `LISTA REAL DE POSTOS CADASTRADOS NO FLUI
Total de postos recebidos: ${stations.length}

${JSON.stringify(
  stations.map((station) => ({
    id: station.id,
    name: station.name,
    latitude: station.latitude,
    longitude: station.longitude,
    rating: station.rating,
    reviewsCount: station.reviewsCount,
    distance: station.distance,
    time: station.time,
    status: station.status,
    connectors: station.connectors,
    chargerType: station.chargerType,
    powerKw: station.powerKw,
    powerWatts: station.powerWatts,
    hours: station.hours,
    amenities: station.amenities,
    chargers: station.chargers,
  })),
  null,
  2,
)}


INSTRUÇÕES OBRIGATÓRIAS:
- Responda usando os postos desta lista.
- Se perguntarem quais postos existem, liste os nomes dos postos.
- Se perguntarem sobre uma viagem, apresente os postos candidatos
  relevantes que conseguir identificar com os dados disponíveis.
- Para cada posto listado, informe os detalhes disponíveis,
  como status, potência, conectores e horário.
- Nunca responda apenas "consulte o mapa" quando houver dados
  relevantes para apresentar.
- Não invente postos, preços, distâncias ou disponibilidade.
- As distâncias fornecidas não comprovam que um posto fica
  efetivamente no trajeto entre origem e destino.
- Sem um serviço de roteamento, não afirme que calculou a rota
  nem que identificou todos os postos ao longo dela.
- Se não houver dados suficientes para identificar postos
  relevantes para o trajeto, explique essa limitação e apresente
  os postos que puder identificar com segurança.`;

    const contents = messages.map((msg) => ({
      role: msg.from === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${CHATBOT_KEY}`,
      {
        systemInstruction: {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nCONTEXTO ATUAL DOS POSTOS:\n${stationContext}`,
            },
          ],
        },
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1500,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    );

    const answer = response.data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim();

    if (answer) {
      return answer;
    }

    return "Não consegui preparar uma resposta agora. ⚡ Tente novamente ou consulte o mapa do Flui.";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao conversar com o Gemini:",
        error.response?.data ?? error.message,
      );
    } else {
      console.error("Erro inesperado no chatbot:", error);
    }

    return "Tive um problema ao processar sua mensagem. ⚡ Tente novamente em instantes.";
  }
}
