
const fs = require("fs");

class Alumno {
    ci;
    nombre;
    apellido;
    notas = [0, 0, 0, 0];
    constructor(ci, nombre, apellido, notas = [0, 0, 0, 0]) {
        this.ci = ci;
        this.nombre = nombre;
        this.apellido = apellido;
        this.notas = notas;
    }

    NotaFinal() {
        return this.notas.reduce((acc, nota) => acc + Number(nota), 0) / 4;
    }

    Informacion() {
        return `Nombre: ${this.nombre} ${this.apellido} (CI: ${this.ci}) - Nota Final: ${this.NotaFinal()}`;
    }
}

class Estudiantes {
    Lista = [];
    JsonName = "";

    constructor(JsonName) {
        this.JsonName = JsonName;
        if (fs.existsSync(JsonName)) {
            const dataBase = fs.readFileSync(JsonName, "utf8");
            const data = JSON.parse(dataBase).estudiantes;
            // Convertimos objetos planos en instancias de Alumno
            this.Lista = data.map(a => new Alumno(a.ci, a.nombre, a.apellido, a.notas));
        } else {
            const dataBase = JSON.stringify({
                estudiantes: []
            }, null, 2);
            fs.writeFileSync(JsonName, dataBase);
        }
    }

    registrarAlumno(ci, nombre, apellido) {
        const nuevoAlumno = new Alumno(ci, nombre, apellido);
        this.Lista.push(nuevoAlumno);
    }

    registrarNota(ci, notas) {
        let alumno = this.buscarAlumno(ci);
        if (alumno) {
            alumno.notas = notas;
        }
    }

    buscarAlumno(ci) {
        return this.Lista.find(alumno => alumno.ci == ci);
    }

    todasLasNotas() {
        return this.Lista;
    }

    eliminarAlumno(ci) {
        let i = this.Lista.findIndex(alumno => alumno.ci == ci);
        if (i !== -1) {
            this.Lista.splice(i, 1);
        }
    }

    existeAlumno(ci) {
        return this.Lista.some(alumno => alumno.ci == ci);
    }

    guardar() {
        const dataBase = JSON.stringify({
            estudiantes: this.Lista
        }, null, 2);
        fs.writeFileSync(this.JsonName, dataBase);
    }
}

module.exports.Estudiantes = Estudiantes;
module.exports.Alumno = Alumno;







