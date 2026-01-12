import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
    const [searchQuery, setSearchQuery] = useState('');
    const searchQueryRef = useRef(searchQuery);
    const lastManualSearchTimeRef = useRef(0);

    // Keep ref updated
    useEffect(() => {
        searchQueryRef.current = searchQuery;
    }, [searchQuery]);

    // Filters
    const [filters, setFilters] = useState({
        Gynecologist: true,
        Hospital: true,
        Clinic: true,
        Doctor: true
    });

    const DEFAULT_RADIUS = 5000;

    // Robust Location Strategy: High Acc -> Low Acc -> Default
    useEffect(() => {
        let isMounted = true;

        const handleSuccess = (position, source) => {
            if (!isMounted) return;
            const { latitude, longitude } = position.coords;
            const userLoc = [latitude, longitude];
            console.log(`Location found via ${source}:`, userLoc);

            setLocation(userLoc);
            setMapCenter(userLoc); // Center map on user
            setLoading(false); // Stop loading spinner

            // Check if user has already typed a search while we were finding location
            const currentQuery = searchQueryRef.current;
            if (currentQuery && currentQuery.trim().length > 0) {
                console.log("Preserving user search with new location:", currentQuery);
                fetchFacilities(latitude, longitude, 20000, null, currentQuery);
            } else {
                fetchFacilities(latitude, longitude, DEFAULT_RADIUS);
            }
        };

        const handleDefault = (reason) => {
            if (!isMounted) return;
            console.warn("Using default location:", reason);
            setError(`Could not detect precise location (${reason}). Showing Pune.`);
            setLoading(false);

            // Default: Pune
            const defaultLoc = [18.5204, 73.8567];
            setMapCenter(defaultLoc);
            fetchFacilities(defaultLoc[0], defaultLoc[1], DEFAULT_RADIUS);
        };

        // Step 2: Low Accuracy (IP/Cell) - usually fast & "good enough" for city level
        const tryLowAccuracy = () => {
            console.log("Trying low accuracy location...");
            navigator.geolocation.getCurrentPosition(
                (pos) => handleSuccess(pos, 'Low Accuracy'),
                (err) => handleDefault("Location unavailable"),
                {
                    enableHighAccuracy: false,
                    timeout: 8000,
                    maximumAge: 300000 // 5 minutes cached is fine
                }
            );
        };

        // Step 1: High Accuracy (GPS) - try this first
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => handleSuccess(pos, 'High Accuracy'),
                (err) => {
                    console.warn("High accuracy failed, falling back to low accuracy...", err.message);
                    tryLowAccuracy();
                },
                {
                    enableHighAccuracy: true,
                    timeout: 6000, // Give GPS 6s to warm up
                    maximumAge: 0
                }
            );
        } else {
            handleDefault("Geolocation not supported");
        }

        return () => { isMounted = false; };
    }, []);

    // Manual "Locate Me" trigger with Fallback Strategy
    const handleLocateMe = useCallback(() => {
        setLoading(true);
        setError(null);

        const successHandler = (position) => {
            const { latitude, longitude } = position.coords;
            const userLoc = [latitude, longitude];
            setLocation(userLoc);
            setMapCenter(userLoc);
            setError(null);
            setLoading(false); // Ensure loading stops
            setLoading(false); // Ensure loading stops

            // Check if user has already typed a search
            const currentQuery = searchQueryRef.current;
            if (currentQuery && currentQuery.trim().length > 0) {
                fetchFacilities(latitude, longitude, 20000, null, currentQuery);
            } else {
                fetchFacilities(latitude, longitude, DEFAULT_RADIUS);
            }
        };

        const tryLowAccuracy = () => {
            navigator.geolocation.getCurrentPosition(
                successHandler,
                (finalErr) => {
                    console.error("Final location error:", finalErr);
                    let errorMessage = "Could not retrieve your specific location.";
                    if (finalErr.code === 1) errorMessage = "Location permission denied.";
                    else if (finalErr.code === 3) errorMessage = "Location request timed out.";

                    setError(`${errorMessage} Defaulting to Pune.`);
                    setLoading(false);
                },
                { enableHighAccuracy: false, timeout: 8000, maximumAge: 0 }
            );
        };

        // Attempt 1: High Accuracy
        navigator.geolocation.getCurrentPosition(
            successHandler,
            (err) => {
                console.warn("Manual high accuracy failed, trying low accuracy...", err);
                tryLowAccuracy();
            },
            { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
        );
    }, []);

    const fetchFacilities = async (lat, lng, rad, bounds = null, term = '') => {
        setLoading(true);
        setShowSearchButton(false);
        try {
            const data = await fetchNearbyHealthcare(lat, lng, rad, bounds, term);
            setFacilities(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch nearby facilities.");
        } finally {
            setLoading(false);
        }
    };

    // Keep a ref for loading to avoid dependency cycles in callbacks
    const loadingRef = useRef(loading);
    useEffect(() => {
        loadingRef.current = loading;
    }, [loading]);

    const handleSearchArea = useCallback(() => {
        if (loadingRef.current) return;

        // Smart Search Logic:
        // 1. If user typed a query, search wider (20km) around the current view center.
        //    This fixes the "Can't find Meera Hospital from Shivajinagar" issue.
        // 2. If no query, just search the visible bounds.

        if (searchQuery && searchQuery.trim().length > 0) {
            console.log("Expanding search radius for query:", searchQuery);
            // FIX: Use the explicit map bounds center if available, otherwise fallback to state center
            let center = mapCenter;
            if (mapBounds) {
                const c = mapBounds.getCenter();
                center = [c.lat, c.lng];
            }
            fetchFacilities(center[0], center[1], 20000, null, searchQuery); // 20km radius
        } else {
            // Standard "Search user's view"
            let currentBounds = mapBounds;
            if (currentBounds) {
                const center = currentBounds.getCenter();
                fetchFacilities(center.lat, center.lng, DEFAULT_RADIUS, {
                    south: currentBounds.getSouth(),
                    west: currentBounds.getWest(),
                    north: currentBounds.getNorth(),
                    east: currentBounds.getEast()
                }, '');
            }
        }
    }, [mapBounds, searchQuery, mapCenter]);

    const triggerManualSearch = () => {
        lastManualSearchTimeRef.current = Date.now();
        handleSearchArea();
    };

    const handleBoundsChange = useCallback((bounds) => {
        setMapBounds(bounds);
        setShowSearchButton(true);
    }, []);

    const handleFacilityClick = useCallback((facility) => {
        setSelectedFacility(facility);
        setMapCenter([facility.lat, facility.lon]);
    }, []);

    const handleFilterChange = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    // Debounced Auto-Search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length > 2) {
                // Prevent auto-search if a manual search happened recently (<1s ago)
                if (Date.now() - lastManualSearchTimeRef.current > 1000) {
                    handleSearchArea();
                }
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
                            onKeyDown={(e) => e.key === 'Enter' && triggerManualSearch()}
                            className="w-full pl-10 pr-12 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e6007e] focus:border-transparent transition-all text-sm font-medium placeholder-gray-400 bg-white"
                        />
                        <button
                            onClick={triggerManualSearch}
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
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 relative min-h-[200px]">
                        {/* Loading Overlay - Shown when refreshing results */}
                        {loading && (
                            <div className="absolute inset-0 bg-white/60 z-50 flex flex-col items-center justify-center backdrop-blur-[1px] transition-all duration-300">
                                <FaSpinner className="animate-spin text-[#e6007e]" size={28} />
                                <p className="text-xs font-bold text-[#e6007e] mt-3 tracking-widest uppercase">Finding nearby care...</p>
                            </div>
                        )}

                        {error ? (
                            <div className="text-center p-6 text-rose-600 border border-rose-100 bg-rose-50 rounded-xl text-sm leading-relaxed">
                                {error}
                            </div>
                        ) : filteredFacilities.length === 0 && !loading ? (
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
                    {error && error.includes("default") && (
                        <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 text-xs px-4 py-2 text-center z-[500] border-b border-yellow-200">
                            <strong>Note:</strong> We couldn't find your precise location. Showing default area (Pune). Click the location arrow to try again.
                        </div>
                    )}
                    <MapComponent
                        center={mapCenter}
                        markers={filteredFacilities}
                        onMarkerClick={handleFacilityClick}
                        userLocation={location}
                        onBoundsChange={handleBoundsChange}
                        showSearchButton={showSearchButton}
                        onSearchArea={handleSearchArea}
                        selectedFacility={selectedFacility}
                        onLocate={handleLocateMe}
                    />
                </div>
            </div>
        </div>
    );
};

export default FindDoctors;
