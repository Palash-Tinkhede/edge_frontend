import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const VideoModal = ({ isOpen, onClose, channel, videoId, src }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    let videoSrc = "";

    if (channel === "youtube") {
        videoSrc = `https://www.youtube.com/embed/${videoId}`;
    } else {
        videoSrc = src;
    }

    return createPortal(
        <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/60">
            <div
                className="relative w-full max-w-4xl bg-gray-900"
                ref={modalRef}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-4 translate-x-full text-7xl leading-none text-white cursor-pointer"
                >
                    <span className="sr-only">Close modal</span>
                    &times;
                </button>
                <iframe width="100%" height="500" src={videoSrc} allowFullScreen title="Video player" />
            </div>
        </div>,
        document.body
    );
};

export default VideoModal;
