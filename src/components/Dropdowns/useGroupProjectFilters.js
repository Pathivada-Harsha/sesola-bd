// useGroupProjectFilters.js (SAME HOOK FOR BOTH COMPONENTS)
import { useState, useEffect } from 'react';

/**
 * Custom hook to manage Group, SubGroup & Project filters with localStorage sync
 * Compatible with both 2-dropdown and 3-dropdown components
 * This ensures filter selection persists and syncs across all pages
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
    return { groupName: '', subGroupName: '', projectId: '' };
  });

  // Listen for changes in localStorage (syncs across browser tabs AND components)
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

    // Listen for custom event (for same-tab updates between components)
    const handleCustomStorageChange = (e) => {
      if (e.detail) {
        setFilters(e.detail);
      }
    };

    // This event fires when localStorage is modified in another tab/window
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab sync between components
    window.addEventListener('groupProjectFiltersChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('groupProjectFiltersChanged', handleCustomStorageChange);
    };
  }, []);

  // Function to update filters
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    
    try {
      localStorage.setItem('groupProjectFilters', JSON.stringify(newFilters));
      
      // Dispatch custom event for same-tab sync
      window.dispatchEvent(new CustomEvent('groupProjectFiltersChanged', { 
        detail: newFilters 
      }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Function to reset/clear filters
  const resetFilters = () => {
    const emptyFilters = { groupName: '', subGroupName: '', projectId: '' };
    setFilters(emptyFilters);
    
    try {
      localStorage.setItem('groupProjectFilters', JSON.stringify(emptyFilters));
      
      // Dispatch custom event for same-tab sync
      window.dispatchEvent(new CustomEvent('groupProjectFiltersChanged', { 
        detail: emptyFilters 
      }));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return {
    filters,                          // Complete filter object: { groupName, subGroupName, projectId }
    groupName: filters.groupName,     // Just the group name
    subGroupName: filters.subGroupName, // Just the subgroup/category name
    projectId: filters.projectId,     // Just the project ID
    updateFilters,                    // Function to update filters
    resetFilters                      // Function to clear filters
  };
};

export default useGroupProjectFilters;