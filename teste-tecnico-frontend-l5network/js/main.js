
// geral todos js
var api_url = "http://localhost:3001"

var user_id = localStorage.getItem("user_id")
var userName = localStorage.getItem("name")

//index.js
var pages = ['calculator-page','my-calculations-page'];

// index.js
function showPage(currPage) {
  $.each(pages, function(i, page) {
    if (page == currPage) {
      $('#' + page).show();
    } else {
      $('#' + page).hide();
    }
  });
}

// index.js
async function findMyCalculations() {
  try {
    const response = await fetch(`${api_url}/maths/user/${user_id}`);
    const responsejSon = await response.json()
    showMyCalculations(responsejSon)
    $("#error-my-calculations-page-div").html('');
  } catch (err) {
    $("#error-my-calculations-page-div").html('<div class="alert alert-danger" role="alert">Ocorreu um erro ao tentar se conectar com a API! Tente novamente mais tarde!</div>')
  }
}

// index.js
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


//login.js
$("#button-login").click(async function(event){

  event.preventDefault();

  const email = $("#email-login").val();
  const password = $("#password-login").val();

  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(`${api_url}/login`,{
      method: "POST", 
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    alert(response)

    console.log(response)

    if(!response.ok) throw new Error();

    const responseJson = await response.json();

    const {name, user_id} = responseJson;

    localStorage.setItem('name', name);
    localStorage.setItem('user_id', user_id);

    window.location.href = '/teste-tecnico-frontend-l5network/html/index.html'
    
  } catch (err) {
    $("#error-login").html('<div class="alert alert-danger" role="alert">Usuário ou senha inválidos!</div>');
  }
})


//index.js
function getUserName(){
  $("#name-user-link").text(userName);
}

//index.js
var buttons = $(".math-button");

//index.js
var expression = "";

//index.js
buttons.click(function () {

  var value = $(this).data("value");

  expression += value;

  $("#math-result").val(expression);
});

//index.js
async function calculate() {
  const inputMathResult = $("#math-result").val();

  const calculation = inputMathResult.replace("÷","/")

  const data = {
    user_id,
    calculation
  };

  try {
    const response = await fetch(`${api_url}/maths`, {
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

//index.js
function back() {
  expression = expression.substring(0, expression.length - 1);
  $("#math-result").val(expression);
}

//index.js
$(".clear-button").click(function () {
  expression = "";
  $("#math-result").val("");
});


//signup.js
function clearSignupInputs(){
 
  $("#name-signup").val('');
  $("#email-signup").val('');
  $("#password-signup").val('');

}


//signup.js
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

   const response = await fetch(`${api_url}/signup`, {
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