// Calculador de stock y precios de venta al publico para un supermercado

// Primero se le pide al vendedor el % de recargo que se quiere aplicar segun cada sector de producto. Sectores: verduleria, carniceria, conservas, panaderia, limpieza

alert("Bienvenido! Te ayudamos a llevar el control de tu stock. Por favor, sigue las instrucciones")


//funciones

function recargos(){
    let RecargoVerduleria = Number(prompt("cuanto queres recargar a los productos de verduleria"))
    let recargoCarniceria = Number(prompt("cuanto queres recargar a los productos de carniceria"))
    let recargoConservas = Number(prompt("cuanto queres recargar a los produtos de conservas")) 
    let recargoPanaderia = Number(prompt("cuanto queres recargar a los productos de panaderia"))
    let recargoLimpieza = Number(prompt("cuanto queres recargar a los produtos de limpieza"))

    console.log (`Recargo Verduleria = ${RecargoVerduleria}`)
    console.log (`Recargo Carniceria = ${recargoCarniceria}`)
    console.log (`Recargo Conservas = ${recargoConservas}`)
    console.log (`Recargo Panaderia = ${recargoPanaderia}`)
    console.log (`Recargo Limpieza = ${recargoLimpieza}`)
}

let ComoSeguir = prompt("ingresa 1 para cargar tus productos o 2 para modificar los recargos por sector")

if(ComoSeguir=="1"){console.log("0")}
else if(ComoSeguir=="2"){recargos()}
else{console.log("numero invalido")}

