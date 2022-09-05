//diccionario con la duracion de cada luz
duraciones={
    "red":0,
    "green":0,
    "orange":0
}
//Funcion que descarga los datos necesarios para que funcione la pagina
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
//se obtiene la informacion y se guarda en una variable
data = JSON.parse(httpGet("https://xompasssuiteadminstg.z20.web.core.windows.net/semaphore.json"))
// se recorre el array con las luces, se inicializan los valores
data["lights"].forEach(e => {
    duraciones[e["color"]] = parseInt(e["duration"]);
});
//se define la luz inicial
light = data["currentLightColor"]
//funcion que hace funcionar el semaforo
function semaforo(){
    //se identifica el semaforo y se enciende la luz correspondiente
    obj = document.getElementById(light);
    obj.classList.add(light); //aqui se enciende la luz
    //un timeout que define la proxima luz a encender
    setTimeout(function(){
        obj.classList.remove(light);
        switch (light) {
            case "green":
                data["currentLightColor"] = "orange";
                break;
            case "orange":
                data["currentLightColor"] = "red";
                break;
            case "red":
                data["currentLightColor"] = "green";
                break;
            default:
                break;
        }
        //aqui se setea la luz
        light = data["currentLightColor"]
        semaforo(); //se llama recursivamente a la funcion
    }, duraciones[light]*1000); //para el timeout se utiliza el valor definido por la pagina web
}