import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import TextArea from "@/components/TextArea/TextArea";
import { BsDiagram3, BsFillPersonCheckFill, BsHeartPulse } from "react-icons/bs";
import { FaHashtag, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import logoUNAPAM from '@/resources/LogoColorful.png';
import Image from 'next/image';
import { HiOutlineIdentification } from "react-icons/hi";
import { GoKey, GoPerson } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

export default function courseRegister() {
    const options = [
        { value: "Admin", label: "Administrador" },
        { value: "User", label: "Usuario" },  
    ];
return(
    <div className="container grid grid-cols-3 gap-0 mx-auto px-36 mt-4 items-center">
        <div className="col-span-1 ">
            <div className="container bg-white max-h-sm p-6 flex flex-col items-center justify-center rounded-l-3xl">
                    <p className="text-3xl font-bold text-medium-gray text-center">Registro</p>
                    <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
            </div>
        </div>
        <div className="col-span-2">
            <div className="container bg-gray-gradient grid grid-cols-2 gap-4 p-10 rounded-3xl">
                <div className="col-span-1">
                    <InputField
                        label="Identificación"
                        placeholder="Identificación"
                        iconStart={<HiOutlineIdentification color="white" />}/>
                    <InputField
                        label="Nombre"
                        placeholder="Nombre"              
                        iconStart={<GoPerson color="white" />} />
                </div>
                <div>
                    <Select
                        label="Rol"
                        placeholder="Roles"
                        icon={<BsDiagram3 color="white" />}
                        options={options}/>
                </div>
                <div>
                    <InputField
                        label="Primer Apellido"
                        placeholder="Primer Apellido"
                        iconStart={<GoPerson color="white" />}
                    />
                </div>
                <div>
                     <InputField
                        label="Segundo Apellido"
                        placeholder="Segundo Apellido"
                        iconStart={<GoPerson color="white" />}/>
                </div>
                <div>
                    <InputField
                        label="Teléfono"
                        placeholder="Teléfono"
                        iconStart={<FiPhoneCall color="white" />}/>
                    <InputField
                        label="Fecha de nacimiento"
                        placeholder="Fecha de nacimiento"
                        type="date"
                        iconStart={<FaRegCalendarAlt color="white" />}/>
                </div>
                <div>
                     <InputField
                        label="Email"
                        placeholder="Email"
                        iconStart={<MdOutlineEmail color="white" />}/>
                    <InputField
                        label="Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        iconStart={<GoKey color="white" />}/>
                </div>
                    <Button className="bg-medium-gray text-dark-gray">Eliminar</Button> 
                    <Button className="bg-red-gradient text-dark-gray">Registrar</Button> 
            </div>
        </div>
    </div> 
);
}