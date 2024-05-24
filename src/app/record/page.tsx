"use client"
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
import { LuUserCircle2 } from "react-icons/lu";
import { GoPerson } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { RiGraduationCapLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { useState } from 'react';

    const optionsScholarship = [
      { value: "Sin_Estudio", label: "Sin estudio" },
      { value: "Primaria_Completa", label: "Primaria completa" },
      { value: "Primaria_Incompleta", label: "Primaria incompleta" },
      { value: "Secundaria_Completa", label: "Secundaria completa" },
      { value: "Secundaria_Incompleta", label: "Secundaria incompleta"},
      { value: "Universidad_Completa", label: "Universidad completa" },
      { value: "Universidad_Incompleta", label: "Universidad incompleta" },
    ];
    const optionsTypeIdentification = [
        { value: "Nacional", label: "Nacional" },
        { value: "DIMEX", label: "DIMEX" },
      ];
    const data = [
        {
          name: "Curso 1",
          code: "1232",      
        },
        {
          name: "Curso 2",
          code: "2354",       
        },
        {
          name: "Curso 3",
          code: "5345",
        },
        {
          name: "Curso 4",
          code: "6345",
        },
        {
          name: "Curso 5",
          code: "6345",
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

export default function Home() {
    const [documentsData, setDocumentsData] = useState<ParticipantAttachment[]>([]);
    function deleteDocument(id: number): void {

    }

    function desactivateRowFunction(id: number): void {
        
    }

    return (
        <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
            <div className='grid grid-cols-3 gap-4'>
                <div className="col-span-1">
                    <InputField
                        label="Identificación"
                        placeholder="Identificación"
                        iconStart={<HiOutlineIdentification color="white" />}
                    />
                    <Select
                        label="Tipo de identificación"                      
                        placeholder="Tipo de identificación"
                        icon={<HiOutlineIdentification color="white" />}
                        options={optionsTypeIdentification}
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
                        rows={6} value={''} onChange={ ()=>void {
                            
                        } }/>  
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
                    <Table
                    deleteRowFunction={deleteDocument}
                    keys={['name','']}
                    data={dataFiles}
                    headers={["Documento", ""]}
                    itemsPerPage={3}
                    actionColumn="delete"
                    />
                </div>
                <div className='flex justify-center mt-6'>
                    <Button className="bg-red-gradient w-1/3">Agregar</Button>
                </div>
            </div>
            <div className='container bg-white mt-6 p-4 rounded-xl'>
                <p className="text-3xl font-bold text-dark-gray flex justify-center">Cursos</p>
                <div className='mt-6'>
                    <Table
                    desactivateRowFunction={desactivateRowFunction}
                    deleteRowFunction={deleteDocument}
                    keys={['name', 'code']}
                    data={data}
                    headers={["Nombre", "Codigo"]}
                    itemsPerPage={3}
                    actionColumn="delete-state"
                    />
                </div>
                <div className='flex justify-center mt-6'>
                    <Button className="bg-red-gradient w-1/3">Agregar</Button>
                </div>
            </div>
        </div>
      );
}