"use client"
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { getParticipants } from "@/services/participantsService";
import { generateRandomNumber } from "@/utils/numbers";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Button from "@/components/Button/Button";

const UsersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Participant[]>([]);
    const [data, setData] = useState<Participant[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const router = useRouter();

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

    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const nameMatch = item.identification.toLowerCase().includes(searchTerm.toLowerCase());
            const fullName = `${item.firstName.toLowerCase()} ${item.firstSurname.toLowerCase()} ${item.secondSurname.toLowerCase()}`;
            const fullNameMatch = fullName.includes(searchTerm.toLowerCase());
            return nameMatch || fullNameMatch;
        });
        setFilteredData(filtered);
        setRandomNumber(generateRandomNumber());
    };

    const updateParticipant = (id: number) => {
        router.push(`/record/${id}`);
      };

    return (
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto py-10 px-20 my-6 rounded-2xl max-w-4xl">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Búsqueda
            </h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                showSelect={false}
            />
            {filteredData.length > 0 ? (
                <Table
                    keys={['identification', 'firstName', 'firstSurname', 'secondSurname', 'grade']}
                    data={filteredData}
                    headers={["Identificación","Nombre","Primer Apellido","Segundo Apellido","Escolaridad",]}
                    itemsPerPage={6}
                    actionColumn='none'
                    resetPagination={randomNumber}
                    doubleClickRowFunction={updateParticipant}
                />
            ) : (
                <p>No se encontraron resultados</p>
            )}
            <div className="mt-6">
                <Link href="/record">
                    <Button className="bg-red-gradient w-60">Agregar</Button> 
                </Link> 
           </div>
        </div>
    );
}

export default UsersPage;