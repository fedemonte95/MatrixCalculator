////// VARIABLES GLOBALES ////
var get_data = function(){};
var setIntervalX = function(){};

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
            if(operacion_anterior != "+" && operacion_anterior != "-" && operacion_anterior != "*"){
                $("#cont_matriz_B").html(generarMatrizHTMLVacia("B", 5, 5));
            }
        }
        
        $("#selector_operacion").data('lastValue', $("#selector_operacion").val() ); //Se guarda la operación anterior
    });
    
    function mostrarMultiplicacionN(){
        $("#cont_matriz_B").html('<label>Numero a multiplicar</label><br><br><input type="number" id="factor">');
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
                                    matriz_HTML += '<td><span class="'+($("#con_procedimiento:checked").length == 1 ? 'wow' : '')+' zoomIn" data-wow-delay="'+cont_wow+'s">'+matriz[i][j]+'</span></td>';
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
    
    function generarMatrizHTMLProducto(matriz_A, matriz_B){
     
        var matriz_HTML =
            '<div class="cont_matriz">\
                <div class="DIV_6">\
                    <table class="TABLE">\
                        <tbody class="TBODY">';
                            var cont_wow = 0;
                            for(var i=0; i < matriz_A.length; i++){
                                matriz_HTML += '<tr class="'+($("#con_procedimiento:checked").length == 1 ? 'wow' : '')+' zoomIn" data-wow-delay="'+((cont_wow++)*matriz_B[0].length)+'s" data-wow-iteration="'+matriz_B[0].length+'">';
                                for(var j=0; j < matriz_A[0].length; j++){
                                    matriz_HTML += '<td><span>'+matriz_A[i][j]+'</span></td>';
                                }
                                matriz_HTML += '</tr>';
                            }
                            matriz_HTML +=
                        '</tbody>\
                    </table>\
                </div>\
            </div>\
            <span>*</span>\
            <div class="cont_matriz" id="cont_result_B">\
                <div class="DIV_6">\
                    <table class="TABLE">\
                        <tbody class="TBODY">';
                            var cont_wow_B = 0;
                            for(var i=0; i < matriz_B.length; i++){
                                matriz_HTML += '<tr>';
                                for(var j=0; j < matriz_B[0].length; j++){
                                    matriz_HTML += '<td class="'+($("#con_procedimiento:checked").length == 1 ? 'wow' : '')+' zoomIn" data-wow-delay="'+j+'s"><span>'+matriz_B[i][j]+'</span></td>';
                                }
                                matriz_HTML += '</tr>';
                            }
                            matriz_HTML +=
                        '</tbody>\
                    </table>\
                </div>\
            </div>\
            <script>\
                setIntervalX(\
                    function(){jQuery("#cont_result_B").html(jQuery("#cont_result_B").html())}\
                    , '+(1000*matriz_B[0].length)+'\
                    , '+(matriz_B[0].length-1)+')\
            </script>';
            
        return matriz_HTML;
    }
    
    //Funcion llamada al dar click al botón de calcular
    get_data = function(){ 
        var matriz_A = getMatriz("A");
        var matriz_B = getMatriz("B");
        var operacion = $("#selector_operacion").val();
        var resultado_operacion = ["ERROR"]

        var la_operacion_es_valida = validarOperacionesMatrices(matriz_A, operacion, matriz_B);
        console.log("DEBUG #1 Matriz A");
        console.log(matriz_A);
        console.log("DEBUG #2 Matriz B");
        console.log(matriz_B);
        
        if(la_operacion_es_valida){
            resultado_operacion = operar(matriz_A, operacion, matriz_B);
        }
        
        renderizarResultado(matriz_A, operacion, matriz_B, resultado_operacion);
        

    };
    
    function renderizarResultado(matriz_A, operacion, matriz_B, resultado_operacion){
        switch(operacion){
            case "+" : renderizarSumaMatrices(matriz_A, operacion, matriz_B, resultado_operacion); break;
            case "-" : renderizarSumaMatrices(matriz_A, operacion, matriz_B, resultado_operacion); break;
            case "*" : renderizarProductoMatrices(matriz_A, operacion, matriz_B, resultado_operacion); break;
            case "*n" : renderizarProductoN(matriz_A, operacion, parseFloat($("#factor").val()), resultado_operacion); break;
            case "inv" : renderizarOperacionInversa(matriz_A, operacion, resultado_operacion); break;
            case "det" : renderizarOperacionDeterminante(matriz_A, operacion, resultado_operacion); break;
        }
    }

    function renderizarSumaMatrices(matriz_A, operacion, matriz_B, resultado_operacion){
        $(".campo_grafico .owl-item.active").html(
            generarMatrizHTML(matriz_A)
            +"<span>"+operacion+"</span>"
            +generarMatrizHTML(matriz_B)
            +"<span>=</span>"
            +generarMatrizHTML(resultado_operacion.resultado)
            +"<div class='pasos'>"+resultado_operacion.pasos+"</div>"
        );
    }
    
    function renderizarProductoN(matriz_A, operacion, factor, resultado_operacion){
        $(".campo_grafico .owl-item.active").html(
            generarMatrizHTML(matriz_A)
            + "<span>*</span>"
            + "<span style='margin: 0 auto;'>"+factor+"</span>"
            + "<span>=</span>"
            + generarMatrizHTML(resultado_operacion.resultado)
            + "<div class='pasos'>"+resultado_operacion.pasos+"</div>"
        );
    }
    
    function renderizarProductoMatrices(matriz_A, operacion, matriz_B, resultado_operacion){
        $(".campo_grafico .owl-item.active").html(
            generarMatrizHTMLProducto(matriz_A, matriz_B)
            + "<span>=</span>"
            + generarMatrizHTML(resultado_operacion.resultado)
            + "<div class='pasos'>"+resultado_operacion.pasos+"</div>"
        );
    }
    
     function renderizarOperacionInversa(matriz_A, operacion, resultado_operacion){
        $(".campo_grafico .owl-item.active").html(
            "<span>inv(</span>"
            + generarMatrizHTML(matriz_A)
            + "<span>)</span>"
            + "<span style='margin: 0 auto;'>=</span>"
            + generarMatrizHTML(resultado_operacion.resultado)
            + "<div class='pasos'>"+resultado_operacion.pasos+"</div>"
        );
    }
    
    function renderizarOperacionDeterminante(matriz_A, operacion, resultado_operacion){
        $(".campo_grafico .owl-item.active").html(
            "<span>det(</span>"
            + generarMatrizHTML(matriz_A)
            + "<span>)</span>"
            + "<span style='margin: 0 auto;'>=</span>"
            + "<span>"+resultado_operacion.resultado+"</span>"
            + "<div class='pasos'>"+resultado_operacion.pasos+"</div>"
        );
    }
    
    function operar(matriz_A, operacion, matriz_B){
        var resultado_operacion;
        switch(operacion){
            case "+" : resultado_operacion = sumaMatrices(matriz_A, matriz_B); break;
            case "-" : resultado_operacion = sumaMatrices(matriz_A, matriz_B, "resta"); break;
            case "*" : resultado_operacion = productoMatrices(matriz_A, matriz_B); break;
            case "*n" : resultado_operacion = productoN(matriz_A, parseFloat($("#factor").val())); break;
            case "inv" : resultado_operacion = operacionInversa(matriz_A); break;
            case "det" : resultado_operacion = operacionDeterminante(matriz_A); break;
        }
        console.log("OPERAR");
        console.log(resultado_operacion);
        return resultado_operacion;
    }
    
    function sumaMatrices(matriz_A, matriz_B, modo){
        var resultado_operacion = crearArrayBidimensionalVacio(matriz_A.length, matriz_A[0].length);
        var pasos = Array(matriz_A.length * matriz_A[0].length);
        var cont_pasos = 0;
        for (var i = 0; i < matriz_A.length; i++){
            for (var j = 0; j < matriz_A[0].length; j++){
                resultado_operacion[i][j] = matriz_A[i][j] + (modo == "resta" ? -matriz_B[i][j] : matriz_B[i][j]);
                pasos += 
                    '<div class="'+($("#con_procedimiento:checked").length == 1 ? 'wow' : '')+' zoomIn" data-wow-delay="'+cont_pasos+'s">'
                        + matriz_A[i][j]
                        + (modo == "resta" ? " - " : " + ")
                        + matriz_B[i][j]
                        + " = "
                        + resultado_operacion[i][j]
                    +'</div>';
                cont_pasos++;
            }   
        }
        console.log("DEBUG #RESULTADO SUMA");
        console.log(resultado_operacion);
        console.log("DEBUG #RESULTADO SUMA pasos");
        console.log(pasos);
        return {resultado: resultado_operacion, pasos: pasos};
    }
    
    function productoMatrices(matriz_A, matriz_B){
        console.log("DEBUG #RESULTADO productoMatrices matriz_A");
        console.log(matriz_A);
        console.log("DEBUG #RESULTADO productoMatrices matriz_B");
        console.log(matriz_B);
        var resultado_operacion = crearArrayBidimensionalVacio(matriz_A.length, matriz_B[0].length); //Se crea una matriz del tamaño de las columnas de A y filas de B
        var pasos = "";
        var cont_pasos = 0;
        for (var i = 0; i < matriz_A.length; i++){
            for (var j = 0; j < matriz_B[0].length; j++){
                var resultado_temp = 0;
                
                pasos += 
                    '<div class="'+($("#con_procedimiento:checked").length == 1 ? 'wow ' : '')+'zoomIn" data-wow-delay="'+(cont_pasos++)+'s">';
                    
                for (var k = 0; k < matriz_B.length; k++){
                    resultado_temp += matriz_A[i][k] * matriz_B[k][j];
                    // console.log("DEBUG #RESULTADOs matriz_A[i][k]");
                    // console.log(matriz_A[i][k]);
                    // console.log("DEBUG #RESULTADOs matriz_B[k][j]");
                    // console.log(matriz_B[k][j]);
                    // // resultado_operacion[i][j] += matriz_A[i][k] * matriz_B[k][j];
                    // console.log("DEBUG #RESULTADOs resultado_operacion");
                    // console.log(resultado_operacion);
                    pasos += 
                        matriz_A[i][k]
                        + " * "
                        + matriz_B[k][j]
                        + (k+1 < matriz_B.length ? " + " : "" );
                        
                }  
                resultado_operacion[i][j] = resultado_temp;
                
                pasos += 
                        " = "
                        + resultado_operacion[i][j]
                    +'</div>';
            }   
        }
        console.log("DEBUG #RESULTADO producto");
        console.log(resultado_operacion);
        return {resultado: resultado_operacion, pasos: pasos};
    }
    
    function productoN(matriz_A, factor){
        console.log("DEBUG #RESULTADO producto, factor:");
        console.log(factor);
        
        var resultado_operacion = crearArrayBidimensionalVacio(matriz_A.length, matriz_A[0].length); //Se crea una matriz del tamaño de las columnas de A y filas de B
        var pasos = "";
        var cont_pasos = 0;
        for (var i = 0; i < matriz_A.length; i++){
            for (var j = 0; j < matriz_A[0].length; j++){
                resultado_operacion[i][j] =  matriz_A[i][j] * factor;
                pasos += 
                    '<div class="'+($("#con_procedimiento:checked").length == 1 ? 'wow' : '')+' zoomIn" data-wow-delay="'+(cont_pasos++)+'s">'
                        + matriz_A[i][j]
                        + " * "
                        + factor
                        + " = "
                        + resultado_operacion[i][j]
                    +'</div>';
            }   
        }
        console.log("DEBUG #RESULTADO producto n");
        console.log(resultado_operacion);
        return {resultado: resultado_operacion, pasos: pasos};
    }
    
    function operacionInversa(X){
        var rows = X.length;
        var cols = X[0].length;
        var identity = crearMatrizIdentidad(rows, cols);
        
        console.log("DEBUG F: operacionInversa identity");
        console.log(identity);
        //Get the identity matrix and append it to the right of X
        for(var i = 0; i < rows; i++){
            X[i] = X[i].concat(identity[i])
        }
        console.log("DEBUG F: operacionInversa Matriz + identidad");
        console.log(X);
        
        var i = 0
        for (var j = 0; j < cols; j++){
            var zero_checker = check_for_all_zeros(X,i,j);
            var zero_sum = zero_checker.zero_sum;
            var first_non_zero = zero_checker.first_non_zero;
            
            //If everything is zero, increment the columns
            if (zero_sum==0){
                if (j==cols){
                    return X
                }
                alert("Matrix is singular.")
            }
            
            //If X[i][j] is 0, and there is a nonzero value below it, swap the two rows
            if (first_non_zero != i){
                X = swap_row(X,i,first_non_zero)
            }
            //Divide X[i] by X[i][j] to make X[i][j] equal 1
            for (var j_temp = 0; j_temp < X[i].length; j_temp++){
                X[i][j_temp] = (X[i][j_temp] / X[i][j]);
            }
            
            //Rescale all other rows to make their values 0 below X[i][j]
            for (var q = 0; q < rows; q++){
                if (q!=i){
                    // scaled_row = [X[q][j] * m for m in X[i]]
                    var scaled_row = [];
                    for (var j_temp = 0; j_temp < X[i].length; j_temp++){
                        scaled_row.push(X[q][j] * j_temp);
                    }
                    
                    // X[q]= [X[q][m] - scaled_row[m] for m in range(0,len(scaled_row))]
                    for (var m = 0; m < scaled_row.length; m++){
                        X[q][m] -= scaled_row[m];
                    }
                }
            }
            //If either of these is true, we have iterated through the matrix, and are done
            if (i==rows || j==cols){
                break
            }
            i+=1
        }
        
        var matriz_inversa=[];
        //Get just the right hand matrix, which is now our inverse
        for (var i; i < rows; i++){
            // X[i] = X[i][cols:len(X[i])]
            matriz_inversa.push(X.slice(cols, X.length));
        }
        console.log("DEBUG F: operacionInversa Matriz operada");
        console.log(X);
        console.log("DEBUG F: operacionInversa resultado_operacion");
        console.log(matriz_inversa);
        return {resultado: X, pasos: "<div>No se han definido los pasos</div>"};
   
    }
    
    function check_for_all_zeros(X,i,j){
        /*
        Check matrix X to see if only zeros exist at or below row i in column j
        X - a list of lists
        i - row index
        j - column index
        returns -
            zero_sum - the count of non zero entries
            first_non_zero - index of the first non value
        */
        var non_zeros = []
        var first_non_zero = -1
        for (var m = i; m < X.length; m++){
            non_zero = X[m][j] != 0;
            non_zeros.push(non_zero)
            if (first_non_zero == -1 && non_zero){
                first_non_zero = m;
            }
        }
        
        var zero_sum = 0;
        for (var non_zero in non_zeros){
            zero_sum = zero_sum + non_zero;
        }
        return {zero_sum: zero_sum, first_non_zero: first_non_zero};
    }
    
    function operacionDeterminante(matriz){
        return auxOperacionDeterminante({resultado: matriz, pasos: ""});
    }

    function auxOperacionDeterminante(resultado_operacion){
        var X = resultado_operacion.resultado
        var pasos = "" + resultado_operacion.pasos;
        var term_list = 0;
        var cols = X.length;
        //If more than 2 rows, reduce and solve in a piecewise fashion
        if (cols > 2){
            for (var j = 0; j < X[0].length; j++){
                //Remove i and j columns
                var new_x = X
                new_x = new_x.splice(0, 1);
                new_x = borrar_columna(new_x, j);
                console.log(new_x);
                //Find the multiplier
                var multiplier = X[0][j] * Math.pow(-1,(2+j))
                //Recurse to find the determinant
                var det = auxOperacionDeterminante({resultado:new_x, pasos:pasos})
                term_list += (multiplier*det)
                return {resultado:term_list, pasos:pasos};
            }
        }
        else if (cols == 2){
            var result = X[0][0]*X[1][1] - X[0][1]*X[1][0];
            pasos += '<div class="'+($("#con_procedimiento:checked").length == 1 ? 'wow ' : '')+'zoomIn" >' + X[0][0] + " * " +X[1][1] +" - " + X[0][1] +
                  " * " + X[1][0] + " = " + result + "</div>"
            return {resultado:result, pasos:pasos};
            
        } else {
            return {resultado:X[0], pasos:pasos};
        }
    }
    
    function borrar_columna(X, j){
        for(var i = 0; i < X.length; i++){
            X[i] = X[i].splice(j, 1);
        }
        return X
    }
    
    // Funcion para crear un array vacio 
    function crearArrayBidimensionalVacio(cant_filas, cant_columnas){ 
        var matriz = new Array(cant_filas);
        for (var i = 0; i < cant_filas; i++) {
          matriz[i] = new Array(cant_columnas);
        }
        return matriz;
    }
    
    function crearMatrizIdentidad(cant_filas, cant_columnas){ 
        var matriz = new Array(cant_filas); 
        for (var i = 0; i < cant_filas; i++) {
          matriz[i] = new Array(cant_columnas); //Se crean las columnas con 0s
        }
        
        for(var i = 0; i < matriz.length; i++){
            for(var j = 0; j < matriz[0].length; j++){
                if (i == j){
                    matriz[i][j] = 1;
                }
                else{
                    matriz[i][j] = 0;
                }
            }
        }
        return matriz;
    }
    
    // Funcion para obtener los datos de las tablas HTML, y crear un array de JS
    function getMatriz(letra){ 
        var matriz = [];
        if($("#cont_matriz_"+letra+" table").length > 0 ){
        var cant_filas = $("#cont_matriz_"+letra+" tr").length;
        var cant_columnas = $("#cont_matriz_"+letra+" tr:first td").length;
        matriz = crearArrayBidimensionalVacio(cant_filas, cant_columnas);
        
        $("#cont_matriz_"+letra+" input").each(function(){
            var entrada = $(this).attr("name");
            var i = entrada.charAt(0);
            var j = entrada.charAt(1);
            matriz[i][j] = parseFloat($(this).val());
        });  
        }
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
                if ( isNaN(matriz[i][j]) ){
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
    
    function validarOperacionDeterminante(matriz_A){
        return validarCamposMatriz("A", matriz_A);
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

    //Code: https://github.com/daneden/animate.css
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
    
    setIntervalX = function (callback, delay, repetitions) {
        var x = 0;
        var intervalID = window.setInterval(function () {
    
           callback();
    
           if (++x === repetitions) {
               window.clearInterval(intervalID);
               $("#cont_result_B .animated").removeClass("animated")
           }
        }, delay);
    }
});
