// Instanciamos el objeto principal
var oManagerCorporation = new ManagerCorporation();
/*--------------------------------------------------------CARGA DE DATOS XML*/
   function cargarDocumentoXML(nombreArchivo)
    {
        if (window.XMLHttpRequest)
        {
            xhttp=new XMLHttpRequest();
        }
        else // code for IE5 and IE6
        {
            xhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET",nombreArchivo,false);

        xhttp.send();

        return xhttp.responseXML;
    }

    var oXML = cargarDocumentoXML("datos de prueba.xml");
	
	var arrayDirectores= oXML.getElementsByTagName("director");
	var arrayRepresentantes= oXML.getElementsByTagName("representante");
	var arrayActores= oXML.getElementsByTagName("actor");
	var arrayPeliculas= oXML.getElementsByTagName("pelicula");
	var arraySeries= oXML.getElementsByTagName("serie");
	var arrayObras= oXML.getElementsByTagName("obra");
	var arrayCastings =  oXML.getElementsByTagName("casting");
	
	   for(var j = 0; j<arrayDirectores.length; j++)
    {
		var dni = arrayDirectores[j].getElementsByTagName("dni")[0].textContent;
		var nombre = arrayDirectores[j].getElementsByTagName("nombre")[0].textContent;
		var telefono = arrayDirectores[j].getElementsByTagName("telefono")[0].textContent;
		var nacionalidad = arrayDirectores[j].getElementsByTagName("nacionalidad")[0].textContent;
		
		var oDirector = new Director (dni,nombre,telefono,nacionalidad);
		oManagerCorporation.altaTrabajador(oDirector);
	}
	
	   for(var j = 0; j<arrayRepresentantes.length; j++)
    {
		var dni = arrayRepresentantes[j].getElementsByTagName("dni")[0].textContent;
		var nombre = arrayRepresentantes[j].getElementsByTagName("nombre")[0].textContent;
		var telefono = arrayRepresentantes[j].getElementsByTagName("telefono")[0].textContent;
		var nacionalidad = arrayRepresentantes[j].getElementsByTagName("nacionalidad")[0].textContent;
		
		var oRepresentante = new Representante (dni,nombre,telefono,nacionalidad);
		oManagerCorporation.altaTrabajador(oRepresentante);
	}

		for(var j = 0; j<arrayActores.length; j++)
    {
		var dni = arrayActores[j].getElementsByTagName("dni")[0].textContent;
		var nombre = arrayActores[j].getElementsByTagName("nombre")[0].textContent;
		var telefono = arrayActores[j].getElementsByTagName("telefono")[0].textContent;
		var nacionalidad = arrayActores[j].getElementsByTagName("nacionalidad")[0].textContent;
		var estatus = arrayActores[j].getElementsByTagName("estatus")[0].textContent;
		var representante = oManagerCorporation.getTrabajadorPorDniYTipo(arrayActores[j].getElementsByTagName("rep")[0].textContent,"Representante");
		var oActor = new Actor (dni,nombre,telefono,nacionalidad,estatus,representante);
		oManagerCorporation.altaTrabajador(oActor);
		oManagerCorporation.asociarActorARepesentante(arrayActores[j].getElementsByTagName("rep")[0].textContent, oActor);
	}
	for(var j = 0; j<arrayPeliculas.length; j++)
    {
		var nombre = arrayPeliculas[j].getElementsByTagName("nombre")[0].textContent;
		var director = oManagerCorporation.getTrabajadorPorDniYTipo(arrayPeliculas[j].getElementsByTagName("dir")[0].textContent, "Director");
		var fecha = arrayPeliculas[j].getElementsByTagName("fecha")[0].textContent;
		
		var oPelicula = new Pelicula (nombre,director,fecha);
		oManagerCorporation.altaProduccion(oPelicula);
		oManagerCorporation.asociarProduccionADirector(arrayPeliculas[j].getElementsByTagName("dir")[0].textContent, oPelicula);
	}

	for(var j = 0; j<arraySeries.length; j++)
    {
		var nombre = arraySeries[j].getElementsByTagName("nombre")[0].textContent;
		var director = oManagerCorporation.getTrabajadorPorDniYTipo(arraySeries[j].getElementsByTagName("dir")[0].textContent, "Director");
		var numCaps = arraySeries[j].getElementsByTagName("numCaps")[0].textContent;
		
		var oSerie = new Serie (nombre,director,numCaps);
		oManagerCorporation.altaProduccion(oSerie);
		oManagerCorporation.asociarProduccionADirector(arraySeries[j].getElementsByTagName("dir")[0].textContent, oSerie);
	}

	for(var j = 0; j<arrayObras.length; j++)
    {
		var nombre = arrayObras[j].getElementsByTagName("nombre")[0].textContent;
		var director = oManagerCorporation.getTrabajadorPorDniYTipo(arrayObras[j].getElementsByTagName("dir")[0].textContent, "Director");
		var genero = arrayObras[j].getElementsByTagName("genero")[0].textContent;
		
		var oObra = new Obra (nombre,director,genero);
		oManagerCorporation.altaProduccion(oObra);
		oManagerCorporation.asociarProduccionADirector(arrayObras[j].getElementsByTagName("dir")[0].textContent, oObra);
	}

	for(var j = 0; j<arrayCastings.length; j++)
    {
    	var fechaIni = arrayCastings[j].getElementsByTagName("fechaIni")[0].textContent;
    	var fechaFin = arrayCastings[j].getElementsByTagName("fechaFin")[0].textContent;
		var nombre = arrayCastings[j].getElementsByTagName("nombre")[0].textContent;
		var nombreP = arrayCastings[j].getElementsByTagName("nombreP")[0].textContent;
		var tipoP = arrayCastings[j].getElementsByTagName("tipoP")[0].textContent 
		var produccion = oManagerCorporation.getProduccionPorNombeYTipo(nombreP,tipoP);
		var oCasting = new Casting (fechaIni,fechaFin,nombre,produccion);
		oManagerCorporation.altaCasting(oCasting);
		oManagerCorporation.asociarCastingAProduccion(nombreP,tipoP,oCasting);
	}

/*-------------------------------------------------FIN DE CARGA DE DATOS XML*/

/*------------------------------------------------------------------LISTADOS*/
var tipoListado="";

function listarTodo(){
	tipoListado="todo";
	window.open("listados.html");
}


function listadoActores(){
	tipoListado="Actor";
	window.open("listados.html");
}
function listadoRepresentantes(){
	tipoListado="Representante";
	window.open("listados.html");
}
function listadoDirectores(){
	tipoListado="Director";
	window.open("listados.html");
}

function listadoProducciones(){
	tipoListado="producciones";
	window.open("listados.html");
}

function listadoProduccionesTipo(boton){
		tipoListado=boton.getAttribute("value");
	window.open("listados.html");
}

function listadoContratos(boton){
		tipoListado="contratos";
	window.open("listados.html");
}

var genero = "";
function listadoObrasPorGenero(){

		tipoListado="obrasPorGenero";
		genero = frmListarObrasGenero.tipoObraListado.value;
	window.open("listados.html");
}

var minCaps = "";
var maxCaps = "";
function listadoSeriesNumCap(){
	var validacion = validarNumCaps();
	if (validacion=="") {

		tipoListado="seriesNumCap";
		minCaps = parseInt(frmListarSeriesNumCap.minCaps.value);
		maxCaps = parseInt(frmListarSeriesNumCap.maxCaps.value);
	window.open("listados.html");
	}
	else
	{
		toastr.warning(validacion);
	}

}

var fechaMin = "";
var fechaMax = "";
function listadoPeliculasPorFecha(){
	var validacion = validarFechasListado();
	if (validacion=="") {

		tipoListado="peliculasPorFecha";
		fechaMin = frmListarPeliculasPorFecha.fechaMin.value;
		fechaMax = frmListarPeliculasPorFecha.fechaMax.value;
	window.open("listados.html");
	}
	else
	{
		toastr.warning(validacion);
	}

}




/*------------------------------------------------------------------FIN LISTADOS*/
/*-----------------------------------------------------------------------BOTONES*/

var botonListarPeliculas = document.getElementById("listarProduccionesTipoPeliculas");
botonListarPeliculas.addEventListener("click", function(){ listadoProduccionesTipo(botonListarPeliculas);},false);

var botonListarObras = document.getElementById("listarProduccionesTipoObras");
botonListarObras.addEventListener("click", function(){ listadoProduccionesTipo(botonListarObras);},false);

var botonListarSeries = document.getElementById("listarProduccionesTipoSeries");
botonListarSeries.addEventListener("click", function(){ listadoProduccionesTipo(botonListarSeries);},false);

var botonListarTodo = document.getElementById("listarTodo");
botonListarTodo.addEventListener("click",listarTodo,false);

var botonListarActores = document.getElementById("listadoActores");
botonListarActores.addEventListener("click",listadoActores,false);


var botonListarRepresentantes = document.getElementById("listadoRepresentantes");
botonListarRepresentantes.addEventListener("click",listadoRepresentantes,false);

var botonBajaTrabajador = document.getElementById("btnAceptarBajaTrabajador");
botonBajaTrabajador.addEventListener("click",darDeBajaTrabajador,false);


var botonListarDirectores = document.getElementById("listadoDirectores");
botonListarDirectores.addEventListener("click",listadoDirectores,false);


var botonListarProducciones = document.getElementById("btnListarProducciones");
botonListarProducciones.addEventListener("click",listadoProducciones,false);

var botonListarContratos = document.getElementById("listaContratos");
botonListarContratos.addEventListener("click",listadoContratos,false);


frmAltaTrabajador.altaTrabajador.addEventListener("click",altaTrabajador,false);
frmAltaProduccion.altaProduccion.addEventListener("click",altaProduccion,false);
frmAltaContrato.aceptarContrato.addEventListener("click",altaContrato,false);
frmAltaCasting.altaCasting.addEventListener("click",altaCasting,false);
frmAñadirActorACasting.aceptarAñadirActorACasting.addEventListener("click",altaAñadirActorACasting,false);

frmListarObrasGenero.btnListarObrasGenero.addEventListener("click",listadoObrasPorGenero,false);
frmListarSeriesNumCap.btnListarSeriesNumCap.addEventListener("click",listadoSeriesNumCap,false);
frmListarPeliculasPorFecha.btnListarPeliculasPorFecha.addEventListener("click",listadoPeliculasPorFecha,false);

//////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('listarObrasPorGenero').addEventListener("click",muestraFormListarObrasGenero,false);
document.getElementById('listarSeriesNumCap').addEventListener("click",muestraFormListarSeriesNumCap,false);
document.getElementById('listarPeliculasEntreFechas').addEventListener("click",muestraFormListarPeliculasEntreFechas,false);
document.getElementById('añadeTrabajador').addEventListener("click",muestraFormTrabajador,false);
document.getElementById('darBajaTrabajador').addEventListener("click",muestraFormDarBajaTrabajador,false);
document.getElementById('añadeProduccion').addEventListener("click",muestraFormProduccion,false);
document.getElementById('botonInicio').addEventListener("click",muestraUML,false);
document.getElementById('realizaContrato').addEventListener("click",muestraFormContrato,false);
document.getElementById('bajaContrato').addEventListener("click",muestraFormBajaContrato,false);
document.getElementById('añadeCasting').addEventListener("click",muestraFormCasting,false);
document.getElementById('añadeActorACasting').addEventListener("click",muestraFormAñadeActorACasting,false);


var btnAceptarBajaContratos = document.getElementById("aceptarBajaContrato");
btnAceptarBajaContratos.addEventListener("click",darDeBajaUnContrato,false);


/*-------------------------------------------------------------------FIN BOTONES*/




/*---------------------------------------------------MANIPULACION DE FORMULARIOS*/

function darDeBajaUnContrato(){
		var oForm = document.frmDarBajaContrato;
		var idContrato = oForm.idBajaContrato.value;
		var f = new Date();
		oManagerCorporation.contratos[idContrato].fechaFin = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
		oManagerCorporation.contratosDadosDeBaja.push(oManagerCorporation.contratos[idContrato]);
		toastr.success("Contrato dado de baja correctamente");
		oForm.reset();
		muestraFormBajaContrato();
}


function altaAñadirActorACasting(){
	var oForm = document.frmAñadirActorACasting;
	var nombreProduccion = oForm.castingSeleccionadoParaAñadirActor.selectedOptions[0].getAttribute("produccion");
	var tipoProduccion = oForm.castingSeleccionadoParaAñadirActor.selectedOptions[0].getAttribute("tipoproduccion");
	var nombreCasting = oForm.castingSeleccionadoParaAñadirActor.value;
	var oCasting = oManagerCorporation.buscarCasting(nombreProduccion,tipoProduccion,nombreCasting);
	var dniActor = oForm.actorAAñadirACasting.value;
	var oActor = oManagerCorporation.getTrabajadorPorDniYTipo(dniActor,"Actor");
	
	if(nombreCasting!="Noexistencastings"){
	if(!oManagerCorporation.buscarActorEnCasting(dniActor, oCasting)){
		var produccion = oManagerCorporation.getProduccionPorNombeYTipo(nombreProduccion,tipoProduccion);
		var bEnc = false;
		for(var i=0;i<produccion.listaCasting.length;i++){
			for(var j=0; j<produccion.listaCasting[i].listaActores.length;j++){
				if(produccion.listaCasting[i].listaActores[j].dni==dniActor)
					bEnc = true;
			}
		}
		if(!bEnc){
		oCasting.listaActores.push(oActor);
		toastr.success("Actor añadido correctamente al casting: "+oCasting.nombre);
		oForm.actorAAñadirACasting.className = "form-control";
		}else{
			toastr.error("El trabajador ya pertenece a un casting de esta producción.");
			 oForm.actorAAñadirACasting.className = "form-control error";
		}
	}else{
		toastr.error("El trabajador ya se ha presentado a este casting.");
		oForm.actorAAñadirACasting.className = "form-control error";
	}
	}else{
		oForm.castingSeleccionadoParaAñadirActor.className = "form-control error";
		toastr.error("Debe de crear al menos un casting para poder añadir el actor.");
	}
}


function muestraFormAñadeActorACasting(){
	ocultaForms();
	var divComboCasting = document.getElementById("comboCasting");
	divComboCasting.removeChild(divComboCasting.lastChild);
	var select = oManagerCorporation.cargarComboCastings();
	select.id = "castingSeleccionadoParaAñadirActor";
	select.name = "castingSeleccionadoParaAñadirActor";
	divComboCasting.appendChild(select);

	var divComboActores = document.getElementById("comboActorAñadirACasting");
	divComboActores.removeChild(divComboActores.lastChild);
	var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Actor");
	select.id = "actorAAñadirACasting";
	select.name = "actorAAñadirACasting";
	divComboActores.appendChild(select);
	
		document.getElementById('añadirActorACasting').style.display = "block";
			document.getElementById("footer").style.position = "absolute";
	
}
function muestraFormBajaContrato(){
	ocultaForms();
	var divComboBajaContratos = document.getElementById("comboBajaContratos");
	divComboBajaContratos.removeChild(divComboBajaContratos.lastChild);
	var comboContratos = oManagerCorporation.crearComboContratos();
	comboContratos.id = "comboBajaContrato";
	comboContratos.name = "comboBajaContrato";
	comboContratos.className = "form-control";
	
	divComboBajaContratos.appendChild(comboContratos);
	
	comboContratos.addEventListener("change",rellenarCamposBajaContrato,false);
	rellenarCamposBajaContrato();
	document.getElementById('darBajaContrato').style.display = "block";
	document.getElementById("footer").style.position = "relative";
	
}

function rellenarCamposBajaContrato(){
	var oForm = document.frmDarBajaContrato;
	var indiceContratoSeleccionado = oForm.comboBajaContrato.value;
	if(indiceContratoSeleccionado!="Noexistencontratos"){
		var oContrato = oManagerCorporation.contratos[indiceContratoSeleccionado];
		
		oForm.idBajaContrato.value = oContrato.id;
		oForm.fechaInicioBajaContrato.value = oContrato.fechaInicio;
		oForm.fechaFinBajaContrato.value = oContrato.fechaFin;
		oForm.papelBajaContrato.value = oContrato.papel;
		oForm.produccionBajaContrato.value = oContrato.produccion.nombre;
		oForm.castingBajaContrato.value = oContrato.casting.nombre;
		oForm.actorBajaContrato.value = oContrato.actor.nombre;
		oForm.representanteDarBajaContrato.value = oContrato.representante.nombre;
		oForm.pagoDarBajaContrato.value = oContrato.pago;
	}
}

function ocultaForms(){
	document.getElementById('botonBorrarFilaActorPorEdicion').style.display = "none";
	document.getElementById('añadirtrabajador').style.display = "none";
	document.getElementById('añadircontrato').style.display = "none";
	document.getElementById('darBajaContrato').style.display = "none";
	document.getElementById('ediciones').style.display = "none";
	document.getElementById('añadirproduccion').style.display = "none";
	document.getElementById('bajaTrabajador').style.display = "none";
	document.getElementById('uml').style.display = "none";
	document.getElementById('dniTipoDeTrabajadorADarDeBaja').style.display = "none";
	document.getElementById('añadirCasting').style.display = "none";
	document.getElementById('listarObrasGenero').style.display = "none";
	document.getElementById('divListarSeriesNumCap').style.display = "none";
	document.getElementById('divListarPeliculasPorFecha').style.display = "none";
	document.getElementById('añadirActorACasting').style.display = "none";
}
function muestraFormDarBajaTrabajador(){
	ocultaForms();
	document.getElementById('bajaTrabajador').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
function muestraFormContrato(){
	ocultaForms();
	
	var divComboProducciones = document.getElementById("listaproducciones");
	divComboProducciones.removeChild(divComboProducciones.lastChild);
	var select = oManagerCorporation.cargarComboProducciones();
	select.name = "produccionSeleccionada";
	select.id = "produccionSeleccionada";
	divComboProducciones.appendChild(select);
	var comboProducciones = document.getElementById("produccionSeleccionada");
	
	comboProducciones.addEventListener("change",
	function(){ crearComboCastingsDeunaProduccion();
				crearComboActoresDeUnCasting();
				escribeRepresentante();
	},false);

	crearComboCastingsDeunaProduccion();
	crearComboActoresDeUnCasting();
	escribeRepresentante();

	document.getElementById('añadircontrato').style.display = "block";
	document.getElementById("footer").style.position = "relative";
}

function crearComboCastingsDeunaProduccion(){
	var divCasting = document.getElementById("listaCasting");
	divCasting.removeChild(divCasting.lastChild);
	
	var oForm = document.frmAltaContrato;
	var comboProducciones = document.getElementById("produccionSeleccionada");
	var select = document.createElement("select");
	if(comboProducciones.children.length>0){
		var tipo = comboProducciones.selectedOptions[0].getAttribute("tipoproduccion");
		var produccion = oManagerCorporation.getProduccionPorNombeYTipo(oForm.produccionSeleccionada.value, tipo);
		if(produccion.listaCasting.length>0){
			for(var i=0 ;i<produccion.listaCasting.length;i++){
				var option = document.createElement("option");
				option.value = produccion.listaCasting[i].nombre;
				var texto = document.createTextNode(produccion.listaCasting[i].nombre);
				option.appendChild(texto);
				select.appendChild(option);
			}
		}else{
				var option = document.createElement("option");
				option.value = "";
				var texto = document.createTextNode("Aun no se han creado castings para esta produccion");
				option.appendChild(texto);
				select.appendChild(option);
		}
	}else{
		var option = document.createElement("option");
		option.value = "";
		var texto = document.createTextNode("Aun no se han creado producciones por lo cual no existen castings");
		option.appendChild(texto);
		select.appendChild(option);
	}
	select.id = "castingsContrato";
	select.name = "castingsContrato";
	select.className = "form-control";
	divCasting.appendChild(select);

	var comboCastings = document.getElementById("castingsContrato");
		comboCastings.addEventListener("change",
	
	function(){ crearComboActoresDeUnCasting();
				escribeRepresentante();
	},false);

}

function crearComboActoresDeUnCasting(){
	var divActores = document.getElementById("listaActores");
		divActores.removeChild(divActores.lastChild);
		
		var oForm = document.frmAltaContrato;
		var castingSeleccionado = oForm.castingsContrato.value;
		var tipo = oForm.produccionSeleccionada.selectedOptions[0].getAttribute("tipoproduccion");
		var select = document.createElement("select");
		if(tipo!=null){
			var produccion = oForm.produccionSeleccionada.value;
				castingSeleccionado = oManagerCorporation.buscarCasting(produccion,tipo,castingSeleccionado);
			if(castingSeleccionado!=""){
				if(castingSeleccionado.listaActores.length>0){
					for(var i=0; i<castingSeleccionado.listaActores.length;i++){
					var option = document.createElement("option");
					option.value = castingSeleccionado.listaActores[i].dni;
					var texto = document.createTextNode(castingSeleccionado.listaActores[i].nombre);
					option.appendChild(texto);
					select.appendChild(option);
					}
				}else{
					var option = document.createElement("option");
					option.value = "";
					var texto = document.createTextNode("Aun no se han presentado actores a este casting");
					option.appendChild(texto);
					select.appendChild(option);
				}
			}else{
				var option = document.createElement("option");
				option.value = "";
				var texto = document.createTextNode("Aun no se han añadido actores a este casting");
				option.appendChild(texto);
				select.appendChild(option);
			}
		}else{
			var option = document.createElement("option");
				option.value = "";
			var texto = document.createTextNode("No se pudo cargar el combo actor debido a que no existen producciones");
				option.appendChild(texto);
				select.appendChild(option);
		}
		select.id = "actorSeleccionado";
		select.name = "actorSeleccionado";
		select.className = "form-control";
		divActores.appendChild(select);
	
	var actorSeleccionadoPorContrato = document.getElementById('actorSeleccionado');
	actorSeleccionadoPorContrato.addEventListener("change",function(){
				escribeRepresentante();
	},false);

}


function escribeRepresentante() {
	var dniActorSeleccionado = document.getElementById('actorSeleccionado').value;
	var input = document.getElementById("representante");
	var actorSeleccionado = oManagerCorporation.getTrabajadorPorDniYTipo(dniActorSeleccionado,"Actor");

	if(!actorSeleccionado){
	input.value = "No se ha seleccionado ningun actor";
	}else{
	var representante = oManagerCorporation.getTrabajadorPorDniYTipo(actorSeleccionado.representante.dni,"Representante");
	input.value = representante.nombre;
	input.setAttribute("dniRepresentante",representante.dni);
	}
}

function muestraFormListarProduccionTipo(){
	ocultaForms();
	document.getElementById('listaProduccionPorTipo').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
	
	muestraFormListarProduccionTipo		
function muestraUML(){
	ocultaForms();
	document.getElementById('uml').style.display = "block";
	document.getElementById("footer").style.position = "relative";
}
function muestraFormTrabajador(){
	ocultaForms();
		var comboRepresentantes = document.getElementById('comboRepresentantes');
		comboRepresentantes.removeChild(comboRepresentantes.firstChild);
		comboRepresentantes.appendChild(oManagerCorporation.cargarComboSegunTipoTrabajador("Representante"));
	document.getElementById('añadirtrabajador').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
function muestraFormCasting(){
	ocultaForms();
	var comboProducciones = document.getElementById('comboProducciones');
	comboProducciones.removeChild(comboProducciones.lastChild);
	comboProducciones.appendChild(oManagerCorporation.cargarComboProducciones());
	document.getElementById('añadirCasting').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
			
function muestraFormProduccion(){
	ocultaForms();
	var comboDirectores = document.getElementById('comboDirectores');
	comboDirectores.removeChild(comboDirectores.lastChild);
	comboDirectores.appendChild(oManagerCorporation.cargarComboSegunTipoTrabajador("Director"));
	document.getElementById('añadirproduccion').style.display = "block";	
	document.getElementById("footer").style.position = "absolute";
}

function muestraFormListarObrasGenero(){
	ocultaForms();
	document.getElementById('listarObrasGenero').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
function muestraFormListarSeriesNumCap(){
	ocultaForms();
	document.getElementById('divListarSeriesNumCap').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
function muestraFormListarPeliculasEntreFechas(){
	ocultaForms();
	document.getElementById('divListarPeliculasPorFecha').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}




var tipoTrabajadorADarDeBaja =document.getElementById("bajaTrabajador");
	tipoTrabajadorADarDeBaja.addEventListener("click",manejadorBajaTipoTrabajadores,false);

function manejadorBajaTipoTrabajadores(oEvento){
	var oE = oEvento || window.event;
	if(oE.target.value=="Representante"){
		var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
			listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
			var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Representante");
			select.setAttribute("id", "trabajadores");
			listaTrabajadoresADarDeBaja.appendChild(select);
			document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
	}else{
			if(oE.target.value=="Director"){
			var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
				listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
				var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Director");
				select.setAttribute("id", "trabajadores");
				listaTrabajadoresADarDeBaja.appendChild(select);
				document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
			}else{
				if(oE.target.value=="Actor"){
					var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
					listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
					var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Actor");
					select.setAttribute("id", "trabajadores");
					listaTrabajadoresADarDeBaja.appendChild(select);
					document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
					}
			
			}
		}
}
	
	
	
var tipoDeTrabajadorSeleccionado = document.getElementById("papel");
	tipoDeTrabajadorSeleccionado.addEventListener("click",manejadorTrabajadores,false);
function manejadorTrabajadores(oEvento){
	var oE = oEvento || window.event;
	if(oE.target.value=="Actor"){
		var comboRepresentantes = document.getElementById('comboRepresentantes');
		comboRepresentantes.removeChild(comboRepresentantes.firstChild);
		comboRepresentantes.appendChild(oManagerCorporation.cargarComboSegunTipoTrabajador("Representante"));
		document.getElementById("footer").style.position = "relative";
		document.getElementById("actor").style.display = "block";
	}else{
		document.getElementById("footer").style.position = "absolute";
		document.getElementById("actor").style.display = "none";
		}
}


var oCapaProduccion = document.getElementById("tipoProduccion");
	oCapaProduccion.addEventListener("click",manejadorProduccion,false);
function manejadorProduccion(oEvento){
	var oE = oEvento || window.event;
	switch(oE.target.value){
		case'Pelicula':
			var combos = cargarComboFecha();
			var divYear = document.querySelector("#pelicula>.form-group>#divSelectYear");
			var divDia =  document.querySelector("#pelicula>.form-group>#divSelectDay");
			var divMes =  document.querySelector("#pelicula>.form-group>#divSelectMonth")
			var ruta = "#pelicula>.form-group ";
			divYear.removeChild(divYear.lastChild);
			divMes.removeChild(divMes.lastChild);
			divDia.removeChild(divDia.lastChild);
			for(var i = 0; i<combos.length; i++){
				switch(i){
					case 0:
					combos[i].addEventListener("change", function(){ actualizarComboDiasPorCambioAño(ruta);},false);
					divYear.appendChild(combos[i]);
					break;
					case 1:
					combos[i].addEventListener("change", function(){ actualizarComboDías(ruta);},false);
					divMes.appendChild(combos[i]);
					break;
					case 2:
					divDia.appendChild(combos[i]);
					break;
					
				}
			}
			document.getElementById("pelicula").style.display = "block";
			document.getElementById("obra").style.display = "none";
			document.getElementById("serie").style.display = "none";
		break;
		case'Obra':
			document.getElementById("obra").style.display = "block";
			document.getElementById("pelicula").style.display = "none";
			document.getElementById("serie").style.display = "none";
		break;
		case'Serie':
			document.getElementById("serie").style.display = "block";
			document.getElementById("obra").style.display = "none";
			document.getElementById("pelicula").style.display = "none";
		break;						
	}					
}
/*-----------------------------------------------------------------------FECHAS*/

function fechaToString(oFecha){
	var fecha = new Date(Date.parse(oFecha));
	fecha = fecha.toLocaleDateString(); //este método está ya definido para los tipo Date
	return fecha;
}



function cargarComboFecha(){

var combos = [];

var f = new Date();
var yearActual = f.getFullYear();
var select = document.createElement("select");
select.setAttribute("name","ano");
select.setAttribute("id","yearPelicula");
select.classList.add("form-control");

	/*Años*/
for(var i = yearActual; i<yearActual+30; i++){
	var option = document.createElement("option");
	option.value = i;
	var texto = document.createTextNode(i);
	option.appendChild(texto);
	
	if(i==yearActual)
	option.selected=true;

	select.appendChild(option);
}
combos.push(select);
select = document.createElement("select");
select.setAttribute("name","mes");
select.classList.add("form-control");
select.id = "comboMes";
/*Meses*/
for(var i = 1; i<13; i++){
	var option = document.createElement("option");
	var texto = "";
	var val = "0"+i;
	switch(i){
		case 1:
		texto = "Enero";
		option.selected = true;
		break;
		case 2:
		texto = "Febrero";
		break;
		case 3:
		texto = "Marzo";
		break;
		case 4:
		texto = "Abril";
		break;
		case 5:
		texto = "Mayo";
		break;
		case 6:
		texto = "Junio";
		break;
		case 7:
		texto = "Julio";
		break;
		case 8:
		texto = "Agosto";
		break;
		case 9:
		texto = "Septiembre";
		break;
		case 10:
		texto = "Octubre";
		val = i;
		break;
		case 11:
		texto = "Noviembre";
		val = i;
		break;
		case 12:
		texto = "Diciembre";
		val = i;
		break;
	}
	option.value = val;
	option.appendChild(document.createTextNode(texto));
	select.appendChild(option);
}
combos.push(select);
select = document.createElement("select");
select.setAttribute("name","dia");
select.classList.add("form-control");
/*Dias*/
	for(var i=1; i<32; i++){
		var option = document.createElement("option");
		if (i<10) {
			option.value = "0"+i;
			var texto = document.createTextNode("0"+i);
		}
		else{
			option.value = i;
			var texto = document.createTextNode(i);
		}
		option.appendChild(texto);
		select.appendChild(option);
	}
combos.push(select);

return combos;
}
function actualizarComboDiasPorCambioAño(selectorCss){
	var anoSeleccionado = document.querySelector(selectorCss+"#yearPelicula").value;
	var mes = document.querySelector(selectorCss+"#comboMes").selectedOptions[0].textContent;

	if(mes=="Febrero"){
		var diasDelMes=28;
		
		if ((anoSeleccionado%4==0) && ((anoSeleccionado%100!=0)||(anoSeleccionado%400==0))){
			diasDelMes=29;
		}
		
		
		select = document.createElement("select");
		select.setAttribute("name","dia");
		select.classList.add("form-control");
		for(var i=1; i<=diasDelMes;i++){
				var option = document.createElement("option");
				var texto ="";
				if(i<10){
				option.value = "0"+i;
				 texto = document.createTextNode("0"+i);
				}
				else{
				option.value = i;
				texto = document.createTextNode(i);
				}
				option.appendChild(texto);
				select.appendChild(option);
		}
		var divDia = document.querySelector(selectorCss+"#divSelectDay");
		divDia.removeChild(divDia.lastChild);
		divDia.appendChild(select);
	}
}
function actualizarComboDías(selectorCss){
	var diasDelMes=0;
	var mes = document.getElementById("comboMes").selectedOptions[0].textContent;
	//Abril, junio, septiembre y noviembre. 30
	//Enero, marzo, mayo, julio, agosto, octubre y diciembre. 31
	//Febrero 28 si año bisiesto 29
	/*SI ((año divisible por 4) Y ((año no divisible por 100) O (año divisible por 400)))
	es bisiesto
	SINO
	no es bisiesto
	Si viene del formulario peliculas ruta = "#pelicula>.form-group ";
	*/
	if(mes=="Enero" || mes=="Marzo" || mes=="Mayor" || mes=="Julio" || mes=="Agosto" || mes=="Octubre" || mes=="Diciembre"){
		diasDelMes=31;
	}
	else{
		if(mes=="Abril" || mes=="Junio" || mes=="Septiembre" || mes=="Noviembre"){
		diasDelMes=30;
		}
			else{
				var anoSeleccionado = document.querySelector(selectorCss+"#yearPelicula").value;
				if((anoSeleccionado%4==0) && ((anoSeleccionado%100!=0) || (anoSeleccionado%400==0)))
					diasDelMes=29;
					else
					diasDelMes=28;
			}
	}
	select = document.createElement("select");
	select.setAttribute("name","dia");
	select.classList.add("form-control");
	for(var i=1; i<=diasDelMes;i++){
			var option = document.createElement("option");
			option.value = i;
			var texto ="";
			if(i<10){
				option.value = "0"+i;
				 texto = document.createTextNode("0"+i);
			}
			else{
				option.value = i;
				texto = document.createTextNode(i);
			}
			option.appendChild(texto);
			select.appendChild(option);
	}
	var divDia = document.querySelector(selectorCss+"#divSelectDay");
	divDia.removeChild(divDia.lastChild);
	divDia.appendChild(select);

}
/*-----------------------------------------------------------------------FECHAS*/		
			
/*-----------------------------------------------FIN MANIPULACION DE FORMULARIOS*/


/*-----------------------------------------------------------BAJAS DE TRABAJADOR*/
function darDeBajaTrabajador(){
	
var oForm = document.frmBajaTrabajador;
	var dni = oForm.trabajadores.value.trim();
	
		var indiceTrabajador="";
		var bEnc = false;
			for(var i=0; i<oManagerCorporation.trabajadores.length && !bEnc; i++){
				if(oManagerCorporation.trabajadores[i].dni == dni){
					indiceTrabajador = i;
					bEnc=true;
				}
			}
		
		if(bEnc){
		oManagerCorporation.trabajadores.splice(indiceTrabajador, 1);
		toastr.success("Trabajador dado de baja correctamente");
		}else{
			toastr.error("El trabajador no fue encontrado.");
		}
		
		var tipoTrabajadorSeleccionado = frmBajaTrabajador.tipoTrabajador.value;
			if(tipoTrabajadorSeleccionado=="Representante"){
		var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
			listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
			var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Representante");
			select.setAttribute("id", "trabajadores");
			listaTrabajadoresADarDeBaja.appendChild(select);
			document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
	}else{
			if(tipoTrabajadorSeleccionado=="Director"){
			var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
				listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
				var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Director");
				select.setAttribute("id", "trabajadores");
				listaTrabajadoresADarDeBaja.appendChild(select);
				document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
			}else{
					var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
					listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
					var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Actor");
					select.setAttribute("id", "trabajadores");
					listaTrabajadoresADarDeBaja.appendChild(select);
					document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
			}
		}
		
		
	
}
/*-------------------------------------------------------FIN BAJAS DE TRABAJADOR*/
/*-----------------------------------------------------------ALTAS DE TRABAJADOR*/

function altaTrabajador(){
	var oForm = document.frmAltaTrabajador;
	var sMensaje ="";

	var dni = oForm.dni.value.trim();
	var nombre = oForm.nombre.value.trim();
	var tlfn = oForm.tlfn.value.trim();
	var nacionalidad = oForm.comboNacionalidad.value.trim();
	var validacion = validarTrabajador();
	if (validacion == ""){


		var tipo = oForm.tipoTrabajador.value.trim();

		if (tipo == "Director") 
		{
			var oDirector = new Director(dni,nombre,tlfn,nacionalidad);
			
			if(!oManagerCorporation.getTrabajadorPorDniYTipo(oDirector.dni, "Director")){
			toastr.success(oManagerCorporation.altaTrabajador(oDirector, tipo));
			}
			else
				toastr.error("Director registrado previamente");	
		}
		else
			if (tipo == "Representante") 
			{
				var oRepresentante = new Representante(dni,nombre,tlfn,nacionalidad);
				if(!oManagerCorporation.getTrabajadorPorDniYTipo(oRepresentante.dni,"Representante")){
				toastr.success(oManagerCorporation.altaTrabajador(oRepresentante, tipo));
				}else{
					toastr.error("Representante registrado previamente");	
				}
			}
			else
			{
				if(oForm.Representante.value=="NoExistenRepresentantes"){
					toastr.error("No puedes añadir trabajadores sin representantes.");	
				}else{
					var representante = oManagerCorporation.getTrabajadorPorDniYTipo(oForm.Representante.value,"Representante");
					var estatus = oForm.estatus.value.trim();
					var oActor = new Actor(dni,nombre,tlfn,nacionalidad,estatus,representante);
					if(!oManagerCorporation.getTrabajadorPorDniYTipo(oActor.dni,"Actor")){
						oManagerCorporation.asociarActorARepesentante(oForm.Representante.value, oActor);
						toastr.success(oManagerCorporation.altaTrabajador(oActor, tipo));
					}else{
						toastr.error("Actor registrado previamente");	
						}
					}
			}
		oForm.reset();
		document.getElementById("actor").style.display = "none";
	}	
	else
		toastr.warning(validacion);
}
/*-------------------------------------------------------FIN ALTAS DE TRABAJADOR*/

/*-----------------------------------------------------------ALTAS DE PRODUCCION*/

function altaProduccion(){

	var oForm = document.frmAltaProduccion;
	var nombre = oForm.nombre.value.trim();
	var director = oManagerCorporation.getTrabajadorPorDniYTipo(oForm.Director.value, "Director");
	var validacion = validarProduccion();
	if (validacion == ""){
		var tipo = oForm.tipoProduccion.value.trim();
		if (tipo == "") {
			toastr.error("Debe seleccionar un tipo para la producción");
		}
		else{

		if (tipo == "Serie") 
		{
			var numCaps = oForm.numCapitulos.value.trim();
			var oSerie = new Serie(nombre,director,numCaps);
			if(!oManagerCorporation.getProduccionPorNombeYTipo(oSerie.nombre,tipo)){
			oManagerCorporation.asociarProduccionADirector(oForm.Director.value, oSerie);
			toastr.success(oManagerCorporation.altaProduccion(oSerie,tipo));
			}
			else
				toastr.error("Ya existe una serie con ese nombre");
			
		}
		else
			if (tipo == "Obra") 
			{
				var genero = oForm.tipoObra.value.trim();
				var oObra = new Obra(nombre,director,genero);
				if(!oManagerCorporation.getProduccionPorNombeYTipo(oObra.nombre,tipo)){
				oManagerCorporation.asociarProduccionADirector(oForm.Director.value, oObra);
				toastr.success(oManagerCorporation.altaProduccion(oObra, tipo));
				}
				else
					toastr.error("Ya existe una obra con ese nombre");
			}
			else
			{
				var fecha = fechaToString(oForm.ano.value.trim()+"-"+oForm.mes.value.trim()+"-"+oForm.dia.value.trim());
				var oPelicula = new Pelicula(nombre,director,fecha);
				if(!oManagerCorporation.getProduccionPorNombeYTipo(oPelicula.nombre,tipo)){
					oManagerCorporation.asociarProduccionADirector(oForm.Director.value, oPelicula);
					toastr.success(oManagerCorporation.altaProduccion(oPelicula, tipo));
				}
				else
					toastr.error("Ya existe una película con ese nombre");
				
			}
		oForm.reset();
	}
	}	
	else
		toastr.warning(validacion);
}
/*-------------------------------------------------------FIN ALTAS DE PRODUCCION*/


/*-----------------------------------------------------------ALTAS DE Contrato*/

function altaContrato(){
	var id = oManagerCorporation.contratos.length;
	var oForm = document.frmAltaContrato;
	var fechaIni = oForm.fechaInicio.value.trim();
	var fechaFin = oForm.fechaFin.value.trim();
	var papel = oForm.papel.value.trim(); 
	var tipo = oForm.produccionSeleccionada.selectedOptions[0].getAttribute("tipoproduccion");
	var casting = oManagerCorporation.buscarCasting(oForm.produccionSeleccionada.value, tipo,oForm.castingsContrato.value);
	var produccion = oManagerCorporation.getProduccionPorNombeYTipo(oForm.produccionSeleccionada.value, tipo);
	var actor = oManagerCorporation.getTrabajadorPorDniYTipo(oForm.actorSeleccionado.value, "Actor");
	var representante = oManagerCorporation.getTrabajadorPorDniYTipo(oForm.representante.getAttribute("dnirepresentante"), "Representante");
	var pago = oForm.pago.value.trim()+"€";
	var validacion = validarContrato();
	if (validacion == ""){
		var oContrato = new Contrato(id,fechaIni,fechaFin,papel,actor,produccion,representante,pago,casting);
		toastr.success(oManagerCorporation.altaContrato(oContrato));
		//oForm.reset();
	}	
	else
		toastr.warning(validacion);
}
/*-------------------------------------------------------FIN ALTAS DE Contrato*/



/*-----------------------------------------------------------ALTAS DE CASTINGS*/

function altaCasting(){

	var oForm = document.frmAltaCasting;
	var nombre = oForm.nombre.value.trim();
	var produccion = oForm.produccion.value.trim();
	var fechaInicio = oForm.fechaInicioCasting.value.trim();
	var fechaFin = oForm.fechaFinCasting.value.trim();
	var tipoProduccion = oForm.produccion.selectedOptions[0].getAttribute("tipoproduccion");
	

	var validacion = validarCasting();
	if (validacion == ""){
		
		
		produccion = oManagerCorporation.getProduccionPorNombeYTipo(produccion,tipoProduccion);
		var oCasting = new Casting (fechaInicio,fechaFin,nombre,produccion);
		if(!oManagerCorporation.buscarCasting(produccion.nombre, produccion.constructor.name,oCasting.nombre)){
			if(oManagerCorporation.asociarCastingAProduccion(produccion.nombre,tipoProduccion,oCasting)){
				toastr.success(oManagerCorporation.altaCasting(oCasting));
				oForm.reset();
				document.frmAltaCasting.nombre.className = "form-control";
			}else{
				toastr.warning("No se pudo asociar el casting a la produccion, se cancelo el alta de este casting.");
			}
		}else{
				toastr.error("Ese casting ya existe");
				document.frmAltaCasting.nombre.className = "form-control error";

		}
		
	}else
		toastr.warning(validacion);
}
/*-------------------------------------------------------FIN ALTAS DE CASTINGS*/


/*------------------------------------------------------------------VALIDACIONES*/

function validarProduccion(oEvento){
	var oForm = document.frmAltaProduccion;
 	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var nombre = oForm.nombre.value.trim();
	var director = oForm.Director.value.trim();

	
	
	
	if (director=="NoExistenDirector"){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			 document.frmAltaProduccion.Director.focus();		
		}
	
		sErrores += "\nNo podras crear producciones sin haber añadido antes un director<hr>";
		
		//Marcar error
		 document.frmAltaProduccion.Director.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		 document.frmAltaProduccion.Director.className = "form-control";
			
	}
	
	
	var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{1,40}$/;
	
	if (oExpReg.test(nombre) == false){
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaProduccion.nombre.focus();		
		}
		sErrores += "\nNombre incorrecto(Debe contener entre 2 y 40 caracteres y empezar por mayúsculas)<hr>";
		//Marcar error
		document.frmAltaProduccion.nombre.className = "form-control error";
	}
	else {
		//Desmarcar error
		document.frmAltaProduccion.nombre.className = "form-control";		
	}
	
	var tipo = oForm.tipoProduccion.value.trim();
		if (tipo == "Serie") 
		{
			var numCapitulos = oForm.numCapitulos.value.trim();
			var oExpReg = /^\d{1,4}$/;
	
			if (oExpReg.test(numCapitulos) == false){
				if(bValido == true){
				bValido = false;		
					//Este campo obtiene el foco
					document.frmAltaProduccion.numCapitulos.focus();		
				}
				sErrores += "\nNúmero incorrecto (Debe contener entre 1 y 3 dígitos)";
				//Marcar error
				document.frmAltaProduccion.numCapitulos.className = "form-control error";
			}
			else {
				//Desmarcar error
				document.frmAltaProduccion.numCapitulos.className = "form-control";		
			}
		}
		else
			{
				if (tipo == "Obra") 
				{
					var tipoObra = oForm.tipoObra.value.trim();
					var oExpReg = /^[A-ZÁÉÍÓÚa-zñáéíóú\s]{5,20}$/;
			
					if (oExpReg.test(tipoObra) == false){
						if(bValido == true){
						bValido = false;		
							//Este campo obtiene el foco
							document.frmAltaProduccion.tipoObra.focus();		
						}
						sErrores += "\nGénero incorrecto(Debe contener entre 5 y 20 caracteres)";
						//Marcar error
						document.frmAltaProduccion.tipoObra.className = "form-control error";
					}
					else {
						//Desmarcar error
						document.frmAltaProduccion.tipoObra.className = "form-control";		
					}
				}
			}


	return sErrores;
}

function validarTrabajador(oEvento){
	var oForm = document.frmAltaTrabajador;
  var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var dni = oForm.dni.value.trim();
	var nombre = oForm.nombre.value.trim();
	var tlfn = oForm.tlfn.value.trim();
	var representante = oForm.Representante.value.trim();
	var tipoTrabajador = oForm.tipoTrabajador.value.trim();

			// Validaciones

	if (representante=="NoExistenRepresentante" && tipoTrabajador=="Actor"){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			 document.frmAltaTrabajador.Representante.focus();		
		}
	
		sErrores += "\nNo podras añadir actores hasta que no añadas al menos 1 representante<hr>";
		
		//Marcar error
		 document.frmAltaTrabajador.Representante.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		 document.frmAltaTrabajador.Representante.className = "form-control";
			
	}

	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.dni.focus();		
		}
		sErrores += "\nDNI incorrecto(Debe contener 8 dígitos seguidos de una letra sin espacios ni guiones : 00000000A)<hr>";
		//Marcar error
		document.frmAltaTrabajador.dni.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmAltaTrabajador.dni.className = "form-control";
	}
	

	var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{3,40}$/;
	
	if (oExpReg.test(nombre) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.nombre.focus();		
		}
	
		sErrores += "\nNombre incorrecto(Debe contener entre 4 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		document.frmAltaTrabajador.nombre.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		document.frmAltaTrabajador.nombre.className = "form-control";
			
	}
	
	
	//Campo telefono
	var iTlf = document.frmAltaTrabajador.tlfn.value.trim();
	// Trim
	document.frmAltaTrabajador.tlfn.value = iTlf;

	var oExpReg = /^[679][0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(iTlf) == false){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.tlfn.focus();		
		}
	
		sErrores += "\nTeléfono incorrecto(El tlf debe empezar por 6,7 o 9 y contener un máximo de 9 números)<hr>";
		
		//Marcar error
		document.frmAltaTrabajador.tlfn.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		document.frmAltaTrabajador.tlfn.className = "form-control";	
	}
	
	return sErrores;
}

