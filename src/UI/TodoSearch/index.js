import React, { useState, useEffect } from 'react';
import './TodoSearch.css';
import { useParams, useSearchParams } from 'react-router-dom';

function TodoSearch({ searchValue, setSearchValue, loading,params,setParams }) {

  const urlSearch=params.get('search');

  useEffect(() => {
    const search = urlSearch ?? "";
    setSearchValue(search);
  }, [params]);
  
  const onSearchValueChange = (event) => {    
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Cebolla"
      value={searchValue}
      onChange={onSearchValueChange}
      disabled={loading}
    />
  );
}

export { TodoSearch };
