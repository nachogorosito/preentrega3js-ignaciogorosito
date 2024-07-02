// Carga de stock y precio mayorista para un supermercado + Calculo de precio lista + Calculo de precio con tarjeta

alert("Bienvenido! Te ayudamos a llevar el control de tu negocio. Por favor, sigue las instrucciones")

let ComoSeguir = prompt("Si queres ingresar un nuevo producto marca 1, si querés calcular un precio en cuotas marca 2, si no 0 para cancelar")

if(ComoSeguir=="1"){
    let Producto1 = prompt("Ingresa el nombre del producto")
    let Precio1 = Number(prompt("Ingresa el precio mayorista"))
    let Dto1 = Number(prompt("Ingresa el % de recargo, solo el numero"))

    let PrecioFinal = (precio,dto) => {return precio + ((dto*0.01)*precio)}

    let PrecioLista = PrecioFinal(Precio1, Dto1)
    console.log(PrecioLista)
}
else if(ComoSeguir=="2"){

    let PrecioLista2 = Number(prompt("Ingresa el precio de lista de tu producto"))
    let NCuotasIncial = Number(prompt("Ingresa el numero minimo de cuotas que quieres ofrecer"))
    for (i = NCuotasIncial; i < 12; i++) {
        console.log(PrecioLista2 + ((i * 10)*0.010)*PrecioLista2)
    }
    
}
else{console.log("numero invalido")}

