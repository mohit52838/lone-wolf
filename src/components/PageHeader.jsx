import React from 'react';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-lavender/30 to-transparent rounded-b-3xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                {title}
            </h1>
            {subtitle && (
                <p className="max-w-2xl mx-auto text-lg text-gray-600">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default PageHeader;
