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
                $("[entrada='"+entrada_temp+"']").addClass("on");
            } else {
                $("[entrada='"+entrada_temp+"']").removeClass("on");
            }
        })
        $("#cont_selector_tamanio .TBODY td").empty();
        $("#cont_selector_tamanio [entrada='"+entrada_hover+"']").html(fila_hover+"x"+columna_hover);
	});
    
    $("#cont_selector_tamanio .TBODY td").click(function() {
        var letra_tabla = $("#selector_tamanio").val();
        var entrada = $(this).attr("entrada");
        var fila_M = entrada.charAt(0); // attr("entrada") return string "{i}{j}";
        var columna_N = entrada.charAt(1);
        $("#cont_matriz_"+letra_tabla).html(generarMatrizHTMLVacia(letra_tabla, fila_M, columna_N));
	});
    
    $("#selector_tamanio").change(function(){
        $("#cont_selector_tamanio .TBODY td").removeClass("blocked").removeClass("on").empty();
    });
    
    $("#selector_operador").change(function(){
        if($(this).val() == "inv"){
            mostrarSelectInv();
        } else if($(this).val() == "*n"){
            $("#cont_matriz_B").empty();
            mostrarMultiplicacionN();
        }
        
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
        matriz_HTML =
            '<label>Matriz '+letra_matriz+' <sub>'+M+'x'+N+'</sub>'+'</label><br>\
            <form class="cont_matriz" id="matriz_'+letra_matriz+'">\
                <div class="DIV_6">\
                    <table class="TABLE">\
                        <tbody class="TBODY">';
                            for(i=0; i < M; i++){
                                matriz_HTML += '<tr>';
                                for(j=0; j < N; j++){
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
    
    get_data = function(){
        var matriz_A = [];
        
        $("#cont_matriz_A input").each(function(matriz_A){
            var entrada = $(this).attr("name");
            var i = entrada.charAt(0);
            var j = entrada.charAt(1);
            matriz_A[i][j] = $(this).val();            
        });
                                       
        alert(matriz_A);
        console.log(matriz_A);
    }
    
    //SE INICIAN LAS MATRICES CON TAMAÑO 5x5
    $("#cont_matriz_A").html(generarMatrizHTMLVacia("A", 5, 5));
    $("#cont_matriz_B").html(generarMatrizHTMLVacia("B", 5, 5));
    
	setTimeout(function(){
		$("header").removeClass("height-50")
		$("footer").removeClass("height-50")
		$(".ventana_principal").removeClass("opacity0")
		$("#background").removeClass("blur")
	},2000)
});
