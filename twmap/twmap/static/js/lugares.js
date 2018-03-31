let lugaresInfo=[]
const conseguirlugares = () =>{
  fetch('https://www.datos.gov.co/resource/g373-n3yy.json')
    .then(response => response.json())   //aqui carga un json con las coordenadas pero aquis eria pasarle las coordenadas o el json para manejoarlo con javascrip o si quiere le manda una lista con coordenasdas y las usa mas abajo
    .then(lugares =>{
      console.log(lugares)

      lugares.forEach(lugar =>{
        let lugarInfo={ //se llena una lista con las coordenasdas obtenidsa del json
          posicion:{lat:lugar.punto.coordinates[1], lng:lugar.punto.coordinates[0]},
          nombre:lugar.nombre_sede
        }
        lugaresInfo.push(lugarInfo)
      })
      if(navigator.geolocation){  //obtieene ubicacion del usuario para centrar el mapar
        navigator.geolocation.getCurrentPosition(usuarioUbicacion =>{
          let ubicacion ={
            lat:usuarioUbicacion.coords.latitude,
            lng:usuarioUbicacion.coords.longitude
          }
          dibujarMapa(ubicacion)  //dibuja l mapa
        })
      }
    })

}


const dibujarMapa =(obj) => {
  let mapa = new google.maps.Map(document.getElementById('map'),{
      center:obj,
      zoom:4
  })
  let marcadorUsuario = new google.maps.Marker({ // imprime la ubicacion del usuario
    position:obj,
    title:'tu ubicacion'
  })
  marcadorUsuario.setMap(mapa) //se llena con los marcadores de la lista 
  let marcadores=lugaresInfo.map(lugar =>{
      return new google.maps.Marker({
        position:lugar.posicion,
        title:lugar.nombre,
        map:mapa
      })
  })
}
conseguirlugares()
