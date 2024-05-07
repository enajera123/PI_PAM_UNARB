import Select from "@/components/Select/Select";
import {FaUsers} from "react-icons/fa";
export default function CoursesPage(){
    const options = [
        { value: "US", label: "United States" },
        { value: "CA", label: "Canada" },
        { value: "FR", label: "France" },
        { value: "DE", label: "Germany" },
      ];
    return (
        <div className="">
            <Select
            label="Rol"
            placeholder="Escoja un rol"
            icon={<FaUsers color="white" />}
            options={options}
            />
            <Select
            label="Rol"
            placeholder="Escoja un rol"
            icon={<FaUsers color="white" />}
            options={options}
            />
        </div>
    )
}