document.addEventListener("DOMContentLoaded", () => {

    //CREO MIS VARIABLES PARA EL USARIO

    let formulario = document.getElementById("formUsuario");
    let inputUsuario = document.getElementById("ingresarUsuario");
    let usuarioPantalla = document.getElementsByClassName("usuario")[0];

    // ACA CREO ESTA FUNCION PARA MOSTRAR EL NOMBRE
    const mostrarUsuario = (nombre) => {
        usuarioPantalla.innerHTML = `Usuario: ${nombre}`;
    };


    // CAPTURO EL EVENTO DE ENVIAR EL FORMULARIO
    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        let nombreUsuario = inputUsuario.value.trim();

        if (nombreUsuario) {
            // CON ESTO GUARDO EL USARIO EN EL LOCAL SOTORAGE
            localStorage.setItem("usuario", nombreUsuario);

            mostrarUsuario(nombreUsuario);

            // REINICIO EL CAMPO DE ENTRADA
            inputUsuario.value = "";
        } else {
            alert("Por favor, ingrese un nombre válido.");
        }
    });
});


//_________________________ CREO UNA CLASE PARA HACER OBJETOS (ESTO ES DE LA PREENTREGA ANTERIOR)

class Producto {
    constructor(codigo, nombre, marca, modelo, cantidad, descripcion) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.cantidad = cantidad;
        this.descripcion = descripcion
    }
}


let almohadas = new Producto ("0001", "Almohada","Rozen", "standard", 35, "Almohada de plumas" )

let colchones = new Producto ("0002", "Colchon", "rozen", "BiPlz/Opdic", 35, "Colchon ortopedico de 2 plazas")


let parrafoDispo = document.getElementsByClassName("disponibilidad")[0];
let parrafoDispo2 = document.getElementsByClassName("disponibilidad2")[0];

let mostrarDispo1 = (texto) => {
    parrafoDispo.innerHTML = `Hay ${colchones.cantidad} colchones ${colchones.marca} ${colchones.modelo}`
}

let mostrarDispo2 = (texto) => {
    parrafoDispo2.innerHTML = `Hay ${almohadas.cantidad} almohadas ${almohadas.marca} ${almohadas.modelo}`
}

mostrarDispo1()
mostrarDispo2()

//ACTUALIZO EL LOCAL STORAGE... USO UNA FUNCION Y DESPUES LA LLAMO

const actualizarLocalStorage = () => {
    localStorage.setItem("productos", JSON.stringify([colchones, almohadas]));
}


actualizarLocalStorage();

//____________________________INGRESAR PRODUCTOS

let formIngreso = document.getElementById("formIngreso");

let ingresoColchon = document.getElementById("ingresoColchon");

let ingresoAlmohada = document.getElementById("ingresoAlmohada");


formIngreso.addEventListener("submit", (evento)=>{
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

    }
);

//____________________________________________RETIRO DE PRODUCTOS

let formRetiro = document.getElementById("formRetiro");

let retitoColchon = document.getElementById("retiroColchon");

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
    }
)