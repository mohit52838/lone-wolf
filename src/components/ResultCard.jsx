import React from 'react';
import { FaMapMarkerAlt, FaDirections, FaHospital, FaUserMd, FaClinicMedical } from 'react-icons/fa';

const ResultCard = ({ facility, isSelected, onClick }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'Gynecologist': return <FaUserMd className="text-rose-500" />;
            case 'Hospital': return <FaHospital className="text-rose-500" />;
            case 'Clinic': return <FaClinicMedical className="text-rose-500" />;
            default: return <FaMapMarkerAlt className="text-rose-500" />;
        }
    };

    const handleViewOnMap = (e) => {
        e.stopPropagation();
        onClick();
    };

    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border mb-3 ${isSelected
                ? 'bg-rose-50 border-rose-200 shadow-md transform scale-[1.02]'
                : 'bg-white border-gray-100 hover:border-rose-100 hover:shadow-soft'
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{facility.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-rose-50 text-rose-500 border border-rose-100`}>
                        <span className="mr-1.5">{getIcon(facility.type)}</span>
                        {facility.type}
                    </span>
                </div>
                {facility.distance !== null && (
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap ml-2 bg-gray-50 px-2 py-1 rounded-lg">
                        {facility.distance} km
                    </span>
                )}
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 mb-4 min-h-[2.5em] leading-relaxed">
                {facility.address}
            </p>

            <div className="flex gap-2 mt-auto">
                <button
                    onClick={handleViewOnMap}
                    className="flex-1 py-2 text-xs font-bold text-rose-600 border border-rose-100 bg-rose-50 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-200"
                >
                    View on Map
                </button>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2 text-xs font-bold text-gray-600 border border-gray-100 bg-white rounded-xl hover:bg-gray-50 hover:text-gray-900 hover:border-gray-200 transition-all duration-200 text-center flex items-center justify-center gap-1"
                >
                    <FaDirections /> Directions
                </a>
            </div>
        </div>
    );
};

export default ResultCard;
