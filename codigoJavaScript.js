////// VARIABLES GLOBALES ////
var get_data = function(){};

//////////////////////////////////////////////////
// Se captura el evento de click sobre los botones 
///////////////////////////////////////////////////
jQuery(document).ready(function($){	
	/* selector de tamaño de matriz*/
    $("#cont_selector_tamanio .TBODY td").hover(function() {
        var entrada_hover = $(this).attr("entrada");
        var fila_hover = entrada_hover.charAt(0); // attr("entrada") return string "{i}{j}";
        var columna_hover = entrada_hover.charAt(1);
        $("#cont_selector_tamanio .TBODY td").each(function(){
            var entrada_temp = $(this).attr("entrada");
            var fila_temp = entrada_temp.charAt(0);
            var columna_temp = entrada_temp.charAt(1);
            if (fila_temp <= fila_hover && columna_temp <= columna_hover){
                var $_entrada_temp = $("[entrada='"+entrada_temp+"']");
                if ($("[entrada='"+entrada_temp+"']").hasClass("blocked")){
                    $("[entrada='"+entrada_temp+"']").addClass("on2");
                } else {
                    $("[entrada='"+entrada_temp+"']").addClass("on");
                }
            } else {
                if ($("[entrada='"+entrada_temp+"']").hasClass("blocked")){
                    $("[entrada='"+entrada_temp+"']").removeClass("on2");
                } else {
                    $("[entrada='"+entrada_temp+"']").removeClass("on");
                }
            }
        });
	});
    
    $("#cont_selector_tamanio .TBODY td").click(function() {
        $("#cont_selector_tamanio .TBODY td").removeClass("blocked").removeClass("clicked").removeClass("on2");
        $(this).addClass("clicked").trigger('mouseenter');
        
        $("#cont_selector_tamanio .TBODY td").addClass("blocked");

        var letra_tabla = $("#selector_tamanio").val();
        var entrada = $(this).attr("entrada");
        var fila_M = entrada.charAt(0); // attr("entrada") return string "{i}{j}";
        var columna_N = entrada.charAt(1);
        $("#cont_matriz_"+letra_tabla).html(generarMatrizHTMLVacia(letra_tabla, fila_M, columna_N));
	});
    
    $("#selector_tamanio").change(function(){
        var letra_tabla = $(this).val();
        var cant_filas = $("#matriz_"+letra_tabla+" tr").length;
        var cant_columnas = $("#matriz_"+letra_tabla+" tr:first td").length;
        
        $("#cont_selector_tamanio [entrada='"+cant_filas+""+cant_columnas+"']").click(); //Simula el evento de click
    });
    
    $("#cont_selector_tamanio table").mouseout(function(){
        $("#cont_selector_tamanio .TBODY td").removeClass("on2");
    });
    
    
    $("#selector_operacion").data('lastValue', $("#selector_operacion").val() ).change(function(){
        var operacion = $(this).val();
        if(operacion == "inv"){
            mostrarSelectInv();
        } else if(operacion == "*n"){
            mostrarMultiplicacionN();
        } else if(operacion == "det"){
            $("#cont_matriz_B").empty();
        } else { //Operaciones basicas
            var operacion_anterior = $(this).data('lastValue');
            alert(operacion_anterior)
            if(operacion_anterior != "+" && operacion_anterior != "-" && operacion_anterior != "*"){
                $("#cont_matriz_B").html(generarMatrizHTMLVacia("B", 5, 5));
            }
        }
        $("#selector_operacion").data('lastValue', $("#selector_operacion").val() ); //Se guarda la operación anterior
    });
    
    function mostrarMultiplicacionN(){
        $("#cont_matriz_B").html('<label>Numero a multiplicar</label><br><br><input id="factor">');
    }
    
    function mostrarSelectInv(){
        $("#cont_matriz_B").html(
            '<label>Seleccione el método</label>\
                <br><br><br>\
                <select id="metodo">\
                    <option value="gauss">Gauss-Jordan</option>\
                    <option value="mc">Matriz de coofactores</option>\
                </select>');
    }
    
    function generarMatrizHTMLVacia(letra_matriz, M, N){
        var matriz_HTML =
            '<label>Matriz '+letra_matriz+' <sub>'+M+'x'+N+'</sub>'+'</label><br>\
            <form class="cont_matriz" id="matriz_'+letra_matriz+'">\
                <div class="DIV_6">\
                    <table class="TABLE">\
                        <tbody class="TBODY">';
                            for(var i=0; i < M; i++){
                                matriz_HTML += '<tr>';
                                for(var j=0; j < N; j++){
                                    matriz_HTML += '<td><input name="'+i+''+j+'"></td>';
                                }
                                matriz_HTML += '</tr>';
                            }
                            matriz_HTML +=
                        '</tbody>\
                    </table>\
                </div>\
            </form>';
        return matriz_HTML;
    }
    
    function generarMatrizHTML(matriz){
        var M = matriz.length;
        var N = matriz[0].length
        var matriz_HTML =
            '<div class="cont_matriz">\
                <div class="DIV_6">\
                    <table class="TABLE">\
                        <tbody class="TBODY">';
                            var cont_wow = 0;
                            for(var i=0; i < M; i++){
                                matriz_HTML += '<tr>';
                                for(var j=0; j < N; j++){
                                    matriz_HTML += '<td class="wow zoomIn" data-wow-delay="'+cont_wow+'s">'+matriz[i][j]+'</td>';
                                    cont_wow++;
                                }
                                matriz_HTML += '</tr>';
                            }
                            matriz_HTML +=
                        '</tbody>\
                    </table>\
                </div>\
            </div>';
        return matriz_HTML;
    }
    
    //Funcion llamada al dar click al botón de calcular
    get_data = function(){ 
        var matriz_A = getMatriz("A");
        var matriz_B = getMatriz("B");
        var operacion = $("#selector_operacion").val();
        var matriz_resultado = ["ERROR"]

        var la_operacion_es_valida = validarOperacionesMatrices(matriz_A, operacion, matriz_B);
        console.log("DEBUG #1 Matriz A");
        console.log(matriz_A);
        console.log("DEBUG #2 Matriz B");
        console.log(matriz_B);
        
        if(la_operacion_es_valida){
            matriz_resultado = operar(matriz_A, operacion, matriz_B);
        }
        $(".campo_grafico .owl-item.active").html(
            generarMatrizHTML(matriz_A)
            +"<span>"+operacion+"</span>"
            +generarMatrizHTML(matriz_B)
            +"<span>=</span>"
            +generarMatrizHTML(matriz_resultado)
        );

    };
    
    function operar(matriz_A, operacion, matriz_B){
        var matriz_resultado;
        switch(operacion){
            case "+" : matriz_resultado = sumaMatrices(matriz_A, matriz_B); break;
            case "-" : matriz_resultado = sumaMatrices(matriz_A, matriz_B, "resta"); break;
            case "*" : matriz_resultado = productoMatrices(matriz_A, matriz_B); break;
            case "*n" : matriz_resultado = productoN(matriz_A); break;
            case "inv" : matriz_resultado = operacionInversa(matriz_A); break;
            case "det" : matriz_resultado = operacionDeterminante(matriz_A); break;
        }
        return matriz_resultado;
    }
    
    function sumaMatrices(matriz_A, matriz_B, modo){
        var matriz_resultado = crearArrayBidimensionalVacio(matriz_A.length, matriz_A[0].length);
        for (var i = 0; i < matriz_A.length; i++){
            for (var j = 0; j < matriz_A[0].length; j++){
                if (modo == "resta"){
                    matriz_resultado[i][j] = (matriz_A[i][j]-matriz_B[i][j]);
                } else {
                    matriz_resultado[i][j] = (matriz_A[i][j]+matriz_B[i][j]);
                }
            }   
        }
        console.log("DEBUG #RESULTADO SUMA");
        console.log(matriz_resultado);
        return matriz_resultado;
    }
    
    // Funcion para crear un array vacio 
    function crearArrayBidimensionalVacio(cant_filas, cantiColumnas){ 
        var matriz = new Array(cant_filas);
        for (var i = 0; i < cant_filas; i++) {
          matriz[i] = new Array(cantiColumnas);
        }
        return matriz;
    }
    
    // Funcion para obtener los datos de las tablas HTML, y crear un array de JS
    function getMatriz(letra){ 
        var cant_filas = $("#cont_matriz_"+letra+" tr").length;
        var cant_columnas = $("#cont_matriz_"+letra+" tr:first td").length;
        var matriz = crearArrayBidimensionalVacio(cant_filas, cant_columnas);
        
        $("#cont_matriz_"+letra+" input").each(function(){
            var entrada = $(this).attr("name");
            var i = entrada.charAt(0);
            var j = entrada.charAt(1);
            matriz[i][j] = parseFloat($(this).val());
        });   
        return matriz;
    }
    
    function validarOperacionesMatrices(matriz_A, operacion, matriz_B){
        var la_operacion_es_valida = false;
        switch(operacion){
            case "+" : la_operacion_es_valida = validarSumaMatrices(matriz_A, matriz_B); break;
            case "-" : la_operacion_es_valida = validarSumaMatrices(matriz_A, matriz_B); break;
            case "*" : la_operacion_es_valida = validarProductoMatrices(matriz_A, matriz_B); break;
            case "*n" : la_operacion_es_valida = validarProductoN(matriz_A); break;
            case "inv" : la_operacion_es_valida = validarOperacionInversa(matriz_A); break;
            case "det" : la_operacion_es_valida = validarOperacionDeterminante(matriz_A); break;
        }
        return la_operacion_es_valida;
    }
    
    function validarSumaMatrices(matriz_A, matriz_B){
        var campos_A_validos = validarCamposMatriz("A", matriz_A);
        var campos_B_validos = validarCamposMatriz("B", matriz_B);
        
        var cumplen_tamanios_validos = matriz_A.length == matriz_B.length && matriz_A[0].length == matriz_B[0].length; //Se valida si son del mismo tamaño
        if(!cumplen_tamanios_validos){
            alert("ERROR: Las matrices deben ser del mismo tamaño para la operación seleccionada")
        }
        return cumplen_tamanios_validos && campos_A_validos && campos_B_validos;
    }
    
    function validarCamposMatriz(letra_matriz, matriz){
        console.log("DEBUG #3 letra: "+letra_matriz);
        console.log(matriz);
        
        $("#matriz_"+letra_matriz+" input").removeClass("vacia"); //Clase CSS para marcar el borde rojo a las casillas vacias
        
        var txt_entradas_invalidas = ""
        for (var i = 0; i < matriz.length; i++){
            for (var j = 0; j < matriz[0].length; j++){
                if (matriz[i][j] == ""){
                    txt_entradas_invalidas += " Entrada ("+(i+1)+", "+(j+1)+") \n";
                    $("#matriz_"+letra_matriz+" [name='"+i+""+j+"']").addClass("vacia");
                }
            }   
        }
        if (txt_entradas_invalidas != ""){
            alert("ERROR: la matriz "+letra_matriz+" debe ingresar valores en las siguientes entradas: \n"+txt_entradas_invalidas)
        }
        
        return txt_entradas_invalidas == "";
    }
    
    function validarProductoMatrices(matriz_A, matriz_B){
        var campos_A_validos = validarCamposMatriz("A", matriz_A);
        var campos_B_validos = validarCamposMatriz("B", matriz_B);
        
        var cumplen_tamanios_validos = matriz_A[0].length == matriz_B.length; //Se valida si las fils de A son del mismo tamaño
        if(!cumplen_tamanios_validos){
            alert("ERROR: Las columnas de la Matriz A deben coincidir con las filas de la Matriz B")
        }
        return cumplen_tamanios_validos && campos_A_validos && campos_B_validos;
    }
    
    function validarProductoN(matriz_A){
        var campos_A_validos = validarCamposMatriz("A", matriz_A);
        var factor_N_valido = $("#factor").val() != "";
        if (!factor_N_valido){
            alert("ERROR: Debe agregar un valor para operar con la matriz A")
        }
        return campos_A_validos && factor_N_valido;
    }
    
    function validarOperacionInversa(matriz_A){
        var campos_A_validos = validarCamposMatriz("A", matriz_A);

        var cumplen_tamanios_validos = matriz_A[0].length == matriz_A.length; //Se valida si las fila y columnas son del mismo tamaño
        if(!cumplen_tamanios_validos){
            alert("ERROR: La matriz A debe ser cuadrada para realizar esta operación")
        }
        return cumplen_tamanios_validos && campos_A_validos;
    }
    
    //SE INICIAN LAS MATRICES CON TAMAÑO 5x5
    $("#cont_matriz_A").html(generarMatrizHTMLVacia("A", 5, 5));
    $("#cont_matriz_B").html(generarMatrizHTMLVacia("B", 5, 5));
    
	setTimeout(function(){
		$("header").removeClass("height-50");
		$("footer").removeClass("height-50");
		$(".ventana_principal").removeClass("opacity0");
		$("#background").removeClass("blur");
	},2000)
	
	$('.owl-carousel').owlCarousel({
        // animateOut: 'slideOutDown',
        // animateIn: 'flipInX',
        items:1,
        stagePadding:30,
        smartSpeed:450,
        loop:true,
        margin:30,
        nav:true,
        navText: ["<", ">"],
    });
    
    //RENDER DE LAS ANIMACIONES WOW
    new WOW().init();

});
