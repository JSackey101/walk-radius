import { MapContainer, TileLayer } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const LONDON: LatLngExpression = [51.5074, -0.1278]

function WalkMap() {
    return (
        <MapContainer center={LONDON} zoom={13} className="walk-map">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" errorTileUrl='/assets/not-found-image.png'/>
        </MapContainer>
    )
}

export default WalkMap