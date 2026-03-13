//databasw
let estudiantes = [];
let dataBase;
const fs = require("fs");
module.exports.registarAlumno = (ci, nombre, apellido)=>
{
    estudiantes.push({
        ci: ci,
        nombre: nombre,
        apellido: apellido,
        notas: [0, 0, 0, 0]

    })
}

module.exports.registrarNota = (ci, notas)=> {
    let i = estudiantes.findIndex(alumno => alumno.ci == ci);
    estudiantes[i].notas = notas;


}
module.exports.buscarAlumno = ci => {
    return estudiantes.find(alumno => alumno.ci == ci);
}
module.exports.todasLasNotas = ()=> {
    return estudiantes;

}
module.exports.eliminarAlumno=(ci)=>{
    
    let i = estudiantes.findIndex(alumno => alumno.ci == ci);
    estudiantes.splice(i,1);
}
module.exports.existeAlumno=(ci)=>{
   return !estudiantes.find(alumno => alumno.ci == ci)===undefined;
}
module.exports.abrirBD = ()=> {

    if (fs.existsSync("dataBase.json")) {
        dataBase = fs.readFileSync("dataBase.json", "utf8");
        estudiantes = JSON.parse(dataBase).estudiantes
        
    } else {
        dataBase = JSON.stringify({
        estudiantes: []
        }, null, 2);
       fs.writeFileSync("dataBase.json", dataBase);
    }
    
}
module.exports.cerrarBD = ()=> {

    dataBase = JSON.stringify({
        estudiantes: estudiantes
    }, null, 2);
    fs.writeFileSync("dataBase.json", dataBase);
}