var api_url = "http://localhost:3001"

function clearSignupInputs() {

  $("#name-signup").val('');
  $("#email-signup").val('');
  $("#password-signup").val('');

}

$("#signup-button").click(async function (event) {

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
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    console.log(response);

    clearSignupInputs();

    window.location.href = "sucess-signup.html";

  } catch (err) {
    $("#response-signup-button").html('<div class="alert alert-danger" role="alert">Erro ao tentar realizar o cadastro! Por favor confira as informações e tente novamente</div>');
  }

})