import { useState, useEffect, useRef } from "react";
// import RoomInfoCard from "./RoomInfoCard";
import { data } from "autoprefixer";
import ShowVariants from "./ShowVariants";

const VideoCard = ({ videoUrl, title = "Video Title", description = "Video description goes here." , data}) => {
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
    <div className="relative w-full h-[800px] overflow-hidden rounded-xl">
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

      {/* Overlay (always on top) */}
      <div className="absolute bottom-0 left-0 w-full z-10 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
        
    </div>
    

    </div>
    {/* <RoomInfoCard data={data} /> */}
    <ShowVariants variants={data.variants || []} name={data.name}/>
    
    </>
  );
};

export default VideoCard;
