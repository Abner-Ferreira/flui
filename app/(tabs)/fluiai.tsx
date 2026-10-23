import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getStations } from "../../services/stations";
import type { Station } from "@/types/station";
import {
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import FLUI_LOGO from '../../assets/images/flui-bolt.png';
import { sendMessageToChatbot } from "../../services/chatbot";

/* ─────────── Constantes e tipos ─────────── */

const C = {
  black: "#000000",
  graphite: "#121212",
  purpleDeep: "#480B75",
  purpleNeon: "#B748FB",
  greenNeon: "#39FF14",
  gold: "#FFD700",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.62)",
  placeholder: "rgba(255,255,255,0.38)",
  border: "rgba(183,72,251,0.22)",
  borderStrong: "rgba(183,72,251,0.5)",
  surface: "rgba(18,18,18,0.86)",
  userBubble: "rgba(183,72,251,0.2)",
};

const USE_NATIVE_DRIVER = Platform.OS !== "web";
const MAX_INPUT = 2000;
const MAX_HISTORY = 20;
const MIN_INPUT_HEIGHT = 44;
const MAX_INPUT_HEIGHT = 140;
const LINK_PATTERN = /\[([^\]\n]{1,120})\]\((https?:\/\/[^\s)]{1,500})\)/g;

const FALLBACK_ERROR =
  "Tive um problema ao processar sua mensagem. ⚡ Tente novamente em instantes.";

const SUGGESTIONS: {
  label: string;
  prompt: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    label: "Encontrar postos próximos",
    prompt: "Quero encontrar postos de recarga próximos a mim.",
    icon: "location-outline",
  },
  {
    label: "Planejar uma viagem",
    prompt: "Quero planejar uma viagem de carro elétrico. Pode me ajudar?",
    icon: "map-outline",
  },
  {
    label: "Encontrar postos no caminho",
    prompt: "Quais postos de recarga eu encontro no caminho da minha rota?",
    icon: "git-branch-outline",
  },
  {
    label: "Consultar autonomia e bateria",
    prompt: "Como consulto a autonomia e o nível de bateria do meu veículo?",
    icon: "battery-half-outline",
  },
  {
    label: "Entender os tipos de carregadores",
    prompt:
      "Quais são os tipos de carregadores e conectores para veículos elétricos?",
    icon: "flash-outline",
  },
];

type Msg = {
  id: string;
  from: "user" | "bot";
  text: string;
};

/* ─────────── Links em Markdown ─────────── */

/* Renderiza [texto](https://...) como link clicável. Não interpreta HTML
   e aceita apenas http e https. */
function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = new RegExp(LINK_PATTERN.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const label = match[1];
    const url = match[2];
    nodes.push(
      <Text
        key={`link-${match.index}`}
        style={styles.link}
        onPress={() => {
          Linking.openURL(url).catch(() => {
            /* link bloqueado pelo sistema: nada a fazer */
          });
        }}
        accessibilityRole="link"
      >
        {label}
      </Text>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

/* ─────────── Componentes internos ─────────── */

function MessageBubble({ message }: { message: Msg }) {
  const isUser = message.from === "user";

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowBot]}>
      {!isUser && (
        <Image
          source={require("../../assets/images/flui-bolt.png")}
          style={styles.avatar}
          accessibilityLabel="Flui AI"
        />
      )}
      <View
        style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}
      >
        <Text selectable style={styles.bubbleText}>
          {renderRichText(message.text)}
        </Text>
      </View>
    </View>
  );
}

function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 400,
            useNativeDriver: USE_NATIVE_DRIVER,
          }),
          Animated.timing(value, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: USE_NATIVE_DRIVER,
          }),
          Animated.delay(600 - delay),
        ]),
      );

    const animations = [pulse(dot1, 0), pulse(dot2, 150), pulse(dot3, 300)];
    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, [dot1, dot2, dot3]);

  return (
    <View
      style={[styles.row, styles.rowBot]}
      accessibilityLabel="O Flui AI está respondendo"
    >
      <Image
        source={require("../../assets/images/flui-bolt.png")}
        style={styles.avatar}
      />
      <View style={[styles.bubble, styles.bubbleBot, styles.typingBubble]}>
        {[dot1, dot2, dot3].map((value, index) => (
          <Animated.View
            key={index}
            style={[styles.typingDot, { opacity: value }]}
          />
        ))}
      </View>
    </View>
  );
}

