// Calculo de precio lista + Calculo de precio con tarjeta para negocios
// La opción 1 te permite calcular el precio de lista de un producto, a partir de un precio mayorista y un dto elegido
// La opción 2 te calcula los precios en cuota de un producto, a partir de un precio de lista. Por cada cuota se suma un 10% de interés

alert("Bienvenido! Te ayudamos a llevar el control de tus precios. Por favor, sigue las instrucciones")

let ComoSeguir = prompt("Si querés ingresar un nuevo producto marcá 1, si querés calcular un precio en cuotas marcá 2, sino 0 para cancelar")

if(ComoSeguir=="1"){
    let Producto1 = prompt("Ingresa el nombre del producto")
    let Precio1 = Number(prompt("Ingresa el precio mayorista"))
    let Dto1 = Number(prompt("Ingresa el % de recargo, solo el numero"))

    let PrecioFinal = (precio,dto) => {return precio + ((dto*0.01)*precio)}

    let PrecioLista1 = PrecioFinal(Precio1, Dto1)
    console.log(`Precio ${Producto1} = $ ${PrecioLista1}`)
}
else if(ComoSeguir=="2"){
    let PrecioLista2 = Number(prompt("Ingresa el precio de lista de tu producto"))
    let NCuotasIncial = Number(prompt("Ingresa el numero minimo de cuotas que quieres ofrecer"))
    for (let i = NCuotasIncial; i <= 12; i++) {
        let texto = "Cant de cuotas " + i + " = $" + (PrecioLista2 + ((i * 10)*0.010)*PrecioLista2) 
        console.log(texto)
    }   
}
else if(ComoSeguir=="0"){
    alert("Gracias por usar nuestro sistema. Te esperamos la próxima")
}
else{console.log("Haz ingresado una opción no válida, ingresa un número del 0 al 2 según corresponda")}
