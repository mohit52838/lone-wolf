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
        <nav className="toc-container sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 font-display pl-3">
                On this page
            </h4>
            <ul className="space-y-4">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`text-sm transition-all duration-300 ${heading.level === 3 ? 'pl-4' : ''}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block border-l-[3px] pl-4 py-1 transition-colors ${activeId === heading.id
                                ? 'border-brand-pink text-slate-900 font-medium'
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
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