function Welcome({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <View style={styles.welcome}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Olá! Eu sou o Flui AI ⚡</Text>
        <Text style={styles.welcomeBody}>
          Estou aqui para ajudar você a encontrar pontos de recarga, planejar
          seus trajetos e aproveitar ao máximo seu veículo elétrico.
        </Text>
        <Text style={styles.welcomeQuestion}>O que vamos planejar hoje?</Text>
      </View>

      <View style={styles.suggestionGrid}>
        {SUGGESTIONS.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => onSelect(item.prompt)}
            style={({ pressed }) => [
              styles.suggestion,
              pressed && styles.suggestionPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Sugestão: ${item.label}`}
          >
            <Ionicons name={item.icon} size={18} color={C.purpleNeon} />
            <Text style={styles.suggestionText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* ─────────── Tela ─────────── */

export default function FluiAiScreen() {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Msg>>(null);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);
  const [sending, setSending] = useState(false);

  // Refs evitam estados desatualizados em callbacks assíncronos e envios duplicados.
  const messagesRef = useRef<Msg[]>([]);
  const sendingRef = useRef(false);
  // Incrementado ao iniciar uma nova conversa, para descartar respostas antigas.
  const conversationRef = useRef(0);
  const idCounter = useRef(0);

  const commit = useCallback((next: Msg[]) => {
    messagesRef.current = next;
    setMessages(next);
  }, []);

  const makeMessage = useCallback((from: Msg["from"], text: string): Msg => {
    idCounter.current += 1;
    return { id: `${Date.now()}-${idCounter.current}`, from, text };
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, MAX_INPUT);
      if (!text || sendingRef.current) return;

      const conversation = conversationRef.current;
      sendingRef.current = true;
      setSending(true);
      setInput("");
      setInputHeight(MIN_INPUT_HEIGHT);

      const history = [...messagesRef.current, makeMessage("user", text)];
      commit(history);

      try {
        const payload = history
          .slice(-MAX_HISTORY)
          .map((m) => ({ from: m.from, text: m.text }));

        let stations: Station[] | null = null;

        try {
          stations = await getStations();
        } catch (error) {
          console.error(
            "Não foi possível carregar os postos para o Flui AI:",
            error,
          );
        }

        const reply = await sendMessageToChatbot(payload, stations);

        if (conversation === conversationRef.current) {
          commit([...messagesRef.current, makeMessage("bot", reply)]);
        }
      } catch {
        if (conversation === conversationRef.current) {
          commit([...messagesRef.current, makeMessage("bot", FALLBACK_ERROR)]);
        }
      } finally {
        if (conversation === conversationRef.current) {
          sendingRef.current = false;
          setSending(false);
        }
      }
    },
    [commit, makeMessage],
  );

  const startNewConversation = useCallback(() => {
    conversationRef.current += 1;
    sendingRef.current = false;
    setSending(false);
    setInput("");
    setInputHeight(MIN_INPUT_HEIGHT);
    commit([]);
  }, [commit]);

  const goBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }, []);

  // Descarta respostas pendentes ao sair da tela.
  useEffect(() => {
    return () => {
      conversationRef.current += 1;
    };
  }, []);

  // Rola até a última mensagem quando há novidades.
  useEffect(() => {
    if (messages.length === 0 && !sending) return;
    const id = setTimeout(
      () => listRef.current?.scrollToEnd({ animated: true }),
      60,
    );
    return () => clearTimeout(id);
  }, [messages.length, sending]);

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (Platform.OS !== "web") return;

    const native = event.nativeEvent as TextInputKeyPressEventData & {
      shiftKey?: boolean;
    };
    if (native.key !== "Enter" || native.shiftKey) return;

    // Enter envia; Shift + Enter mantém a quebra de linha.
    (event as unknown as { preventDefault?: () => void }).preventDefault?.();
    void send(input);
  };

  const handleContentSize = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    const next = Math.min(
      MAX_INPUT_HEIGHT,
      Math.max(MIN_INPUT_HEIGHT, event.nativeEvent.contentSize.height + 4),
    );
    setInputHeight(next);
  };

  const canSend = !sending && input.trim().length > 0;
  const hasConversation = messages.length > 0 || input.length > 0;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Msg>) => <MessageBubble message={item} />,
    [],
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={[
          styles.root,
          {
            paddingTop: insets.top,
            paddingBottom: 96 + Math.max(insets.bottom, 0),
          },
        ]}
      >
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : Platform.OS === "android"
                ? "height"
                : undefined
          }
          keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
        >
          <View style={styles.frame}>
            {/* Cabeçalho */}
            <View style={styles.header}>
              <Pressable
                onPress={goBack}
                style={styles.iconBtn}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
              >
                <Ionicons name="chevron-back" size={22} color={C.white} />
              </Pressable>

              <Image
                source={require("../../assets/images/flui-bolt.png")}
                style={styles.headerLogo}
                accessibilityLabel="Flui"
              />

              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Flui AI</Text>
                <Text style={styles.headerSubtitle} numberOfLines={1}>
                  Seu copiloto de mobilidade elétrica
                </Text>
              </View>

              <Pressable
                onPress={startNewConversation}
                disabled={!hasConversation}
                style={[
                  styles.iconBtn,
                  !hasConversation && styles.iconBtnDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Nova conversa"
                accessibilityState={{ disabled: !hasConversation }}
              >
                <Ionicons name="create-outline" size={20} color={C.white} />
              </Pressable>
            </View>

            {/* Mensagens */}
            <FlatList
              ref={listRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.flex}
              contentContainerStyle={
                messages.length === 0 ? styles.listEmpty : styles.listContent
              }
              ListEmptyComponent={<Welcome onSelect={setInput} />}
              ListFooterComponent={sending ? <TypingIndicator /> : null}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={Platform.OS === "web"}
            />

            {/* Campo de envio */}
            <View
              style={[
                styles.composerWrap,
                { paddingBottom: Math.max(insets.bottom, 12) },
              ]}
            >
              <View style={styles.composerRow}>
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  onKeyPress={handleKeyPress}
                  onContentSizeChange={handleContentSize}
                  placeholder="Pergunte algo ao Flui AI..."
                  placeholderTextColor={C.placeholder}
                  multiline
                  maxLength={MAX_INPUT}
                  editable={!sending}
                  style={[styles.input, { height: inputHeight }]}
                  accessibilityLabel="Mensagem para o Flui AI"
                  keyboardAppearance="dark"
                  textAlignVertical="top"
                />

                <Pressable
                  onPress={() => void send(input)}
                  disabled={!canSend}
                  style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
                  accessibilityRole="button"
                  accessibilityLabel="Enviar mensagem"
                >
                  <Ionicons
                    name="arrow-up"
                    size={22}
                    color={canSend ? C.black : "rgba(255,255,255,0.4)"}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

/* ─────────── Estilos ─────────── */

const styles = StyleSheet.create({
  flex: { flex: 1 },

  root: {
    flex: 1,
    backgroundColor: C.black,
  },

  frame: {
    flex: 1,
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    minHeight: 0,
  },

  /* Cabeçalho */
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.border,
  },
  iconBtnDisabled: {
    opacity: 0.4,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    color: C.white,
    fontSize: 17,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: C.muted,
    fontSize: 12,
    marginTop: 2,
  },

  /* Lista */
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  listEmpty: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  rowBot: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  bubble: {
    maxWidth: "82%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
  },
  bubbleBot: {
    backgroundColor: C.surface,
    borderColor: C.border,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: C.userBubble,
    borderColor: C.borderStrong,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    color: C.white,
    fontSize: 15,
    lineHeight: 22,
  },
  link: {
    color: C.greenNeon,
    textDecorationLine: "underline",
  },

  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 14,
  },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.purpleNeon,
  },

  /* Boas-vindas */
  welcome: {
    gap: 18,
    paddingBottom: 8,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    gap: 10,
  },
  welcomeTitle: {
    color: C.white,
    fontSize: 20,
    fontWeight: "800",
  },
  welcomeBody: {
    color: C.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  welcomeQuestion: {
    color: C.greenNeon,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  suggestionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: "rgba(72,11,117,0.18)",
    flexShrink: 1,
  },
  suggestionPressed: {
    borderColor: C.borderStrong,
    backgroundColor: "rgba(183,72,251,0.14)",
  },
  suggestionText: {
    color: C.white,
    fontSize: 13,
    fontWeight: "500",
    flexShrink: 1,
  },

  /* Campo de envio */
  composerWrap: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: "rgba(0,0,0,0.96)",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexShrink: 0,
  },
  composerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: MIN_INPUT_HEIGHT,
    maxHeight: MAX_INPUT_HEIGHT,
    color: C.white,
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.borderStrong,
    backgroundColor: "#121212",
    // outlineStyle: 'none',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.purpleNeon,
  },
  sendBtnDisabled: {
    backgroundColor: "rgba(183,72,251,0.22)",
  },
  sendBtnPressed: {
    opacity: 0.85,
  },
});
