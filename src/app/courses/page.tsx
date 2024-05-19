"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { getCourses, deleteCourse } from "@/services/coursesService";
import { deleteParticipantsOnCourseByCourseId } from "@/services/participantOnCourseService";
import { generateRandomNumber } from "@/utils/numbers";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Link from 'next/link';
import { useCourseStore } from "@/store/coursesStore";
import { useRouter } from "next/navigation";

const SearchCoursesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { getCourses, deleteCourse, courses, putCourse } = useCourseStore()
    const [filteredData, setFilteredData] = useState<Course[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        async function fetch() {
            await getCourses()
        }
        fetch()
    }, [])
    useEffect(() => {
        if (courses) {
            setFilteredData(courses)
        }
    }, [courses])
    
    const updateCourse = (id: number) => {
        router.push(`/courseRegister/${id}`)
    }
    
    const desactivateRowFunction = async (id: number) => {
        const course = courses.find((u) => u.id === id);
        if (course) {
            course.state = course.state === 'Inactive' as unknown as State ? "Active" as unknown as State : "Inactive" as unknown as State;
            await putCourse(id, course)
        }
    }
    
    const handleSearch = () => {
        const filtered = courses.filter((item) => {
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
                    desactivateRowFunction={desactivateRowFunction}
                    deleteRowFunction={deleteCourse}
                    doubleClickRowFunction={updateCourse}
                    keys={['name', 'courseNumber']} 
                    data={filteredData}
                    headers={["Nombre", "Código"]}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                    actionColumn="delete-participants"
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
