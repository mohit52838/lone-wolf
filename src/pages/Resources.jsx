import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FaApple, FaGooglePlay, FaExternalLinkAlt, FaDownload, FaFilePdf, FaTable, FaGoogle, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { createTrackerSheet } from '../utils/createTrackerSheet';

const Resources = () => {
    const [loading, setLoading] = useState(false);
    const [sheetUrl, setSheetUrl] = useState("");
    const [error, setError] = useState("");

    const helplines = [
        { name: "National Women's Helpline", number: "1091", desc: "24/7 Emergency assistance for women in distress." },
        { name: "Domestic Abuse Hotline", number: "1800-123-4567", desc: "Confidential support for domestic violence victims." },
        { name: "Mental Health Support (Kiran)", number: "1800-599-0019", desc: "Government mental health rehabilitation helpline." }
    ];

    const apps = [
        {
            name: "Clue",
            desc: "Science-based period and cycle tracker.",
            web: "https://helloclue.com",
            ios: "https://apps.apple.com/us/app/clue-period-tracker-calendar/id657189652",
            android: "https://play.google.com/store/apps/details?id=com.clue.android"
        },
        {
            name: "Flo",
            desc: "Ovulation calendar, period tracker, and pregnancy guide.",
            web: "https://flo.health",
            ios: "https://apps.apple.com/us/app/flo-period-tracker-calendar/id1038369065",
            android: "https://play.google.com/store/apps/details?id=org.iggymedia.periodtracker"
        },
        {
            name: "Headspace",
            desc: "Meditation and sleep support for mental well-being.",
            web: "https://www.headspace.com",
            ios: "https://apps.apple.com/us/app/headspace-mindful-meditation/id493145437",
            android: "https://play.google.com/store/apps/details?id=com.getsomeheadspace.android"
        }
    ];

    const officialLinks = [
        { name: "World Health Organization (WHO)", url: "https://www.who.int/health-topics/sexual-and-reproductive-health-and-rights", desc: "Sexual and Reproductive Health and Rights" },
        { name: "Planned Parenthood", url: "https://www.plannedparenthood.org", desc: "Comprehensive reproductive health care and education" },
        { name: "Office on Women's Health", url: "https://www.womenshealth.gov", desc: "U.S. Department of Health and Human Services" },
        { name: "NHS Women's Health", url: "https://www.nhs.uk/womens-health/", desc: "UK National Health Service guide" }
    ];

    async function handleCreateSheet() {
        const email = prompt("Enter your Google email address to receive access to your private tracker:");
        if (!email) return;

        setLoading(true);
        setError("");
        setSheetUrl("");

        try {
            const url = await createTrackerSheet(email);
            if (url) {
                setSheetUrl(url);
            } else {
                setError("Failed to retrieve sheet URL. Please try again.");
            }
        } catch (err) {
            console.error("Tracker creation failed:", err);
            setError(err.message || "Failed to create tracker. Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-brand-bg pb-24">
            <PageHeader
                title="Resources & Support"
                subtitle="Curated tools, contacts, and downloads to support your health journey."
            />

            <div className="max-w-6xl mx-auto px-6">

                {/* Helplines Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center font-display">
                        <span className="w-12 h-12 rounded-xl bg-pink-100 text-brand-primary flex items-center justify-center mr-4 text-2xl shadow-sm">📞</span>
                        Emergency Helplines
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {helplines.map((line, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{line.name}</h3>
                                <p className="text-sm text-slate-500 mb-6 h-10 leading-relaxed">{line.desc}</p>
                                <div className="flex items-center justify-between bg-pink-50 rounded-xl p-4 border border-pink-100">
                                    <a href={`tel:${line.number}`} className="text-brand-primary font-mono font-bold text-lg hover:underline">
                                        {line.number}
                                    </a>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(line.number)}
                                        className="text-xs text-slate-400 hover:text-brand-primary uppercase font-bold tracking-wider"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Apps Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center font-display">
                        <span className="w-12 h-12 rounded-xl bg-pink-100 text-brand-primary flex items-center justify-center mr-4 text-2xl shadow-sm">📱</span>
                        Recommended Apps
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {apps.map((app, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-xl text-slate-900">{app.name}</h3>
                                    <a href={app.web} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors">
                                        <FaExternalLinkAlt />
                                    </a>
                                </div>
                                <p className="text-slate-600 text-sm mb-8 leading-relaxed flex-grow">{app.desc}</p>
                                <div className="mt-4 flex gap-3 items-center">
                                    <a href={app.ios} target="_blank" rel="noreferrer" className="flex-1 bg-slate-900 text-white text-xs font-medium py-3 px-4 rounded-xl text-center hover:bg-slate-800 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                                        <FaApple size={16} />
                                        App Store
                                    </a>
                                    <a href={app.android} target="_blank" rel="noreferrer" className="flex-1 bg-slate-900 text-white text-xs font-medium py-3 px-4 rounded-xl text-center hover:bg-slate-800 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                                        <FaGooglePlay size={14} />
                                        Play Store
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Official Links Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center font-display">
                        <span className="w-12 h-12 rounded-xl bg-pink-100 text-brand-primary flex items-center justify-center mr-4 text-2xl shadow-sm">🌐</span>
                        Authoritative Sources
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {officialLinks.map((link, idx) => (
                            <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="group block bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-pink-200 hover:shadow-md transition-all">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{link.name}</h3>
                                    <FaExternalLinkAlt className="text-slate-400 group-hover:text-brand-primary" />
                                </div>
                                <p className="text-sm text-slate-500 mt-2">{link.desc}</p>
                                <span className="inline-block mt-4 text-xs font-bold text-brand-primary uppercase tracking-wider group-hover:underline">Visit Website →</span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Downloads & Tools Section */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center font-display">
                        <span className="w-12 h-12 rounded-xl bg-pink-100 text-brand-primary flex items-center justify-center mr-4 text-2xl shadow-sm">📥</span>
                        Downloads & Tools
                    </h2>
                    <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-10 border border-pink-100 shadow-sm">
                        <div className="grid md:grid-cols-2 gap-12 items-start">

                            {/* Google Sheets Tracker */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                                        <FaTable />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Symptom Tracker</h3>
                                        <p className="text-sm text-slate-500">Powered by Google Sheets</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                    Create a private, cloud-based tracker for your cycle, symptoms, and mood. We'll copy a template directly to your Google Drive.
                                </p>

                                {!sheetUrl ? (
                                    <button
                                        onClick={handleCreateSheet}
                                        disabled={loading}
                                        className="w-full py-3 px-6 bg-brand-primary text-white rounded-xl font-bold shadow-md hover:bg-pink-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <FaSpinner className="animate-spin" /> Creating Tracker...
                                            </>
                                        ) : (
                                            <>
                                                <FaGoogle /> Create My Symptom Tracker
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center animate-fade-in">
                                        <div className="flex items-center justify-center gap-2 text-green-800 font-bold mb-2">
                                            <FaCheckCircle /> Tracker Created!
                                        </div>
                                        <a
                                            href={sheetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-green-700 font-bold underline hover:text-green-900"
                                        >
                                            Open Your Symptom Tracker <FaExternalLinkAlt className="ml-2 text-xs" />
                                        </a>
                                    </div>
                                )}

                                {error && (
                                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
                                        <FaExclamationCircle className="mt-1 flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}
                            </div>

                            {/* PDF Downloads */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 font-display">Offline Resources</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Download our comprehensive guide to read offline or print.
                                </p>
                                <div className="flex flex-col gap-4">
                                    <a href="/complete-guide.pdf" download className="flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-xl hover:border-brand-primary hover:shadow-md transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                                                <FaFilePdf size={20} />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors">Complete Women's Health Guide</div>
                                                <div className="text-xs text-slate-500">PDF • 653 KB</div>
                                            </div>
                                        </div>
                                        <FaDownload className="text-slate-400 group-hover:text-brand-primary" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Resources;
