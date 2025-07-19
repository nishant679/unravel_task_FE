import React, { useState, useEffect } from "react";

const ShowImages = React.memo(({ imgUrl = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgUrl.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imgUrl]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imgUrl.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imgUrl.length - 1 : prev - 1
    );
  };

  if (!Array.isArray(imgUrl) || imgUrl.length === 0) {
    return (
      <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center text-gray-500">
        No Images Available
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      {/* Image */}
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

      {/* Controls (bottom center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/60 px-4 py-2 rounded-full shadow-lg">
        {/* Prev Button */}
        <button
          onClick={prevImage}
          className="text-white text-2xl px-2 hover:bg-white/20 rounded-full"
        >
          ‹
        </button>

        {/* Dots */}
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

        {/* Next Button */}
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
