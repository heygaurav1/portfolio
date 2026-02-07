import React, { useEffect, useState } from 'react';

const greetings = [
    "Hello", "नमस्ते", "Hola", "Bonjour", "Guten Tag", "Ciao", "Olá", "Namaste"
];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        // Cycle through greetings fast (200ms)
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === greetings.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setFade(true), 200);
                    setTimeout(onComplete, 800);
                    return prev;
                }
                return prev + 1;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center">
                <h1 className="text-4xl md:text-6xl font-normal text-white tracking-tight">
                    {greetings[index]}
                </h1>
            </div>
        </div>
    );
};

export default Preloader;
