"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useEffect, useState } from "react";

interface DataItem {
    identification: string;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    idExpirationDate: string;
    policy: string;
    policyExpirationDate: string;
    medicalReport: string;
    medReportExpirationDate: string;
}

const data: DataItem[] = [
    {
        identification: "90123456",
        firstName: "Carmen",
        firstSurname: "Gutiérrez",
        secondSurname: "López",
        idExpirationDate: "04/09/2027",
        policy: "1234",
        policyExpirationDate: "10/22/2025",
        medicalReport: "def789",
        medReportExpirationDate: "06/15/2026",
    },
    {
        identification: "01234567",
        firstName: "Javier",
        firstSurname: "Fernández",
        secondSurname: "Sanz",
        idExpirationDate: "12/05/2026",
        policy: "4567",
        policyExpirationDate: "08/18/2027",
        medicalReport: "ghi012",
        medReportExpirationDate: "01/30/2025",
    },
    {
        identification: "34561234",
        firstName: "Sofía",
        firstSurname: "García",
        secondSurname: "Molina",
        idExpirationDate: "03/20/2028",
        policy: "7890",
        policyExpirationDate: "07/07/2026",
        medicalReport: "jkl345",
        medReportExpirationDate: "11/22/2024",
    },
    {
        identification: "45612345",
        firstName: "Roberto",
        firstSurname: "Herrera",
        secondSurname: "Jiménez",
        idExpirationDate: "10/15/2025",
        policy: "2468",
        policyExpirationDate: "12/30/2027",
        medicalReport: "mno678",
        medReportExpirationDate: "09/05/2026",
    },
    {
        identification: "56123456",
        firstName: "Isabel",
        firstSurname: "Moreno",
        secondSurname: "Ruiz",
        idExpirationDate: "08/28/2026",
        policy: "1357",
        policyExpirationDate: "04/03/2025",
        medicalReport: "pqr901",
        medReportExpirationDate: "07/14/2028",
    },
    {
        identification: "12345678",
        firstName: "Manuel",
        firstSurname: "Díaz",
        secondSurname: "Prieto",
        idExpirationDate: "11/30/2027",
        policy: "9753",
        policyExpirationDate: "03/15/2026",
        medicalReport: "stu234",
        medReportExpirationDate: "02/19/2025",
    },
    {
        identification: "65432123",
        firstName: "Eva",
        firstSurname: "Molina",
        secondSurname: "Santos",
        idExpirationDate: "05/22/2028",
        policy: "4682",
        policyExpirationDate: "09/28/2026",
        medicalReport: "vwx567",
        medReportExpirationDate: "04/11/2025",
    },
    {
        identification: "76543212",
        firstName: "Pablo",
        firstSurname: "Fernández",
        secondSurname: "Gutiérrez",
        idExpirationDate: "09/12/2027",
        policy: "3597",
        policyExpirationDate: "06/20/2025",
        medicalReport: "yz0123",
        medReportExpirationDate: "11/01/2024",
    },
    {
        identification: "87654321",
        firstName: "Marta",
        firstSurname: "Sanz",
        secondSurname: "Hernández",
        idExpirationDate: "07/01/2026",
        policy: "6543",
        policyExpirationDate: "12/09/2027",
        medicalReport: "abc456",
        medReportExpirationDate: "08/14/2025",
    },
    {
        identification: "98765432",
        firstName: "Alberto",
        firstSurname: "Gómez",
        secondSurname: "Martín",
        idExpirationDate: "06/05/2027",
        policy: "9876",
        policyExpirationDate: "10/31/2025",
        medicalReport: "def789",
        medReportExpirationDate: "03/27/2026",
    },
    {
        identification: "23456789",
        firstName: "Lucía",
        firstSurname: "Jiménez",
        secondSurname: "López",
        idExpirationDate: "04/18/2028",
        policy: "3210",
        policyExpirationDate: "08/02/2025",
        medicalReport: "ghi012",
        medReportExpirationDate: "01/14/2027",
    },
    {
        identification: "87654321",
        firstName: "Rocío",
        firstSurname: "Sánchez",
        secondSurname: "Gutiérrez",
        idExpirationDate: "12/09/2026",
        policy: "6789",
        policyExpirationDate: "05/25/2025",
        medicalReport: "jkl345",
        medReportExpirationDate: "09/30/2027",
    },
    {
        identification: "76543210",
        firstName: "Sergio",
        firstSurname: "Martínez",
        secondSurname: "Vega",
        idExpirationDate: "10/24/2027",
        policy: "1357",
        policyExpirationDate: "07/12/2025",
        medicalReport: "mno678",
        medReportExpirationDate: "02/06/2026",
    },
    {
        identification: "54321098",
        firstName: "Adriana",
        firstSurname: "Alvarez",
        secondSurname: "García",
        idExpirationDate: "03/08/2026",
        policy: "9876",
        policyExpirationDate: "11/15/2027",
        medicalReport: "pqr901",
        medReportExpirationDate: "04/23/2025",
    },
    {
        identification: "43210987",
        firstName: "Diego",
        firstSurname: "López",
        secondSurname: "Mendoza",
        idExpirationDate: "09/17/2028",
        policy: "2468",
        policyExpirationDate: "06/01/2025",
        medicalReport: "stu234",
        medReportExpirationDate: "12/07/2026",
    },
    {
        identification: "21098765",
        firstName: "Natalia",
        firstSurname: "Ramírez",
        secondSurname: "Ortega",
        idExpirationDate: "08/03/2027",
        policy: "9753",
        policyExpirationDate: "02/14/2026",
        medicalReport: "vwx567",
        medReportExpirationDate: "07/19/2025",
    },
    {
        identification: "10987654",
        firstName: "Carlos",
        firstSurname: "García",
        secondSurname: "Hernández",
        idExpirationDate: "06/14/2026",
        policy: "4682",
        policyExpirationDate: "10/27/2027",
        medicalReport: "yz0123",
        medReportExpirationDate: "03/02/2025",
    },
    {
        identification: "09876543",
        firstName: "Ana",
        firstSurname: "Hernández",
        secondSurname: "Martínez",
        idExpirationDate: "01/28/2028",
        policy: "6543",
        policyExpirationDate: "07/05/2025",
        medicalReport: "abc456",
        medReportExpirationDate: "11/10/2026",
    },
    {
        identification: "98765432",
        firstName: "Mario",
        firstSurname: "Sánchez",
        secondSurname: "Ruiz",
        idExpirationDate: "05/19/2026",
        policy: "3210",
        policyExpirationDate: "09/30/2027",
        medicalReport: "def789",
        medReportExpirationDate: "04/14/2025",
    },
    {
        identification: "87654321",
        firstName: "Sara",
        firstSurname: "Martín",
        secondSurname: "López",
        idExpirationDate: "08/27/2027",
        policy: "6789",
        policyExpirationDate: "12/03/2025",
        medicalReport: "ghi012",
        medReportExpirationDate: "07/20/2026",
    },
    {
        identification: "76543210",
        firstName: "Pablo",
        firstSurname: "Gómez",
        secondSurname: "Santos",
        idExpirationDate: "04/02/2028",
        policy: "1357",
        policyExpirationDate: "10/15/2025",
        medicalReport: "jkl345",
        medReportExpirationDate: "03/29/2027",
    },
    {
        identification: "12345678",
        firstName: "Ana",
        firstSurname: "Gómez",
        secondSurname: "Martínez",
        idExpirationDate: "05/10/2026",
        policy: "5678",
        policyExpirationDate: "07/15/2027",
        medicalReport: "abc123",
        medReportExpirationDate: "03/20/2026",
    },
    {
        identification: "23456789",
        firstName: "Juan",
        firstSurname: "López",
        secondSurname: "Hernández",
        idExpirationDate: "03/25/2025",
        policy: "9876",
        policyExpirationDate: "09/30/2026",
        medicalReport: "xyz456",
        medReportExpirationDate: "11/12/2027",
    },
    {
        identification: "34567890",
        firstName: "María",
        firstSurname: "Rodríguez",
        secondSurname: "Pérez",
        idExpirationDate: "08/15/2024",
        policy: "4321",
        policyExpirationDate: "06/28/2025",
        medicalReport: "ijk789",
        medReportExpirationDate: "04/05/2023",
    },
    {
        identification: "45678901",
        firstName: "Luis",
        firstSurname: "Martínez",
        secondSurname: "González",
        idExpirationDate: "09/20/2025",
        policy: "1357",
        policyExpirationDate: "04/01/2026",
        medicalReport: "lmn456",
        medReportExpirationDate: "12/10/2024",
    },
    {
        identification: "56789012",
        firstName: "Elena",
        firstSurname: "Sánchez",
        secondSurname: "García",
        idExpirationDate: "11/05/2027",
        policy: "2468",
        policyExpirationDate: "08/15/2025",
        medicalReport: "opq789",
        medReportExpirationDate: "02/28/2028",
    },
    {
        identification: "67890123",
        firstName: "Pedro",
        firstSurname: "Hernández",
        secondSurname: "Díaz",
        idExpirationDate: "06/30/2026",
        policy: "3579",
        policyExpirationDate: "03/22/2023",
        medicalReport: "rst012",
        medReportExpirationDate: "10/07/2025",
    },
    {
        identification: "67321341",
        firstName: "Pedro",
        firstSurname: "Perez",
        secondSurname: "Fallas",
        idExpirationDate: "06/30/2026",
        policy: "3521",
        policyExpirationDate: "03/22/2023",
        medicalReport: "r23xwe",
        medReportExpirationDate: "10/07/2025",
    },
    {
        identification: "12390023",
        firstName: "Pedro",
        firstSurname: "Arroyo",
        secondSurname: "Gutierrez",
        idExpirationDate: "06/30/2026",
        policy: "8888",
        policyExpirationDate: "03/22/2023",
        medicalReport: "i321i9",
        medReportExpirationDate: "10/07/2025",
    },
    {
        identification: "78901234",
        firstName: "Laura",
        firstSurname: "Gómez",
        secondSurname: "Ramírez",
        idExpirationDate: "02/18/2028",
        policy: "4680",
        policyExpirationDate: "11/19/2024",
        medicalReport: "uvw345",
        medReportExpirationDate: "05/25/2026",
    },
    {
        identification: "89012345",
        firstName: "Daniel",
        firstSurname: "Rodríguez",
        secondSurname: "Alvarez",
        idExpirationDate: "07/14/2025",
        policy: "5791",
        policyExpirationDate: "09/02/2027",
        medicalReport: "xyz678",
        medReportExpirationDate: "08/30/2024",
    },
];

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<DataItem[]>(data);
    const [selectedOption, setSelectedOption] = useState("id");
    const [randomNumber, setRandomNumber] = useState<number>(0);
  
    const headers = [
      "Identificación",
      "Nombre",
      "Apellido",
      "Apellido",
      "FecVenCed",
      "Poliza",
      "FecVenPoliza",
      "Dictamen",
      "FecVenDicta",
    ];
  
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
        //clases de ancho máximo proporcionadas por Tailwind, como max-w-xs, max-w-sm, max-w-md, max-w-lg, max-w-xl, max-w-2xl, max-w-3xl, max-w-4xl, max-w-5xl, max-w-6xl, max-w-7xl, max-w-full
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
  };
  
  export default Home;