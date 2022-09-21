
![GitHub Org's issues](https://img.shields.io/github/issues/Rafael-Albano/RentX-API)
![GitHub Org's forks](https://img.shields.io/github/forks/Rafael-Albano/RentX-API)
![GitHub Org's stars](https://img.shields.io/github/stars/Rafael-Albano/RentX-API)
![GitHub Org's license](https://img.shields.io/github/license/Rafael-Albano/RentX-API)
<p align="center">
  <img src=assets/rentx_logo.png>
</p>

## About: 

API project built during the course taught by **RocketSeat, Ignite - NodeJS** class that simulates the routine of a car rental company.

### Business Rule Diagram:

<p align="center">
  <img src=assets/1571029149847-attachment.png>
</p>

### :page_with_curl: Project Functionality: 

- **Cadastro de Carro**: Deve ser possível cadastrar um novo carro.(Somente usuário autenticado e administrador).

- **Listagem de Carro**: Deve ser possível listar todos os carros disponíveis.

-**Cadastro de Especificação**: Deve ser possível cadastrar uma especificação para um carro.(Somente usuário autenticado e administrador).

-**Cadastro de Imagem**: Deve ser possível cadastrar a imagem do carro.

-**Aluguel do Carro**: Deve ser possível cadastrar um aluguel.

-**Devolução de carro:** Deve ser possível realizar a devolução de um carro.

-**Recuperar Senha:** Deve ser possível o usuário recuperar a senha informando o e-mail.




:test_tube:

## 💻 Installation, Dependencies, and Running the Project
:exclamation: *IMPORTANT :*  **To run the project, you are expected to have the following tools installed on your machine:**

* NPM ou Yarn.
* NodeJS.
* Docker and Docker Compose.

**1.** Clone este repositório 
```
git clone git@github.com:Rafael-Albano/RentX-API.git
``` 
**2.** Vá até o diretório raiz do projeto
```
cd rentx-ignite-nodejs
``` 
**3.** Instale as dependências necessárias
```
yarn 
ou
npm install
```
**4.** Execute a aplicação
```
yarn dev
```

## :floppy_disk: Usando a Aplicação
Para realização de **requisições** na aplicação, deve ser utilizado o **Insomnia** ou **Postman**, importando o [arquivo](insomnia_requests) de requisições já existente neste diretório.
Atentar-se aos parâmetros necessários no **Header**.

## :syringe: Evidência de Testes
Nesta aplicação, são contemplados **Testes Unitários e Testes de Integração** utilizando o framework de testes **Jest**, visando garantir o correto funcionamento das funcionalidades e manter a aplicação de acordo com os requisitos. <br/>

- **Desenvolvido por** [**Rafael**](https://www.linkedin.com/in/rafael-luis-albano/) 🤖