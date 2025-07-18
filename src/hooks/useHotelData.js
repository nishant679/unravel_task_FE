import { useState, useEffect } from 'react';
import sampleData from '../data/sample.json'

export const useHotelData = () => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [isLoadingHotel, setIsLoadingHotel] = useState(true);
  const [hotelError, setHotelError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setIsLoadingHotel(true); 
      setHotelError(null);     

      try {
        // Simulate network latency for hotel details fetch
        await new Promise(resolve => setTimeout(resolve, 300)); 

        if (sampleData && sampleData.hotel_details) {
          setHotelDetails(sampleData.hotel_details);
        } else {
          throw new Error("Hotel details not found in sample data.");
        }

      } catch (err) {
        console.error("Failed to fetch hotel details:", err);
        setHotelError("Failed to load hotel details. Please try again later.");
      } finally {
        setIsLoadingHotel(false); 
      }
    };

    fetchHotelDetails();
  }, []); 

  return { hotelDetails, isLoadingHotel, hotelError };
};