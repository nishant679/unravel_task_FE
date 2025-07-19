import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import VideoCard from './VideoCard';
import ShowImages from './ShowImages';
import ShowVariants from './ShowVariants';


const CardWrapper = ({data}) =>{
    return(
        <div className="card">
            {
                data['properties']['video_url']?.med ? 
                <VideoCard videoUrl={data['properties']['video_url']?.med} data={data}/> : 
                <div>
                    <ShowImages imgUrl={data['properties']['room_images'][0]['image_urls']} />
                    <ShowVariants variants={data.variants || []} name={data.name}/>
                </div>
            }
        </div>
    )
}

const RoomCard = ({ data, onLoadMore, isLoading, hasMore, error, pageSize, onStartIndexChange, totalAvailableData }) => {
  const listRef = useRef(null);
  const cardRefs = useRef([]);
  const observer = useRef(null);
  const [hasTriggeredLoad, setHasTriggeredLoad] = useState(false);
  const VISIBLE_CARDS_COUNT = 5;

  const observeCard = useCallback((node, index) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && index === data.length - 1 && hasMore && !isLoading) {
          onLoadMore();
        }
      });
    });
    if (node) observer.current.observe(node);
  }, [data.length, hasMore, isLoading, onLoadMore]);

  const handleScroll = useCallback(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const visibleIndexes = [];
    const cardElements = listElement.querySelectorAll('.card');

    cardElements.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isVisible) visibleIndexes.push(i);
    });

    if (visibleIndexes.length > 0) {
      const maxVisibleIndex = Math.max(...visibleIndexes);
      onStartIndexChange(maxVisibleIndex);
    }

    if (visibleIndexes.includes(9) && !hasTriggeredLoad && hasMore && !isLoading) {
      setHasTriggeredLoad(true);
      onLoadMore();
    }
  }, [hasTriggeredLoad, hasMore, isLoading, onLoadMore, onStartIndexChange]);

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div
      className="card-list-container"
      ref={listRef}
      style={{ height: `400px`, overflowY: 'scroll', position: 'relative' }}
    >
      {error && <div className="error-message">{error}</div>}
      {isLoading && data.length === 0 && <div className="initial-loading">Loading initial data...</div>}
      {data.length === 0 && !isLoading && !error && <div className="no-data-message">No data available.</div>}
      <div style={{ position: 'relative' }}>
        {data.map((item, index) => (
          <div key={index} ref={el => index === data.length - 1 ? observeCard(el, index) : null}>
            <CardWrapper data={item} />
            
          </div>
        ))}
      </div>
      {isLoading && data.length > 0 && <div className="loading-indicator">Loading more...</div>}
      {!hasMore && data.length > VISIBLE_CARDS_COUNT && !isLoading && (
        <div className="end-of-list">You've reached the end of the list.</div>
      )}
    </div>
  );
};

export default RoomCard;