import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaSearchLocation, FaDirections, FaUserMd, FaHospital, FaClinicMedical, FaLocationArrow, FaMapMarkerAlt, FaStreetView } from 'react-icons/fa';
import MapLegend from './MapLegend';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create HTML Icon using React Icons
const createCustomIcon = (type) => {
    let IconComponent = FaMapMarkerAlt;

    if (type === 'Gynecologist') IconComponent = FaUserMd;
    else if (type === 'Hospital') IconComponent = FaHospital;
    else if (type === 'Clinic') IconComponent = FaClinicMedical;
    else if (type === 'Doctor') IconComponent = FaUserMd;

    const iconHtml = renderToStaticMarkup(<IconComponent />);

    return L.divIcon({
        html: `<div class="custom-pin-marker"><div class="pin-icon">${iconHtml}</div></div>`,
        className: 'custom-pin-container', // Wrapper class to avoid default styles interfering
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -40]
    });
};

const mapIcons = {
    Gynecologist: createCustomIcon('Gynecologist'),
    Hospital: createCustomIcon('Hospital'),
    Clinic: createCustomIcon('Clinic'),
    Doctor: createCustomIcon('Doctor'),
    default: createCustomIcon('default')
};

// Stable Cluster Icon
const createClusterCustomIcon = (cluster) => {
    return L.divIcon({
        html: `<div class="cluster-inner">${cluster.getChildCount()}</div>`,
        className: 'marker-cluster-custom',
        iconSize: L.point(32, 32, true),
        iconAnchor: [16, 16]
    });
};

// Custom User Location Icon
const userIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center w-6 h-6">
            <div class="absolute w-full h-full bg-blue-400/50 rounded-full animate-ping"></div>
            <div class="relative z-10 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
        </div>
    `,
    className: 'custom-user-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

// Map Events for "Search this area" & Initial Bounds
const MapEvents = ({ onMoveEnd }) => {
    const map = useMapEvents({
        moveend: () => {
            onMoveEnd(map.getBounds());
        },
    });

    useEffect(() => {
        if (map) {
            onMoveEnd(map.getBounds());
        }
    }, [map, onMoveEnd]);

    return null;
};

// Map Updater for center changes
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            const current = map.getCenter();
            const dist = map.distance(current, center);
            if (dist > 10) {
                map.flyTo(center, 16, { duration: 1.5 }); // Closer zoom on select
            }
        }
    }, [center, map]);
    return null;
};

// Recenter Button Component
const RecenterButton = ({ userLocation }) => {
    const map = useMap();

    const handleRecenter = () => {
        if (userLocation) {
            map.flyTo(userLocation, 15, { duration: 1.5 });
        }
    };

    if (!userLocation) return null;

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control">
                <button
                    onClick={handleRecenter}
                    className="bg-white text-gray-700 hover:text-[#e6007e] w-[34px] h-[34px] flex items-center justify-center shadow-md rounded-md transition-colors"
                    title="Recenter Map"
                    style={{ marginBottom: '80px', marginRight: '10px', pointerEvents: 'auto' }}
                >
                    <FaLocationArrow size={14} />
                </button>
            </div>
        </div>
    );
};

const MapComponent = ({ center, markers, onMarkerClick, userLocation, onBoundsChange, showSearchButton, onSearchArea, selectedFacility }) => {
    const markerRefs = useRef({});

    // Open popup when selectedFacility changes
    useEffect(() => {
        if (selectedFacility && markerRefs.current[selectedFacility.id]) {
            const marker = markerRefs.current[selectedFacility.id];
            marker.openPopup();
        }
    }, [selectedFacility]);

    const markerElements = useMemo(() => {
        return markers.map((marker) => (
            <Marker
                key={marker.id}
                position={[marker.lat, marker.lon]}
                icon={mapIcons[marker.type] || mapIcons.default}
                eventHandlers={{
                    click: () => onMarkerClick(marker),
                }}
                ref={(el) => (markerRefs.current[marker.id] = el)}
            >
                <Popup>
                    <div className="font-poppins min-w-[220px] p-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 rounded-full bg-pink-50 text-[#e6007e]">
                                {marker.type === 'Gynecologist' ? <FaUserMd /> :
                                    marker.type === 'Hospital' ? <FaHospital /> :
                                        <FaClinicMedical />}
                            </span>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm leading-tight">{marker.name}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-wide text-[#e6007e]">{marker.type}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3 leading-relaxed">{marker.address}</p>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${marker.lat},${marker.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full bg-[#e6007e] !text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#cc0070] transition-colors items-center justify-center gap-1"
                        >
                            <FaDirections className="text-white" /> Get Directions
                        </a>
                    </div>
                </Popup>
            </Marker>
        ));
    }, [markers, onMarkerClick]);

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full rounded-xl z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={center} />
                <MapEvents onMoveEnd={onBoundsChange} />

                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={userIcon}
                    >
                        <Popup>
                            <div className="font-poppins p-1 text-center">
                                <h3 className="font-bold text-blue-600 text-sm whitespace-nowrap">You are here</h3>
                            </div>
                        </Popup>
                    </Marker>
                )}

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                    spiderfyOnMaxZoom={true}
                    spiderfyDistanceMultiplier={2}
                    showCoverageOnHover={false}
                    maxClusterRadius={60}
                    animate={true}
                >
                    {markerElements}
                </MarkerClusterGroup>

                <MapLegend />
                <RecenterButton userLocation={userLocation} />
            </MapContainer>

            {showSearchButton && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
                    <button
                        onClick={onSearchArea}
                        className="bg-white text-[#e6007e] px-5 py-2.5 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-50 hover:scale-105 transition-all animate-fade-in-up border border-pink-100"
                    >
                        <FaSearchLocation />
                        Search this area
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
