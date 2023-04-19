var api_url = "http://localhost:3001"

var email = $("#email-login");
var password = $("#password-login");

$("#button-login").click(async function (event) {

  event.preventDefault();

  const data = {
    email:email.val(),
    password:password.val(),
  };

  try {
    const response = await fetch(`${api_url}/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error();

    const responseJson = await response.json();

    const { name, user_id } = responseJson;

    localStorage.setItem('name', name);
    localStorage.setItem('user_id', user_id);

    window.location.href = '/teste-tecnico-frontend-l5network/html/index.html';

  } catch (err) {
    clearInputsLogin();
    if(err.message === 'Failed to fetch'){
      $("#error-login").html('<div class="alert alert-danger" role="alert">Não possível efetuar Login. Por favor tente novamente mais tarde!</div>');

    }else{
      $("#error-login").html('<div class="alert alert-danger" role="alert">Usuário ou senha inválidos!</div>');
    }
  }
})

function clearInputsLogin() {
  email.val('');
  password.val('');
}