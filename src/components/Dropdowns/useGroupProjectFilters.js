import { useState, useEffect } from 'react';

/**
 * Custom hook to manage Group & Project filters with localStorage sync
 * This ensures filter selection persists across all pages
 * 
 * Place this file in: src/components/Dropdowns/useGroupProjectFilters.js
 */
const useGroupProjectFilters = () => {
  // Initialize state from localStorage on first render
  const [filters, setFilters] = useState(() => {
    try {
      const saved = localStorage.getItem('groupProjectFilters');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
    // Default empty filters
    return { groupName: '', projectId: '' };
  });

  // Listen for changes in localStorage (syncs across browser tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'groupProjectFilters' && e.newValue) {
        try {
          const newFilters = JSON.parse(e.newValue);
          setFilters(newFilters);
        } catch (error) {
          console.error('Error parsing localStorage data:', error);
        }
      }
    };

    // This event fires when localStorage is modified in another tab/window
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to update filters
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    
    try {
      localStorage.setItem('groupProjectFilters', JSON.stringify(newFilters));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Function to reset/clear filters
  const resetFilters = () => {
    const emptyFilters = { groupName: '', projectId: '' };
    setFilters(emptyFilters);
    
    try {
      localStorage.setItem('groupProjectFilters', JSON.stringify(emptyFilters));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return {
    filters,              // Complete filter object: { groupName, projectId }
    groupName: filters.groupName,     // Just the group name
    projectId: filters.projectId,     // Just the project ID
    updateFilters,        // Function to update filters
    resetFilters          // Function to clear filters
  };
};

export default useGroupProjectFilters;