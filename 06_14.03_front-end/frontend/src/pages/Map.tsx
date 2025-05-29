import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
function Map() {




    return (



    <div>
    <MapContainer className="map" center={[-23.514, -46.629]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[-23.514, -46.629]}>
        <Popup>
        Sao Paolo city <br /> Brazil
        </Popup>
    </Marker>
    </MapContainer>
    
    
    </div>
  )
}

export default Map