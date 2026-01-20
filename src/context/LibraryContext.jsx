import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from '../components/Toast';

const LibraryContext = createContext();

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
};

export const LibraryProvider = ({ children }) => {
    // Initial state: load from localStorage or default to empty lists
    const [library, setLibrary] = useState(() => {
        try {
            const stored = localStorage.getItem('herhealth_library');
            return stored ? JSON.parse(stored) : { chapters: [], videos: [], expertTalks: [] };
        } catch (error) {
            console.error("Failed to load library:", error);
            return { chapters: [], videos: [], expertTalks: [] };
        }
    });

    const [toast, setToast] = useState(null);

    // Save to localStorage whenever library changes
    useEffect(() => {
        try {
            localStorage.setItem('herhealth_library', JSON.stringify(library));
        } catch (error) {
            console.error("Failed to save library:", error);
        }
    }, [library]);

    // Actions
    const saveItem = (item) => {
        if (!item.id || !item.type) return;

        setLibrary(prev => {
            const listKey = getListKey(item.type);
            if (!listKey) return prev;

            // Avoid duplicates
            if (prev[listKey].some(i => i.id === item.id)) return prev;

            // Trigger Toast
            const typeLabel = getTypeLabel(item.type);
            setToast(`Current ${typeLabel} is saved in Library`);

            return {
                ...prev,
                [listKey]: [...prev[listKey], item]
            };
        });
    };

    const removeItem = (id, type) => {
        setLibrary(prev => {
            const listKey = getListKey(type);
            if (!listKey) return prev;

            return {
                ...prev,
                [listKey]: prev[listKey].filter(item => item.id !== id)
            };
        });
    };

    const toggleSave = (item) => {
        if (isSaved(item.id, item.type)) {
            removeItem(item.id, item.type);
        } else {
            saveItem(item);
        }
    };

    const isSaved = (id, type) => {
        const listKey = getListKey(type);
        if (!listKey) return false;
        return library[listKey].some(item => item.id === id);
    };

    // Helper to map item types to state keys and labels
    const getListKey = (type) => {
        switch (type) {
            case 'chapter': return 'chapters';
            case 'video': return 'videos';
            case 'expertTalk': return 'expertTalks';
            default: return null;
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'chapter': return 'Chapter'; // User asked for "chapter", fits "Current Chapter is saved"
            case 'video': return 'Video';
            case 'expertTalk': return 'Expert Talk';
            default: return 'Item';
        }
    };

    return (
        <LibraryContext.Provider value={{ library, saveItem, removeItem, toggleSave, isSaved }}>
            {children}
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </LibraryContext.Provider>
    );
};
