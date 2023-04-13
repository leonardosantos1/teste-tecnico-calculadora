Conforme combinamos, segue o teste de desenvolvimento.
Peço que me informe assim que receber este e-mail e assim que terminar, ok.
Qualquer dúvida estou à disposição.

Sobre o teste:

Objetivo:
O objetivo deste teste é analisar, nesta prioridade:
A sua lógica;
A qualidade, clareza e organização do seu código.

Projeto:
Obrigatoriamente em Html e Node.js, preferencialmente em Bootstrap, Jquery e MariaDB.

Faça um front end de calculadora com as quatro operações básica e parênteses;
Faça uma api que receberá a requisição e resolverá a conta enviada retornando o resultado;
A api deve registrar as requisições e retornos;
Faça uma tela que mostre as contas e resultados, quando foram feitos, e por quem.

Entrega: 24/04.

Ao finalizar o teste, os seguintes itens devem ser enviados por e-mail:
Código fonte do teste realizado;
Arquivo SQL para a criação do banco;
Documentação explicando o processo de instalação.

Boa sorte...

#####################################

## RFs (Requisitos Funcionais) Back-end

- [ x ] A aplicação deve ter um model de Usuario
- [ x ] A aplicação deve ter um model sobre as Contas 
- [ x ] Usuario deve conseguir realizar login
- [ ] Usuario deve conseguir realizar logout
- [ x ] Usuario deve conseguir se cadastrar
- [ x ] A senha do usuario deve estar criptografada
- [ x ] Usuario deve conseguir ver as contas realizadas pelo mesmo
- [ x ] A aplicação deve conseguir autenticar o usuario
- [ x ] A aplicação deve conseguir receber contas enviadas
- [ x ] A aplicação deve resolver contas
- [ x ] A aplicação deve retornar os resultado da conta enviado
- [ x ] A aplicação deve conseguir persistir as informações das contas no DB
- [ x ] A aplicação deve conseguir persistir usuarios no DB


## RNs (Regras de Negocios) Back-end

- [ x ] O usuario não deve conseguir se cadastrar com um e-mail ja cadastro na base de dados
- [ ] O usuario não deve conseguir realizar requisições para a API não estando autenticado
- [ ] 

## RNFs (Requisitos não funcionais) Back-end

- [ x ] a lib para criptografar a senha do usuario deve ser bcrypt
- [ x ] Os dados da aplicação devem ser persistidos no banco de dados MySQL 
- [ x ] O banco de dados será criado apartir de um arquivo docker-compose


