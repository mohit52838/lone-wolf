import React from 'react';
import Card from '../components/Card';
import { FaUniversity, FaHospital, FaVideo, FaCheckCircle, FaShieldAlt, FaGlobe, FaUserMd } from 'react-icons/fa';

const OurSources = () => {
    return (
        <div className="min-h-screen bg-brand-bg pt-32 pb-24 px-6 relative">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-16 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
                    Transparency First
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
                    Our Trusted Sources
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    HerHealth is built on evidence-based information from globally trusted medical and academic institutions. We prioritize accuracy, science, and your safety above all else.
                </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-12">

                {/* Section 1: How We Choose Sources */}
                <Card title="How We Choose Sources" className="border-l-4 border-l-[var(--primary-color)]" disableReveal>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        To ensure the highest quality of health education, we adhere to a strict selection process. We do not accept content from unverified influencers or commercial entities. Our sources must be:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 text-xl">
                                <FaGlobe />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Government Health Bodies</h3>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3 text-xl">
                                <FaUniversity />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Academic Institutions</h3>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3 text-xl">
                                <FaShieldAlt />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Globally Recognized Research</h3>
                        </div>
                    </div>
                </Card>

                {/* Section 2: Source Categories */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 font-display flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center text-sm">
                            <FaCheckCircle />
                        </span>
                        Source Categories
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Medical & Government */}
                        <Card title="Medical & Government" className="h-full" disableReveal>
                            <div className="mb-6">
                                <p className="text-sm text-slate-500 mb-4">Evidence-based guidelines & public health research.</p>
                                <ul className="space-y-3">
                                    {[
                                        { name: 'World Health Organization (WHO)', url: 'https://www.who.int' },
                                        { name: 'Centers for Disease Control (CDC)', url: 'https://www.cdc.gov' },
                                        { name: 'National Institutes of Health (NIH)', url: 'https://www.nih.gov' },
                                        { name: 'National Health Service (NHS)', url: 'https://www.nhs.uk' },
                                        { name: "Office on Women's Health", url: 'https://www.womenshealth.gov' }
                                    ].map((item, i) => (
                                        <li key={i}>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-lg shadow-sm border border-slate-50 hover:underline hover:text-pink-600 transition-all"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>

                        {/* Academic & Hospital */}
                        <Card title="Academic & Hospital" className="h-full" disableReveal>
                            <div className="mb-6">
                                <p className="text-sm text-slate-500 mb-4">Clinical expertise & research-backed education.</p>
                                <ul className="space-y-3">
                                    {[
                                        { name: 'Harvard Health Publishing', url: 'https://www.health.harvard.edu' },
                                        { name: 'Stanford Medicine', url: 'https://med.stanford.edu' },
                                        { name: 'Johns Hopkins Medicine', url: 'https://www.hopkinsmedicine.org' },
                                        { name: 'UCSF Health', url: 'https://www.ucsfhealth.org' },
                                        { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org' }
                                    ].map((item, i) => (
                                        <li key={i}>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-lg shadow-sm border border-slate-50 hover:underline hover:text-pink-600 transition-all"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>

                        {/* Educational Platforms - Spanning full width if odd, or just another card */}
                        <Card title="Educational & Expert Platforms" className="md:col-span-2" disableReveal>
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1">
                                    <p className="text-sm text-slate-500 mb-4">Peer-reviewed storytelling & long-form discussions.</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {[
                                            { name: 'TED / TED-Ed', url: 'https://www.ted.com' },
                                            { name: 'Khan Academy', url: 'https://www.khanacademy.org/health-and-medicine' },
                                            { name: 'University Grand Rounds', url: 'https://www.uctv.tv/health' }
                                        ].map((item, i) => (
                                            <li key={i}>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-lg shadow-sm border border-slate-50 hover:underline hover:text-pink-600 transition-all"
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Section 3: How These Sources Are Used */}
                <div className="grid md:grid-cols-5 gap-8 items-start">
                    <div className="md:col-span-3">
                        <Card title="How These Sources Are Used" disableReveal>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <div className="mt-1 min-w-[24px] text-pink-500"><FaVideo /></div>
                                    <div>
                                        <strong className="block text-slate-900">Curated Videos</strong>
                                        <span className="text-slate-600 text-sm">We only embed verified official uploads from these organizations. No third-party re-uploads.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="mt-1 min-w-[24px] text-pink-500"><FaUserMd /></div>
                                    <div>
                                        <strong className="block text-slate-900">Expert Talks</strong>
                                        <span className="text-slate-600 text-sm">Long-form lectures and discussions featuring recognized medical experts.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="mt-1 min-w-[24px] text-pink-500"><FaGlobe /></div>
                                    <div>
                                        <strong className="block text-slate-900">Guidance & Chapters</strong>
                                        <span className="text-slate-600 text-sm">All written content is synthesized directly from guidelines published by these major institutions.</span>
                                    </div>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    {/* Transparency Statement - Smaller Side Card */}
                    <div className="md:col-span-2">
                        <Card title="Transparency" className="bg-rose-50 border-rose-100 h-full" disableReveal>
                            <div className="prose prose-sm text-slate-600">
                                <p className="mb-4">
                                    Our content is rigorously chosen to be educational, strictly <strong>non-diagnostic</strong>.
                                </p>
                                <p className="mb-4">
                                    We review our sources periodically to ensure they remain up-to-date with the latest medical consensus.
                                </p>
                                <p className="text-xs text-slate-500 italic mt-6 border-t border-rose-200 pt-4">
                                    Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OurSources;
