import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const resumeUrl = "/resume.html"; // Using HTML resume for now

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl h-full md:h-[90vh] bg-[#121212] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-xl font-bold text-white font-display">Resume Preview</h3>
                    <div className="flex items-center gap-3">
                        <a
                            href={resumeUrl}
                            download="Gourav_Paul_Resume.pdf"
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
                        >
                            <Download size={14} />
                            Download PDF
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 bg-neutral-900 w-full h-full relative group">
                    <iframe
                        src={`${resumeUrl}#toolbar=0`}
                        className="w-full h-full border-none"
                        title="Resume PDF"
                    />

                    {/* Fallback/Overlay if standard PDF viewer controls are unwanted or if simpler view needed */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium">
                            <ExternalLink size={14} /> Open in New Tab
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
