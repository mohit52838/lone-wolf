import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { FaBookmark, FaRegBookmark, FaTrash, FaInbox } from 'react-icons/fa';
import VideoGrid from '../components/VideoGrid';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Library = () => {
    const { library, removeItem } = useLibrary();
    const [activeTab, setActiveTab] = useState('All');
    const navigate = useNavigate();

    // Flatten all items for 'All' view
    const allItems = [
        ...library.chapters,
        ...library.videos,
        ...library.expertTalks
    ];

    const getDisplayItems = () => {
        switch (activeTab) {
            case 'All': return allItems;
            case 'Chapters': return library.chapters;
            case 'Videos': return library.videos;
            case 'Expert Talks': return library.expertTalks;
            default: return [];
        }
    };

    const displayItems = getDisplayItems();

    const renderEmptyState = () => (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <FaBookmark size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Your library is empty</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Save guides, videos, and expert talks here to create your personal wellness collection.
            </p>
            <Link to="/chapters" className="text-[#e6007e] font-bold hover:underline">
                Explore Content →
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-24 bg-[var(--bg-color)]">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-display flex items-center gap-3">
                        <span className="text-[#e6007e]">
                            <FaBookmark />
                        </span>
                        Your Library
                    </h1>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm max-w-2xl border border-blue-100">
                        <span className="text-lg">🔒</span>
                        <p>
                            <strong>Privacy Note:</strong> Your saved items are stored locally on this device.
                            We do not track, sync, or see your personal library.
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-white/50 p-1 rounded-xl w-fit mb-8 border border-gray-200/50 backdrop-blur-sm">
                    {['All', 'Chapters', 'Videos', 'Expert Talks'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab
                                    ? 'bg-white text-[#e6007e] shadow-sm ring-1 ring-gray-200'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {displayItems.length === 0 ? renderEmptyState() : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayItems.map((item) => {
                            // Render Chapters
                            if (item.type === 'chapter') {
                                return (
                                    <div key={item.id} className="relative group">
                                        <Link to={`/chapter/${item.id}`} className="block h-full">
                                            <Card className="h-full !p-0 !overflow-hidden hover:shadow-md transition-all">
                                                <div className="h-32 bg-gray-200 relative">
                                                    {item.image && (
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                    )}
                                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                                        Guide
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                                                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{item.description}</p>
                                                    <div className="flex items-center text-xs font-bold text-[#e6007e]">
                                                        Read Guide
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                        {/* Remove Button */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeItem(item.id, item.type);
                                            }}
                                            className="absolute bottom-4 right-4 text-gray-400 hover:text-red-500 bg-white rounded-full p-2 shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove from library"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                );
                            }

                            // Render Videos / Expert Talks
                            // Reusing video-like rendering logic for simplified view, 
                            // or we can reuse VideoCard if we modify it to handle non-video objects cleanly.
                            // For consistency, let's create a simple card here.
                            return (
                                <div key={item.id} className="relative group">
                                    {/* Fake Card wrapper to match style */}
                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                                        <div className="relative aspect-video bg-gray-100 cursor-pointer" onClick={() => { /* Handle Play logic if complex, or just link? For now assume it was viewed in modal context, but from library we might want to pass it to a global player? 
                                            Actually user asked for "My Library" to list valid items. 
                                            Since we don't have a global player context easily accessible without refactor, 
                                            we might need to keep it simple.
                                            Let's use VideoCard component if possible, but we need to mock "onPlay".
                                            However, `item` here stores minimal data. Attempting to use VideoGrid might be better if we have full objects.
                                            
                                            Wait, our saveItem stores FULL item usually. 
                                            Let's try to reuse VideoGrid logic OR just render simple cards that don't play but maybe show metadata?
                                            User goal: "View later". 
                                            Let's allow removing. Playing might require restoring the context.
                                            For now, let's render a visually complete card.
                                        */}}>
                                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 right-2 bg-black/60 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                                {item.duration}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                                                {/* We can't easily play from here without the Modal state from generic pages. 
                                                     For this iteration, we will simply allow removing. 
                                                     Improvements: Navigation to source page? 
                                                     Let's keeping it simple: Just visual representation. 
                                                  */}
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-bold text-[#e6007e] bg-pink-50 px-2 py-0.5 rounded-full uppercase">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{item.title}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-1">{item.source}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id, item.type)}
                                            className="absolute bottom-4 right-4 text-gray-400 hover:text-red-500 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove from library"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;