function validarBajaTrabajador(){

	
	var oForm = document.frmBajaTrabajador;
	var bValido = true;
	var sErrores = "";
	var dni = oForm.dni.value.trim();

			// Validaciones


	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.dni.focus();		
		}
		sErrores += "\nDNI incorrecto(Debe contener 8 dígitos seguidos de una letra sin espacios ni guiones : 00000000A)<hr>";
		
		//Marcar error
		document.frmAltaTrabajador.dni.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		document.frmAltaTrabajador.dni.className = "form-control";
			
	}
	

	return sErrores;
}

function validarContrato(oEvento){
    var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var oForm = document.frmAltaContrato;
	var fechaIni = oForm.fechaInicio.value.trim();
	var fechaFin = oForm.fechaFin.value.trim();
	var pago = oForm.pago.value.trim();
	var representante = oForm.representante.getAttribute("dnirepresentante");
	var tipoProduccion = oForm.produccionSeleccionada.selectedOptions[0].getAttribute("tipoproduccion");
	
	var actor = oForm.actorSeleccionado.value;
	var produccion = oManagerCorporation.getProduccionPorNombeYTipo(oForm.produccionSeleccionada.value, tipoProduccion);
	var bEnc = false;
	var arrayContratosEncontrado = [];
/*	for(var i=0; i<oManagerCorporation.contratos.length;i++){
		if(oManagerCorporation.contratos[i].actor.dni == actor){
			arrayContratosEncontrado.push(oManagerCorporation.contratos[i].fechaFin);
			if(oManagerCorporation.contratos[i].produccion.nombre == produccion.nombre)
				if(oManagerCorporation.contratos[i].produccion.constructor.name == tipoProduccion){
				bEnc=true;
				}
		}
	}*/
		for(var i=0; i<oManagerCorporation.contratos.length;i++){
		if(oManagerCorporation.contratos[i].actor.dni == actor){
			arrayContratosEncontrado.push(oManagerCorporation.contratos[i].fechaFin);
			if(oManagerCorporation.contratos[i].produccion.nombre == produccion.nombre)
				if(oManagerCorporation.contratos[i].produccion.constructor.name == tipoProduccion){
					var contratoDadoDeBaja = false;
					for(var j=0; j<oManagerCorporation.contratosDadosDeBaja.length;j++){
						if(oManagerCorporation.contratosDadosDeBaja[j].id == oManagerCorporation.contratos[i].id)
							contratoDadoDeBaja=true;	
					}
					if(!contratoDadoDeBaja)
					bEnc=true;
				}
		}
	}
		if (bEnc){
			if(bValido == true){
				bValido = false;		
				//Este campo obtiene el foco
				document.frmAltaContrato.actorSeleccionado.focus();		
			}
			sErrores += "\nEste actor ya tiene un contrato con esta producción.<hr>";
			
			//Marcar error
			document.frmAltaContrato.actorSeleccionado.className = "form-control error";
		}else{
			document.frmAltaContrato.actorSeleccionado.className = "form-control";
		}
			// Validaciones
			

/* ^[0-9]+([,][0-9]+)?$ validar euros

Expresion regular que valida fechas dd/mm/aaaa
 var ExpReg =/^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/ 
 */
 
 
 	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(representante) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaContrato.representante.focus();		
		}
		sErrores += "\nRepresentante incorrecto, por favor seleccione de nuevo el actor.<hr>";
		
		//Marcar error
		document.frmAltaContrato.representante.className = "form-control error";
	
	}
	else {
		document.frmAltaContrato.representante.className = "form-control";
			
	}
 

	var oExpReg =/^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/;
	
	if (oExpReg.test(fechaIni) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaContrato.fechaInicio.focus();		
		}
		sErrores += "\nFecha de inicio incorrecta formato : DD/MM/AAAA<hr>";
		//Marcar error
		document.frmAltaContrato.fechaInicio.className = "form-control error";
	}
	else {
		if(!validarFecha(fechaIni)){
			sErrores += "\n El día no coincide con el mes <hr>";
			//Marcar error
			document.frmAltaContrato.fechaInicio.className = "form-control error";
		}else{			
			//Comprobar que la fecha inicio no sea mayor que la final
			if(!comprobarFechas(fechaIni,fechaFin)){
				sErrores += "\nLa fecha inicio no puede ser mayor que la fecha fin.<hr>";
			//Marcar error
				document.frmAltaContrato.fechaInicio.className = "form-control error";
			}else{
				var contratoEnVigor = false;
				for(var i=0; i<arrayContratosEncontrado.length && !contratoEnVigor;i++){
					contratoEnVigor = comprobarFechas(fechaIni,arrayContratosEncontrado[i]);
				}
				if(contratoEnVigor){
					sErrores += "\nEn esta fecha ya tiene un contrato este actor.<hr>";
					document.frmAltaContrato.fechaInicio.className = "form-control error";
				}else{
					document.frmAltaContrato.fechaInicio.className = "form-control";
				}
			}
		}

	}
	
	if (oExpReg.test(fechaFin) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaContrato.fechaFin.focus();		
		}
		sErrores += "\nFecha fin incorrecta formato : DD/MM/AAAA<hr>";
		//Marcar error
		document.frmAltaContrato.fechaFin.className = "form-control error";
	}
	else {
		if(!validarFecha(fechaFin)){
			sErrores += "\n El día no coincide con el mes <hr>";
			//Marcar error
			document.frmAltaContrato.fechaFin.className = "form-control error";
		}else{			
			//Comprobar que la fecha inicio no sea mayor que la final
			if(!comprobarFechas(fechaIni,fechaFin)){
				sErrores += "\nLa fecha inicio no puede ser mayor que la fecha fin.<hr>";
			//Marcar error
				document.frmAltaContrato.fechaFin.className = "form-control error";
			}else{
				document.frmAltaContrato.fechaFin.className = "form-control";
			}
		}
	}
	
	
		var oExpReg = /[0-9]+([,][0-9]+)?$/;
	
	if (oExpReg.test(pago) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaContrato.pago.focus();		
		}
		sErrores += "\nImporte incorrecto<hr>";
		//Marcar error
		document.frmAltaContrato.pago.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmAltaContrato.pago.className = "form-control";
	}

	
	return sErrores;
}
/*--------------------------------------------------------------FIN VALIDACIONES*/


