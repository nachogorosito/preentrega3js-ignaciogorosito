// Variables de inicio

let productoNombre = "";
let productoPrecioMayorista = "";
let productoRecargo = "";
let productoStock = "";

let productos = JSON.parse(localStorage.getItem("inventario")) ?? [];
let contador = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;;

let botonAgregarProducto = document.getElementById("btn-agregar");
let listaDeProductos = document.getElementById("lista-productos");
const inputBuscar = document.getElementById("Buscar");

let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];


// Funciones

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
        <span>${producto.nombre}</span> 
        <span>$ ${producto.precioDeLista}</span> 
        <span>${producto.stock} u.</span> 
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
    productos = productos.filter( producto => producto.id !== elemento.id)
    ordenarProductos();
    renderProductos(productos);
}

// Agregar producto al carrito del cliente
const agregarProducto = (id) => {
    let producto = id;
    carrito.push (producto);
    localStorage.setItem( "carrito" , JSON.stringify(carrito));
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

let miFormulario = document.querySelector("form");
    miFormulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        
        let producto = {
            id: contador, 
            nombre: productoNombre, 
            precioMayorista: Number(productoPrecioMayorista), 
            recargo: Number(productoRecargo),
            precioDeLista: Number(PrecioFinal(Number(productoPrecioMayorista), Number(productoRecargo))),
            stock: Number(productoStock)
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
