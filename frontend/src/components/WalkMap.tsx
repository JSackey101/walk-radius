import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import notFoundImage from '../assets/not-found-image.jpg'
import { useEffect, useState } from 'react'

const LONDON: LatLngExpression = [51.5074, -0.1278]

function WalkMap() {
    const [currentPosition, setCurrentPosition] = useState<LatLngExpression | null>(null)
    return (
        useEffect(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('User location:', position.coords.latitude, position.coords.longitude)
                    setCurrentPosition([position.coords.latitude, position.coords.longitude])
                },
                (error) => {
                    console.error('Error getting user location:', error)
                }
            )
        }, []),

        <MapContainer center={LONDON} zoom={4} className="walk-map">
            {currentPosition && <MoveToPosition position={currentPosition} />}
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" errorTileUrl={notFoundImage}/>
        </MapContainer>
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