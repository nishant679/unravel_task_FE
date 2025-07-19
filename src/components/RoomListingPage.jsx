import React, { useState, useCallback, useMemo } from 'react';
import RoomCard from './RoomCard';
import useDataFetcher from '../hooks/useDataFetcher';

const VISIBLE_CARDS_COUNT = 5;

const PaginationInfo = React.memo(({ loaded, pending }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', border: '1px solid #d3d3d3', padding: '10px 8px' }}>
      <label>Pagination Information:</label>
      <label>Loaded : {loaded}</label>
      <label>Pending : {pending}</label>
    </div>
  ));

export default function RoomListingApp() {
  const pageSize = 10;
  const { data, isLoading, hasMore, error, fetchData, totalAvailableData } = useDataFetcher(pageSize);
//   const [activeTab, setActiveTab] = useState('loaded');
  const [maxStartIndexReached, setMaxStartIndexReached] = useState(0);

  const handleStartIndexChange = useCallback((newIndex) => {
    setMaxStartIndexReached(prev => Math.max(prev, newIndex));
  }, []);

  const loadedCount = useMemo(() => data.length, [data]);
  const visitedCount = useMemo(() => Math.min(maxStartIndexReached + VISIBLE_CARDS_COUNT, loadedCount), [maxStartIndexReached, loadedCount]);
  const pendingCount = useMemo(() => totalAvailableData - loadedCount, [totalAvailableData, loadedCount]);

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
        <PaginationInfo loaded={loadedCount} pending={pendingCount} />
      </div>
    </div>
  );
}

