# WebAPI Project

Este repositório contém uma API em C# com funcionalidades de CRUD, incluindo registro de usuários, login, criação, edição e exclusão de arquivos, além de um sistema de perguntas com opções. O projeto também inclui um frontend desenvolvido em React.

## Funcionalidades

- **Autenticação:**
  - Registro de novos usuários
  - Login de usuários existentes

- **Gerenciamento de Arquivos:**
  - Criação de arquivos
  - Edição de arquivos
  - Exclusão de arquivos
  - Listagem de arquivos

- **Sistema de Perguntas:**
  - Criação de perguntas com opções
  - Edição de perguntas
  - Exclusão de perguntas
  - Listagem de perguntas

## Tecnologias Utilizadas

- **Backend:**
  - C#
  - .NET Core
  - Entity Framework Core

- **Frontend:**
  - React
  - Axios (para chamadas HTTP)
  - Bootstrap (para estilização)

# Como Executar

## Backend

### Navegue até o diretório `Backend`:
   ```sh
   cd Backend
 ```
### Restaure os pacotes NuGet:

```sh

dotnet restore
```

### Execute as migrações do Entity Framework:

```sh

dotnet ef database update
```
### Execute o projeto:

```sh

dotnet run
```
## Frontend
Navegue até o diretório mywebapi-frontend:

```sh
cd mywebapi-frontend
```
### Instale as dependências:

```sh

npm install
```
### Execute o projeto:

```sh

npm start
```
# Demonstração
Um vídeo demonstrativo do funcionamento do projeto está disponível [aqui](https://www.linkedin.com/in/filipa-borges-72aab4151/).
