import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { chapters } from '../data/chapters';
import TOC from '../components/TOC';
import { FaArrowLeft, FaArrowRight, FaBookOpen } from 'react-icons/fa';

const ChapterPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const chapter = chapters.find(c => c.id === parseInt(id));

    useEffect(() => {
        const loadContent = async () => {
            if (!chapter) {
                setError('Chapter not found');
                setLoading(false);
                return;
            }

            try {
                const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' });
                const path = `../content/${chapter.file}`;

                if (modules[path]) {
                    const text = await modules[path]();
                    setContent(marked(text));
                } else {
                    const response = await fetch(`/src/content/${chapter.file}`);
                    if (!response.ok) throw new Error('Failed to load chapter content');
                    const text = await response.text();
                    setContent(marked(text));
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [id, chapter]);

    if (!chapter) return null;

    return (
        <div className="min-h-screen pt-32 pb-24">
            {/* Soft Header */}
            <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
                <Link to="/chapters" className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-bold mb-8 hover:bg-rose-100 transition-colors">
                    <FaArrowLeft size={10} /> Back to Library
                </Link>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    {chapter.title}
                </h1>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                    {chapter.description}
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 justify-center">

                    {/* Sidebar (TOC) */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 pt-2 sticky top-32 h-fit">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <FaBookOpen /> Contents
                            </div>
                            <TOC content={content} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow max-w-[680px] mx-auto px-4 md:px-0">
                        <div className="space-y-12">
                            {content.split('<h2').map((section, index) => {
                                // First part might be empty text before first H2, usually intro
                                if (!section.trim()) return null;

                                // Prepend <h2 back if it's not the very first intro text (which won't have it if split removed it)
                                // If index > 0, it definitely had an H2
                                const sectionContent = index === 0 && !content.startsWith('<h2')
                                    ? section
                                    : `<h2${section}`;

                                return (
                                    <div key={index} className="chapter-section-card bg-white p-8 md:p-10 rounded-2xl border border-rose-50 shadow-sm">
                                        <article className="prose prose-lg max-w-none
                                                prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-headings:leading-tight 
                                                prose-h2:text-3xl prose-h2:mt-4 prose-h2:mb-8 prose-h2:tracking-tight prose-h2:first:mt-0
                                                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-rose-700
                                                prose-p:text-slate-700 prose-p:leading-8 prose-p:mb-6 prose-p:text-[1.05rem] prose-p:font-normal
                                                prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-6
                                                prose-li:text-slate-700 prose-li:leading-relaxed prose-li:pl-0
                                                prose-strong:text-slate-900 prose-strong:font-bold
                                                prose-blockquote:bg-rose-50/50 prose-blockquote:border-l-4 prose-blockquote:border-rose-300 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-10
                                                prose-a:text-rose-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline">
                                            <div dangerouslySetInnerHTML={{ __html: sectionContent }} />
                                        </article>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Nav */}
                        <div className="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
                            {chapter.id > 1 ? (
                                <Link to={`/chapter/${chapter.id - 1}`} className="text-gray-500 hover:text-rose-600 font-medium flex items-center gap-3 transition-colors">
                                    <FaArrowLeft size={12} /> Previous
                                </Link>
                            ) : <div />}

                            {chapter.id < chapters.length && (
                                <Link to={`/chapter/${chapter.id + 1}`} className="btn-primary text-white px-6 py-3 text-sm flex items-center gap-2 shadow-soft hover:shadow-lg">
                                    Next Chapter <FaArrowRight size={12} />
                                </Link>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ChapterPage;
