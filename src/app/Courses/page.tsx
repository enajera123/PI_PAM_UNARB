"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { getCourses } from "@/services/coursesService";
import { generateRandomNumber } from "@/utils/numbers";
import { useEffect, useState } from "react";


const SearchCoursesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<Course[]>([])
    const [filteredData, setFilteredData] = useState<Course[]>(data);
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const fetchData = async () => {
        const courses = await getCourses();
        if (courses) {
            setData(courses);
            setFilteredData(courses);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const codeMatch = item.courseNumber.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || codeMatch;
        });
        setFilteredData(filtered);
        setRandomNumber(generateRandomNumber());
    };

    return (
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
                    keys={[]}
                    data={filteredData}
                    headers={["Nombre", "Código",]}
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