/*------------------------------------------------------------------------Extras*/
var comboNacionalidad = document.getElementById("comboNacionalidad");

var botonEditarActores = document.getElementById("editarActores");
botonEditarActores.addEventListener("click",edicionActor,false);

function edicionActor(){
	globalContadorFilasAñadidasEdicionActores = 0;
	var divListados = document.getElementById('listados');
	divListados.innerHTML="";
	divListados.appendChild(oManagerCorporation.getEdicionActores());
	ocultaForms();
	document.getElementById('ediciones').style.display = "block";
	document.getElementById("footer").style.position = "relative";


}
var botonGuardarCambios = document.getElementById("guardarCambios");
botonGuardarCambios.addEventListener("click",guardarLosCambios,false);

var botonAñadirActorPorEdicion = document.getElementById("añadirActorPorEdicion");
botonAñadirActorPorEdicion.addEventListener("click",añadirFilaTablaEdicionActores,false);

function añadirFilaTablaEdicionActores(){
	globalContadorFilasAñadidasEdicionActores++;
	document.getElementById('botonBorrarFilaActorPorEdicion').style.display = "block";
	var tabla = document.querySelector("#tablaEdicionActores");
	var tbody = document.querySelector("#tablaEdicionActores tbody");
	var linea = tabla.insertRow(-1);
	linea.className="edicionActores";
	for(var i = 0; i<6;i++){
		switch(i){
			case 0:
				var input = document.createElement('input');
				input.value  = "";
				input.setAttribute("type", "text");
				var celda = linea.insertCell(-1);
				celda.appendChild(input);
				celda.className="dni";
			break;
			case 1:
				var input = document.createElement('input');
				input.value  = "";
				input.setAttribute("type", "text");
				var celda = linea.insertCell(-1);
				celda.appendChild(input);
				celda.className="nombre";
			break;
			case 2:
				var input = document.createElement('input');
				input.value  = "";
				input.setAttribute("type", "text");
				var celda = linea.insertCell(-1);
				celda.appendChild(input);
				celda.className="telefono";
			break;
			case 3:
				var celda = linea.insertCell(-1);
				var comboNac = comboNacionalidad.cloneNode(true);
				comboNac.setAttribute("id", "");
				celda.appendChild(comboNac);
				celda.className="nacionalidad";
			break;
			case 4:
				var celda = linea.insertCell(-1);
				var comboRepresentantesCargado=oManagerCorporation.cargarComboSegunTipoTrabajador("Representante");
				celda.appendChild(comboRepresentantesCargado);
				celda.className="representante";
			break;
			case 5:
				var celda = linea.insertCell(-1);
				var comboEstatus=oManagerCorporation.cargarComboEstatus();
				celda.appendChild(comboEstatus);
				celda.className="estatus";
			break;
		}
		linea.appendChild(celda);
	}
	tbody.appendChild(linea);
	tabla.appendChild(tbody);
}
function guardarLosCambios(){
	var arrayEdicionActores = document.getElementsByClassName("edicionActores");
	var dni = "";
	var nombre = "";
	var telefono = "";
	var nacionalidad="";
	var dniRepresentante="";
	var estatus="";
	var bEnc = false;
	for(var i = 0; i<arrayEdicionActores.length;i++){
		bEnc = false;
		dni = arrayEdicionActores[i].getElementsByClassName("dni")[0].textContent;
		dniPorInput = arrayEdicionActores[i].getElementsByClassName("dni")[0].firstChild.value;
		nombre = arrayEdicionActores[i].getElementsByClassName("nombre")[0].firstChild.value;
		representante = arrayEdicionActores[i].getElementsByClassName("representante")[0].firstChild.value;
		telefono = arrayEdicionActores[i].getElementsByClassName("telefono")[0].firstChild.value;
		estatus = arrayEdicionActores[i].getElementsByClassName("estatus")[0].firstChild.value;
		for(var j = 0 ; j<oManagerCorporation.trabajadores.length && !bEnc; j++){
			if(oManagerCorporation.trabajadores[j].dni == dni){
				
				var bValidar = validarActorExistentePorEdicion(arrayEdicionActores[i].getElementsByClassName("telefono")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("nombre")[0].firstChild);
				if(bValidar==""){
					oManagerCorporation.trabajadores[j].nombre = nombre;
					oManagerCorporation.trabajadores[j].telefono = telefono;
					oManagerCorporation.trabajadores[j].estatus = estatus;
				}else{
					toastr.warning(bValidar);
				}
					representante = oManagerCorporation.getTrabajadorPorDniYTipo(representante, "Representante");
				var encontrado = false;
				for(var x=0; x<representante.listaActores.length;x++){
					if(representante.listaActores[x].dni == dni)
						encontrado=true;
				}
				if(!encontrado){
					var actorActual = oManagerCorporation.getTrabajadorPorDniYTipo(dni,"Actor");
					representante.listaActores.push(actorActual);
					actorActual.representante = representante;
					
				}
				
				bEnc = true;
				if(bValidar=="")
				toastr.success("Actor con dni: "+dni+" modificado correctamente.");
				
			}
			if(oManagerCorporation.trabajadores[j].dni == dniPorInput){
				toastr.warning("El actor con DNI: "+dniPorInput+" ya se ha insertado");
				bEnc = true;
			}
		}
			if(!bEnc){
				var bValidar = validarActorPorEdicion(arrayEdicionActores[i].getElementsByClassName("dni")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("telefono")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("nombre")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("representante")[0].firstChild);
				if(bValidar==""){
					nacionalidad = arrayEdicionActores[i].getElementsByClassName("nacionalidad")[0].firstChild.value;
					dniRepresentante = arrayEdicionActores[i].getElementsByClassName("representante")[0].firstChild.value;
					estatus = arrayEdicionActores[i].getElementsByClassName("estatus")[0].firstChild.value;
					var representante = oManagerCorporation.getTrabajadorPorDniYTipo(dniRepresentante, "Representante");
					var oActor = new Actor (dniPorInput,nombre,telefono,nacionalidad,estatus,representante);
					toastr.success(oManagerCorporation.altaTrabajador(oActor, "Actor"));
					oManagerCorporation.asociarActorARepesentante(dniRepresentante, oActor);
					bEnc = true;
				}else{
					toastr.warning(bValidar);
				}
			}
	}
}

