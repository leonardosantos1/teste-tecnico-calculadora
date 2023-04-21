var api_url = "http://localhost:3001";

var user_id = localStorage.getItem("user_id");
var name = localStorage.getItem("name").toUpperCase();

var buttons = $(".math-button");
var expression = "";
var mathResult = $("#math-result");

var pages = ['calculator-page', 'my-calculations-page', 'all-calculations-page'];

function showPage(currPage) {

    $.each(pages, function (i, page) {
        if (page == currPage) {
            $('#' + page).show();
        } else {
            $('#' + page).hide();
        }
    });
}

function verifyToken() {
    if (!localStorage.getItem("token")) window.location.href = '/teste-tecnico-frontend-l5network/html/login.html';
}

function logout() {
    localStorage.clear();
    window.location.href = '/teste-tecnico-frontend-l5network/html/login.html';
}

async function getCalculations(pageName) {

    let url;

    switch(pageName){
        case 'my-calculations-page':
            url = `${api_url}/maths/user/${user_id}`;
            break;
        case 'all-calculations-page':
            url = `${api_url}/maths/`;
    }

    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            credentials: 'include'
        });

        if(response.status === 401) window.location.href = '/teste-tecnico-frontend-l5network/html/login.html';

        if(!response.ok) throw new Error();

        const responsejSon = await response.json();
        showCalculations(responsejSon, pageName);

        $("#error-my-calculations-page-div").html('');

    } catch (err) {
        $("#error-my-calculations-page-div").html('<div class="alert alert-danger" role="alert">Ocorreu um erro ao tentar se conectar com a API! Tente novamente mais tarde!</div>')
    }
}

function showCalculations(calculations, pageName) {

    let user;

    const table = $("<table>", { class: "table table-striped table-hover" });
    const thead = $("<thead>").append(
        $("<tr>").append(
            $("<th>").text("Usuário"),
            $("<th>").text("Cálculo"),
            $("<th>").text("Resultado"),
            $("<th>").text("Data")
        )
    );
    const tbody = $("<tbody>");

    dateFormatBrazilian(calculations);

    for (var i = 0; i < calculations.length; i++) {
        const c = calculations[i];
        
        if (pageName === 'my-calculations-page') {
            user = name
        } else {
            user = c.user_id
        }
        const tr = $("<tr>").append(
            $("<td>").text(user),
            $("<td>").text(c.calculation),
            $("<td>").text(c.result),
            $("<td>").text(c.date),
        );
        tbody.append(tr);
    }
    table.append(thead, tbody);

    if (pageName === 'my-calculations-page') {
        $("#show-my-calculations").html(table);

    } else {
        $("#show-all-calculations").html(table);
    }
}

function dateFormatBrazilian(calculations) {

    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };

    calculations.forEach((calculation) => {
        let dateDefault = new Date(calculation.date);
        calculation.date = dateDefault.toLocaleDateString('pt-BR', optionsDate);
    })
}

function getUserName() {
    $("#name-user-link").text(name);
}


buttons.click(function () {
    var value = $(this).data("value");

    expression += value;

    mathResult.val(expression);
});


async function calculate() {
    const calculation = mathResult.val().replace("÷", "/")

    const data = {
        user_id,
        calculation
    };

    try {
        const response = await fetch(`${api_url}/maths`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        mathResult.val(responseJson.result);
        expression = '';
    } catch (err) {
        expression = '';
    }
}

function back() {
    expression = expression.substring(0, expression.length - 1);
    mathResult.val(expression);
}

function clearInputMathResult() {
    expression = "";
    mathResult.val("");
}
