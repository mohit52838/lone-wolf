import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';
import { FaArrowLeft, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

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

    if (!chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-bg px-6">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900">Chapter not found</h2>
                    <Link to="/chapters" className="text-brand-primary hover:underline mt-4 block font-medium">
                        Back to Chapters
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[var(--bg-color)] pb-20"
        >
            {/* Mobile Header */}
            <div className="bg-white border-b border-pink-100 pt-24 pb-8 px-5">
                <Link to="/chapters" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-primary mb-6 transition-colors bg-gray-50 px-4 py-2 rounded-full font-medium">
                    <FaArrowLeft className="mr-2 text-xs" />
                    Back
                </Link>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-3 font-display leading-tight">
                    <span className="block text-brand-primary text-xs font-bold mb-2 uppercase tracking-widest">Chapter {chapter.id}</span>
                    {chapter.title}
                </h1>
                <p className="text-base text-slate-600 leading-relaxed">
                    {chapter.description}
                </p>
            </div>

            <div className="px-5 mt-8">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-primary"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-5 rounded-xl text-center border border-red-100 text-sm">
                        {error}
                    </div>
                ) : (
                    <article className="prose prose-pink max-w-none leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-pink-50">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </article>
                )}

                {/* Mobile Navigation Footer */}
                <div className="mt-8 flex justify-between items-center gap-4">
                    {chapter.id > 1 ? (
                        <Link to={`/chapter/${chapter.id - 1}`} className="flex-1 flex flex-col items-start p-4 bg-white border border-pink-100 rounded-xl shadow-sm active:scale-95 transition-transform">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-bold">Previous</span>
                            <span className="text-slate-900 font-bold text-sm flex items-center">
                                <FaChevronLeft className="mr-1 text-xs" />
                                Ch. {chapter.id - 1}
                            </span>
                        </Link>
                    ) : <div className="flex-1"></div>}

                    {chapter.id < 10 ? (
                        <Link to={`/chapter/${chapter.id + 1}`} className="flex-1 flex flex-col items-end p-4 bg-white border border-pink-100 rounded-xl shadow-sm active:scale-95 transition-transform">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-bold">Next</span>
                            <span className="text-slate-900 font-bold text-sm flex items-center">
                                Ch. {chapter.id + 1}
                                <FaChevronRight className="ml-1 text-xs" />
                            </span>
                        </Link>
                    ) : <div className="flex-1"></div>}
                </div>
            </div>
        </motion.div>
    );
};

export default ChapterPage;
