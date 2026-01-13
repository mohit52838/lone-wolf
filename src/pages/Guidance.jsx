import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaArrowRight, FaBookOpen, FaUserMd, FaHospital, FaStethoscope, FaClinicMedical } from 'react-icons/fa';
import { chapters } from '../data/chapters';
import Card from '../components/Card';

// Richer Symptom List
const SYMPTOMS = [
    "Missed period",
    "Irregular cycle",
    "Pelvic pain",
    "Heavy bleeding",
    "Unusual discharge",
    "Severe cramps",
    "Mood changes",
    "Painful intercourse",
    "Breast tenderness",
    "Fatigue",
    "Acne / Hair growth",
    "Fever + Pelvic pain"
];

// Richer Mapping: Symptom -> Chapters & Multiple Care Types
// Care Types: 'Gynecologist', 'General Doctor', 'Hospital', 'Clinic'
const SYMPTOM_MAP = {
    "Missed period": {
        chapters: [3, 12, 14], // Cycle, Pregnancy, Hormones
        care: ['Gynecologist', 'General Doctor']
    },
    "Irregular cycle": {
        chapters: [3, 4, 14], // Cycle, PCOD, Hormones
        care: ['Gynecologist']
    },
    "Pelvic pain": {
        chapters: [5, 6, 3], // Endo, PMS, Cycle
        care: ['Gynecologist', 'Hospital']
    },
    "Heavy bleeding": {
        chapters: [3, 5], // Cycle, Endo
        care: ['Gynecologist', 'Hospital']
    },
    "Unusual discharge": {
        chapters: [7, 3], // Sexual Health, Cycle
        care: ['Gynecologist', 'General Doctor']
    },
    "Severe cramps": {
        chapters: [5, 6], // Endo, PMS
        care: ['Gynecologist', 'Clinic']
    },
    "Mood changes": {
        chapters: [6, 10, 19], // PMS, Mental Health, Relationships
        care: ['Gynecologist', 'General Doctor']
    },
    "Painful intercourse": {
        chapters: [5, 7], // Endo, Sexual Health
        care: ['Gynecologist']
    },
    "Breast tenderness": {
        chapters: [3, 6, 12], // Cycle, PMS, Pregnancy
        care: ['Gynecologist', 'General Doctor']
    },
    "Fatigue": {
        chapters: [14, 12, 6], // Hormones, Pregnancy, PMS
        care: ['General Doctor', 'Gynecologist']
    },
    "Acne / Hair growth": {
        chapters: [17, 4], // Skin, PCOD
        care: ['Gynecologist', 'General Doctor']
    },
    "Fever + Pelvic pain": {
        chapters: [5, 7], // Endo (infection risk), Sexual Health
        care: ['Hospital', 'Gynecologist'] // Urgent
    }
};

