"use client"
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useUsersStore } from "@/store/usersStore";
import { generateRandomNumber } from "@/utils/numbers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const UsersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { getUsers, deleteUser, users, putUser } = useUsersStore()
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const router = useRouter();
    useEffect(() => {
        async function fetch() {
            await getUsers()
        }
        fetch()
    }, [])
    useEffect(() => {
        if (users) {
            setFilteredData(users)
        }
    }, [users])


    const handleSearch = () => {
        const filtered = users.filter((item) => {
            const nameMatch = item.identification.toLowerCase().includes(searchTerm.toLowerCase());
            const fullName = `${item.firstName.toLowerCase()} ${item.firstSurname.toLowerCase()} ${item.secondSurname.toLowerCase()}`;
            const fullNameMatch = fullName.includes(searchTerm.toLowerCase());
            return nameMatch || fullNameMatch;
        });
        setFilteredData(filtered);
        setRandomNumber(generateRandomNumber());
    };
    const updateUser = (id: number) => {
        router.push(`/userRegister/${id}`)
    }
    const desactivateRowFunction = async (id: number) => {
        const user = users.find((u) => u.id === id);
        if (user) {
            user.state = user.state === 'Inactive' as unknown as State ? "Active" as unknown as State : "Inactive" as unknown as State;
            await putUser(id, user)
        }
    }
    const mapStateToSpanish = (state: string): string => {
        switch (state) {
            case 'Active':
                return 'Activo';
            case 'Inactive':
                return 'Inactivo';
            default:
                return state;
        }
    };

    return (
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto my-6 py-10 px-20 rounded-2xl max-w-4xl">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Usuarios
            </h1>
            <div className="w-full gap-3 flex justify-between items-center">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    showSelect={false}
                />
            </div>
            {filteredData.length > 0 ? (
                <Table
                    desactivateRowFunction={desactivateRowFunction}
                    deleteRowFunction={deleteUser}
                    doubleClickRowFunction={updateUser}
                    keys={["identification", "firstName", "firstSurname", "secondSurname", 'state']}
                    data={filteredData.map(user => ({ ...user, state: mapStateToSpanish(user.state.toString()) }))}
                    headers={["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido", 'Estado',]}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                    actionColumn='delete-state'
                    addButtonUrl="/userRegister"
                />
            ) : (
                <>
            <p className="text-center">No se encontraron resultados</p>
            <div className="flex justify-end mt-4">
              <Link href={"/userRegister"}>
                <button className="flex text-white items-center px-6 py-2 rounded-lg bg-dark-red hover:bg-red-gradient">
                  Agregar
                </button>
              </Link>
            </div>
          </>
            )}
        </div>
    );
}

export default UsersPage;