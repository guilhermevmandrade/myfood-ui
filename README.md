# MyFood UI

O **MyFood UI** é a interface de usuário desenvolvida em **React Native** para interagir com a [MyFood API](https://github.com/guilhermevmandrade/myfood-api). Ele permite que os usuários registrem suas refeições, definam metas nutricionais, acompanhem suas calorias e macronutrientes, e gerenciem suas informações de forma simples e intuitiva.

## Funcionalidades

- **Cadastro e login de usuários**: Os usuários podem se cadastrar e acessar suas contas para começar a registrar suas refeições e metas.
- **Registro de refeições**: Permite que os usuários registrem as refeições consumidas ao longo do dia.
- **Cálculo de calorias e macronutrientes**: Exibe os cálculos de calorias e macronutrientes das refeições.
- **Definição de metas nutricionais**: Permite aos usuários definir suas metas de calorias diárias e a porcentagem de cada macronutriente.
- **Acompanhamento de progresso**: O aplicativo permite que os usuários acompanhem seu progresso com base nas refeições registradas e metas nutricionais.

## Tecnologias Utilizadas

- **React Native** (Framework para desenvolvimento de aplicativos móveis)
- **Expo** (Para facilitar o desenvolvimento, build e deploy)
- **React Navigation** (Para navegação entre as telas)
- **Axios** (Para realizar chamadas à API)
- **Expo Router** (Para navegação baseada em arquivos)
- **Async Storage** (Para armazenar dados localmente)

## Configuração da API

A comunicação com a API é realizada através do arquivo `services/api.js`. A API base é configurada com o endereço `https://localhost:44352/api`. Para realizar as chamadas à API, é utilizado o **Axios**, com a configuração do **JWT Token** sendo feito de forma automática a cada requisição, quando o token é encontrado no **AsyncStorage**. Caso a API esteja em outro endereço, atualize a configuração no arquivo `config/config.js`.

As principais funções da API são:

- **Autenticação**: Login, registro e logout de usuários.
- **Gerenciamento de Usuários**: A API permite a visualização, atualização e exclusão dos dados do usuário.
- **Gerenciamento de Alimentos**: Permite adicionar, listar, atualizar e deletar alimentos.
- **Gerenciamento de Refeições**: As refeições podem ser criadas, atualizadas, deletadas e associadas a alimentos.
- **Metas Nutricionais**: A API permite a criação, atualização e visualização de metas calóricas e de macronutrientes.

## Instalação

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Expo CLI** (Recomendado para facilitar o desenvolvimento com React Native)
- **Android Studio ou Xcode** (Para emular o aplicativo em dispositivos virtuais ou reais)

### Passos para instalação

1. **Clonar o repositório**

   Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/myfood-ui.git
   ```

2. **Instalar dependências**

   Navegue até o diretório do projeto e instale as dependências:

   ```bash
   cd myfood-ui
   npm install
   ```

3. **Configurar a API**

   O aplicativo se comunica com a API MyFood. Certifique-se de que a API esteja em execução localmente ou configure o endpoint da API no arquivo `services/api.js`. Por padrão, o aplicativo se conecta à URL `https://localhost:44352/api`.

4. **Rodar o aplicativo**

   Se você estiver usando o Expo, pode rodar o aplicativo no seu dispositivo ou emulador com o seguinte comando:

   ```bash
   expo start
   ```

   Se preferir rodar diretamente no emulador de Android ou iOS:

   - Para Android:

     ```bash
     npx react-native run-android
     ```

   - Para iOS (macOS somente):

     ```bash
     npx react-native run-ios
     ```

   O aplicativo estará disponível para ser visualizado e testado.

## Scripts

Aqui estão alguns scripts úteis para executar durante o desenvolvimento:

- **`npm start`**: Inicia o servidor do Expo.
- **`npm android`**: Abre o aplicativo no emulador Android.
- **`npm ios`**: Abre o aplicativo no emulador iOS.
- **`npm web`**: Inicia a versão web do aplicativo.
- **`npm test`**: Executa os testes automatizados com Jest.
