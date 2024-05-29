"use client";
import { useState } from "react";
import { useParticipantsStore } from "@/store/participantsStore";
import { usePolicyStore } from "@/store/policyStore";
import { useMedicalReportStore } from "@/store/medicalReportStore";
import { useParticipantAttachmentStore } from "@/store/participantAttachmentStore";
import { useRouter } from "next/navigation";
import { Grade, TypeIdentification, YesOrNo } from "@prisma/client";
import { HiOutlineIdentification } from "react-icons/hi";
import { RiGraduationCapLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import Table from "@/components/Table/Table";
import Link from "next/link";
import Image from "next/image";
import logoUNAPAM from "@/resources/LogoWhite.png";
import { LuUserCircle2 } from "react-icons/lu";

export default function ParticipantRegister() {
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
  const [photoFile, setPhotoFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [expirationDatePolicy, setExpirationDatePolicy] = useState("");
  const [expirationDateReport, setExpirationDateReport] = useState("");
  const [attachments, setAttachments] = useState([]);

  const { postParticipant } = useParticipantsStore();
  const { postParticipantAttachment } = useParticipantAttachmentStore();
  const { postPolicy } = usePolicyStore();
  const { postMedicalReport } = useMedicalReportStore();
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const attachmentUrl = reader.result;
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        { name: file.name, attachmentUrl },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveParticipant = async (e) => {
    e.preventDefault();

    const createParticipant = async (photoUrl = null) => {
      try {
        const participantData = {
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

        const response = await postParticipant(participantData);
        console.log("participant", participantData);

        if (response) {
          const participantId = response.id;

          if (expirationDatePolicy) {
            const policyData = {
              participantId,
              expirationDate: expirationDatePolicy,
            };
            await postPolicy(policyData);
          }

          if (expirationDateReport) {
            const reportData = {
              participantId,
              expirationDate: expirationDateReport,
            };
            await postMedicalReport(reportData);
          }

          if (attachments.length > 0) {
            for (const attachment of attachments) {
              const attachmentData = {
                participantId,
                name: attachment.name,
                attachmentUrl: Buffer.from(
                  attachment.attachmentUrl.split(",")[1],
                  "base64"
                ),
              };
              console.log("attachmentData", attachmentData);
              await postParticipantAttachment(attachmentData);
            }
          }

          router.push("/searches");
        }
      } catch (error) {
        console.error("Error al registrar participante:", error);
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

  const optionsScholarship = [
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

  const dataFiles = [
    { name: "Documento" },
    { name: "Documento" },
    { name: "Documento" },
    { name: "Documento" },
    { name: "Documento" },
  ];

  const deleteDocument = (id: number) => {};

  const desactivateRowFunction = (id: number) => {};

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
            options={optionsScholarship}
          />
          <Select
            value={hasWhatsApp}
            onChange={(e) => setHasWhatsApp(e.target.value)}
            label="Tiene WhatsApp"
            placeholder="Tiene WhatsApp"
            icon={<FaWhatsapp color="white" />}
            options={[
              { value: "Yes", label: "Sí" },
              { value: "No", label: "No" },
            ]}
          />
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-44 h-auto" />
        </div>
        <div className="col-span-1">
          <div className="mt-7">
            <label className="bg-red-gradient cursor-pointer text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Agregar Poliza Estudiantil
              <input
                type="file"
                accept=".pdf,.docx,.jpg,.png"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="mt-7">
            <label className="bg-red-gradient cursor-pointer text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Agregar Dictamen Médico
              <input
                type="file"
                accept=".pdf,.docx,.jpg,.png"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <InputField
            value={expirationDatePolicy}
            onChange={(e) => setExpirationDatePolicy(e.target.value)}
            label="Vencimiento de Poliza"
            placeholder="Fecha de Vencimiento"
            type="date"
            iconStart={<FaRegCalendarAlt color="white" />}
          />
          <InputField
            value={expirationDateReport}
            onChange={(e) => setExpirationDateReport(e.target.value)}
            label="Vencimiento del Dictamen"
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

      <div className="flex justify-center mt-6">
        <Link href="/health">
          <Button className="bg-red-gradient w-52">Salud</Button>
        </Link>
        <Button
          onClick={(e) => handleSaveParticipant(e)}
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
            deleteRowFunction={deleteDocument}
            keys={["name", "url", "view"]}
            data={attachments}
            headers={["Documento", "URL", "Acción"]}
            itemsPerPage={3}
            actionColumn="delete"
          />
        </div>
        <div className="flex justify-center mt-6">
          <label className="bg-red-gradient cursor-pointer text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Agregar
            <input
              type="file"
              accept=".pdf,.docx,.jpg,.png"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

