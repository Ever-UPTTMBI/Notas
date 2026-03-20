const prompt = require("prompt-sync")();
const readline = require('readline-sync');
const {Estudiantes} = require("./Estudiantes.js")
let BDEstudiantes= new Estudiantes("dataBase.json");
let opcion = 0;
do {
    //console.clear();

    console.log("-----Notas de II-IV----")
    console.log("1. Registar alumno")
    console.log("2. Registrar notas de un alumno ")
    console.log("3. Ver notas de un alumno ")
    console.log("4. ver las notas de todos los alumnos ")
    console.log("5. Borrar un alumno")
    console.log("6. editar alumno ")
    console.log("7. salir")
    opcion = prompt("Ingrese su opcion ")
    let ci;
    
    switch (opcion) {
        case '1':
            
            //console.clear();
            console.log("----registro de alumnos----")
            let nombre = prompt("Ingrese el nombre: ")
            let apellido = prompt("Ingrese el apellido: ");
            let cedula = prompt("Ingrese cedula: ")
            if (BDEstudiantes.existeAlumno(cedula)) {
                readline.keyInPause("No lo puede ingresa por que el alumno existe!");
                break;
            }
            BDEstudiantes.registrarAlumno(cedula, nombre, apellido)
            readline.keyInPause("Estudiante registrado!")
            break;
        case '2':
            console.clear("----Registar nota----")
            ci = prompt("Ingrese la cedula del alumno ")
            let notas = [];
             if (!BDEstudiantes.existeAlumno(ci)) {
                readline.keyInPause("Alumno no existe!");
                break;
            }
            let estudiante = BDEstudiantes.buscarAlumno(ci);
           
            console.log("Nombre: ", estudiante.nombre)
            console.log("Apellido: ", estudiante.apellido)
            for (let i = 0; i < 4; i++) {
                notas[i] = prompt("Ingrese lannota numero "+(i+1)+": ")
            }
            BDEstudiantes.registrarNota(ci, notas);
            readline.keyInPause("Notas registradas!")
            break;
        case '3':
            console.clear("----Leer nota----");
            ci = prompt("Ingrese la cedula del alumno ")
            if (!BDEstudiantes.existeAlumno(ci)) {
                readline.keyInPause("Alumno no existe!");
                break;
            }
            let alumno = BDEstudiantes.buscarAlumno(ci);
            console.log(alumno.Informacion());
            for (let i = 0; i < 4; i++) {
                console.log("Nota ", i + 1, ": ", alumno.notas[i])
            }
            readline.keyInPause("ok!")
            break;
        case '4':
            console.log("----notas -----")
            let alumnos = BDEstudiantes.todasLasNotas();
            for (let alumno of alumnos) {
                console.log(alumno.Informacion());
            }
            readline.keyInPause("Presione una tecla para continuar...")
            break;
        case '5':
            console.clear("----Eliminar alumno----");
            ci = prompt("Ingrese la cedula del alumno ")
            if (!BDEstudiantes.existeAlumno(ci)) {
                readline.keyInPause("Alumno no existe!");
                break;
            }
            let bAlumno = BDEstudiantes.buscarAlumno(ci)
            console.log("Seguro que desea eliminar el alumno?")
            console.log(bAlumno.Informacion());
            let eliminar = prompt("Escriba 'y' para confirmar: ");
            if (eliminar == "y" || eliminar == "Y") {
                BDEstudiantes.eliminarAlumno(ci)
                console.log("Listo! ")
            }
            readline.keyInPause();
            break;
        case '6':
            console.log("Modificar alumno")
            let ci = prompt("Ingrese la cedula: ")
            if(!BDEstudiantes.existeAlumno(ci)){
                console.log("El alumno no existe...")
                readline.keyInPause()
                break;
            }
            let nombreNuevo = prompt("Ingrese nuevo nombre: ")
            let apellidoNuevo= prompt("Ingrese apellido nuevo: ")
            BDEstudiantes.modificarAlumno(ci,nombreNuevo,apellidoNuevo)
            console.log("El alumno a sido modificado.. ")

        case '7':
            readline.keyInPause("Presione una tecla para terminar")
            break;
        default:
            console.log("Error opcion invalidas")

            readline.keyInPause("presione una tecla para continuar...");

        }
        console.clear()


    }while (opcion != 7)
BDEstudiantes.guardar()
