import hotelData from '../data/sample.json'
import { useState, useCallback, useEffect } from 'react';

const allRoomsData = hotelData.rooms_by_serial_no.flatMap(serialEntry => serialEntry.rooms);

const useDataFetcher = (initialPageSize = 5) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      const startIndex = page * initialPageSize;
      const endIndex = startIndex + initialPageSize;
      const newData = allRoomsData.slice(startIndex, endIndex);
      if (newData.length === 0) setHasMore(false);
      else {
        setData(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load data.');
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, page, initialPageSize]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, hasMore, error, fetchData, totalAvailableData: allRoomsData.length };
};

export default useDataFetcher;