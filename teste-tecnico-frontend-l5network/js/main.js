var api_url_login = "http://localhost:3001/login";
var api_url_math = "http://localhost:3001/maths";
var api_url_signup = "http://localhost:3001/signup"
var api_url_math_user = "http://localhost:3001/maths/user/968b99ee-b54c-4225-b850-979d4de21a68"

var buttonLogin = $("#button-login");

var pages = ['calculator-page','my-calculations-page'];

function showPage(currPage) {
  $.each(pages, function(i, page) {
    if (page == currPage) {
      $('#' + page).show();
    } else {
      $('#' + page).hide();
    }
  });
}

async function findCalculations() {
  try {
    const response = await fetch(api_url_math_user);
    const responsejSon = await response.json()
    showMyCalculations(responsejSon)
  } catch (err) {

  }
}
function showMyCalculations(calculations) {
  var table = $("<table>", {class: "table table-striped table-hover"});
  var thead = $("<thead>").append(
    $("<tr>").append(
      $("<th>").text("Cálculo"),
      $("<th>").text("Resultado"),
      $("<th>").text("Data")
    )
  );
  var tbody = $("<tbody>");
  for (var i = 0; i < calculations.length; i++) {
    var c = calculations[i];
    var tr = $("<tr>").append(
      $("<td>").text(c.calculation),
      $("<td>").text(c.result),
      $("<td>").text(c.date),
    );
    tbody.append(tr);
  }
  table.append(thead, tbody);
  $("#show-my-calculations").html(table);
}


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
    user_id: "968b99ee-b54c-4225-b850-979d4de21a68",
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