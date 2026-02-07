import React, { useEffect, useRef } from 'react';

const InteractiveCodeBackground = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Resize handler
        const resize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        // Particles
        const particles = [];
        const particleCount = 40;
        const codeSnippets = [
            '<div>', 'const', 'import', 'return', 'export',
            'await', 'async', 'git push', '{}', '[]',
            'React', 'useEffect', 'map()', '<section>',
            'System.out.println', 'String[] args', 'public static void main',
            'tf.layers.dense', 'model.fit', 'optimizer: adam',
            'blockchain.new_block', 'proof_of_work', 'gas_limit'
        ];

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 8 + 10;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                this.opacity = Math.random() * 0.3 + 0.1;
                this.font = `${this.size}px monospace`;
            }

            update(mouse) {
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse interactivity
                if (mouse.x && mouse.y) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance;
                        this.x -= dx * force * 0.05;
                        this.y -= dy * force * 0.05;
                    }
                }

                if (this.x < -100 || this.x > canvas.width + 100 || this.y < -100 || this.y > canvas.height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`; // Violetish/Dev color
                ctx.font = this.font;
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const mouse = { x: null, y: null };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update(mouse);
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full opacity-60 pointer-events-auto" />
        </div>
    );
};

export default InteractiveCodeBackground;
