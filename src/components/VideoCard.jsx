import { useState, useEffect, useRef } from "react";
import ShowVariants from "./ShowVariants";

const VideoCard = ({ videoUrl, data}) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mediaLoaded) return;

    if (isInViewport) {
      video.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    } else {
      video.pause();
    }
  }, [isInViewport, mediaLoaded]);

  return (
    <>
    <div className="relative w-full h-[600px] overflow-hidden rounded-xl">
      {/* Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        className={`absolute top-0 left-0 w-full h-full object-cover ${mediaLoaded ? '' : 'hidden'}`}
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setMediaLoaded(true)}
        onError={(e) => {
          console.error("Video failed to load:", e);
          setMediaLoaded(true);
        }}
      />
    </div>
    <ShowVariants variants={data.variants || []} name={data.name}/>
    
    </>
  );
};

export default VideoCard;
