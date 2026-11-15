import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import notFoundImage from '../assets/not-found-image.jpg'
import { useEffect, useState } from 'react'
import pinIcon from './Marker'

const LONDON: LatLngExpression = [51.5074, -0.1278]

function WalkMap() {
    const [currentPosition, setCurrentPosition] = useState<LatLngExpression | null>(null)
    const [locationError, setLocationError] = useState(false)
    useEffect(() => {
            let ignore = false
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (ignore) return
                    setCurrentPosition([position.coords.latitude, position.coords.longitude])
                    setLocationError(false)
                },
                (error) => {
                    setLocationError(true)
                    console.error('Error getting location:', error.message)
                },
                { timeout: 10000 }
            )}, [])
    return (
        <>
        {locationError && <div className="location-error">Unable to retrieve your location. Please check your browser settings.</div>}
        <MapContainer center={LONDON} zoom={4} className="walk-map">
            {currentPosition && <MoveToPosition position={currentPosition} />}
            {currentPosition && <Marker position={currentPosition} icon={pinIcon} />}
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" errorTileUrl={notFoundImage}/>
        </MapContainer>
        </>
    )
}

function MoveToPosition({ position }: { position: LatLngExpression }) {
    const map = useMap()
    useEffect(() => {
        map.flyTo(position, 13)
    }, [position, map])
    return null
}

export default WalkMap