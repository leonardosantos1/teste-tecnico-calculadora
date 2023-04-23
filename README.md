# **Requisitos essenciais para rodar o projeto**
- Ter NodeJs instalado em sua maquina (versão 14 ou superior)
- Ter Docker Desktop instalado em sua maquina 
- Uma IDE de sua preferência para executar o projeto (para desenvolvimento utilizei a Visual Studio Code). Recomando que utilize o Visual Studio Code para usar o plugin Live Server para rodar o frontend corretamente

# **Como executar o projeto inteiro ( backend e frontend )**
Antes de começar a configurar o projeto para rodar a aplicação, clone o repositorio e entre na pasta do mesmo 
```bash
git clone https://github.com/leonardosantos1/teste-tecnico-calculadora.git
cd teste-tecnico-calculadora/
```
 Após isso, siga as seguintes etapas e passou para configurar e rodar a aplicação corretamente!

**Entre na pasta do projeto na parte de backend. Na raiz do projeto backend crie um arquivo ".env". Para saber quais variaveis de ambiente a aplicação possui, use como base o arquivo ".env.example", nesse arquivo possui todas as variaveis de ambiente necessarias.**

Após criar o arquivo ".env", precisamos definir um valor para nossa variavel SECRET_JWT.
Rode o seguinte comando no terminal da pasta de backend:
```bash
node -e "console.log( require('crypto').randomBytes(256).toString('base64'))"
```
Copie e cole o valor mostrado no terminal como valor da variavel de ambiente SECRET_JWT e preencha as outras variaveis de ambiente com seus devidos valores.

**OBS: caso tenha dúvidas de quais valores colocar nas outras demais variaveis de ambiente, copie e cole o trecho abaixo no arquivo ".env"**

```bash
SECRET_JWT="uxtr6X+d++YpDWDA4mK0dkwOoiV4Z0t2FbslJeekR0A+KmUy+0m13/+nDt6yPe8vvvGPqbjqnWvCEtfq7MspuxC3UQKLUP2PCz2FWzNuXi+La9lGr9DxRbZ3aU9ZucCYP5J1LIUKgbTcPi9PEd1GXicwtW/5iY3qRcipXVe57pOG2puionLCKXIorTj6ZIYJrT2/4CUn+82gvv61FZCJklee3V921t6IRs2GwZUQgxE9v1sYQ9aQ+2aJ8bSJGbyRqVboFFdBQnFFumiiSYQis+JW5C7UQKM482E0ltoTZ82Bmg+s5C1DqVlKT8a7WKeTAprIVop3RGAd5xT4DfjXlQ=="
CORS_ORIGIN="http://127.0.0.1:5500"
PORT=3001
MYSQL_PORTS=3306
MYSQL_DATABASE=calculator
MYSQL_ROOT_PASSWORD=root
MYSQL_HOST=localhost
```

Feito isso ainda na pasta de do projeto backend, rode o seguinte comando para instalar as depenciais do projeto:
```bash
npm install
```

Com as depenciais do projeto instaladas, rode o seguinte comando para o banco ser criado corretamente com os valores das variaveis de ambiente
```bash
docker-compose --env-file ./.env up -d
```

Após rodar o conando do docker-compose o banco irá ser criado, com isso precisamos rodar as migrations para criar as tabelas no mesmo, rode o seguinte comando no terminal para as migrations serem executadas:
```bash
npx knex migrate:latest
```

Com as tabelas criadas no banco de dados, ja está tudo pronto para rodar o projeto backend, utilize o seguinte comando para subir a aplicação:
```bash
npm run dev
```
Com isso a parte de backend ja está totalmente configurada e subida. Você utilizar as páginas do frontend para executar devidas funções, como: Login de Usuario, Cadastro de Usuario e a Calculadora para ser utilizada pelo usuario.

**OBS: Para o frontend recomando que utilize a IDE do Visual Studio Code com o plugin do Live Server instalado, para que isso funcione corretamente o valor do CORS_ORIGIN**

**Outro ponto que informo é que o usuario precisa estar autenticado para conseguir utilizar o serviço da Calculadora ( pagina index.html ), caso contrario o mesmo será redirecionado toda vez para a tela de login. Caso o usuario não tenha nenhum cadastro o mesmo deve se cadastrar pagina de signup.html, os campos pedidos serão o Nome ( até 150 caracteres ), Email (pode usar uma unica vez, e até 150 caracteres) e Senha ( deve ter no minimo 6 caracteres )**





