import React, { useState, useEffect, useMemo } from 'react';
import { FaSearchLocation, FaExclamationTriangle, FaFilter, FaMapMarkerAlt } from 'react-icons/fa';
import MapComponent from '../components/MapComponent';
import ResultCard from '../components/ResultCard';
import { fetchNearbyHealthcare } from '../utils/overpassApi';

const FindDoctors = () => {
    const [location, setLocation] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [mapCenter, setMapCenter] = useState([18.5204, 73.8567]); // Default to Pune
    const [mapBounds, setMapBounds] = useState(null);
    const [showSearchButton, setShowSearchButton] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        Gynecologist: true,
        Hospital: true,
        Clinic: true,
        Doctor: true
    });

    const DEFAULT_RADIUS = 5000;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userLoc = [latitude, longitude];
                    setLocation(userLoc);
                    setMapCenter(userLoc);
                    fetchFacilities(latitude, longitude, DEFAULT_RADIUS);
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    setError("Location access denied. Showing default location.");
                    setLoading(false);
                    fetchFacilities(18.5204, 73.8567, DEFAULT_RADIUS);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    const fetchFacilities = async (lat, lng, rad, bounds = null) => {
        setLoading(true);
        setShowSearchButton(false);
        try {
            const data = await fetchNearbyHealthcare(lat, lng, rad, bounds);
            setFacilities(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch nearby facilities. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchArea = () => {
        if (mapBounds) {
            const center = mapBounds.getCenter();
            fetchFacilities(center.lat, center.lng, DEFAULT_RADIUS, {
                south: mapBounds.getSouth(),
                west: mapBounds.getWest(),
                north: mapBounds.getNorth(),
                east: mapBounds.getEast()
            });
        }
    };

    const handleBoundsChange = (bounds) => {
        setMapBounds(bounds);
        setShowSearchButton(true);
    };

    const handleFacilityClick = (facility) => {
        setSelectedFacility(facility);
        setMapCenter([facility.lat, facility.lon]);
    };

    const handleFilterChange = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const filteredFacilities = useMemo(() => {
        return facilities.filter(f => {
            if (f.type === 'Gynecologist' && !filters.Gynecologist) return false;
            if (f.type === 'Hospital' && !filters.Hospital) return false;
            if (f.type === 'Clinic' && !filters.Clinic) return false;
            if (f.type === 'Doctor' && !filters.Doctor) return false;
            return true;
        });
    }, [facilities, filters]);

    return (
        <div className="min-h-screen bg-[#fff5fa] pt-24 pb-10 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

                {/* Sidebar - Results List (Left on Desktop) */}
                <div className="w-full md:w-[35%] lg:w-[28%] flex flex-col bg-white rounded-2xl shadow-xl z-20 order-2 md:order-1 h-[50vh] md:h-[75vh] border border-pink-100 overflow-hidden">
                    {/* Header & Filters */}
                    <div className="p-4 border-b border-pink-100 bg-white">
                        <h1 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="text-[#e6007e]">Find</span> Doctors
                        </h1>

                        {/* Filters */}
                        <div className="flex flex-col gap-3">
                            {/* Type Filters (Chips) */}
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(filters).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleFilterChange(type)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${filters[type]
                                            ? 'bg-[#e6007e] text-white border-[#e6007e] shadow-md transform scale-105'
                                            : 'bg-pink-50 text-gray-600 border-pink-100 hover:bg-pink-100'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-pink-200">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e6007e]"></div>
                                <p className="text-sm text-gray-500 animate-pulse">Finding nearby care...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100 mx-2">
                                <p className="text-red-600 text-sm font-medium mb-2">{error}</p>
                                <button
                                    onClick={() => fetchFacilities(mapCenter[0], mapCenter[1], DEFAULT_RADIUS)}
                                    className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : filteredFacilities.length === 0 ? (
                            <div className="text-center p-8 text-gray-500">
                                <p className="mb-2">No facilities found nearby.</p>
                                <p className="text-xs">Try increasing the search radius or moving the map.</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
                                    {filteredFacilities.length} Results Nearby
                                </p>
                                {filteredFacilities.map((facility) => (
                                    <ResultCard
                                        key={facility.id}
                                        facility={facility}
                                        isSelected={selectedFacility?.id === facility.id}
                                        onClick={() => handleFacilityClick(facility)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Container (Right on Desktop) */}
                <div className="w-full md:w-[65%] lg:w-[72%] relative z-10 order-1 md:order-2 h-[50vh] md:h-[75vh] rounded-2xl overflow-hidden shadow-xl border border-pink-100">
                    <MapComponent
                        center={mapCenter}
                        markers={filteredFacilities}
                        onMarkerClick={handleFacilityClick}
                        userLocation={location}
                        onBoundsChange={handleBoundsChange}
                        showSearchButton={showSearchButton}
                        onSearchArea={handleSearchArea}
                    />

                    {/* Location Permission Banner */}
                    {error && error.includes("Location access denied") && (
                        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white p-4 rounded-xl shadow-xl border-l-4 border-yellow-400 z-[1000] animate-fade-in-up">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-1">Location Access Needed</h3>
                                    <p className="text-xs text-gray-600">Please enable location access to find doctors near you.</p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindDoctors;
