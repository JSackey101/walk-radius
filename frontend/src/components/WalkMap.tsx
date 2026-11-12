import { MapContainer, TileLayer } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import notFoundImage from '../assets/not-found-image.jpg'
import { useEffect } from 'react'

const LONDON: LatLngExpression = [51.5074, -0.1278]

function WalkMap() {
    return (
        useEffect(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('User location:', position.coords.latitude, position.coords.longitude)
                },
                (error) => {
                    console.error('Error getting user location:', error)
                }
            )
        }, []),

        <MapContainer center={LONDON} zoom={13} className="walk-map">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" errorTileUrl={notFoundImage}/>
        </MapContainer>
    )
}

export default WalkMap