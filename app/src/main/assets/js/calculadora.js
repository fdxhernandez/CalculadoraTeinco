$(function () {
    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();
    $('#calculate').click(function () {
        var notas = null;
        $('#totalacumulado').removeClass();
        notas = {
            asignatura: $('#asignatura').val(),
            aprobatoria: $('#nota_aprobatoria').val(),
            uno: $('#primer_corte').val(),
            dos: $('#segundo_corte').val(),
            tres: ""
        };
        if (notas.uno === "") {
            swal({
                title: "¡Importante!",
                text: "Recuerde que debe Debe digitar la nota del primer corte con valores entre 0 y 5",
                icon: "error",
                button: "Volver"
            });
        } else {
            var validate = validacion(notas);
            if (validate === true) {
                var result = calcular(notas);
                $('#nameasignatura').html(result.notas.asignatura);
                $('#final').html(parseFloat(result.notas.aprobatoria).toFixed(1));
                $('#corte1nota').html(parseFloat(result.notas.uno).toFixed(1));
                $('#corte2nota').html(parseFloat(result.notas.dos).toFixed(1));
                $('#corte3nota').html(parseFloat(result.notas.tres).toFixed(1));
                $('#corte1acumulado').html(result.acumulado1);
                $('#corte2acumulado').html(result.acumulado2);
                $('#corte3acumulado').html(result.acumulado3);
                $('#totalacumulado').html((parseFloat(result.acumulado3) + parseFloat(result.acumulado2) + parseFloat(result.acumulado1)).toFixed(1));
                if(parseFloat(result.notas.aprobatoria) > (parseFloat(result.acumulado3) + parseFloat(result.acumulado2) + parseFloat(result.acumulado1))){
                    $('#totalacumulado').addClass("red white-text");
                }
                $('.modal').modal('open');
            } else {
                swal({
                    title: "Error en la " + validate + "!",
                    text: "Recuerde que debe Debe digitar la " + validate + " con valores entre 0 y 5, verifique antes de calcular.",
                    icon: "error",
                    button: "Volver"
                });
            }
        }
    });

    function calcular(notas) {
        if (notas.aprobatoria === "") {
            notas.aprobatoria = 3;
        }
        if (notas.asignatura === "") {
            notas.asignatura = "Resultados";
        }
        var g1 = (notas.uno * 0.3).toFixed(1);
        if (notas.dos === "") {
            var nc = (notas.aprobatoria - g1);
            var g2 = (nc * 30 / 70).toFixed(1);
            var g3 = (nc * 40 / 70).toFixed(1);            
        } else {
            var g1 = (notas.uno * 0.3).toFixed(1);
            var g2 = (notas.dos * 0.3).toFixed(1);
            var nc = (notas.aprobatoria - g1 - g2);
            var g3 = (nc).toFixed(1);
        }
        if (g2 > 1.5) {
            g2 = 1.5;
        }
        if (g3 > 2) {
            g3 = 2;
        }
        notas.dos = (g2 / 0.3).toFixed(1);
        notas.tres = (g3 / 0.4).toFixed(1);
        var notasCalculadas = {
            notas: notas,
            acumulado1: g1,
            acumulado2: g2,
            acumulado3: g3
        };
        return notasCalculadas;
    }

    function validacion(notas) {
        if (notas.aprobatoria !== "") {
            if (notas.aprobatoria > 5 || notas.aprobatoria < 0) {
                return "nota aprobatoria";
            }
        }
        if (notas.dos !== "") {
            if (notas.dos > 5 || notas.dos < 0) {
                return "nota del segundo corte";
            }
        }
        if (notas.uno > 5 || notas.uno < 0) {
            return "nota del primer corte";
        }
        return true;
    }
});