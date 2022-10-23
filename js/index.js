
        // Making a map and tiles 
         
        const mymap = L.map('issMap').setView([0, 0], 3);

        var issIcon = L.icon({
                iconUrl: 'assets/iss_icon.png',
    
                iconSize: [50, 32], // size of the icon
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [25, 16],  // the same for the shadow
      
            });


        const marker = L.marker([0,0], {icon: issIcon}).addTo(mymap);

      const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        const tiles = L.tileLayer(tileUrl,{attribution});
        tiles.addTo(mymap);
        const ISS_api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
        const time_api_url_base = 'https://api.wheretheiss.at/v1/coordinates/';
        
        


  

    async function getISS(){ 
        const ISSresponse = await fetch(ISS_api_url);
        const data = await ISSresponse.json();
        const longitude = data.longitude; 
        const latitude = data.latitude;
        const speed = data.velocity;
        const altitude = data.altitude;
        const visibility = data.visibility;
        const time_api_url= time_api_url_base +latitude+","+longitude;
        const Timeresponse = await fetch(time_api_url);
        const TimeData = await Timeresponse.json();
        const localTime = TimeData.timezone_id;

        document.getElementById('lat').textContent = latitude.toFixed(4) + "°";
        document.getElementById('lon').textContent = longitude.toFixed(4) + "°";
        document.getElementById('speed').textContent = speed.toFixed(2) + " km/hr";
        document.getElementById('alt').textContent = altitude.toFixed(2) + " km";
        document.getElementById('vis').textContent = visibility;
        document.getElementById('time').textContent = localTime;



       
        marker.setLatLng([latitude,longitude]);
        
        if (document.getElementById('toggleFollow').checked) {
          mymap.setView([latitude, longitude], 8);  
        } 
        
        
    }

    setInterval(getISS, 2000);


