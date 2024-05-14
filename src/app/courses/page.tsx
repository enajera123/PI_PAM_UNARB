"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useState } from "react";

interface DataItem {
    name: string;
    code: string;
}
const data: DataItem[] = [
    {
        name: "CursoA",
        code: "a32d"
    },
    {
        name: "CursoB",
        code: "b5kl"
    },
    {
        name: "CursoC",
        code: "c9ks"
    },
    {
        name: "CursoD",
        code: "dk2d"
    },
    {
        name: "CursoE",
        code: "e3c2"
    },
    {
        name: "CursoF",
        code: "f2id"
    },
    {
        name: "CursoG",
        code: "g9dm"
    },
    {
        name: "CursoH",
        code: "h4ñ2"
    },
    {
        name: "CursoI",
        code: "i43c"
    },

];

const SearchCoursesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<DataItem[]>(data);
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const headers = [
        "Nombre",
        "Código",
    ];

    const generateRandomNumber = (): number => {
        return Math.floor(Math.random() * 10000) + 1;
    };

    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const codeMatch = item.code.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || codeMatch;
        });
        setFilteredData(filtered);
        setRandomNumber(generateRandomNumber());
    };

    return (
        //clases de ancho máximo proporcionadas por Tailwind, como max-w-xs, max-w-sm, max-w-md, max-w-lg, max-w-xl, max-w-2xl, max-w-3xl, max-w-4xl, max-w-5xl, max-w-6xl, max-w-7xl, max-w-full
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto py-10 px-20 my-6 rounded-2xl max-w-2xl"> 
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Búsqueda de cursos
            </h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                showSelect={false}
            />
            {filteredData.length > 0 ? (
                <Table
                    data={filteredData}
                    headers={headers}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                />
            ) : (
                <p>No se encontraron resultados</p>
            )}
        </div>
    );
}

export default SearchCoursesPage;