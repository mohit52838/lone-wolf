import React, { useEffect } from 'react';
import { FaCheckCircle, FaBookmark } from 'react-icons/fa';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[3000] animate-bounce-in-up">
            <div className="bg-white/90 backdrop-blur-md border border-pink-100 pl-4 pr-6 py-3 rounded-full shadow-[0_8px_30px_rgba(230,0,126,0.15)] flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-[#e6007e]">
                    <FaBookmark size={14} />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800">Saved to Library</p>
                    <p className="text-xs text-pink-600 font-medium">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Toast;
