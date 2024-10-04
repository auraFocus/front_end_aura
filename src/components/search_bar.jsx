import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchOption, setSearchOption] = useState('name');
  const [searchValue, setSearchValue] = useState(''); 

  const handleSearch = () => {
    if (searchValue) {
      onSearch(searchOption, searchValue);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

      <select
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
        style={{ padding: '5px', borderRadius: '4px' }}
      >
        <option value="name">Nome</option>
        <option value="cpf">CPF</option>
        <option value="email">Email</option>
      </select>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={`Pesquisar por ${searchOption}`}
        style={{ padding: '5px', width: '300px', borderRadius: '4px', border: '1px solid #ddd' }}
      />

     
      <button onClick={handleSearch} style={{ padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff' }}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
