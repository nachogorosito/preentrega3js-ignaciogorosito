// VARIABLES

// Propiedades que voy a actualizar de cada producto
let productoNombre = "";
let productoPrecioMayorista = "";
let productoRecargo = "";
let productoStock = "";

// Crear array de productos en el local storage y contador para generar el ID
let productos = JSON.parse(localStorage.getItem("inventario")) ?? [];
let contador = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;;

// Recuperar elementos del html
let botonAgregarProducto = document.getElementById("inputs-agregar");
let listaDeProductos = document.getElementById("listaProductos");
const inputBuscar = document.getElementById("Buscar");

// Crear array de compra en el local storage
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];


// FUNCIONES

// Calcular precio final
const PrecioFinal = (precio,rgo) => {
    return precio + ((rgo*0.01)*precio)
};

// Ordenar de a-z
const ordenarProductos = () => {
    productos.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        return 0;
    });
}

// Generar una tarjeta de producto
const renderProductos = (arrayProductos) => {
    // Asegurarse de que arrayProductos sea un array
    if (!Array.isArray(arrayProductos)) {
        console.error("renderProductos: arrayProductos no es un array", arrayProductos);
        return;
    }

    listaProductos.innerHTML  = "";
  
     arrayProductos.forEach((producto) => {
        let itemListaProductos = document.createElement("li");
        itemListaProductos.className = "tarjeta";
        
        itemListaProductos.innerHTML = `
        <p>${producto.nombre}</p> 
        <p>$ ${producto.precioDeLista} por ${producto.unidad}</p> 
        <p>Stock disponible: ${producto.stock}</p> 
        
        <button class="botonCambiar">Cambiar stock</button>
        <button class="botonBorrar">Borrar</button>
        <button class="botonAgregar">Agregar a Compra</button>
        `;
    
        let botonCambiarProducto = itemListaProductos.querySelector(".botonCambiar");
        let botonBorrarProducto = itemListaProductos.querySelector(".botonBorrar");
        let botonAgregarACompra = itemListaProductos.querySelector(".botonAgregar");

        botonCambiarProducto.addEventListener("click", () => {
            cambiarProducto (producto);
        });

        botonBorrarProducto.addEventListener("click", () => { 
            borrarProducto(producto);
        });

        botonAgregarACompra.addEventListener("click", () => {
            agregarProducto(producto);
        })

        listaProductos.appendChild(itemListaProductos);
    });  

    localStorage.setItem("inventario" , JSON.stringify(productos));

};


// Cambiar el stock
const cambiarProducto = (elemento) => {
    let productoEncontrado = productos.find((producto) => producto.id === elemento.id);
    productoEncontrado.stock = prompt("Ingresa el stock");
    ordenarProductos();
    renderProductos(productos);
}

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
             productos = productos.filter( producto => producto.id !== elemento.id)
            // Ordenar array de productos y actualizar el DOM
            ordenarProductos();
            renderProductos(productos);
            // Mostrar mensaje de éxito
            Swal.fire({
                title: "Producto eliminado",
                icon: "success"
            });
        }
      });
}

// Agregar producto al carrito del cliente
const agregarProducto = (producto) => {

     // Cargar el carrito desde el localStorage por si ha sido modificado
     carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

    //encontrar el producto en el carrito
    let productoEnElCarrito = carrito.find( elemento => elemento.id === producto.id)

    if (productoEnElCarrito) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        if (producto.stock > 0) {
            productoEnElCarrito.cantidad += 1;
            producto.stock -= 1; 
        } else {
            alert("No hay suficiente stock para agregar este producto.");
            return;
        }

    } else {
        // entra cuando el producto no está en carrito, agregalo 
        if (producto.stock > 0) {
            carrito.push({...producto, cantidad: 1});
            producto.stock -= 1;
        } else {
            alert("No hay suficiente stock para agregar este producto.");
            return;
        }
    }

    // Guardar el carrito en localStorage
    localStorage.setItem( "carrito" , JSON.stringify(carrito));

    // Actualizar el inventario en localStorage
    localStorage.setItem("inventario", JSON.stringify(productos));

    // Renderizar los productos actualizados
    renderProductos(productos);

    };
    


    


// Capturar los datos del formulario 
// Agregar el nuevo producto al array inicial y generar id
// Ordenar los productos según nombre x orden alfabético
// Mostrar en el DOM


let inputNombre = document.getElementById("ingresar-nombre");
    inputNombre.addEventListener("input", () => {
        productoNombre = inputNombre.value;      
    });

let inputPrecio = document.getElementById("ingresar-precio");
    inputPrecio.addEventListener("input", () => {
        productoPrecioMayorista = inputPrecio.value;
    });
    
let inputRecargo =document.getElementById("ingresar-recargo");
    inputRecargo.addEventListener("input", () => {
        productoRecargo = inputRecargo.value;
    });
    
let inputStock =document.getElementById("ingresar-stock");
    inputStock.addEventListener("input", () => {
        productoStock = inputStock.value;
    });

let inputUnidad = document.getElementById("ingresar-unidad");
inputUnidad.addEventListener("change", () => {
    productoUnidad = inputUnidad.value;
});

let miFormulario = document.querySelector("form");
    miFormulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        
        let producto = {
            id: contador, 
            nombre: productoNombre, 
            precioMayorista: Number(productoPrecioMayorista), 
            recargo: Number(productoRecargo),
            precioDeLista: Number(PrecioFinal(Number(productoPrecioMayorista), Number(productoRecargo))),
            stock: Number(productoStock),
            unidad: productoUnidad
        };
        
        productos.push(producto);
        contador++;
        ordenarProductos();
        renderProductos(productos)

    });

// Filtrador 

if(inputBuscar){
    inputBuscar.addEventListener("input", (evento) => {
            let valor = evento.target.value.toLowerCase();
            let arrayFiltrado = productos.filter((producto) => 
                producto.nombre.toLowerCase().includes(valor)
        );

        renderProductos(arrayFiltrado);
    });
}


renderProductos(productos);
