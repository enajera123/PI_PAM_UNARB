"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { getCourses, deleteCourse } from "@/services/coursesService";
import { deleteParticipantsOnCourseByCourseId } from "@/services/participantOnCourseService";
import { generateRandomNumber } from "@/utils/numbers";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Link from 'next/link';

const SearchCoursesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<Course[]>([]);
    const [filteredData, setFilteredData] = useState<Course[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const fetchData = async () => {
        try {
            const courses = await getCourses();
            if (courses) {
                console.log('Courses fetched:', courses);
                setData(courses);
                setFilteredData(courses);
            } else {
                console.log('No courses found');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const codeMatch = item.courseNumber.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || codeMatch;
        });
        setFilteredData(filtered);
        setRandomNumber(generateRandomNumber());
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteParticipantsOnCourseByCourseId(id);
            await deleteCourse(id);
            setData(data.filter(course => course.id !== id));
            setFilteredData(filteredData.filter(course => course.id !== id));
        } catch (error) {
            console.error('Error deleting course and participants:', error);
        }
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
                    keys={['name', 'courseNumber']}  // Aquí debes pasar las llaves correctas
                    data={filteredData}
                    headers={["Nombre", "Código"]}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                    actionButtons="all"
                    deleteItem={handleDelete}
                />
            ) : (
                <p>No se encontraron resultados</p>
            )}
            <div className="mt-6">
                <Link href="/courseRegister">
                    <Button className="bg-red-gradient w-60">Agregar</Button>
                </Link>
            </div>
        </div>
    );
};

export default SearchCoursesPage;
