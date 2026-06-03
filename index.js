#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Códigos-fonte em formato String para serem injetados dinamicamente baseados na escolha do usuário
const componentsData = {
  ts: {
    'index.ts': `export { View } from "./View";\nexport type { ViewProps } from "./View";\nexport { Text } from "./Text";\nexport type { TextProps } from "./Text";\nexport { Pressable } from "./Pressable";\nexport type { PressableProps, PressableStateCallbackType } from "./Pressable";\nexport { TouchableOpacity } from "./TouchableOpacity";\nexport type { TouchableOpacityProps } from "./TouchableOpacity";\nexport { ScrollView } from "./ScrollView";\nexport type { ScrollViewProps, ScrollViewHandle } from "./ScrollView";\nexport { FlatList } from "./FlatList";\nexport type { FlatListProps, RenderItemInfo } from "./FlatList";\nexport { TextInput } from "./TextInput";\nexport type { TextInputProps } from "./TextInput";\nexport { Image } from "./Image";\nexport type { ImageProps, ImageSource } from "./Image";\nexport { Modal } from "./Modal";\nexport type { ModalProps } from "./Modal";\nexport { Switch } from "./Switch";\nexport type { SwitchProps } from "./Switch";\nexport { ActivityIndicator } from "./ActivityIndicator";\nexport type { ActivityIndicatorProps } from "./ActivityIndicator";\nexport { SafeAreaView } from "./SafeAreaView";\nexport type { SafeAreaViewProps } from "./SafeAreaView";\nexport { KeyboardAvoidingView } from "./KeyboardAvoidingView";\nexport type { KeyboardAvoidingViewProps } from "./KeyboardAvoidingView";`,
    // Os códigos TSX originais entram aqui mapeados por chave...
  },
  js: {
    'index.js': `export { View } from "./View";\nexport { Text } from "./Text";\nexport { Pressable } from "./Pressable";\nexport { TouchableOpacity } from "./TouchableOpacity";\nexport { ScrollView } from "./ScrollView";\nexport { FlatList } from "./FlatList";\nexport { TextInput } from "./TextInput";\nexport { Image } from "./Image";\nexport { Modal } from "./Modal";\nexport { Switch } from "./Switch";\nexport { ActivityIndicator } from "./ActivityIndicator";\nexport { SafeAreaView } from "./SafeAreaView";\nexport { KeyboardAvoidingView } from "./KeyboardAvoidingView";`,
    // Os códigos JSX convertidos entram aqui mapeados por chave...
  },
};

// Lógica de inserção das strings dos componentes reais omitida aqui para fins de espaço, mas o fluxo operacional é o seguinte:
function createComponentFiles(targetDir, isTS) {
  const type = isTS ? 'ts' : 'js';
  const ext = isTS ? 'tsx' : 'jsx';
  const indexExt = isTS ? 'ts' : 'js';

  // Exemplo de criação de arquivos individuais no destino do usuário
  // fs.writeFileSync(path.join(targetDir, `View.${ext}`), viewContentText);

  console.log(`\n    Sucesso! Componentes copiados para: ${targetDir}\n`);
}

console.log('=== Inicializando Instalação de Componentes nk-tsx ===');
rl.question(
  'Você está utilizando TypeScript neste projeto? (s/n): ',
  (answer) => {
    const isTS = answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim';

    // Define o diretório alvo padrão curto e semântico
    const targetDir = path.join(process.cwd(), 'src', 'components', 'rnw');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Executa a cópia se baseando na resposta
    if (isTS) {
      console.log(' Gerando versão em TypeScript (.tsx)...');
      // Injeta os arquivos originais com tipagem
    } else {
      console.log(' Gerando versão em JavaScript puro (.jsx)...');
      // Injeta os arquivos convertidos abaixo
    }

    rl.close();
  },
);
