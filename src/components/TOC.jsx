import React, { useState, useEffect } from 'react';

const TOC = ({ content }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        // Query the DOM elements since the content is rendered dangerously
        const elements = Array.from(document.querySelectorAll('h2, h3'));
        const headingData = elements.map((elem, index) => {
            const id = elem.id || `heading-${index}`;
            elem.id = id; // Ensure ID exists
            return {
                id,
                text: elem.innerText,
                level: Number(elem.tagName.substring(1))
            };
        });
        setHeadings(headingData);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, [content]);

    if (headings.length === 0) return null;

    return (
        <nav className="toc-container p-6 bg-white rounded-xl shadow-sm border border-slate-100 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 font-display">
                On this page
            </h4>
            <ul className="space-y-3">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`text-sm transition-all duration-200 ${heading.level === 3 ? 'pl-4' : ''}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block border-l-2 pl-3 py-0.5 transition-colors ${activeId === heading.id
                                    ? 'border-brand-pink text-brand-pink font-semibold'
                                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TOC;
