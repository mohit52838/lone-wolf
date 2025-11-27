import React from 'react';
import { FaSearch, FaFilter, FaCheckCircle, FaUserMd } from 'react-icons/fa';

const VideosSidebar = ({
    categories,
    selectedCategory,
    onSelectCategory,
    showOfficialOnly,
    onToggleOfficial,
    searchQuery,
    onSearchChange
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-pink-50 p-5 sticky top-24">
            <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaSearch className="text-[#e6007e]" /> Search
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-[#e6007e] text-sm transition-all"
                    />
                    <FaSearch className="absolute left-3.5 top-3 text-gray-400 text-sm" />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaFilter className="text-[#e6007e]" /> Filters
                </h3>

                {/* Official Toggle */}
                <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg mb-4 hover:bg-pink-50 transition-colors group">
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className={`text-sm ${showOfficialOnly ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Official Sources Only</span>
                    </div>
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={showOfficialOnly}
                            onChange={(e) => onToggleOfficial(e.target.checked)}
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${showOfficialOnly ? 'bg-[#e6007e]' : 'bg-gray-300'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showOfficialOnly ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                </label>

                {/* Categories */}
                <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</h4>
                    <button
                        onClick={() => onSelectCategory('All')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === 'All'
                            ? 'bg-[#e6007e] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        All Categories
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                                ? 'bg-[#e6007e] text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start gap-2">
                    <FaUserMd className="text-blue-500 mt-0.5" />
                    <div>
                        <h4 className="text-xs font-bold text-blue-800 mb-1">Expert Verified</h4>
                        <p className="text-[11px] text-blue-700 leading-relaxed">
                            We prioritize content from WHO, government health ministries, and certified medical professionals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideosSidebar;
