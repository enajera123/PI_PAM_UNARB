"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import logoUNAPAM from "@/resources/LogoWhite.png";
import Image from "next/image";
import Table from "@/components/Table/Table";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import Link from "next/link";
import { LuUserCircle2 } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { useParticipantsStore } from "@/store/participantsStore";
import { usePolicyStore } from "@/store/policyStore";
import { useParticipantOnCourseStore } from "@/store/participantOnCourseStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function ParticipantRegister({
  params,
}: {
  params: { id: string };
}) {
  const [identification, setIdentification] = useState("");
  const [name, setName] = useState("");
  const [firstSurname, setFirstSurname] = useState("");
  const [secondSurname, setSecondSurname] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("Sin_Estudio");
  const [date, setBirthDate] = useState("");
  const [typeID, setTypeID] = useState("Nacional");
  const [hasWhatsApp, setHasWhatsApp] = useState("Yes");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const { getParticipantById, putParticipant } = useParticipantsStore();
  const { getParticipantOnCourseByParticipantId } =
    useParticipantOnCourseStore();
  const { getPolicys, policys, postPolicy, putPolicy } = usePolicyStore();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [courses, setCourses] = useState([]);
  const [policy, setPolicy] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const participantId = searchParams.get("participantId");

  async function fetchParticipant() {
    const id = parseInt(params.id);
    if (!id) {
      console.error("No ID provided in params.");
      return;
    }
    console.log(`Fetching participant with ID: ${id}`);
    const response = await getParticipantById(id);
    console.log("Fetched participant data:", response);
    if (response) {
      setParticipant(response);
    } else {
      console.error(`Participant with ID ${id} not found.`);
    }
  }

  useEffect(() => {
    fetchParticipant();
  }, [params.id]);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (participant && participant.photo && participant.photo.data) {
        try {
          const buffer = participant.photo.data;
          const arrayBuffer = new Uint8Array(buffer).buffer;
          
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  
          const file = new File([blob], "photo.jpg", { type: blob.type });
          
          setPhotoFile(file);
        } catch (error) {
          console.error("Error al cargar la foto:", error);
        }
      } else {
        console.error("No se encontraron datos de foto en el objeto participant.");
      }
    };
  
    fetchPhoto();
  }, [participant]);
  
  
  

  useEffect(() => {
    console.log("Participant state updated:", participant);
    if (participant) {
      setIdentification(participant.identification);
      setPhoneNumber(participant.phoneNumber);
      setName(participant.firstName);
      setFirstSurname(participant.firstSurname);
      setSecondSurname(participant.secondSurname);
      setGrade(participant.grade.toString());
      setEmail(participant.email);
      setHasWhatsApp(participant.hasWhatsApp);
      setTypeID(participant.typeIdentification.toString());
      setBirthDate(participant.birthDate);
      //setPhotoFile(participant.photo ?? null);
    }
  }, [participant]);

  const optionsGrade = [
    { value: "Sin_Estudio", label: "Sin estudio" },
    { value: "Primaria_Completa", label: "Primaria completa" },
    { value: "Primaria_Incompleta", label: "Primaria incompleta" },
    { value: "Secundaria_Completa", label: "Secundaria completa" },
    { value: "Secundaria_Incompleta", label: "Secundaria incompleta" },
    { value: "Universidad_Completa", label: "Universidad completa" },
    { value: "Universidad_Incompleta", label: "Universidad incompleta" },
  ];
  const optionsTypeIdentification = [
    { value: "Nacional", label: "Nacional" },
    { value: "DIMEX", label: "DIMEX" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      setPhotoFile(file);
    } else {
      console.error("Error: Archivo inválido seleccionado.");
      setPhotoFile(null);
    }
  };

  const handleUpdateParticipant = async (e) => {
    e.preventDefault();

    const createParticipant = async (photoUrl = null) => {
      const participant = {
        identification,
        firstName: name,
        firstSurname,
        secondSurname,
        phoneNumber: phone,
        email,
        hasWhatsApp: hasWhatsApp as YesOrNo,
        grade: grade as Grade,
        birthDate: date,
        typeIdentification: typeID as TypeIdentification,
        photo: photoUrl,
      };

      try {
        const response = await putParticipant(Number(params.id), participant);
        console.log("updated participant", participant);
        if (response) {
          router.push("/searches");
        }
      } catch (error) {
        console.error("Error al actualizar participante:", error);
      }
    };

    if (photoFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        await createParticipant(reader.result);
      };
      reader.readAsDataURL(photoFile);
    } else {
      await createParticipant();
    }
  };

  const headers = ["Nombre", "Codigo", "Estado", "Action"];
  const headersFiles = ["Nombre", "Action"];
  const dataFiles = [
    { name: "Documento" },
    { name: "Documento" },
    { name: "Documento" },
    { name: "Documento" },
    { name: "Documento" },
  ];

  return (
    <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <InputField
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            label="Identificación"
            placeholder="Identificación"
            iconStart={<HiOutlineIdentification color="white" />}
          />
          <Select
            value={typeID}
            onChange={(e) => setTypeID(e.target.value)}
            label="Tipo de identificación"
            placeholder="Tipo de identificación"
            icon={<HiOutlineIdentification color="white" />}
            options={optionsTypeIdentification}
          />
        </div>
        <div className="col-span-1">
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            label="Escolaridad"
            placeholder="Escolaridad"
            icon={<RiGraduationCapLine color="white" />}
            options={optionsGrade}
          />
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-44 h-auto" />
        </div>
        <div className="col-span-1">
          <div className="mt-7">
            <Button className="bg-red-gradient">
              Agregar Poliza Estudiantil
            </Button>
          </div>
        </div>
        <div className="col-span-1">
          <InputField
            label="Vencimiento de Poliza"
            placeholder="Fecha de Vencimiento"
            type="date"
            iconStart={<FaRegCalendarAlt color="white" />}
          />
        </div>
        <div className=""></div>
        <div className="col-span-1">
          <InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nombre"
            placeholder="Nombre"
            iconStart={<GoPerson color="white" />}
          />
          <InputField
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Telefono"
            placeholder="Telefono"
            iconStart={<FiPhoneCall color="white" />}
          />
        </div>
        <div className="col-span-1">
          <InputField
            value={firstSurname}
            onChange={(e) => setFirstSurname(e.target.value)}
            label="Primer Apellido"
            placeholder="Primer Apellido"
            iconStart={<GoPerson color="white" />}
          />
          <InputField
            value={date}
            onChange={(e) => setBirthDate(e.target.value)}
            label="Fecha de Nacimiento"
            placeholder="Fecha de Nacimiento"
            type="date"
            iconStart={<FaRegCalendarAlt color="white" />}
          />
        </div>
        <div className="col-span-1">
          <InputField
            value={secondSurname}
            onChange={(e) => setSecondSurname(e.target.value)}
            label="Segundo Apellido"
            placeholder="Segundo Apellido"
            iconStart={<GoPerson color="white" />}
          />
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Email"
            iconStart={<MdOutlineEmail color="white" />}
          />
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <div>
          <div className="flex flex-col items-center justify-center">
            {photoFile ? (
              <img
                src={URL.createObjectURL(photoFile)}
                alt="Foto"
                className="w-32 h-auto"
              />
            ) : (
              <LuUserCircle2 className="w-32 h-auto text-white" />
            )}
            <label className="bg-red-gradient cursor-pointer text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Foto
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Link href="/health">
          <Button className="bg-red-gradient w-52">Salud</Button>
        </Link>
        <Button
          onClick={(e) => handleUpdateParticipant(e)}
          className="bg-red-gradient w-1/3"
        >
          Registrar
        </Button>
        <Button className="bg-red-gradient w-52">Eliminar</Button>
      </div>
      <div className="container bg-white mt-6 p-4 rounded-xl">
        <p className="text-3xl font-bold text-dark-gray flex justify-center">
          Documentos Adjuntos
        </p>
        <div className="mt-6">
          <Table
            //deleteRowFunction={deleteDocument}
            keys={["name", ""]}
            data={dataFiles}
            headers={["Documento", ""]}
            itemsPerPage={3}
            actionColumn="delete"
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button className="bg-red-gradient w-1/3">Agregar</Button>
        </div>
      </div>
      <div className="container bg-white mt-6 p-4 rounded-xl">
        <p className="text-3xl font-bold text-dark-gray flex justify-center">
          Cursos
        </p>
        <div className="mt-6">
          <Table
            //desactivateRowFunction={desactivateRowFunction}
            //deleteRowFunction={deleteDocument}
            //doubleClickRowFunction={updateCourse}
            keys={["name", "courseNumber"]}
            data={dataFiles}
            headers={["Nombre", "Código"]}
            itemsPerPage={3}
            actionColumn="add-participant"
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button className="bg-red-gradient w-1/3">Agregar</Button>
        </div>
      </div>
    </div>
  );
}

