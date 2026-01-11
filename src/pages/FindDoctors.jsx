import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MapComponent from '../components/MapComponent';
import ResultCard from '../components/ResultCard';
import { fetchNearbyHealthcare } from '../utils/overpassApi';
import { FaMapMarkerAlt, FaSpinner, FaSearch } from 'react-icons/fa';

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
        let watchId;
        let hasFetched = false;

        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userLoc = [latitude, longitude];

                    // Always update user marker position as it refines
                    setLocation(userLoc);

                    // Only center map and fetch facilities on the first fix
                    if (!hasFetched) {
                        setMapCenter(userLoc);
                        fetchFacilities(latitude, longitude, DEFAULT_RADIUS);
                        hasFetched = true;
                    }
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    // Only show error if we haven't fetched anything yet
                    if (!hasFetched) {
                        setError("Location access denied. Using default location.");
                        setLoading(false);
                        fetchFacilities(18.5204, 73.8567, DEFAULT_RADIUS);
                        hasFetched = true;
                    }
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 20000
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }

        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    const fetchFacilities = async (lat, lng, rad, bounds = null) => {
        setLoading(true);
        setShowSearchButton(false);
        try {
            const data = await fetchNearbyHealthcare(lat, lng, rad, bounds);
            setFacilities(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch nearby facilities.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchArea = useCallback(() => {
        if (loading) return;
        if (mapBounds) {
            const center = mapBounds.getCenter();
            fetchFacilities(center.lat, center.lng, DEFAULT_RADIUS, {
                south: mapBounds.getSouth(),
                west: mapBounds.getWest(),
                north: mapBounds.getNorth(),
                east: mapBounds.getEast()
            });
        }
    }, [mapBounds, loading]);

    const handleBoundsChange = (bounds) => {
        setMapBounds(bounds);
        setShowSearchButton(true);
    };

    const handleFacilityClick = useCallback((facility) => {
        setSelectedFacility(facility);
        setMapCenter([facility.lat, facility.lon]);
    }, []);

    const handleFilterChange = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const [searchQuery, setSearchQuery] = useState('');

    // Debounced Auto-Search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length > 2) {
                handleSearchArea();
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [searchQuery, handleSearchArea]);

    const filteredFacilities = useMemo(() => {
        return facilities.filter(f => {
            if (f.type === 'Gynecologist' && !filters.Gynecologist) return false;
            if (f.type === 'Hospital' && !filters.Hospital) return false;
            if (f.type === 'Clinic' && !filters.Clinic) return false;
            if (f.type === 'Doctor' && !filters.Doctor) return false;

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return f.name.toLowerCase().includes(query) ||
                    f.address.toLowerCase().includes(query);
            }
            return true;
        });
    }, [facilities, filters, searchQuery]);

    return (
        <div className="min-h-screen pt-32 pb-10 px-4 sm:px-6 lg:px-8 font-sans h-screen flex flex-col">

            {/* Header Area with Search Bar */}
            <div className="max-w-7xl mx-auto w-full mb-6 flex-shrink-0 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="w-full md:w-[35%] lg:w-[30%]">
                    <span className="text-xs font-bold tracking-widest text-[var(--primary-color)] uppercase mb-2 block">Care Finder</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none">Find a Doctor</h1>
                </div>

                {/* Search Bar - Aligned with Map Column */}
                <div className="w-full md:w-[65%] lg:w-[70%] relative z-30">
                    <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search for clinic, hospital, address..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchArea()}
                            className="w-full pl-10 pr-12 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e6007e] focus:border-transparent transition-all text-sm font-medium placeholder-gray-400 bg-white"
                        />
                        <button
                            onClick={handleSearchArea}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#e6007e] text-white p-2 rounded-xl hover:bg-[#d40073] transition-colors shadow-md"
                            disabled={loading}
                        >
                            {loading ? <FaSpinner className="animate-spin" size={14} /> : <FaSearch size={14} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-6 flex-grow overflow-hidden pb-6">

                {/* Sidebar - Results List */}
                <div className="w-full md:w-[35%] lg:w-[30%] flex flex-col bg-white rounded-3xl shadow-soft z-20 order-2 md:order-1 h-full overflow-hidden border border-gray-100">
                    {/* Header & Filters */}
                    <div className="p-4 border-b border-gray-100 bg-white">
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(filters).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleFilterChange(type)}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${filters[type]
                                        ? 'bg-rose-500 text-white shadow-md'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-3">
                                <FaSpinner className="animate-spin text-rose-400" size={24} />
                                <p className="text-sm text-gray-400">Finding nearby care...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center p-6 text-rose-600 border border-rose-100 bg-rose-50 rounded-xl text-sm leading-relaxed">
                                {error}
                            </div>
                        ) : filteredFacilities.length === 0 ? (
                            <div className="text-center p-8 text-gray-400">
                                <FaMapMarkerAlt className="mx-auto mb-3 text-gray-300" size={24} />
                                <p className="mb-2">No facilities found here.</p>
                                <p className="text-xs">Try moving the map to a populated area.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                                    {filteredFacilities.length} Results
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

                {/* Right Column: Map Only (Restored Height) */}
                <div className="w-full md:w-[65%] lg:w-[70%] relative z-10 order-1 md:order-2 h-[400px] md:h-full bg-gray-100 rounded-3xl overflow-hidden shadow-inner border border-gray-200">
                    <MapComponent
                        center={mapCenter}
                        markers={filteredFacilities}
                        onMarkerClick={handleFacilityClick}
                        userLocation={location}
                        onBoundsChange={handleBoundsChange}
                        showSearchButton={showSearchButton}
                        onSearchArea={handleSearchArea}
                        selectedFacility={selectedFacility}
                    />
                </div>
            </div>
        </div>
    );
};

export default FindDoctors;
