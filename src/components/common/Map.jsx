import React, { useEffect, useRef, useContext } from 'react';
import { TractorContext } from '../../context/TractorContext';
import { OfflineContext } from '../../context/OfflineContext';

// Using Leaflet for map functionality
// Note: In a real implementation, you would need to install leaflet with: npm install leaflet
const Map = ({ className, showBoundaries = true }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tractorMarkerRef = useRef(null);
  const { tractorLocation, fieldBoundaries } = useContext(TractorContext);
  const { isOffline } = useContext(OfflineContext);

  useEffect(() => {
    // In a real implementation, this would use actual leaflet code
    // Simulating map initialization for the prototype
    const initMap = () => {
      // Mock function to simulate map initialization
      console.log('Map initialized');
    };

    if (!mapInstanceRef.current) {
      initMap();
    }

    return () => {
      // Cleanup function
      if (mapInstanceRef.current) {
        // In a real implementation: mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Update tractor location on the map
    if (tractorLocation) {
      // In a real implementation, this would update the marker position
      console.log('Updating tractor location on map', tractorLocation);
    }
  }, [tractorLocation]);

  // In a real implementation, we would:
  // 1. Initialize Leaflet map
  // 2. Add tile layers (with offline support)
  // 3. Draw field boundaries
  // 4. Add tractor marker
  // 5. Handle updates to tractor position

  return (
    <div className={`relative border rounded-lg overflow-hidden bg-gray-100 ${className || ''}`}>
      {/* This would be a real map in production */}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[200px]"
        style={{ backgroundColor: '#e8f4f8' }}
      >
        {/* Placeholder map content */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          {isOffline ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-500">Offline Map</p>
              <p className="text-xs text-gray-400">Using cached map data</p>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-500">Map Visualization</p>
            </>
          )}
        </div>
        
        {/* Tractor position indicator (this would be a marker in real implementation) */}
        <div 
          className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            top: '50%', 
            left: '50%',
            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 7H7v6h6V7z" />
          </svg>
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute bottom-2 right-2 flex flex-col space-y-2">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Map;