function validarActorExistentePorEdicion(campoTelefono,campoNombre){
	var bValido = true;
	var sErrores = "";
	var nombre = campoNombre.value.trim();
	var tlfn = campoTelefono.value.trim();
	


			// Validaciones

	var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{3,40}$/;
	
	if (oExpReg.test(nombre) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			campoNombre.focus();		
		}
	
		sErrores += "\nNombre incorrecto(Debe contener entre 4 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		campoNombre.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		campoNombre.className = "form-control";
			
	}
			
	
	var oExpReg = /^[679][0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(tlfn) == false){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			campoTelefono.focus();		
		}
	
		sErrores += "\nTeléfono incorrecto(El tlf debe empezar por 6,7 o 9 y contener un máximo de 9 números)<hr>";
		
		//Marcar error
		campoTelefono.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		campoTelefono.className = "form-control";	
	}

	
	return sErrores;
}


function validarActorPorEdicion(campoDNI, campoTelefono, campoNombre, campoRepresentante){
	var bValido = true;
	var sErrores = "";
	var dni = campoDNI.value.trim();
	var nombre = campoNombre.value.trim();
	var tlfn = campoTelefono.value.trim();
	var representante = campoRepresentante.value.trim();
	
	
		if (representante=="NoExistenRepresentante"){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			campoRepresentante.focus();		
		}
	
		sErrores += "\nNo podras añadir actores hasta que no añadas al menos 1 representante<hr>";
		
		//Marcar error
		campoRepresentante.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		campoRepresentante.className = "form-control";
			
	}
	

			// Validaciones

	var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{3,40}$/;
	
	if (oExpReg.test(nombre) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			campoNombre.focus();		
		}
	
		sErrores += "\nNombre incorrecto(Debe contener entre 4 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		campoNombre.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		campoNombre.className = "form-control";
			
	}
			

	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			campoDNI.focus();		
		}
		sErrores += "\nDNI incorrecto(Debe contener 8 dígitos seguidos de una letra sin espacios ni guiones : 00000000A)<hr>";
		
		//Marcar error
		campoDNI.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		campoDNI.className = "form-control";
			
	}
	
	var oExpReg = /^[679][0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(tlfn) == false){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			campoTelefono.focus();		
		}
	
		sErrores += "\nTeléfono incorrecto(El tlf debe empezar por 6,7 o 9 y contener un máximo de 9 números)<hr>";
		
		//Marcar error
		campoTelefono.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		campoTelefono.className = "form-control";	
	}

	
	return sErrores;
}

