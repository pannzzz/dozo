import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState(null);

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <FilterContext.Provider value={{ filters, applyFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => useContext(FilterContext);
