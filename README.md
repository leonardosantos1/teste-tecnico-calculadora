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
- [ ] Os calculos realizados devem ser salvados com a data em que foram realizados 

## RNs (Regras de Negocios) Back-ends

- [ x ] O usuario não deve conseguir se cadastrar com um e-mail ja cadastro na base de dados
- [ ] O usuario não deve conseguir realizar requisições para a API não estando autenticado
- [ ] 

## RNFs (Requisitos não funcionais) Back-end

- [ x ] a lib para criptografar a senha do usuario deve ser bcrypt
- [ x ] Os dados da aplicação devem ser persistidos no banco de dados MySQL 
- [ x ] O banco de dados será criado apartir de um arquivo docker-compose


## TO-DO LIST

- [ x ] separar corretamente o main js para seus devidos arquivos
- [ x ] arrumar o html com os novos caminhos dos novos arquivos js
- [] implementar a parte de logout
- [] melhorar a parte de erros na hora do cadastro exemplo: verificar primeiro se caso existe aquele e-mail no banco se caso sim, colocar uma mensagem de erro ao explicativa, fazer isso com o input de senha tambem
- [ x ] melhorar a aba de minhas contas acrescendo o nome do usuario e formatar a data para o formato BR
- [] criar uma nova aba onde mostrar todas as contas do site tendo as mesmas info da aba minhas contas *( se caso sobrar tempo acrescentar um mecanisco de busca onde ele busca somente contas realizadas pela pessoa buscada )*
- [] implementar função de autenticação ao abrir a pagina index.html, se caso o usuario estiver autenticado manter ele na pagina, caso contrario redirecionar o mesmo para a pagina de login
- [] arrumar a parte de responsividade da navbar da pagina index.html 
- [] o cookie do token não esta funcionando arrumar essa fita hoje (quinta) sem falta