/*"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import TextArea from "@/components/TextArea/TextArea";
import logoUNAPAM from "@/resources/LogoWhite.png";
import Image from "next/image";
import Table from "@/components/Table/Table";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import Link from "next/link";
import { LuUserCircle2 } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { useParticipantsStore } from "@/store/participantsStore";
import {
  Participant,
  ParticipantOnCourse,
  Policy,
  TypeIdentification,
} from "@prisma/client";
import { usePolicyStore } from "@/store/policyStore";
import { useMedicalReportStore } from "@/store/medicalReportStore";
import { useParticipantAttachmentStore } from "@/store/participantAttachmentStore";
import { useRouter } from "next/navigation";
import { useParticipantOnCourseStore } from "@/store/participantOnCourseStore";
import { useSearchParams } from "next/navigation";

export default function ParticipantRegister({
  params,
}: {
  params: { id: string };
}) {
  const { getParticipantById, participants } = useParticipantsStore();
  const { getParticipantOnCourseByParticipantId } =
    useParticipantOnCourseStore();
  const { getPolicys, policys, postPolicy, putPolicy } = usePolicyStore();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [filteredData, setFilteredData] = useState<ParticipantOnCourse[]>([]);
  const [data, setData] = useState<ParticipantOnCourse[]>([]);
  const [participantOnCourse, setParticipantOnCourse] =
    useState<ParticipantOnCourse | null>(null);
  const [policy, setPolicy] = useState<Policy | null>(null);
  async function fetchParticipant() {
    const response = await getParticipantById(parseInt(params.id));
    setParticipant(response);
  }
  useEffect(() => {
    if (params.id) {
      fetchParticipant();
    }
  }, []);
  useEffect(() => {
    if (participant) {
      setIdentification(participant.identification);
      setPhoneNumber(participant.phoneNumber);
      setName(participant.firstName);
      setFirstSurname(participant.firstSurname);
      setSecondSurname(participant.secondSurname);
      setGrade(participant.grade.toString());
      setEmail(participant.email);
      setTypeID(participant.typeIdentification.toString());
      setBirthDate(participant.birthDate);
      setPhoto(participant.photo ?? "");
      setPolicy(policy);
    }
  }, [participant]);

  const [identification, setIdentification] = useState("");
  const [name, setName] = useState("");
  const [firstSurname, setFirstSurname] = useState("");
  const [secondSurname, setSecondSurname] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("Participant");
  const [date, setBirthDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [typeID, setTypeID] = useState("Participant");
  const { putParticipant } = useParticipantsStore();
  const router = useRouter();

  const optionsGrade = [
    { value: "Sin_Estudio", label: "Sin estudio" },
    { value: "Primaria_Completa", label: "Primaria completa" },
    { value: "Primaria_Incompleta", label: "Primaria incompleta" },
    { value: "Secundaria_Completa", label: "Secundaria completa" },
    { value: "Secundaria_Incompleta", label: "Secundaria incompleta" },
    { value: "Universidad_Completa", label: "Universidad completa" },
    { value: "Universidad_Incompleta", label: "Universidad incompleta" },
  ];
  const optionsTypeIdentification = [
    { value: "Nacional", label: "Nacional" },
    { value: "DIMEX", label: "DIMEX" },
  ];

  const searchParams = useSearchParams();
  const participantId = searchParams.get("participantId");
  const fetchData = async () => {
    if (participantId) {
      // Cambia courseId a participantId
      try {
        const courses = await getParticipantOnCourseByParticipantId(
          Number(participantId)
        ); // Llama a la nueva función
        console.log("Participant ID:", participantId);
        if (courses) {
          const transformedCourses = courses.map((course) => ({
            ...course,
          }));
          setData(transformedCourses);
          setFilteredData(transformedCourses);
          console.log("Courses: ", transformedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  /*const data = [
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
  ];*/

