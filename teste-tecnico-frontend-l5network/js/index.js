var api_url = "http://localhost:3001";

var user_id = localStorage.getItem("user_id");
var name = localStorage.getItem("name").toUpperCase();

var currentPage;

var buttons = $(".math-button");
var expression = "";
var mathResult = $("#math-result");

var totalPagesMyCalculations;
var totalPagesAllCalculations;

var currentPageMyCalculations = 1;
var currentPageAllCalculations = 1;

var pages = ['calculator-page', 'my-calculations-page', 'all-calculations-page', 'my-data-page'];

function showPage(currPage) {

    currentPage = currPage;

    $.each(pages, function (i, page) {
        if (page == currPage) {
            $('#' + page).show();
        } else {
            $('#' + page).hide();
        }
    });
}

async function getNameAndEmailUser() {
    try {
        const response = await fetch(`${api_url}/users/user/${user_id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            credentials: 'include'
        });

        if (response.status === 401) window.location.href = '/teste-tecnico-frontend-l5network/html/login.html';

        if (!response.ok) throw new Error();

        const responseJson = await response.json();

        const { email } = responseJson;

        $("#my-data-email").val(email.toUpperCase());
        $("#my-data-name").val(name);

    } catch (err) {
        $("#error-my-data-page-div").html('<div class="alert alert-danger" role="alert">Ocorreu um erro ao tentar se conectar com a API! Tente novamente mais tarde!</div>')
    }
}

function verifyToken() {
    if (!localStorage.getItem("token")) window.location.href = '/teste-tecnico-frontend-l5network/html/login.html';
}

function logout() {
    localStorage.clear();
    window.location.href = '/teste-tecnico-frontend-l5network/html/login.html';
}

$('.pagination .page-link').on('click', function (event) {
    event.preventDefault();

    let newPage;

    switch (currentPage) {
        case 'my-calculations-page':
            if ($(this).attr('aria-label') === 'Anterior') {
                newPage = parseInt(currentPageMyCalculations) - 1;
                if (newPage < 1) {
                    break;
                } else {
                    currentPageMyCalculations = newPage;
                };

                getCalculations(currentPageMyCalculations)

            } else if ($(this).attr('aria-label') === 'Próximo') {
                newPage = parseInt(currentPageMyCalculations) + 1;
                if (newPage > totalPagesMyCalculations) {
                    newPage = totalPagesMyCalculations
                } else {
                    currentPageMyCalculations = newPage;
                }
                getCalculations(currentPageMyCalculations)
            }
            break;
        case 'all-calculations-page':
            if ($(this).attr('aria-label') === 'Anterior') {
                newPage = parseInt(currentPageAllCalculations) - 1;
                if (newPage < 1) {
                    break;
                } else {
                    currentPageAllCalculations = newPage;
                };

                getCalculations(currentPageAllCalculations)

            } else if ($(this).attr('aria-label') === 'Próximo') {
                newPage = parseInt(currentPageAllCalculations) + 1;
                if (newPage > totalPagesAllCalculations) {
                    newPage = totalPagesAllCalculations
                } else {
                    currentPageAllCalculations = newPage;
                }
                getCalculations(currentPageAllCalculations)
            }
            break;
    }
});

async function getCalculations(currentPageNumber) {

    let url;

    switch (currentPage) {
        case 'my-calculations-page':
            url = `${api_url}/maths/user/${user_id}?page=${currentPageNumber}`;
            break;
        case 'all-calculations-page':
            url = `${api_url}/maths?page=${currentPageNumber}`;
            break;
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

        if (response.status === 401) window.location.href = '/teste-tecnico-frontend-l5network/html/login.html';

        if (!response.ok) {
            throw new Error();
        }

        const responseJson = await response.json();

        switch (currentPage) {
            case 'my-calculations-page':
                totalPagesMyCalculations = responseJson.totalPages;
                currentPageMyCalculations = currentPageNumber;
                $("#first-page-of-pagination-my-calculations").text(currentPageMyCalculations);
                $("#last-page-of-pagination-my-calculations").text(totalPagesMyCalculations);
                break;
            case 'all-calculations-page':
                totalPagesAllCalculations = responseJson.totalPages;
                currentPageAllCalculations = currentPageNumber
                $("#first-page-of-pagination-all-calculations").text(currentPageAllCalculations);
                $("#last-page-of-pagination-all-calculations").text(totalPagesAllCalculations);
                break;
        }

        showCalculations(responseJson.data);

        $("#error-my-calculations-page-div").html('');

    } catch (err) {
        $("#error-my-calculations-page-div").html('<div class="alert alert-danger" role="alert">Ocorreu um erro ao tentar se conectar com a API! Tente novamente mais tarde!</div>')
    }
}

function showCalculations(calculations) {

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

        if (currentPage === 'my-calculations-page') {
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

    if (currentPage === 'my-calculations-page') {
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

        if (!response.ok) throw new Error();

        const responseJson = await response.json();

        console.log(responseJson);

        mathResult.val(responseJson.result);
        expression = '';
    } catch (err) {
        expression = '';
        //$("#error-calculate-div").html('<div class="alert alert-danger" role="alert">Ocorreu um erro ao tentar se conectar com a API! Tente novamente mais tarde!</div>')

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
