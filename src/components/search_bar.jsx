import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch }) {
  const [searchOption, setSearchOption] = useState('Filtro');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchOption !== 'Filtro') {
      onSearch(searchOption, searchValue);
    } else {
      alert('Por favor, selecione uma opção de filtro.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div className="select">
        <div className="selected" data-default="Filtro">
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
          <div title="Filtro">
            <input
              id="filtro"
              name="option"
              type="radio"
              disabled
              checked={searchOption === 'Filtro'}
              onChange={() => setSearchOption('Filtro')}
            />
            <label className="option" htmlFor="filtro">
              Filtro
            </label>
          </div>

          <div title="Nome">
            <input
              id="name"
              name="option"
              type="radio"
              checked={searchOption === 'name'}
              onChange={() => setSearchOption('name')}
            />
            <label className="option" htmlFor="name">
              Nome
            </label>
          </div>
          <div title="CPF">
            <input
              id="cpf"
              name="option"
              type="radio"
              checked={searchOption === 'cpf'}
              onChange={() => setSearchOption('cpf')}
            />
            <label className="option" htmlFor="cpf">
              CPF
            </label>
          </div>
          <div title="Email">
            <input
              id="email"
              name="option"
              type="radio"
              checked={searchOption === 'email'}
              onChange={() => setSearchOption('email')}
            />
            <label className="option" htmlFor="email">
              Email
            </label>
          </div>
          <div title="Id">
            <input
              id="id"
              name="option"
              type="radio"
              checked={searchOption === 'id'}
              onChange={() => setSearchOption('id')}
            />
            <label className="option" htmlFor="id">
              Id
            </label>
          </div>
        </div>
      </div>

      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Pesquisar por ${searchOption !== 'Filtro' ? searchOption : ''}`}
          disabled={searchOption === 'Filtro'} 
        />
        <button
          onClick={handleSearch}
          disabled={searchOption === 'Filtro'}
          className="searchButton"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
