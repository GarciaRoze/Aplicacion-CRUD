let listaAlumnos = [];

const objAlumno = {
    id: '',
    nombre: '',
    carrera:''

}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const carreraInput = document.querySelector('#carrera');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit',validarFormulario);

function validarFormulario (e) {
    e.preventDefault();

    if(nombreInput.value === '' || carreraInput.value === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando){
        editarAlumno();
        editando = false;
    } else{
        objAlumno.id = Date.now();
        objAlumno.nombre = nombreInput.value;
        objAlumno.carrera = carreraInput.value;

        agregarAlumno();
    }
}

function agregarAlumno() {
    listaAlumnos.push({...objAlumno});

    mostrarAlumnos();
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objAlumno.id = '';
    objAlumno.nombre = '';
    objAlumno.carrera = '';
}

function mostrarAlumnos() {
    limpiarHTML();

    const divAlumnos = document.querySelector('.alumnos');

    listaAlumnos.forEach(alumnos => {
        const {id, nombre, carrera} = alumnos;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${carrera} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarAlumno(alumnos);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarAlumno(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divAlumnos.appendChild(parrafo);
        divAlumnos.appendChild(hr);
    });
}

function cargarAlumno(alumnos) {
    const {id, nombre, carrera} = alumnos;

    nombreInput.value = nombre;
    carreraInput.value = carrera;

    objAlumno.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarAlumno() {

    objAlumno.nombre = nombreInput.value;
    objAlumno.carrera = carreraInput.value;

    listaAlumnos.map(alumnos => {

        if(alumnos.id === objAlumno.id) {
            alumnos.id = objAlumno.id;
            alumnos.nombre = objAlumno.nombre;
            alumnos.carrera = objAlumno.carrera;

        }

    });

    limpiarHTML();
    mostrarAlumnos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarAlumno(id) {

    listaAlumnos = listaAlumnos.filter(alumnos => alumnos.id !== id);

    limpiarHTML();
    mostrarAlumnos();
}

function limpiarHTML() {
    const divAlumnos = document.querySelector('.alumnos');
    while(divAlumnos.firstChild) {
        divAlumnos.removeChild(divAlumnos.firstChild);
    }
}