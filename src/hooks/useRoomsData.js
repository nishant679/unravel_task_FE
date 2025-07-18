import { useState, useEffect, useCallback } from 'react';
import sampleData from '../data/sample.json';

export const useRoomsData = (initialPage = 1, initialLimit = 10) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Store the entire dataset in a ref or local variable to avoid re-reading on every render
  // For a real application, this would typically be fetched from a backend API.
  const allRoomsData = sampleData.rooms_by_serial_no.flatMap(serialEntry => serialEntry.rooms);

  const fetchRooms = useCallback(async (page, limit) => {
    setIsLoading(true); 
    setError(null);     

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      // Get the current batch of rooms
      const newRooms = allRoomsData.slice(startIndex, endIndex);

      // Update the rooms state: append new rooms to existing ones
      setRooms(prevRooms => [...prevRooms, ...newRooms]);

      // Check if there's more data available
      if (endIndex >= allRoomsData.length) {
        setHasMore(false); 
      } else {
        setHasMore(true);
      }

    } catch (err) {
      console.error("Failed to fetch rooms:", err);
      setError("Failed to load rooms. Please try again later.");
      setHasMore(false); 
    } finally {
      setIsLoading(false); 
    }
  }, [allRoomsData]); 

  useEffect(() => {
    fetchRooms(initialPage, initialLimit);
  }, [fetchRooms, initialPage, initialLimit]); 

  return { rooms, isLoading, error, hasMore, fetchRooms };
};
