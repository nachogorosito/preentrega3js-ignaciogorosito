
let proveedores = [];

document.addEventListener("DOMContentLoaded", () => {
    const recuperarProveedores = fetch ("./data.json");
    recuperarProveedores
    .then ((res) => res.json())
    .then ((res) => {
        proveedores = res;
        render(proveedores)
    });
})

const render = (arrayProveedores) => {
    // Asegurarse de que arrayProductos sea un array
    if (!Array.isArray(arrayProveedores)) {
        console.error("render: arrayProveedores no es un array", arrayProveedores);
        return;
    }

    listaProveedores.innerHTML  = "";
  
     arrayProveedores.forEach((proveedor) => {
        let itemListaProveedores = document.createElement("li");
        itemListaProveedores.className = "li-prov";

        itemListaProveedores.innerHTML = `
        <p class="nombre-proveedor">${proveedor.nombre}</p> 
        <p class="propiedades">${proveedor.categoria}</p>
        <p class="propiedades">${proveedor.direccion}</p>
        <p class="propiedades">${proveedor.ciudad}, ${proveedor.provincia}, ${proveedor.cp}</p>
        <p class="propiedades"> Forma de pago: ${proveedor.forma_de_pago}</p>  
        `;
    
        
        listaProveedores.appendChild(itemListaProveedores);
    });  

    localStorage.setItem("proveedores" , JSON.stringify(proveedores));

};

// Filtrador 

if(inputBuscar){
    inputBuscar.addEventListener("input", (evento) => {
            let valor = evento.target.value.toLowerCase();
            let arrayFiltrado = proveedores.filter((proveedor) => 
                proveedor.nombre.toLowerCase().includes(valor)
        );

        render(arrayFiltrado);
    });
}


render(proveedores);
