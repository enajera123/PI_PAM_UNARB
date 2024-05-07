import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import InputField from '@/components/InputField/InputField';
import Select from '@/components/Select/Select';
import TextArea from '@/components/TextArea/TextArea';
import logoUNAPAM from '@/resources/LogoColorful.png';
import Image from 'next/image';
import { FaRegCalendarAlt, FaUsers } from 'react-icons/fa';
import { HiOutlineIdentification } from 'react-icons/hi';
import { LuFileEdit } from 'react-icons/lu';
import { LuUserCircle2 } from "react-icons/lu";


    const options = [
      { value: "US", label: "United States" },
      { value: "CA", label: "Canada" },
      { value: "FR", label: "France" },
      { value: "DE", label: "Germany" },
    ];

export default function Home() {
    return (
        <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
            <div className='grid grid-cols-3 gap-4'>
                <div className="col-span-1">
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
                </div>
                <div className="col-span-1">
                    <Select
                    label="Escolaridad"
                    placeholder="Escolaridad"
                    icon={<FaUsers color="white" />}
                    options={options}
                    />
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-44 h-auto" />
                </div>
                <div className="col-span-1">
                    <div className='mt-7'>
                    <Button className="bg-red-gradient">Agregar Poliza Estudiantil</Button>
                    </div>
                </div>
                <div className="col-span-1">
                    <InputField
                    label="Vencimiento de Poliza"
                    placeholder="Fecha de Vencimiento"
                    type="date"
                    iconStart={<FaRegCalendarAlt color="white" />}/>
                </div>
                <div className="">
                </div>
                <div className="col-span-1">
                    <InputField
                        label="Nombre"
                        placeholder="Nombre"
                        iconStart={<HiOutlineIdentification color="white" />}
                    />
                    <InputField
                        label="Telefono"
                        placeholder="Telefono"
                        iconStart={<HiOutlineIdentification color="white" />}
                    />
                </div>
                <div className="col-span-1">
                    <InputField
                        label="Primer Apellido"
                        placeholder="Primer Apellido"
                        iconStart={<HiOutlineIdentification color="white" />}
                    />
                    <InputField
                        label="Fecha de Nacimiento"
                        placeholder="Fecha de Nacimiento"
                        type="date"
                        iconStart={<FaRegCalendarAlt color="white" />}
                    />
                </div>
                <div className="col-span-1">
                    <InputField
                        label="Segundo Apellido"
                        placeholder="Segundo Apellido"
                        iconStart={<HiOutlineIdentification color="white" />}
                    />
                    <InputField
                        label="Email"
                        placeholder="Email"
                        iconStart={<HiOutlineIdentification color="white" />}
                    />
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                <div className="col-span-3">
                    <TextArea
                        label="Dirección"
                        placeholder="Dirección"
                        rows={6}
                    />  
                </div>
                <div className="col-span-1">
                    <div className='flex flex-col items-center justify-center'>
                        <LuUserCircle2  className="w-32 h-auto text-white" />
                        <Button className="bg-red-gradient">Foto</Button> 
                    </div>
                </div>
            </div>
            <div className='min-w-md'>
                <Button className="bg-red-gradient px-28">Salud</Button>
                <Button className="bg-red-gradient px-12">Desactivar</Button> 
                <Button className="bg-red-gradient px-12">Eliminar</Button>  
            </div>
            
        </div>
      );      
}