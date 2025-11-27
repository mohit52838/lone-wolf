import React from 'react';
import { FaMapMarkerAlt, FaDirections, FaHospital, FaUserMd, FaClinicMedical } from 'react-icons/fa';

const ResultCard = ({ facility, isSelected, onClick }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'Gynecologist': return <FaUserMd className="text-[#e6007e]" />;
            case 'Hospital': return <FaHospital className="text-[#e6007e]" />;
            case 'Clinic': return <FaClinicMedical className="text-[#e6007e]" />;
            default: return <FaMapMarkerAlt className="text-[#e6007e]" />;
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
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border mb-3 ${isSelected
                    ? 'bg-pink-50 border-[#e6007e] shadow-md transform scale-[1.01]'
                    : 'bg-white border-gray-100 hover:border-pink-200 hover:shadow-sm'
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{facility.name}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-pink-50 text-[#e6007e] border border-pink-100`}>
                        <span className="mr-1.5">{getIcon(facility.type)}</span>
                        {facility.type}
                    </span>
                </div>
                {facility.distance !== null && (
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap ml-2 bg-gray-50 px-1.5 py-0.5 rounded">
                        {facility.distance} km
                    </span>
                )}
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 mb-3 min-h-[2.5em]">
                {facility.address}
            </p>

            <div className="flex gap-2 mt-auto">
                <button
                    onClick={handleViewOnMap}
                    className="flex-1 py-1.5 text-xs font-medium text-[#e6007e] border border-pink-200 bg-pink-50 rounded-lg hover:bg-[#e6007e] hover:text-white hover:border-[#e6007e] transition-all duration-200"
                >
                    View on Map
                </button>
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 text-center flex items-center justify-center gap-1"
                >
                    <FaDirections /> Directions
                </a>
            </div>
        </div>
    );
};

export default ResultCard;
