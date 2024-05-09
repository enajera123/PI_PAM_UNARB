import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import InputField from '@/components/InputField/InputField';
import Select from '@/components/Select/Select';
import TextArea from '@/components/TextArea/TextArea';
import logoUNAPAM from '@/resources/LogoWhite.png';
import Image from 'next/image';
import Table from "@/components/Table/Table";
import { FaRegCalendarAlt, FaUsers } from 'react-icons/fa';
import { HiOutlineIdentification } from 'react-icons/hi';
import Link from 'next/link';
import { LuFileEdit } from 'react-icons/lu';
import { LuUserCircle2 } from "react-icons/lu";
import { GoPerson } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { RiGraduationCapLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';


    const optionsScholarship = [
      { value: "NO", label: "Sin estudio" },
      { value: "PC", label: "Primaria completa" },
      { value: "PI", label: "Primaria incompleta" },
      { value: "SC", label: "Secundaria completa" },
      { value: "SI", label: "Secundaria incompleta"},
      { value: "UC", label: "Universidad completa" },
      { value: "UI", label: "Universidad incompleta" },
    ];
    const data = [
        {
          name: "Curso 1",
          color: "1232",
          cat: "Activo",
        },
        {
          name: "Curso 2",
          color: "2354",
          cat: "Activo",
        },
        {
          name: "Curso 3",
          color: "5345",
          cat: "Activo",
        },
        {
          name: "Curso 4",
          color: "6345",
          cat: "Activo",
        },
        {
          name: "Curso 5",
          color: "6345",
          cat: "Activo",
        },
      ];
      const dataFiles = [
        {
          name: "Documento",
        },
        {
          name: "Documento",
        },
        {
          name: "Documento",
        },
        {
          name: "Documento",
        },
        {
          name: "Documento",
        },
      ];

    const headers = ["Nombre", "Codigo", "Estado", "Action"];
    const headersFiles = ["Nombre", "Action"];
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
                    icon={<RiGraduationCapLine color="white" />}
                    options={optionsScholarship}
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
                        iconStart={<GoPerson color="white" />}
                    />
                    <InputField
                        label="Telefono"
                        placeholder="Telefono"
                        iconStart={<FiPhoneCall color="white" />}
                    />
                </div>
                <div className="col-span-1">
                    <InputField
                        label="Primer Apellido"
                        placeholder="Primer Apellido"
                        iconStart={<GoPerson color="white" />}
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
                        iconStart={<GoPerson color="white" />}
                    />
                    <InputField
                        label="Email"
                        placeholder="Email"
                        iconStart={<MdOutlineEmail color="white" />}
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
            <div className='flex justify-between mt-4'>
                <Link href="/health">
                    <Button className="bg-red-gradient w-52">Salud</Button>
                </Link> 
                <Button className="bg-red-gradient w-52">Desactivar</Button> 
                <Button className="bg-red-gradient w-52">Eliminar</Button>  
            </div>
            <div className='flex justify-center mt-6'>
                <Button className="bg-red-gradient w-1/3">Registrar</Button>
            </div>
            <div className='container bg-white mt-6 p-4 rounded-xl'>
                <p className="text-3xl font-bold text-dark-gray flex justify-center">Documentos Adjuntos</p>
                <div className='mt-6'>
                    <Table data={dataFiles} headers={headersFiles} itemsPerPage={3}/>
                </div>
                <div className='flex justify-center mt-6'>
                    <Button className="bg-red-gradient w-1/3">Agregar</Button>
                </div>
            </div>
            <div className='container bg-white mt-6 p-4 rounded-xl'>
                <p className="text-3xl font-bold text-dark-gray flex justify-center">Cursos</p>
                <div className='mt-6'>
                    <Table data={data} headers={headers} itemsPerPage={3}/>
                </div>
                <div className='flex justify-center mt-6'>
                    <Button className="bg-red-gradient w-1/3">Agregar</Button>
                </div>
            </div>
        </div>
      );
}