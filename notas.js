//estudiantes v2
const prompt = require("prompt-sync")();
const readline = require('readline-sync');
const BD = require("./dataBase.js")
let estudiantes =[];
let opcion =0;
BD.abrirBD();
do {
    console.clear();

    console.log("-----Notas de II-IV----")
    console.log("1. Registar alumno")
    console.log("2. Registrar notas de un alumno ")
    console.log("3. Ver notas de un alumno ")
    console.log("4. ver las notas de todos los alumnos ");
    console.log("5. salir")
    opcion=prompt("Ingrese su opcion ")
    let ci;
    switch (opcion) {
        case '1':
            console.clear();
            console.log("----registro de alumnos----")
            let nombre = prompt("Ingrese el nombre: ")
            let apellido = prompt("Ingrese el apellido: ");
            let cedula = prompt("Ingrese cedula: ")
            BD.registarAlumno(cedula,nombre,apellido)
            readline.keyInPause("Estudiante registrado!")
            break;
        case '2':
            console.clear("----Registar nota----")
            ci= prompt("Ingrese la cedula del alumno ")
            let notas=[];
            let estudiante= BD.buscarAlumno();
            if(estudiante===undefined){
                readline.keyInPause("Alumno no existe!");
                break;
            }
            console.log("Nombre: ",estudiante.nombre)
            console.log("Apellido: ",estudiante.apellido)
            for(let i=0;i<4;i++){
                notas[i]= prompt("Ingrese lannota numero "+(i+1)+": ")
            }
            BD.registrarNota(ci,notas);
            readline.keyInPause("Notas registradas!")
            break;
        case '3':
            console.clear("----Leer nota----");
             ci= prompt("Ingrese la cedula del alumno ")
            let alumno= BD.buscarAlumno(ci);
            console.log("Nombre: ",alumno.nombre);
            console.log("Apellido: ",alumno.apellido)
            let sumatoria =0
            for(let i=0;i<4;i++)
            {
                sumatoria+=Number(alumno.notas[i]);
                console.log("Nota ",i+1,": ",alumno.notas[i])
            }
            console.log("Nota Final: ",sumatoria)
            readline.keyInPause("ok!")
            break;
        case '4':
            console.log("----notas -----")
            let alumnos= BD.todasLasNotas();
            for(let alumno of alumnos ){
                console.log("Nombre: ",alumno.nombre);
                console.log("Apellido: ",alumno.apellido)
                let sumatoria =0
               for(let i=0;i<4;i++)
              {
                  sumatoria+=Number(alumno.notas[i]);
                  console.log("Nota ",i+1,": ",alumno.notas[i])
              }
            console.log("Nota Final: ",sumatoria)
            }
            readline.keyInPause("Presione una tecla para continuar...")
            break;
            
        case '5':
            readline.keyInPause("Presione una tecla para terminar")
            break;
        default:
            console.log("Error opcion invalidas")
            
            readline.keyInPause("presione una tecla para continuar...");
            
    }


}while(opcion!=5)

BD.cerrarBD();
