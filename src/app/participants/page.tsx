"use client"
import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { deleteParticipant } from "@/services/participantsService";
import { getParticipantOnCourseByCourseId, deleteParticipantOnCourse } from "@/services/participantOnCourseService";
import { generateRandomNumber } from "@/utils/numbers";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Participant[]>([]);
    const [data, setData] = useState<Participant[]>([])
    const [selectedOption, setSelectedOption] = useState("id");
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');

    const fetchData = async () => {
        if (courseId) {
            const participants = await getParticipantOnCourseByCourseId(Number(courseId));
            console.log('Curso ID:', courseId);
            if (participants) {
                const transformedParticipants = participants.map(participant => ({
                    ...participant,
                    hasWhatsApp: participant.hasWhatsApp === "Yes" ? "Si" : "No"
                }));
                setData(transformedParticipants);
                setFilteredData(transformedParticipants);
                console.log('Partici: ', transformedParticipants);
            }
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const valueToSearch =
                selectedOption === "id"
                    ? item.identification
                    : `${item.firstName} ${item.firstSurname} ${item.secondSurname}`;
            return valueToSearch.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredData(filtered);
        setRandomNumber(generateRandomNumber());
    };

    const handleDelete = async (id: number) => {
        try {
            //await deleteParticipant(id);
            deleteParticipantOnCourse(id, Number(courseId));
            setData(data.filter(participant => participant.id !== id));
            setFilteredData(filteredData.filter(participant => participant.id !== id));
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
    };

    return (
        <div className="container mx-auto bg-gray-gradient p-10 my-4 rounded-3xl flex flex-col items-center">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Participantes de curso
            </h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                handleSearch={handleSearch}
                showSelect={true}
            />
            <div className="w-full">
                {filteredData.length > 0 ? (
                    <Table
                        keys={['identification', 'firstName', 'firstSurname', 'secondSurname', '', '', '', '', '']}
                        data={filteredData}
                        headers={["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido", "FecVenCed", "Poliza", "FecVenPoliza", "Dictamen", "FecVenDicta"]}
                        itemsPerPage={6}
                        actionColumn="delete"
                        resetPagination={randomNumber}
                        deleteRowFunction={handleDelete}
                    />
                ) : (
                    <p className="text-center">No se encontraron resultados</p>
                )}
            </div>
            <div className="mt-6">
                <Link href="/record">
                    <Button className="bg-red-gradient w-60">Agregar</Button>
                </Link>
            </div>
        </div>
    );
    
};

export default Home;
