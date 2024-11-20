import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        categories: [], // Almacena las categorías seleccionadas
        prices: [], // Almacena los rangos de precios seleccionados
    });

    const applyFilters = (newFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters, // Actualiza solo las propiedades proporcionadas en `newFilters`
        }));
    };

    const clearFilters = () => {
        setFilters({
            categories: [],
            prices: [],
        });
    };

    return (
        <FilterContext.Provider value={{ filters, applyFilters, clearFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => useContext(FilterContext);