var btnBorrarFilaActorPorEdicion = document.getElementById("borrarFilaActorPorEdicion");
btnBorrarFilaActorPorEdicion.addEventListener("click",borrarFilaTablaEdicionActores,false);
var globalContadorFilasAñadidasEdicionActores = 0;
function borrarFilaTablaEdicionActores(){
	if(globalContadorFilasAñadidasEdicionActores>0){
	var tabla = document.querySelector("#tablaEdicionActores");
	var tbody = document.querySelector("#tablaEdicionActores tbody");
	tbody.removeChild(tbody.lastChild);
	globalContadorFilasAñadidasEdicionActores--;
	}
}





function comprobarFechas(fechaInicio, fechaFinal)
        {
			/*25/10/2017
			22/10/2017
			*/
			var devolver=true;
			
             var valuesStart=fechaInicio.split("/");
             var valuesEnd=fechaFinal.split("/"); // Verificamos que la fecha no sea posterior a la actual
         
                var fechainicio=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
                var fechafin=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
         

                    if(fechainicio>=fechafin)
                       devolver=false;
         
          return devolver;
         }
		 
function validarCasting(){

	var oForm = document.frmAltaCasting;
	var bValido = true;
	var sErrores = "";
	var nombre = oForm.nombre.value.trim();
	var fechaIni = oForm.fechaInicioCasting.value.trim();
	var fechaFin = oForm.fechaFinCasting.value.trim();
		
		var oExpReg = /^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/;
	
	if (oExpReg.test(fechaIni) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaCasting.fechaInicioCasting.focus();		
		}
		sErrores += "\nFecha de inicio incorrecta formato : DD/MM/AAAA<hr>";
		//Marcar error
		document.frmAltaCasting.fechaInicioCasting.className = "form-control error";
	}
	else {
		if(!validarFecha(fechaIni)){
			sErrores += "\n El día no coincide con el mes <hr>";
			//Marcar error
			document.frmAltaCasting.fechaInicioCasting.className = "form-control error";
		}else{			
			//Comprobar que la fecha inicio no sea mayor que la final
			if(!comprobarFechas(fechaIni,fechaFin)){
				sErrores += "\nLa fecha inicio no puede ser mayor que la fecha fin.<hr>";
			//Marcar error
				document.frmAltaCasting.fechaInicioCasting.className = "form-control error";
			}else{
				document.frmAltaCasting.fechaInicioCasting.className = "form-control";
			}
		}
	}
	

	var oExpReg = /^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/;
	
	if (oExpReg.test(fechaFin) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaCasting.fechaFinCasting.focus();		
		}
		sErrores += "\nFecha fin incorrecta formato : DD/MM/AAAA<hr>";
		//Marcar error
		document.frmAltaCasting.fechaFinCasting.className = "form-control error";
	}
	else {
		if(!validarFecha(fechaFin)){
			sErrores += "\n El día no coincide con el mes <hr>";
			//Marcar error
			document.frmAltaCasting.fechaFinCasting.className = "form-control error";
		}else{			
			//Comprobar que la fecha inicio no sea mayor que la final
			if(!comprobarFechas(fechaIni,fechaFin)){
				sErrores += "\nLa fecha inicio no puede ser mayor que la fecha fin.<hr>";
			//Marcar error
				document.frmAltaCasting.fechaFinCasting.className = "form-control error";
			}else{
				document.frmAltaCasting.fechaFinCasting.className = "form-control";
			}
		}
	}
		
		
		
			// Validaciones
	

	var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{2,40}$/;
	
	if (oExpReg.test(nombre) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaCasting.nombre.focus();		
		}
	
		sErrores += "\nNombre incorrecto(Debe contener entre 3 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		document.frmAltaCasting.nombre.className = "form-control error";
	
	}
	else {
		//Desmarcar error
		document.frmAltaCasting.nombre.className = "form-control";
			
	}
	
	
	return sErrores;
}


