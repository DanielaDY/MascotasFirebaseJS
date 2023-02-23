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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


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
            id, //matricula:id
            nombremascota,
            edad,
            especie,
            raza,
            diagnostico,
            nombredueño,
            telefono
        }

        firebase.database().ref('Mascotas/' + id).update(mascota).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input0").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Mascotas');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(mascota){
    
    if(mascota!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);

        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = mascota.id;
        cell2.innerHTML = mascota.nombremascota; 
        cell3.innerHTML = mascota.edad;
        cell4.innerHTML = mascota.especie;
        cell5.innerHTML = mascota.raza;
        cell6.innerHTML = mascota.diagnostico;
        cell7.innerHTML = mascota.nombredueño;
        cell8.innerHTML = mascota.telefono;
        cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${mascota.id})">Eliminar</button>`;
        cell10.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+mascota.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Mascotas/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Mascotas/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(mascota){
    if(mascota!=null)
    {
        document.getElementById("Input0").value=mascota.id;
        document.getElementById("Input0").disabled = true;
        document.getElementById("Input1").value=mascota.nombremascota;
        document.getElementById("Input2").value=mascota.edad;
        document.getElementById("Input3").value=mascota.especie;
        document.getElementById("Input4").value=mascota.raza;
        document.getElementById("Input5").value=mascota.diagnostico;
        document.getElementById("Input6").value=mascota.nombredueño;
        document.getElementById("Input7").value=mascota.telefono;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var consulta = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Mascotas");
    ref.orderByChild("especie").equalTo(consulta).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(mascota){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = mascota.id;
    cell2.innerHTML = mascota.nombremascota; 
    cell3.innerHTML = mascota.edad;
    cell4.innerHTML = mascota.especie; 
    cell5.innerHTML = mascota.raza; 
    cell6.innerHTML = mascota.diagnostico; 
    cell7.innerHTML = mascota.nombredueño; 
    cell8.innerHTML = mascota.telefono; 
}