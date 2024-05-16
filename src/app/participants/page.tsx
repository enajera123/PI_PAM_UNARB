"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { getParticipants } from "@/services/participantsService";
import { useEffect, useState } from "react";


const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Participant[]>([]);
    const [data, setData] = useState<Participant[]>([])
    const [selectedOption, setSelectedOption] = useState("id");
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const fetchData = async () => {
        const participants = await getParticipants();
        if (participants) {
            setData(participants);
            setFilteredData(participants);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const generateRandomNumber = (): number => {
        return Math.floor(Math.random() * 10000) + 1;
    };

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

    return (
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto p-10 my-6 rounded-2xl max-w-6xl">
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
            <div className="max-w-5xl">
                {filteredData.length > 0 ? (
                    <Table
                        keys={['identification', 'firstName', 'firstSurname', 'secondSurname', 'Policy.policyNumber', 'Policy.expirationDate', 'MedicalReport.reportNumber', 'MedicalReport.expirationDate']}
                        data={filteredData}
                        headers={["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido", "Poliza", "FecVenPoliza", "Dictamen", "FecVenDicta",]}
                        itemsPerPage={6}
                        resetPagination={randomNumber}
                    />
                ) : (
                    <p>No se encontraron resultados</p>
                )}
            </div>
        </div>
    );
};

export default Home;
