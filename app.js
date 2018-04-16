var providerG = new firebase.auth.GoogleAuthProvider();
var providerF = new firebase.auth.FacebookAuthProvider();
var providerT = new firebase.auth.TwitterAuthProvider();


$('#loginGoogle').click(function() {
  firebase.auth()
    .signInWithPopup(providerG)
    .then(function(result) {
      $('#login').hide();
      $('#form-complet').css("visibility", "visible");
      $('#root').append("<h1>"+result.user.displayName+"</h1>");
    });
});

$('#loginFacebook').click(function() {
  firebase.auth()
    .signInWithPopup(providerF)
    .then(function(result) {
      console.log(result.user);
      $('#login').hide();
      $('#form-complet').css("visibility", "visible");
      $('#root').append("<h1>"+result.user.displayName+"</h1>");
    });
});

$('#loginTwitter').click(function() {
  firebase.auth()
    .signInWithPopup(providerT)
    .then(function(result) {
      console.log(result.user);
      $('#login').hide();
      $('#form-complet').css("visibility", "visible");
      $('#root').append("<h1>"+result.user.displayName+"</h1>");
    });
});


$(document).ready(function () {

  let reviewField = (fieldValue, data) => {
    if (fieldValue === null) return true;
    return data.includes(fieldValue);
  }
  $('#tbl').puidatatable({
    caption: 'Resultado - Consulta',
    columns: [
      {field: 'fecha', headerText: 'Fecha', filter: true},
      {field: 'departamento', headerText: 'Departamento', filter: true},
      {field: 'municipio', headerText: 'Municipio', filter: true},
      {field: 'd_a', headerText: 'Día', filter: true},
      {field: 'hora', headerText: 'Hora', filter: true},
      {field: 'barrio', headerText: 'Barrio', filter: true},
      {field: 'zona', headerText: 'Zona', filter: true},
      {field: 'arma_empleada', headerText: 'Arma empleada', filter: true},
      {field: 'm_vil_agresor', headerText: 'Móvil agresor', filter: true},
      {field: 'm_vil_victima', headerText: 'Móvil victima', filter: true}
    ],
    globalFilter:'#globalFilter',
    datasource: function(callback) {
      $.ajax({
          type: "GET",
          url: 'ter_2018.json',
          dataType: "json",
          context: this,
          success: function(response) {
              
              callback.call(this, response);
          }
      });
    },
    paginator: {
      rows: 10
    },
    resizableColumns: true,
    columnResizeMode: 'expand'
  });
});


String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

//data save automatic
function guardaDatos(user){
  var usuario = {
    uid:user.uid,
    nombre:user.displayName,
    email:user.email,
    foto:user.photoURL
  }
  //firebase.database().ref("cliente")
  //hack para no duplicar usuarios iguales
  firebase.database().ref("cliente/" + user.uid)
  //push(usuario)
  .set(usuario)
}



/*
//write data base
$('#guardar').click(function(){
  firebase.database().ref("cliente")
  .set({
    nombre:"Jorge",
    edad:"23"
  })
});


//read data base
firebase.database().ref("cliente")
.on("child_added", function(s){
  var user = s.val();
  $('#root').append("<img width='200px' src='"+user.foto+"' />");
})
*/