const Guidance = () => {
    const navigate = useNavigate();
    const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());
    const [showResults, setShowResults] = useState(false);
    const [recommendedChapters, setRecommendedChapters] = useState([]);
    const [recommendedCare, setRecommendedCare] = useState(new Set());
    const resultsRef = useRef(null);

    const toggleSymptom = (symptom) => {
        const newSelection = new Set(selectedSymptoms);
        if (newSelection.has(symptom)) {
            newSelection.delete(symptom);
        } else {
            newSelection.add(symptom);
        }
        setSelectedSymptoms(newSelection);
        // Keep results visible if already shown, just update selection
    };

    const handleGetGuidance = () => {
        if (selectedSymptoms.size === 0) return;

        const chapterIds = new Set();
        const careTypes = new Set();

        selectedSymptoms.forEach(symptom => {
            const data = SYMPTOM_MAP[symptom];
            if (data) {
                // Collect Chapters
                data.chapters.forEach(id => chapterIds.add(id));
                // Collect Care Types
                data.care.forEach(type => careTypes.add(type));
            }
        });

        // Filter chapters data to get details
        const results = chapters
            .filter(ch => chapterIds.has(ch.id))
            .slice(0, 4); // Show top 4 unique matches (increased from 3)

        setRecommendedChapters(results);
        setRecommendedCare(careTypes);
        setShowResults(true);

        // Smooth scroll to results
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleExploreCare = (type) => {
        navigate('/find-doctors', { state: { source: 'guidance', careType: type } });
    };

    const getCareIcon = (type) => {
        switch (type) {
            case 'Gynecologist': return <FaUserMd size={28} />;
            case 'Hospital': return <FaHospital size={28} />;
            case 'General Doctor': return <FaStethoscope size={28} />;
            case 'Clinic': return <FaClinicMedical size={28} />;
            default: return <FaUserMd size={28} />;
        }
    };

    const getCareDescription = (type) => {
        switch (type) {
            case 'Gynecologist': return "Specialists in women's reproductive health.";
            case 'Hospital': return "For urgent care, testing, or severe symptoms.";
            case 'General Doctor': return "For primary care, checkups, and referrals.";
            case 'Clinic': return "Outpatient care for routine issues.";
            default: return "Healthcare professionals.";
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans bg-[var(--bg-color)]">

            {/* Header */}
            <div className="section-header-wrapper">
                <span className="section-eyebrow">Wellness Check</span>
                <h1 className="section-heading">
                    Symptom Guidance
                </h1>
                <p className="section-subtitle">
                    Select what you're experiencing to see relevant educational resources and suggested care options.
                </p>
            </div>

            {/* Symptom Selection */}
            <div className="mb-20">
                <Card className="!p-8 bg-white" title={null} disableReveal={true}>
                    <h2 className="text-xl font-bold text-[var(--text-main)] mb-6 font-display">What are you noticing?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {SYMPTOMS.map((symptom) => (
                            <label
                                key={symptom}
                                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                                    ${selectedSymptoms.has(symptom)
                                        ? 'border-[#e6007e] bg-rose-50'
                                        : 'border-gray-100 hover:border-rose-200 hover:bg-gray-50'}`}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors shrink-0
                                    ${selectedSymptoms.has(symptom)
                                        ? 'border-[#e6007e] bg-[#e6007e]'
                                        : 'border-gray-300 group-hover:border-rose-300'}`}>
                                    {selectedSymptoms.has(symptom) && (
                                        <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                    )}
                                </div>
                                <span className={`font-medium text-sm sm:text-base ${selectedSymptoms.has(symptom) ? 'text-[#e6007e]' : 'text-[var(--text-body)]'}`}>
                                    {symptom}
                                </span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedSymptoms.has(symptom)}
                                    onChange={() => toggleSymptom(symptom)}
                                />
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleGetGuidance}
                            disabled={selectedSymptoms.size === 0}
                            className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg
                                ${selectedSymptoms.size > 0
                                    ? 'bg-[#e6007e] text-white hover:bg-[#d40073] hover:shadow-rose-300/50'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            Get Guidance
                            <FaArrowRight size={18} />
                        </button>
                    </div>
                </Card>
            </div>

            {/* Results View */}
            {showResults && (
                <div ref={resultsRef} className="space-y-12 animate-fadeIn">

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                        <div className="p-3 bg-yellow-100 rounded-full text-yellow-600 shrink-0">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div>
                            <p className="font-bold text-yellow-800 mb-1">This guidance is for awareness only.</p>
                            <p className="text-sm text-yellow-700">
                                Based on what you shared, here are educational resources and care options you may find helpful. This is not a medical diagnosis.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Suggested Reading */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <FaBookOpen size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--text-main)] font-display">Suggested Reading</h3>
                            </div>

                            {recommendedChapters.length > 0 ? (
                                <div className="space-y-4">
                                    {recommendedChapters.map(chapter => (
                                        <Card key={chapter.id} className="!p-5 cursor-pointer group" onClick={() => navigate(`/chapter/${chapter.id}`)} title={null} disableReveal={true}>
                                            <div className="flex gap-4 items-start text-left">
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-[var(--text-main)] group-hover:text-[#e6007e] transition-colors mb-1 font-display">
                                                        {chapter.title}
                                                    </h4>
                                                    <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                                                        {chapter.description}
                                                    </p>
                                                </div>
                                                <FaArrowRight className="text-gray-300 group-hover:text-[#e6007e] transition-colors mt-1" size={14} />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--text-muted)]">No specific chapters found for this selection, but all our resources are available in the Library.</p>
                            )}
                        </div>

                        {/* Care Options */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-rose-50 text-[#e6007e] rounded-lg">
                                    <FaHeartbeat size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--text-main)] font-display">Suggested Care</h3>
                            </div>

                            <div className="grid gap-4">
                                {Array.from(recommendedCare).map(type => (
                                    <Card key={type} className="!p-6" title={null} disableReveal={true}>
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                                            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-[#e6007e] shrink-0">
                                                {getCareIcon(type)}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-lg text-[var(--text-main)] mb-1 font-display">{type}</h4>
                                                <p className="text-sm text-[var(--text-muted)] mb-4 h-10">
                                                    {getCareDescription(type)}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleExploreCare(type);
                                                    }}
                                                    className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-[#e6007e] transition-colors shadow-sm"
                                                >
                                                    Find {type} Nearby
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Disclaimer */}
                    <p className="text-center text-xs text-[var(--text-light)] mt-12 mb-4 opacity-60">
                        Always consult a qualified healthcare professional for diagnosis or treatment.
                    </p>

                </div>
            )}

        </div>
    );
};

export default Guidance;
