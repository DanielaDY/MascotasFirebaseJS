/*
Veterinaria con Firebase

Integrantes:

García Arellano Aracely 19211642
Gonzalez Guzman Maria Jose 19211650

*/
var firebaseConfig = {
    apiKey: "AIzaSyAuKruUNzqS_bbFf_6Sez9kuF1djc_NwBI",
    authDomain: "proyectomascotasv1.firebaseapp.com",
    databaseURL: "https://proyectomascotasv1-default-rtdb.firebaseio.com",
    projectId: "proyectomascotasv1",
    storageBucket: "proyectomascotasv1.appspot.com",
    messagingSenderId: "547382970126",
    appId: "1:547382970126:web:25fb7edf1adfede2d7f95f",
    measurementId: "G-2981K144LP"
};
// Inicializa el Firebase
firebase.initializeApp(firebaseConfig);

//Funcion que limpia todos los campos 
function resetFields(){
    document.getElementById("Input0").value='';
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='selecciona';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
}
//Funcion que nos permite crear los registros de las mascotas 
function createR() {
    document.getElementById("Input0").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input0").value;
    var nombremascota = document.getElementById("Input1").value;
    var edad = document.getElementById("Input2").value;
    var especie = document.getElementById("Input3").value;
    var raza = document.getElementById("Input4").value;
    var diagnostico = document.getElementById("Input5").value;
    var nombredueño = document.getElementById("Input6").value;
    var telefono = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var mascota = {
            id, 
            nombremascota,
            edad,
            especie,
            raza,
            diagnostico,
            nombredueño,
            telefono
        }

        firebase.database().ref('Mascotas/' + id).update(mascota).then(() => {
           resetFields();//se reinician los campos cuando se hace la peticion
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }
    //Evita que el id del mascota se desactive
    document.getElementById("Input0").disabled = false;
}
//Funcion que nos permite sobreescribir 
function read(){

    document.getElementById("Table1").innerHTML='';//pedimos que se limpien todos los registros
    var ref = firebase.database().ref('Mascotas');
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}
//funcion que nos permite ir insertando los datos
function printRow(mascota){
    
    if(mascota!=null){
        var table = document.getElementById("Table1"); 

        //se crea un nuevo elemento en la tabla en la ultima posicion aunque con Firebase se ordena automaticamente por el id
        var row = table.insertRow(-1);

        //Se inserta cada celda que sera necesaria
        var cell1 = row.insertCell(0);//Se establece la celda del id
        var cell2 = row.insertCell(1);//Se establece la celda del nombre de la mascota
        var cell3 = row.insertCell(2);//Se establece la celda de la edad
        var cell4 = row.insertCell(3);//Se establece la celda de la especie
        var cell5 = row.insertCell(4);//Se establece la celda de la raza
        var cell6 = row.insertCell(5);//Se establece la celda del diagnostico
        var cell7 = row.insertCell(6);//Se establece la celda del nombre del dueño
        var cell8 = row.insertCell(7);//Se establece la celda del numero de telefono
        var cell9 = row.insertCell(8);//Se establece la celda del boton eliminar
        var cell10 = row.insertCell(9);//Se establece la celda del boton modificar

        //Agregamos la informacion de la mascota y su dueño en cada columna que le corresponde
        cell1.innerHTML = mascota.id;
        cell2.innerHTML = mascota.nombremascota; 
        cell3.innerHTML = mascota.edad;
        cell4.innerHTML = mascota.especie;
        cell5.innerHTML = mascota.raza;
        cell6.innerHTML = mascota.diagnostico;
        cell7.innerHTML = mascota.nombredueño;
        cell8.innerHTML = mascota.telefono;
        //En cada boton se llama una funcion a la cual le mandamos el id 
        cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${mascota.id})">Eliminar</button>`;
        cell10.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+mascota.id+')">Modificar</button>';
    }
}
//Funcion que nos permite eliminar un registro
function deleteR(id){
    //Busca el id en la base de datos y con el set en null elimina el registro
    firebase.database().ref('Mascotas/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}
//Funcion que nos permite buscar por medio del id
function seekR(id){
    var ref = firebase.database().ref('Mascotas/' + id);

    ref.on('value', function(snapshot) {
      updateR(snapshot.val());//Funcion que nos permite actualizar el registro mediante el envio de la informacion de la mascota
    });
}
//Funcion para actualizar el registro
function updateR(mascota){
    if(mascota!=null)
    {
        //actualiza cada uno de los campos
        document.getElementById("Input0").value=mascota.id;
        document.getElementById("Input0").disabled = true;//Se impide que el id de la mascota se actualize
        document.getElementById("Input1").value=mascota.nombremascota;
        document.getElementById("Input2").value=mascota.edad;
        document.getElementById("Input3").value=mascota.especie;
        document.getElementById("Input4").value=mascota.raza;
        document.getElementById("Input5").value=mascota.diagnostico;
        document.getElementById("Input6").value=mascota.nombredueño;
        document.getElementById("Input7").value=mascota.telefono;
    }
}


//Funcion para consultar por medio de la especie
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var consulta = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Mascotas");
    ref.orderByChild("especie").equalTo(consulta).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}
//Funcion para insertar los datos pero ahora en la tabla 2
function printRowQ(mascota){

    var table = document.getElementById("Table2"); 
    
    //se crea un nuevo elemento en la tabla en la ultima posicion aunque con Firebase se ordena automaticamente por el id
    var row = table.insertRow(-1);

    //Se inserta cada celda que sera necesaria
    var cell1 = row.insertCell(0);//Se establece la celda del id
    var cell2 = row.insertCell(1);//Se establece la celda del nombre de la mascota
    var cell3 = row.insertCell(2);//Se establece la celda de la edad
    var cell4 = row.insertCell(3);//Se establece la celda de la especie
    var cell5 = row.insertCell(4);//Se establece la celda de la raza
    var cell6 = row.insertCell(5);//Se establece la celda del diagnostico
    var cell7 = row.insertCell(6);//Se establece la celda del nombre del dueño
    var cell8 = row.insertCell(7);//Se establece la celda del numero de telefono

    //Agregamos la informacion de la mascota y su dueño en cada columna que le corresponde
    cell1.innerHTML = mascota.id;
    cell2.innerHTML = mascota.nombremascota; 
    cell3.innerHTML = mascota.edad;
    cell4.innerHTML = mascota.especie; 
    cell5.innerHTML = mascota.raza; 
    cell6.innerHTML = mascota.diagnostico; 
    cell7.innerHTML = mascota.nombredueño; 
    cell8.innerHTML = mascota.telefono; 
}