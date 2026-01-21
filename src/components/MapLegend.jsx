import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaUserMd, FaHospital, FaClinicMedical } from 'react-icons/fa';

const MapLegend = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

    const items = [
        { label: 'Gynecologist', icon: <FaUserMd />, color: 'bg-pink-100 text-[#e6007e]' },
        { label: 'Hospital', icon: <FaHospital />, color: 'bg-pink-100 text-[#e6007e]' },
        { label: 'Clinic', icon: <FaClinicMedical />, color: 'bg-pink-100 text-[#e6007e]' },
        { label: 'Doctor', icon: <FaUserMd />, color: 'bg-pink-100 text-[#e6007e]' },
    ];

    return (
        <div className="absolute bottom-5 left-4 z-[1000] font-poppins flex flex-col items-start gap-2">

            {/* Legend Card - Slide Transition */}
            <div
                className={`
                    bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl shadow-xl overflow-hidden
                    transition-all duration-500 ease-in-out origin-bottom-left
                    ${isOpen ? 'max-h-[300px] opacity-100 translate-y-0 w-36' : 'max-h-0 opacity-0 translate-y-4 w-36 border-none'}
                `}
            >
                <div className="p-3">
                    <div className="flex justify-between items-center mb-2 border-b border-pink-100 pb-2">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Legend
                        </h4>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-[#e6007e] transition-colors p-0.5"
                            title="Minimize"
                        >
                            <FaChevronDown size={10} />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 group">
                                <span className={`p-1 rounded-full ${item.color} text-[10px] shadow-sm`}>
                                    {item.icon}
                                </span>
                                <span className="text-[11px] font-semibold text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Toggle Button (Visible only when closed) */}
            <button
                onClick={() => setIsOpen(true)}
                className={`
                    bg-white text-[#e6007e] font-bold text-xs uppercase tracking-wider
                    px-4 py-2 rounded-full shadow-lg border border-pink-100
                    flex items-center gap-2 hover:bg-pink-50 transition-all duration-300
                    ${isOpen ? 'translate-y-10 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
                `}
            >
                <FaChevronUp /> Legend
            </button>
        </div>
    );
};

export default MapLegend;
