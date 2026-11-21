import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import notFoundImage from '../assets/not-found-image.jpg'
import { useEffect, useState } from 'react'
import pinIcon from './Marker'
import LocationNotice from './LocationNotice'

const LONDON: LatLngExpression = [51.5074, -0.1278]

function WalkMap() {
    const [currentPosition, setCurrentPosition] = useState<LatLngExpression | null>(null)
    const [locationError, setLocationError] = useState<number | null>(null)
    useEffect(() => {
            let ignore = false

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (ignore) return
                        setCurrentPosition([position.coords.latitude, position.coords.longitude])
                        setLocationError(null)
                    },
                    (error) => {
                        setLocationError(error.code)
                    },
                    { timeout: 10000 }
                )
            }

            return () => { 
                ignore = true 
            }
                }, [])
    return (
        <>
        {locationError != null && <LocationNotice message={locationMessage(locationError)} />}
        <MapContainer center={LONDON} zoom={13} className="walk-map">
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

function locationMessage(code: number): string {
    switch (code) {
        case 1:
            return "Location is blocked, so we're starting from London."
        case 2:
            return "We couldn't find your location, so we're starting from London."
        case 3:
            return "Finding your location took too long, so we're starting from London."
        default:
            return "An unknown error occurred."
    }
}

export default WalkMap
