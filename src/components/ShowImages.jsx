import React, {
  useState,
  useEffect,
  useCallback,
  memo
} from "react";

const ShowImages = memo(({ imgUrl = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (isPaused || imgUrl.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgUrl.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imgUrl, isPaused]);

  // Clamp index when imgUrl changes
  useEffect(() => {
    if (currentIndex >= imgUrl.length) {
      setCurrentIndex(0);
    }
  }, [imgUrl, currentIndex]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imgUrl.length);
  }, [imgUrl.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? imgUrl.length - 1 : prev - 1
    );
  }, [imgUrl.length]);

  if (!Array.isArray(imgUrl) || imgUrl.length === 0) {
    return (
      <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center text-gray-500">
        No Images Available
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <img
        src={imgUrl[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/600x300/cccccc/000000?text=Image+Not+Found";
        }}
      />

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/60 px-4 py-2 rounded-full shadow-lg">
        <button
          onClick={prevImage}
          className="text-white text-2xl px-2 hover:bg-white/20 rounded-full"
        >
          ‹
        </button>

        <div className="flex gap-2">
          {imgUrl.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                idx === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextImage}
          className="text-white text-2xl px-2 hover:bg-white/20 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  );
});

export default ShowImages;
