
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

// Pintar carrito en el DOM

const renderProductos = (arrayProductos) => {
  
    let contenedorCarrito = document.getElementById("contenedor-carrito");
    contenedorCarrito.innerHTML  = "";
  
     arrayProductos.forEach((producto) => {
        let itemListaProductos = document.createElement("li");
        itemListaProductos.className = "tarjeta";

        // Calcula el precio total inicial
        let precioTotal = producto.precioDeLista * producto.cantidad;
        
        itemListaProductos.innerHTML = `
        <p>${producto.nombre}</p> 
        <p>$ ${producto.precioDeLista}</p> 

        <button class="restarCantidad">-</button>
        <p>${producto.cantidad}</p>
        <button class="sumarCantidad">+</button>

        <p class="precioTotal">${precioTotal}</p>
        
        <button class="botonBorrar">Borrar</button> 
        `;

        let precioTotalParrafo = itemListaProductos.querySelector(".precioTotal");

        let botonRestarCantidad = itemListaProductos.querySelector(".restarCantidad");
        botonRestarCantidad.addEventListener("click", () => { 
            restarCantidad (producto);
            // Actualiza el precio total después de restar la cantidad
            actualizarPrecioTotal(producto, precioTotalParrafo);
            // Actualiza el total de compra
            actualizarTotalCompra();
        });


        let botonSumarCantidad = itemListaProductos.querySelector(".sumarCantidad");
        botonSumarCantidad.addEventListener("click", () => { 
            sumarCantidad (producto);
            // Actualiza el precio total después de restar la cantidad
            actualizarPrecioTotal(producto, precioTotalParrafo);
            // Actualiza el total de compra
            actualizarTotalCompra();
        });


        let botonBorrarProducto = itemListaProductos.querySelector(".botonBorrar");
        botonBorrarProducto.addEventListener("click", () => { 
            borrarProducto(producto);
            // Actualiza el total de compra
            actualizarTotalCompra();
        });

        
        contenedorCarrito.appendChild(itemListaProductos);
    });  

    localStorage.setItem("carrito" , JSON.stringify(carrito));

    // Actualiza el total de compra
    actualizarTotalCompra();

};

// Actualizar y mostrar el precio total en el DOM
const actualizarPrecioTotal = (producto, precioTotalParrafo) => {
    // Calcula el precio total basado en la cantidad actual
    let precioTotal = producto.precioDeLista * producto.cantidad;
    
    // Actualiza el texto del párrafo con el precio total
    precioTotalParrafo.innerText = `${precioTotal}`;
};

// Actualizar y mostrar el total de compra en el DOM
const actualizarTotalCompra = () => {
    // Calcula el total de compra sumando el precio total de cada producto
    let total = carrito.reduce((acc, producto) => acc + (producto.precioDeLista * producto.cantidad), 0);
    
    // Muestra el total en el elemento correspondiente
    document.getElementById("totalCompra").innerText = `Total de Compra: $${total.toFixed(2)}`;
};

// Borrar producto
const borrarProducto = (elemento) => {

    Swal.fire({
        title: "¿Seguro querés eliminar el producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
      }).then((result) => {
        if (result.isConfirmed) {
             // Eliminar el producto del carrito
            carrito = carrito.filter( producto => producto.id !== elemento.id)
            // Actualizar el DOM
            renderProductos(carrito);
            // Mostrar mensaje de éxito
            Swal.fire({
                title: "Producto eliminado",
                icon: "success"
            });
            // Actualiza el total de compra
            actualizarTotalCompra();
        }
      });

    
}

// Sumar cantidad
const sumarCantidad = (producto) => {

    let inventario = JSON.parse(localStorage.getItem("inventario")) ?? [];

    let productoEnElCarrito = carrito.find (elemento => elemento.id === producto.id);
    let productoEnElInventario = inventario.find(elemento => elemento.id === producto.id);

    if (productoEnElCarrito) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        if (productoEnElInventario.stock > 0) {
            productoEnElCarrito.cantidad += 1;
            productoEnElInventario.stock -= 1; // Disminuir el stock
        } else {
            alert("No hay suficiente stock para sumar más unidades.");
            return;
        }
    } else {
        // Si el producto no está en el carrito, agrégalo
        if (productoEnElInventario.stock > 0) {
            carrito.push({...producto, cantidad: 1});
            productoEnElInventario.stock -= 1; // Disminuir el stock
        } else {
            alert("No hay suficiente stock para agregar este producto.");
            return;
        }
    }
    
    // Guardar el carrito y el inventario en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("inventario", JSON.stringify(inventario));

    // Renderizar los productos actualizados
    renderProductos(carrito);
    // Actualiza el total de compra
    actualizarTotalCompra();
};

// Restar cantidad
const restarCantidad = (producto) => {
    
    // Cargar el inventario desde el localStorage por si ha sido modificado
    let inventario = JSON.parse(localStorage.getItem("inventario")) ?? [];
    let productoEnElInventario = inventario.find(elemento => elemento.id === producto.id);

    let productoEnElCarrito = carrito.find (elemento => elemento.id === producto.id);
    if (productoEnElCarrito && productoEnElCarrito.cantidad > 1) {
        productoEnElCarrito.cantidad -= 1;
        productoEnElInventario.stock += 1;
    } else if (productoEnElCarrito && productoEnElCarrito.cantidad === 1) {
        // Si la cantidad es 1, eliminar el producto del carrito
        carrito = carrito.filter(elemento => elemento.id !== producto.id);
        productoEnElInventario.stock += 1; // Aumentar el stock
    }

    // Guardar el carrito y el inventario en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("inventario", JSON.stringify(inventario));

    // Renderizar los productos actualizados
    renderProductos(carrito);
    // Actualiza el total de compra
    actualizarTotalCompra();
    };


renderProductos(carrito);
actualizarTotalCompra();


// Finalizar compra

const botonFinalizarCompra = document.getElementById('finalizarCompra');
botonFinalizarCompra.addEventListener('click', () => {
    // Limpiar el carrito
    carrito = [];
    // Actualizar el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Renderizar el carrito vacío
    renderProductos(carrito);
    // Mostrar  mensaje de éxito
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "La compra finalizó",
        showConfirmButton: false,
        timer: 1500
      });
});