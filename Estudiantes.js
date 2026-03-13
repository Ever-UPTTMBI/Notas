
const fs = require("fs");
class Estudiantes{
    Lista =[];
    JsonName="";
    constructor(JsonName){
        console.log(" inciaundo estudiantes")
        let dataBase =""
        this.JsonName=JsonName
        if (fs.existsSync(JsonName)) {
            dataBase = fs.readFileSync(JsonName, "utf8");
            this.Lista = JSON.parse(dataBase).estudiantes
                
        } else {
            dataBase = JSON.stringify({
            estudiantes: []
            }, null, 2);
            fs.writeFileSync(JsonName, dataBase);
        }
            
    }
    resgitrarAlumno(ci, nombre, apellido){
        this.Lista.push({
            ci: ci,
            nombre: nombre,
            apellido: apellido,
            notas: [0, 0, 0, 0]

        })
    }
    registrarNota(ci, notas){
        let i = this.Lista.findIndex(alumno => alumno.ci == ci);
        this.Lista[i].notas = notas;
    }
    guardar(){
        dataBase = JSON.stringify({
            estudiantes: this.Lista
        }, null, 2);
        fs.writeFileSync(this.JsonName, dataBase);
    }
}
module.exports.Estudiantes = Estudiantes;







