import React, { useState } from 'react';
import { FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MapLegend = () => {
    const [isOpen, setIsOpen] = useState(true);

    const items = [
        { label: 'Gynecologist', icon: '/icons/gynecology.svg' },
        { label: 'Hospital', icon: '/icons/hospital.svg' },
        { label: 'Clinic', icon: '/icons/clinic.svg' },
        { label: 'Doctor', icon: '/icons/doctor.svg' },
    ];

    return (
        <div className="absolute bottom-6 left-6 z-[1000] font-poppins">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg text-[#e6007e] border border-pink-100 mb-2 hover:bg-pink-50 transition-colors"
                aria-label="Toggle Legend"
            >
                {isOpen ? <FaChevronDown /> : <FaInfoCircle />}
            </button>

            {/* Legend Card */}
            <div className={`
        bg-white/90 backdrop-blur-md border border-pink-100 rounded-2xl shadow-lg p-4 w-48
        transition-all duration-300 origin-bottom-left
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute bottom-0'}
      `}>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b border-pink-100 pb-2">
                    Legend
                </h4>
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.label} className="flex items-center gap-3 group">
                            <img
                                src={item.icon}
                                alt={item.label}
                                className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
                            />
                            <span className="text-xs font-medium text-gray-700">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapLegend;
