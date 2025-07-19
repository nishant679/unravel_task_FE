import React, { useState, useCallback } from 'react';
import RoomCard from './RoomCard';
import useDataFetcher from '../hooks/useDataFetcher';



const VISIBLE_CARDS_COUNT = 5;

export default function RoomListingApp() {
  const pageSize = 10;
  const { data, isLoading, hasMore, error, fetchData, totalAvailableData } = useDataFetcher(pageSize);
//   const [activeTab, setActiveTab] = useState('loaded');
  const [maxStartIndexReached, setMaxStartIndexReached] = useState(0);

  const handleStartIndexChange = useCallback((newIndex) => {
    setMaxStartIndexReached(prev => Math.max(prev, newIndex));
  }, []);

  const loadedCount = data.length;
  const visitedCount = Math.min(maxStartIndexReached + VISIBLE_CARDS_COUNT, loadedCount);
  const pendingCount = totalAvailableData - loadedCount;


  return (
    <div  className="app-container card-list-container" >
      <RoomCard 
        data={data}
        onLoadMore={fetchData}
        isLoading={isLoading}
        hasMore={hasMore}
        error={error}
        pageSize={pageSize}
        onStartIndexChange={handleStartIndexChange}
        totalAvailableData={totalAvailableData}  
      />

      <div>
        
        <div style={{display:'flex', justifyContent:'space-between', fontSize:'1rem', border:'1px solid #d3d3d3', padding:'10px 8px'}}>
          <label className='mb-2'>Pagination Information:</label>
          <label>Loaded : {loadedCount}</label>
          {/* <label>Visited : {visitedCount}</label> */}
          <label>Pending : {pendingCount}</label>
        </div>
      </div>
    </div>
  );
}

