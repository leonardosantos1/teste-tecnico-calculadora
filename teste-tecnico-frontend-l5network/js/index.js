var api_url = "http://localhost:3001";

var user_id = localStorage.getItem("user_id");
var name = localStorage.getItem("name").toUpperCase();

var buttons = $(".math-button");
var expression = "";
var mathResult = $("#math-result");

var pages = ['calculator-page', 'my-calculations-page'];

function showPage(currPage) {
    $.each(pages, function (i, page) {
        if (page == currPage) {
            $('#' + page).show();
        } else {
            $('#' + page).hide();
        }
    });
}

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

function showMyCalculations(calculations) {

    const table = $("<table>", { class: "table table-striped table-hover" });
    const thead = $("<thead>").append(
        $("<tr>").append(
            $("<th>").text("Nome"),
            $("<th>").text("Cálculo"),
            $("<th>").text("Resultado"),
            $("<th>").text("Data")
        )
    );
    const tbody = $("<tbody>");
    
    dateFormatBrazilian(calculations);

    for (var i = 0; i < calculations.length; i++) {
        const c = calculations[i];
        const tr = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(c.calculation),
            $("<td>").text(c.result),
            $("<td>").text(c.date),
        );
        tbody.append(tr);
    }
    table.append(thead, tbody);
    $("#show-my-calculations").html(table);
}

function dateFormatBrazilian(calculations){

    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };

    calculations.forEach((calculation)=>{
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
                "Content-Type": "application/json",
            },
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
