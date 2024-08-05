
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

// Borrar producto
const borrarProducto = (elemento) => {
    carrito = carrito.filter( producto => producto.id !== elemento.id)
    renderProductos(carrito);
}

const renderProductos = (arrayProductos) => {
  
    let contenedorCarrito = document.getElementById("contenedor-carrito");
    contenedorCarrito.innerHTML  = "";
  
     arrayProductos.forEach((producto) => {
        let itemListaProductos = document.createElement("li");
        itemListaProductos.className = "tarjeta";
        
        itemListaProductos.innerHTML = `
        <span>${producto.nombre}</span> 
        <span>$ ${producto.precioDeLista}</span> 
        <span>${producto.stock}</span>
        <button class="botonBorrar">Borrar</button> 
        `;

        let botonBorrarProducto = itemListaProductos.querySelector(".botonBorrar");

        botonBorrarProducto.addEventListener("click", () => { 
            borrarProducto(producto);
        });

        contenedorCarrito.appendChild(itemListaProductos);
    });  

    localStorage.setItem("carrito" , JSON.stringify(carrito));

};

renderProductos(carrito)

