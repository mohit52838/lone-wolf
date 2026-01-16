import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, children, className = '', disableReveal = false, onClick, ...props }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const card = cardRef.current;

    // 1. Scroll Reveal Animation (Conditional)
    if (!disableReveal) {
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    } else {
      // Ensure visibility if animation is disabled
      gsap.set(card, { y: 0, opacity: 1, scale: 1 });
    }

    // 2. Parallax Micro-motion (Global Mouse Move)
    const handleGlobalMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5);
      const yPos = (e.clientY / window.innerHeight - 0.5);

      gsap.to(card, {
        x: xPos * 10,
        y: yPos * 10,
        duration: 1,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);

    // 3. 3D Tilt Effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

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
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // 4. Ripple Effect & Click Handling
  const handleClick = (e) => {
    // Create Ripple
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples((prev) => [...prev, newRipple]);

    // Call external onClick if exists
    if (onClick) {
      onClick(e);
    }
  };

  // Remove ripple after animation
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <div
      ref={cardRef}
      className={`holo-card ${className}`}
      onClick={handleClick}
      {...props}
    >
      <div ref={contentRef} className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        <div className="card-body">
          {children}
        </div>
      </div>

      {/* Ripples Container */}
      <div className="ripple-container">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size
            }}
          />
        ))}
      </div>

      {/* Soft Corner Accents */}
      <div className="corner top-left"></div>
      <div className="corner bottom-right"></div>

      <style>{`
        .holo-card {
          position: relative;
          /* Surface Light Layer (Static Gradient) */
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%), rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
          overflow: hidden; /* For ripples */
          cursor: pointer;
        }

        /* Expanded Glow Halo (Pseudo-element) */
        .holo-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), rgba(255, 192, 203, 0.25), transparent 40%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 1; /* Below content, above background */
            pointer-events: none;
        }

        .holo-card:hover::before {
            opacity: 1;
        }

        .holo-card:hover {
          transform: translateY(-10px) rotateX(2deg) rotateY(2deg);
          /* Shadow Layering: Inner Glow + Primary Shadow + Secondary Depth Shadow */
          box-shadow: 
            inset 0 0 25px rgba(255, 182, 193, 0.3), /* Inner Edge Glow */
            0 25px 50px -12px rgba(255, 122, 162, 0.4), /* Primary Lift */
            0 10px 20px -5px rgba(0, 0, 0, 0.05); /* Soft ambient depth */
          border-color: var(--primary-pink);
          /* Slightly brighter surface on hover */
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%), rgba(255, 255, 255, 0.9);
        }

        .card-content {
          transform: translateZ(30px);
          position: relative;
          z-index: 2;
        }

        .card-title {
          font-family: var(--font-header);
          color: var(--accent-blue);
          margin-bottom: 20px;
          font-size: 1.5rem;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .holo-card:hover .card-title {
            color: var(--primary-pink);
            transform: scale(1.05);
            text-shadow: 0 0 10px rgba(255, 122, 162, 0.3);
        }

        .card-body {
          color: var(--text-color);
          line-height: 1.6;
          transition: opacity 0.3s ease;
        }
        
        .holo-card:hover .card-body {
            opacity: 0.9;
        }

        /* Ripple Animation */
        .ripple-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            border-radius: 24px;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 122, 162, 0.2);
            transform: scale(0);
            animation: ripple-anim 0.6s linear;
        }

        @keyframes ripple-anim {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary-pink);
          opacity: 0;
          filter: blur(15px);
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .top-left { top: -10px; left: -10px; }
        .bottom-right { bottom: -10px; right: -10px; }

        .holo-card:hover .corner {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default Card;