function validarNumCaps(oEvento){
	var oForm = document.frmListarSeriesNumCap;
  	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var minCaps = oForm.minCaps.value.trim();
	var maxCaps = oForm.maxCaps.value.trim();


			// Validaciones


	var oExpReg = /^\d+$/;
	
	if (oExpReg.test(minCaps) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmListarSeriesNumCap.minCaps.focus();		
		}
		sErrores += "\n Mínimo de capítulos incorrecto (debe ser un número entero)<hr>";
		//Marcar error
		document.frmListarSeriesNumCap.minCaps.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmListarSeriesNumCap.minCaps.className = "form-control";
	}
	if (oExpReg.test(maxCaps) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmListarSeriesNumCap.maxCaps.focus();		
		}
		sErrores += "\n Mínimo de capítulos incorrecto (debe ser un número entero)<hr>";
		//Marcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control";
	}

	minCaps = parseInt(minCaps);
	maxCaps = parseInt(maxCaps);

	if (minCaps>=maxCaps) {
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmListarSeriesNumCap.maxCaps.focus();		
		}
		sErrores += "\n El número de capítulos máximo debe ser mayor que el número de capítulos mínimo<hr>";
		//Marcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control error";
		document.frmListarSeriesNumCap.minCaps.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control";
	}

	
	return sErrores;
}

