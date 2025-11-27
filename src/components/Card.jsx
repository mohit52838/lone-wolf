import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Card = ({ title, children, className = '' }) => {
    const cardRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        // GSAP Tilt Effect (Ported from Template)
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Reduced rotation for gentler feel
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)"
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={cardRef} className={`holo-card ${className}`}>
            <div ref={contentRef} className="card-content">
                {title && <h3 className="card-title">{title}</h3>}
                <div className="card-body">
                    {children}
                </div>
            </div>

            {/* Soft Corner Accents (Replaced Holographic Markers) */}
            <div className="corner top-left"></div>
            <div className="corner bottom-right"></div>

            <style jsx>{`
        .holo-card {
          position: relative;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          transform-style: preserve-3d;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
        }

        .holo-card:hover {
          box-shadow: 0 20px 40px -10px rgba(236, 64, 122, 0.15);
          border-color: var(--accent-cyan);
        }

        .card-content {
          transform: translateZ(20px);
        }

        .card-title {
          font-family: var(--font-header);
          color: var(--accent-blue);
          margin-bottom: 20px;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .card-body {
          color: var(--text-color);
          line-height: 1.6;
        }

        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-cyan);
          opacity: 0;
          filter: blur(20px);
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .top-left { top: -10px; left: -10px; }
        .bottom-right { bottom: -10px; right: -10px; }

        .holo-card:hover .corner {
          opacity: 0.4;
        }
      `}</style>
        </div>
    );
};

export default Card;
