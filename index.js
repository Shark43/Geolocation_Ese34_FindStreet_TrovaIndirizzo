/**
 * Created by simon on 23/05/2017.
 */
window.onload = function () {
    document.getElementById("btnTrova").addEventListener("click", disegnaMappa);
}
function disegnaMappa() {
    var indirizzo = document.getElementById("txtIndirizzo").value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
            address: indirizzo
        },
        function (result, status) {
            //* funzione di callback*//
            //ruslut = vettori di possibili risultati
            //status = stato ok o errore
            if(status == google.maps.GeocoderStatus.OK){
                disegna(result[0]);
            }
            else 
                alert("ERROR");
                
        }
    );
}
function disegna(risultato) {
    var posizione = risultato.geometry.location;
    var imgBox = document.getElementById("imgBox");
    var opzioni = {
        center:posizione,
        zoom:16,
        mapTypeId:google.maps.MapTypeId.HYBRID,
    };
    var mappa = new google.maps.Map(imgBox, opzioni);
    var marcatore1 = new google.maps.Marker({
        position:posizione,
        map:mappa,
        title:"CASA"
    });
    var info = "<h2>ITIS VALLAURI</h2>" +
        "<p>Scuola industriale fossano</p>" +
        "<p>Indirizzo: "+risultato.formatted_address+ "</p>"+
        "<p>Coordinate: "+ posizione+ "</p>";
    var finestra =  new google.maps.InfoWindow({
        content:info
    });

    marcatore1.addListener("click", function () {
        finestra.open(mappa, marcatore1);
    });
}