/*const handleUpdateParticipant = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const participant = {
      grade: grade as unknown as Grade,
      identification,
      firstName: name,
      firstSurname,
      secondSurname,
      phoneNumber: phone,
      email,
      typeID: typeID as unknown as TypeIdentification,
      birthDate: date,
      state: "Active" as unknown as State,
    };
    const response = await putParticipant(Number(params.id), participant);
    if (response) {
      router.push("/participants");
    }
  };
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

  return (
    <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <InputField
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            label="Identificación"
            placeholder="Identificación"
            iconStart={<HiOutlineIdentification color="white" />}
          />
          <Select
            value={typeID}
            onChange={(e) => setTypeID(e.target.value)}
            label="Tipo de identificación"
            placeholder="Tipo de identificación"
            icon={<HiOutlineIdentification color="white" />}
            options={optionsTypeIdentification}
          />
        </div>
        <div className="col-span-1">
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            label="Escolaridad"
            placeholder="Escolaridad"
            icon={<RiGraduationCapLine color="white" />}
            options={optionsGrade}
          />
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-44 h-auto" />
        </div>
        <div className="col-span-1">
          <div className="mt-7">
            <Button className="bg-red-gradient">
              Agregar Poliza Estudiantil
            </Button>
          </div>
        </div>
        <div className="col-span-1">
          <InputField
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            label="Vencimiento de Poliza"
            placeholder="Fecha de Vencimiento"
            type="date"
            iconStart={<FaRegCalendarAlt color="white" />}
          />
        </div>
        <div className=""></div>
        <div className="col-span-1">
          <InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nombre"
            placeholder="Nombre"
            iconStart={<GoPerson color="white" />}
          />
          <InputField
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Telefono"
            placeholder="Telefono"
            iconStart={<FiPhoneCall color="white" />}
          />
        </div>
        <div className="col-span-1">
          <InputField
            value={firstSurname}
            onChange={(e) => setFirstSurname(e.target.value)}
            label="Primer Apellido"
            placeholder="Primer Apellido"
            iconStart={<GoPerson color="white" />}
          />
          <InputField
            value={date}
            onChange={(e) => setBirthDate(e.target.value)}
            label="Fecha de Nacimiento"
            placeholder="Fecha de Nacimiento"
            type="date"
            iconStart={<FaRegCalendarAlt color="white" />}
          />
        </div>
        <div className="col-span-1">
          <InputField
            value={secondSurname}
            onChange={(e) => setSecondSurname(e.target.value)}
            label="Segundo Apellido"
            placeholder="Segundo Apellido"
            iconStart={<GoPerson color="white" />}
          />
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Email"
            iconStart={<MdOutlineEmail color="white" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <TextArea
            label="Dirección"
            placeholder="Dirección"
            rows={6}
            value={""}
            onChange={() => void {}}
          />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col items-center justify-center">
            <LuUserCircle2 className="w-32 h-auto text-white" />
            <Button className="bg-red-gradient">Foto</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Link href="/health">
          <Button className="bg-red-gradient w-52">Salud</Button>
        </Link>
        <Button className="bg-red-gradient w-52">Desactivar</Button>
        <Button className="bg-red-gradient w-52">Eliminar</Button>
      </div>
      <div className="flex justify-center mt-6">
        <Button
          onClick={(e) => handleUpdateParticipant(e)}
          className="bg-red-gradient w-1/3"
        >
          Registrar
        </Button>
      </div>
      <div className="container bg-white mt-6 p-4 rounded-xl">
        <p className="text-3xl font-bold text-dark-gray flex justify-center">
          Documentos Adjuntos
        </p>
        <div className="mt-6">
          <Table
            keys={[]}
            data={dataFiles}
            headers={headersFiles}
            itemsPerPage={3}
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button className="bg-red-gradient w-1/3">Agregar</Button>
        </div>
      </div>
      <div className="container bg-white mt-6 p-4 rounded-xl">
        <p className="text-3xl font-bold text-dark-gray flex justify-center">
          Cursos
        </p>
        <div className="mt-6">
          <Table keys={[]} data={data} headers={headers} itemsPerPage={3} />
        </div>
        <div className="flex justify-center mt-6">
          <Button className="bg-red-gradient w-1/3">Agregar</Button>
        </div>
      </div>
    </div>
  );
}*/
