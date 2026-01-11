import React from 'react';
import { FaMapMarkerAlt, FaDirections, FaHospital, FaUserMd, FaClinicMedical, FaStar } from 'react-icons/fa';

const ResultCard = ({ facility, isSelected, onClick }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'Gynecologist': return <FaUserMd className="text-[var(--primary-color)]" />;
            case 'Hospital': return <FaHospital className="text-[var(--primary-color)]" />;
            case 'Clinic': return <FaClinicMedical className="text-[var(--primary-color)]" />;
            default: return <FaMapMarkerAlt className="text-[var(--primary-color)]" />;
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
            className={`p-3 rounded-xl cursor-pointer transition-all duration-300 border mb-2 ${isSelected
                ? 'bg-[var(--secondary-color)] border-rose-200 shadow-md transform scale-[1.01]'
                : 'bg-white border-gray-100 hover:border-[var(--secondary-pink)] hover:shadow-soft'
                }`}
        >
            <div className="flex justify-between items-start mb-1.5">
                <div className="flex-1 min-w-0 pr-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-0.5 truncate">{facility.name}</h3>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-[var(--secondary-color)] text-[var(--primary-color)] border border-[var(--secondary-pink)]`}>
                        <span className="mr-1">{getIcon(facility.type)}</span>
                        {facility.type}
                    </span>
                </div>
                {facility.distance !== null && (
                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap ml-1 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
                        {facility.distance} km
                    </span>
                )}
            </div>

            <p className="text-[11px] text-gray-500 line-clamp-1 mb-2 leading-relaxed h-[1.5em]">
                {facility.address}
            </p>

            <div className="flex gap-2">
                <button
                    onClick={handleViewOnMap}
                    className="flex-1 py-1.5 text-[11px] font-bold text-rose-600 border border-rose-100 bg-rose-50 rounded-lg hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-200"
                >
                    View on Map
                </button>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-1.5 text-[11px] font-bold text-gray-600 border border-gray-100 bg-white rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-200 transition-all duration-200 text-center flex items-center justify-center gap-1"
                >
                    <FaDirections size={10} /> Directions
                </a>
            </div>
        </div>
    );
};

export default ResultCard;
