"use client"
import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { getUsers } from "@/services/usersService";
import { generateRandomNumber } from "@/utils/numbers";
import { useEffect, useState } from "react";
import Link from 'next/link';

const UsersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const [data, setData] = useState<User[]>([]);
    const [filteredData, setFilteredData] = useState<User[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const users = await getUsers();
            if (users) {
                setData(users);
                setFilteredData(users);
            }
        };
        fetchData();
    }, []);

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

    return (
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto my-6 py-10 px-20 rounded-2xl max-w-4xl">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Usuarios
            </h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                showSelect={false}
            />
            {filteredData.length > 0 ? (
                <Table
                    keys={["identification", "firstName", "firstSurname", "secondSurname"]}
                    data={filteredData}
                    headers={["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido",]}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                    showEditColumn={true}
                />
            ) : (
                <p>No se encontraron resultados</p>
            )}
           <div className="mt-6">
            <Link href="/userRegister">
                <Button className="bg-red-gradient w-60">Agregar</Button> 
            </Link> 
           </div>         
        </div>
    );
}

export default UsersPage;