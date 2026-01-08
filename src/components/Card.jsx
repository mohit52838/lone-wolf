import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`card-soft p-8 ${className}`}>
      {title && (
        <h3 className="text-2xl font-serif text-gray-900 mb-4 font-bold">
          {title}
        </h3>
      )}
      <div className="text-gray-600 leading-relaxed font-light">
        {children}
      </div>
    </div>
  );
};

export default Card;
