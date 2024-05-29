import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { SearchBarProps } from "./type";

const SearchBar = ({ searchTerm, setSearchTerm, selectedOption, setSelectedOption, handleSearch, showSelect }: SearchBarProps) => {
    const [cleared, setCleared] = useState<boolean>(false);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setCleared(true);
    };

    useEffect(() => {
        if (cleared) {
            handleSearch();
            setCleared(false);
        }
    }, [cleared, handleSearch]);

    return (
        <div className={`mb-4 bg-dark-gray w-full flex items-center justify-between px-4 rounded-2xl py-3`}>
            <div className="relative w-full mr-10">
                <input
                    type="text"
                    className="bg-medium-gray border border-black text-white placeholder:text-white text-sm rounded-lg block w-full h-10 pl-4"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                {searchTerm && ( // Mostramos el botón solo si hay texto en el input
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
                        onClick={handleClearSearch}
                    >
                        <AiOutlineClose size={20} />
                    </button>
                )}
            </div>
            {showSelect && (
                <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption && setSelectedOption(e.target.value)}
                    className="bg-medium-gray border border-black text-white text-sm rounded-lg h-10 p-2 mr-10"
                >
                    <option value="id">Identificación</option>
                    <option value="name">Nombre y apellidos</option>
                </select>
            )}
            <button
                className="text-white bg-dark-red flex items-center justify-center rounded-lg h-10 px-12 hover:bg-red-gradient"
                onClick={handleSearch}
            >
                <AiOutlineSearch size={24} />
            </button>
        </div>
    );
};

export default SearchBar;