duraciones={
    "red":0,
    "green":0,
    "orange":0
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
data = JSON.parse(httpGet("https://xompasssuiteadminstg.z20.web.core.windows.net/semaphore.json"))
data["lights"].forEach(e => {
    duraciones[e["color"]] = parseInt(e["duration"]);
});
light = data["currentLightColor"]

function semaforo(){
    obj = document.getElementById(light);
    obj.classList.add(light);
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
        light = data["currentLightColor"]
        semaforo();
    }, duraciones[light]*1000);
}