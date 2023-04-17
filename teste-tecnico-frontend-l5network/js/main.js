var api_url_login = "http://localhost:3001/login";
var api_url_math = "http://localhost:3001/maths";
var api_url_signup = "http://localhost:3001/signup"

var buttonLogin = $("#button-login");

async function login() {
  var errorLogin = $("#error-login");
  var resultado = $("#resultado");

  errorLogin.html("");
  resultado.html("");

  const email = $("#email-login").val();
  const password = $("#password-login").val();

  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(api_url_login, payload);

    console.log(response);
    return resultado.html(`<h2>${response.data.token}</h2>`);
  } catch (err) {
    console.log(err);
    errorLogin.html(
      '<div class="alert alert-danger" role="alert">Usuário ou senha inválidos!</div>'
    );
  }
}

var buttons = $(".math-button");

var expression = "";

buttons.click(function () {

  var value = $(this).data("value");

  expression += value;

  $("#math-result").val(expression);
});

async function calculate() {
  const mathResult = $("#math-result").val();

  const calculation = mathResult.replace("÷","/")

  const data = {
    user_id: "af41f426-6518-48d8-a592-6a8f51075c65",
    calculation: calculation,
  };

  try {
    const response = await fetch(api_url_math, {
      method: "POST", 
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();

    $("#math-result").val(responseJson.result);
    expression='';
  } catch (err) {
    expression='';
  }
}

function back() {
  expression = expression.substring(0, expression.length - 1);
  $("#math-result").val(expression);
}

$(".clear-button").click(function () {
  expression = "";
  $("#math-result").val("");
});


function clearSignupInputs(){
 
  $("#name-signup").val('');
  $("#email-signup").val('');
  $("#password-signup").val('');

}


$("#signup-button").click(async function(event){

  event.preventDefault();

  const form = document.querySelector(".needs-validation");
  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  const data = {
    name: $("#name-signup").val(),
    email: $("#email-signup").val(),
    password: $("#password-signup").val(),
  };

  try {

   const response = await fetch(api_url_signup, {
      method: "POST", 
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if(!response.ok) throw new Error();

    console.log(response);

    clearSignupInputs();

    window.location.href = "sucess-signup.html";
  } catch (err) {
    $("#response-signup-button").html('<div class="alert alert-danger" role="alert">Erro ao tentar realizar o cadastro! Por favor confira as informações e tente novamente</div>');
  }

})