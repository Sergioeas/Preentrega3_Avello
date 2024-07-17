document.addEventListener("DOMContentLoaded", async () => {
    // CREO LAS VARIABLES PARA EL NOMBRE DEL USUARIO
    let formulario = document.getElementById("formUsuario");
    let inputUsuario = document.getElementById("ingresarUsuario");
    let usuarioPantalla = document.getElementsByClassName("usuario")[0];

    // FUNCION PARA EL NOMBRE DE USUARIO
    const mostrarUsuario = (nombre) => {
        usuarioPantalla.innerHTML = `Usuario: ${nombre}`;
    };

    
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
        mostrarUsuario(usuarioGuardado);
    }

    
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        let nombreUsuario = inputUsuario.value.trim();

        if (nombreUsuario) {
            
            localStorage.setItem("usuario", nombreUsuario);

            mostrarUsuario(nombreUsuario);

            // AQUI AGREGO Y UTILIZO LA LIBRERIA DE SEET ALERT
            inputUsuario.value = "";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingrese un nombre válido.',
            });
        }
    });

    
    class Producto {
        constructor(codigo, nombre, marca, modelo, cantidad, descripcion) {
            this.codigo = codigo;
            this.nombre = nombre;
            this.marca = marca;
            this.modelo = modelo;
            this.cantidad = cantidad;
            this.descripcion = descripcion;
        }
    }

    // AGREGO ESTA NUEVA FUNCION PARA PODER USAR JSON
    const cargarProductos = async () => {
        try {
            const response = await fetch('productos.json');
            const productos = await response.json();
            return productos.map(prod => new Producto(prod.codigo, prod.nombre, prod.marca, prod.modelo, prod.cantidad, prod.descripcion));
        } catch (error) {
            console.error('Error cargando los productos:', error);
            return [];
        }
    };

    const productos = await cargarProductos();

    
    if (!productos.length) {
        console.error('No se pudieron cargar los productos');
        return;
    }

    let colchones = productos.find(prod => prod.codigo === "0002");
    let almohadas = productos.find(prod => prod.codigo === "0001");

    if (!colchones || !almohadas) {
        console.error('No se encontraron productos con los códigos especificados');
        return;
    }

    let parrafoDispo = document.getElementsByClassName("disponibilidad")[0];
    let parrafoDispo2 = document.getElementsByClassName("disponibilidad2")[0];

    const mostrarDispo1 = () => {
        parrafoDispo.innerHTML = `Hay ${colchones.cantidad} colchones ${colchones.marca} ${colchones.modelo}`;
    };

    const mostrarDispo2 = () => {
        parrafoDispo2.innerHTML = `Hay ${almohadas.cantidad} almohadas ${almohadas.marca} ${almohadas.modelo}`;
    };

    mostrarDispo1();
    mostrarDispo2();

    
    const actualizarLocalStorage = () => {
        localStorage.setItem("productos", JSON.stringify([colchones, almohadas]));
    };

    actualizarLocalStorage();

    // FUNCIONALIDAD PARA AGREGAR PRODUCTOS
    let formIngreso = document.getElementById("formIngreso");
    let ingresoColchon = document.getElementById("ingresoColchon");
    let ingresoAlmohada = document.getElementById("ingresoAlmohada");

    formIngreso.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let cantidadColchon = parseInt(ingresoColchon.value, 10);
        let cantidadAlmohada = parseInt(ingresoAlmohada.value, 10);

        if (!isNaN(cantidadColchon)) {
            colchones.cantidad += cantidadColchon;
        }

        if (!isNaN(cantidadAlmohada)) {
            almohadas.cantidad += cantidadAlmohada;
        }

        mostrarDispo1();
        mostrarDispo2();
        actualizarLocalStorage();

        ingresoAlmohada.value = "";
        ingresoColchon.value = "";
    });

    // FUNCIONALIDAD PARA RETIRAR PRODUCTOS
    let formRetiro = document.getElementById("formRetiro");
    let retiroColchon = document.getElementById("retiroColchon");
    let retiroAlmohada = document.getElementById("retiroAlmohada");

    formRetiro.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let cantidadColchon = parseInt(retiroColchon.value, 10);
        let cantidadAlmohada = parseInt(retiroAlmohada.value, 10);

        if (!isNaN(cantidadColchon)) {
            colchones.cantidad -= cantidadColchon;
        }

        if (!isNaN(cantidadAlmohada)) {
            almohadas.cantidad -= cantidadAlmohada;
        }

        mostrarDispo1();
        mostrarDispo2();
        actualizarLocalStorage();

        retiroColchon.value = "";
        retiroAlmohada.value = "";
    });
});