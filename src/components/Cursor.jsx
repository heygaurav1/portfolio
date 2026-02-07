import React, { useEffect, useState } from 'react';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleElementMouseEnter = (e) => {
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            }
        };

        const handleElementMouseLeave = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Add listeners for hover effects
        document.addEventListener('mouseover', handleElementMouseEnter);
        document.addEventListener('mouseout', handleElementMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleElementMouseEnter);
            document.removeEventListener('mouseout', handleElementMouseLeave);
        };
    }, []);

    useEffect(() => {
        let animationFrame;

        const animateTrailingCursor = () => {
            setTrailingPosition(prev => {
                const dx = position.x - prev.x;
                const dy = position.y - prev.y;

                return {
                    x: prev.x + dx * 0.15, // Smooth lag factor
                    y: prev.y + dy * 0.15
                };
            });

            animationFrame = requestAnimationFrame(animateTrailingCursor);
        };

        animateTrailingCursor();

        return () => cancelAnimationFrame(animationFrame);
    }, [position]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main minimal dot cursor */}
            <div
                className={`fixed z-[100] w-2 h-2 bg-white rounded-full pointer-events-none mix-blend-difference transition-all duration-300 ${isHovering ? 'scale-[0]' : 'scale-100'}`}
                style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)'
                }}
            />

            {/* Trailing ring cursor - Scales up on hover */}
            <div
                className={`fixed z-[99] rounded-full pointer-events-none mix-blend-difference transition-all duration-300 ease-out border border-white/40 ${isHovering ? 'w-16 h-16 bg-white/10 backdrop-blur-[1px] border-white/20' : 'w-8 h-8'}`}
                style={{
                    left: trailingPosition.x,
                    top: trailingPosition.y,
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 1 : 0
                }}
            />
        </>
    );
};

export default Cursor;
