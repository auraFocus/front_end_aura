import React, { useState} from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({onSearch}) {
  const [searchOption, setSearchOption] = useState('name');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchOption, searchValue);
   
  };

  return (
    <div style={{ display: 'flex', gap: '10px',alignItems:'start' }}>
      
      
      <div className="select">
        <div className="selected" data-default="All">
          {searchOption}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className="arrow"
          >
            <path
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            ></path>
          </svg>
        </div>
        <div className="options">
          <div title="Nome">
            <input 
              id="name" 
              name="option" 
              type="radio" 
              checked={searchOption === 'name'} 
              onChange={() => setSearchOption('name')} 
            />
            <label className="option" htmlFor="name">Nome</label>
          </div>
          <div title="CPF">
            <input 
              id="cpf" 
              name="option" 
              type="radio" 
              checked={searchOption === 'cpf'} 
              onChange={() => setSearchOption('cpf')} 
            />
            <label className="option" htmlFor="cpf">CPF</label>
          </div>
          <div title="Email">
            <input 
              id="email" 
              name="option" 
              type="radio" 
              checked={searchOption === 'email'} 
              onChange={() => setSearchOption('email')} 
            />
            <label className="option" htmlFor="email">Email</label>
          </div>
          <div title="Id">
            <input 
              id="id" 
              name="option" 
              type="radio" 
              checked={searchOption === 'id'} 
              onChange={() => setSearchOption('id')} 
            />
            <label className="option" htmlFor="id">Id</label>
          </div>
        </div>
      </div>

      {/* Input de busca */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={`Pesquisar por ${searchOption}`}
        style={{ padding: '5px', width: '300px', borderRadius: '4px', border: '1px solid #ddd' }}
      />

      {/* Botão de busca */}
      <button 
        className="btn_search_bar" 
        onClick={handleSearch} 
        style={{ padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#27183E', color: '#fff' }}
      >
        <FaSearch />
      </button>
    </div>
  );
}
