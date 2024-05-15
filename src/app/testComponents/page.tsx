import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import Table from "@/components/Table/Table";
import TextArea from "@/components/TextArea/TextArea";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { HiOutlineIdentification } from "react-icons/hi";

export default function Home() {
  const options = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "FR", label: "France" },
    { value: "DE", label: "Germany" },
  ];

  const data = [
    {
      name: "Apple MacBook Pro 17",
      color: "Silver",
      cat: "Laptop",
      price: "$2999",
    },
    {
      name: "Microsoft Surface Pro",
      color: "White",
      cat: "Laptop PC",
      price: "$1999",
    },
    {
      name: "Magic Mouse 2",
      color: "Black",
      cat: "Accessories",
      price: "$99",
    },
    {
      name: "Google Pixel Phone",
      color: "Gray",
      cat: "Phone",
      price: "$799",
    },
    {
      name: "Apple Watch 5",
      color: "Red",
      cat: "Wearables",
      price: "$999",
    },
  ];

  const headers = ["Product name", "Color", "Category", "Price", "Action"];

  return (
    <>
      <div className="container mx-auto bg-gray-gradient px-4 flex justify-center items-center h-screen">
        <div className="box-border h-full w-64 p-4">
          <InputField
            label="Identificación"
            placeholder="Identificación"
            iconStart={<HiOutlineIdentification color="white" />}
          />
          <InputField
            label="Fecha de nacimiento"
            placeholder="Fecha de nacimiento"
            type="date"
            iconStart={<FaRegCalendarAlt color="white" />}
          />
          <InputField
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            iconStart={<GoKey color="white" />}
          />
          <Select
            label="Rol"
            placeholder="Escoja un rol"
            icon={<FaUsers color="white" />}
            options={options}
          />
          <TextArea
            label="Descripción"
            placeholder="Escribe una descripción"
            rows={4}
          />
          <Checkbox label="Requiere dictamen" />
          <Button className="bg-red-gradient">Default</Button>
        </div>
      </div>
      <div className="container mx-auto bg-gray-gradient px-4 py-10 flex justify-center items-center h-auto">
        <Table keys={[]} data={data} headers={headers} itemsPerPage={3}/>
      </div>
    </>
  );
}