///////////////////////////////////////////////////////////////////////////////////////
function validarFechasListado(oEvento){
	var oForm = document.frmListarPeliculasPorFecha;
  	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var fechaMin = oForm.fechaMin.value.trim();
	var fechaMax = oForm.fechaMax.value.trim();


			// Validaciones


	var oExpReg =/^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/;
	
	if (oExpReg.test(fechaMin) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmListarPeliculasPorFecha.fechaMin.focus();		
		}
		sErrores += "\n Fecha mínima incorrecta, formato : DD/MM/YYYY<hr>";
		//Marcar error
		document.frmListarPeliculasPorFecha.fechaMin.className = "form-control error";
	}
	else {//Desmarcar error
		if(!validarFecha(fechaMin)){
			sErrores += "\nEl dia no coincide con el mes<hr>";
			//Marcar error
			document.frmListarPeliculasPorFecha.fechaMin.className = "form-control error";
		}else{			
		document.frmListarPeliculasPorFecha.fechaMin.className = "form-control";
		}
	}

	if (oExpReg.test(fechaMax) == false){
	
		if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmListarPeliculasPorFecha.fechaMax.focus();		
		}
		sErrores += "\n Fecha máxima incorrecta, formato : DD/MM/YYYY<hr>";
		//Marcar error
		document.frmListarPeliculasPorFecha.fechaMax.className = "form-control error";
	}
	else {//Desmarcar error
				if(!validarFecha(fechaMax)){
			sErrores += "\n El día no coincide con el mes <hr>";
			//Marcar error
			document.frmListarPeliculasPorFecha.fechaMax.className = "form-control error";
		}else{			
		document.frmListarPeliculasPorFecha.fechaMax.className = "form-control";
		}
	}

	
	if (bValido) {
		if (!comprobarFechas(fechaMin,fechaMax)) {
			if(bValido == true){
			bValido = false;		
				//Este campo obtiene el foco
				document.frmListarPeliculasPorFecha.fechaMax.focus();		
			}
			sErrores += "\n La fecha máxima debe ser mayor que la fecha mínima<hr>";
			//Marcar error
			document.frmListarPeliculasPorFecha.fechaMax.className = "form-control error";
			document.frmListarPeliculasPorFecha.fechaMin.className = "form-control error";
		}
		else {//Desmarcar error
			document.frmListarPeliculasPorFecha.fechaMax.className = "form-control";
		}
	}

	
	return sErrores;
}

function validarFecha (fecha){
	 var valuesStart=fecha.split("/");
	 var a =valuesStart[2];
	 var m =(valuesStart[1]);
	 var d =valuesStart[0];
    var ok = true;

       if((a%4 != 0) && (m == 2) && (d > 28))
          ok = false;
       else
       {
          if( (((m == 4) || (m == 6) || (m == 9) || (m==11)) && (d>30)) || ((m==2) && (d>29)) )
             ok = false;
       }
    
    return ok;
}