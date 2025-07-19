import { useState, useEffect, useRef, useCallback } from "react";
import ShowVariants from "./ShowVariants";

const VideoCard = ({ videoUrl, data }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const videoRef = useRef(null);
  const observerRef = useRef(null); // For cleanup

  // Use useCallback for stable function
  const handleIntersection = useCallback(([entry]) => {
    setIsInViewport(entry.isIntersecting);
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    if (!videoRef.current) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current && videoRef.current) {
        observerRef.current.unobserve(videoRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  // Play/Pause on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mediaLoaded) return;

    if (isInViewport) {
      video.play().catch((err) => {
        console.warn("Autoplay blocked:", err.message);
      });
    } else {
      video.pause();
    }
  }, [isInViewport, mediaLoaded]);

  return (
    <div>
      <div className="relative w-full h-[600px] overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          src={videoUrl}
          className={`absolute top-0 left-0 w-full h-full object-cover ${mediaLoaded ? "" : "hidden"}`}
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setMediaLoaded(true)}
          onError={(e) => {
            console.error("Video failed to load:", e);
            setMediaLoaded(true); // fallback to render variants anyway
          }}
        />
        {!mediaLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Loading video...</span>
          </div>
        )}
      </div>

      <ShowVariants variants={data.variants || []} name={data.name} />
    </div>
  );
};

export default VideoCard;
