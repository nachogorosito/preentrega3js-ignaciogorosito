let productos = [];
let contador = 1;

let botonAgregarProducto = document.getElementById("btn-agregar");
let listaDeProductos = document.getElementById("lista-productos");

console.log(botonAgregarProducto);
console.log(listaDeProductos);

let funcionAgregarProducto = () => {

    let productoNombre = prompt("Ingresa el nombre del producto")
    let productoPrecioMayorista = Number(prompt("Ingresa el precio mayorista"))
    let productoRecargo = Number(prompt("Ingresa el % de recargo, solo el numero"))
    
    let funcionPrecioFinal = (precio,rgo) => {return precio + ((rgo*0.01)*precio)}

    let productoPrecioFinal = funcionPrecioFinal(productoPrecioMayorista, productoRecargo)
    let stock = prompt("Ingresa el stock")

    let producto = {
        id: contador, 
        nombre: productoNombre, 
        precioMayorista: productoPrecioMayorista, 
        recargo: productoRecargo,
        precioDeLista: productoPrecioFinal,
        stock: stock
    };

    productos.push(producto);
    contador++;

    ordenarProductos()
    console.log(productos)
    renderProductos()
};

botonAgregarProducto.addEventListener("click", funcionAgregarProducto);

const ordenarProductos = () => {
    productos.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        return 0;
    });
}

const renderProductos = () => {
  
    listaProductos.innerHTML  = "";
  
    productos.forEach((elemento) => {
        let itemListaProductos = document.createElement("li");
        itemListaProductos.className = "tarjeta";
        
        itemListaProductos.innerHTML = `
        <span>${elemento.nombre}</span> 
        <span>$ ${elemento.precioDeLista}</span> 
        <span>${elemento.stock}</span> 
        <button class="botonCambiar">Cambiar stock</button>
        <button class="botonBorrar">Borrar</button>`;
    
        let botonCambiarProducto = itemListaProductos.querySelector(".botonCambiar")
        let botonBorrarProducto = itemListaProductos.querySelector(".botonBorrar")

        botonCambiarProducto.addEventListener("click", () => {
            cambiarProducto (elemento);
        });

        botonBorrarProducto.addEventListener("click", () => { 
            borrarProducto(elemento);
        });

        listaProductos.appendChild(itemListaProductos);

    
    });  

    
};

renderProductos();

const cambiarProducto = (elemento) => {
    let productoEncontrado = productos.find((producto) => producto.id === elemento.id);
    productoEncontrado.stock = prompt("Ingresa el stock");
    ordenarProductos();
    renderProductos();
}

const borrarProducto = (elemento) => {
    productos = productos.filter( producto => producto.id !== elemento.id)
    ordenarProductos();
    renderProductos();
}