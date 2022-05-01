
$(function () {

    $("#buscar").click(() => {
        buscarSuperhero()
    })

    $("#limpiar").click(() => {
        limpiar()
    })

    $(document).keypress(e => {
        if (e.which == 13) {
            buscarSuperhero()
        }
    })
})

//función que busca a SuperHero
function buscarSuperhero() {
    let id_superhero = $("#input_busqueda").val()

    if (validacion(id_superhero) == false || id_superhero > 732) {
        alert("SuperHero no encontrado")
        return;
    }

    getSuperhero(id_superhero)
}

//función que valida si el SuperHero se encuentra
function validacion(id) {
    let expression = /^\d{1,3}$/;

    if (expression.test(id)) {
        return true
    }
    return false
}

function getSuperhero(id) {
    $.ajax({
        type: "GET",
        url: `https://superheroapi.com/api.php/1501982276808516/${id}`,
        success: function (response) {
            console.log(response)
            //crear cards
            //inyectarlo
            $("#cards").empty()
            $("#cards").append(generarCard(response))
            $("#input_busqueda").val("")
            $("#grafico").empty()
            $("#grafico").append(generarGrafico(response))
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function generarCard(superhero) {

    let card = ` 
    <h5 class="text-center">SuperHero encontrado</h5>
    <div class="card mb-3" style="max-width: 630px;">
    
        <div class="row g-0">
        
            <div class="col-md-3">
                <img src="${superhero.image.url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <p class="card-text" style="font-size:14px fw-bold">Nombre: ${superhero.name}</p>
                    <p class="card-text mb-0" style="font-size:13px">Conexiones: ${superhero.connections['group-affiliation']}</p>
                    <p class="card-text"></p>
                    <ul class="list-group list-group-flush fst-italic">
                        <li class="list-group-item"><small>Publicado por: ${superhero.biography.publisher}</small></li>
                        <li class="list-group-item"><small>Ocupación: ${superhero.work.occupation}</small></li>
                        <li class="list-group-item"><small>Primera aparición: ${superhero.biography['first-appearance']}</small></li>
                        <li class="list-group-item"><small>Altura: ${superhero.appearance.height[0]} - ${superhero.appearance.height[1]}</small></li>
                        <li class="list-group-item"><small>Peso: ${superhero.appearance.weight[0]} - ${superhero.appearance.weight[1]}</small></li>
                        <li class="list-group-item"><small>Alianzas: ${superhero.biography.aliases}</small></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`
    return card
}

function generarGrafico(superhero) {

    if (superhero.powerstats.combat == "null" || superhero.powerstats.durability == "null" || superhero.powerstats.intelligence == "null" || superhero.powerstats.power == "null" || superhero.powerstats.speed == "null" || superhero.powerstats.strength == "null") {

        return alert("No hay datos disponibles para el grafico")
    }

    let options = {
        title: {
            text: `Estadísticas de poder para ${superhero.name}`
        },
        legend: {
            maxWidth: 350,
            itemWidth: 120
        },
        data: [
            {
                type: "pie",
                showInLegend: true,
                legendText: "{indexLabel}",
                dataPoints: [
                    { y: `${superhero.powerstats.combat}`, indexLabel: `combat (${superhero.powerstats.combat})` },
                    { y: `${superhero.powerstats.durability}`, indexLabel: `durability (${superhero.powerstats.durability})` },
                    { y: `${superhero.powerstats.intelligence}`, indexLabel: `intelligence (${superhero.powerstats.intelligence})` },
                    { y: `${superhero.powerstats.power}`, indexLabel: `power (${superhero.powerstats.power})` },
                    { y: `${superhero.powerstats.speed}`, indexLabel: `speed (${superhero.powerstats.speed})` },
                    { y: `${superhero.powerstats.strength}`, indexLabel: `combat (${superhero.powerstats.strength})` },
                ]
            }
        ]
    };

    $("#grafico").CanvasJSChart(options)
}

function limpiar() {
    $("#cards").empty()
    $("#grafico").empty()
    $("#input_busqueda").focus()
    $("#input_busqueda").val("")
}
