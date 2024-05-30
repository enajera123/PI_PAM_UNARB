"use client";
import React, { useEffect, useState } from "react";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { BsHeartPulse } from "react-icons/bs";
import { GoPerson, GoPersonAdd } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import logoUNAPAM from '@/resources/LogoWhite.png';
import Image from 'next/image';
import { BiInjection } from "react-icons/bi";
import { useParticipantDisseaseStore } from "@/store/participantDisseaseStore";
import { useParticipantHealthStore } from "@/store/participantHealthStore";
import { useParticipantMedicineStore } from "@/store/participantMedicineStore";
import { useReferenceContactStore } from "@/store/referenceContactStore";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { showDeleteConfirmation, showCustomAlert } from "@/utils/alerts";

export default function Health() {
  const [bloodType, setBloodType] = useState("");
  const [participantId, setParticipantId] = useState(0);
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [medicineDescription, setMedicineDescription] = useState("");

  //Constact
  const [firstName, setFirstName] = useState("");
  const [firstSurname, setFirstSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [secondFirstName, setSecondFirstName] = useState("");
  const [secondFirstSurname, setSecondFirstSurname] = useState("");
  const [secondPhoneNumber, setSecondPhoneNumber] = useState("");
  const [secondRelationship, setSecondRelationship] = useState("");

  const { postParticipantDisease, putParticipantDisease } = useParticipantDisseaseStore();
  const { postParticipantHealth, getParticipantHealthByParticipantId, putParticipantHealthByParticipantId, deleteParticipantHealth } = useParticipantHealthStore();
  const { postParticipantMedicine, putParticipantMedicine } = useParticipantMedicineStore();
  const [participantHealth, setParticipantHealth] = useState<ParticipantHealth | null>(null);
  const [contact, setContact] = useState<ReferenceContact | null>(null);
  const { postContact, getContactByParticipantId, putContactByParticipantId, deleteContact } = useReferenceContactStore();
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const participantIdFromUrl = query.get('participantId');
    if (participantIdFromUrl) {
      const id = parseInt(participantIdFromUrl, 10);
      setParticipantId(id);
      fetchParticipantHealthData(id);
      fetchContacts(id);
    }
  }, []);

  const fetchContacts = async (id: number) => {
    const response = await getContactByParticipantId(id);
    setContact(response);
  };

  const fetchParticipantHealthData = async (id: number) => {
    try {
      const response = await getParticipantHealthByParticipantId(id);
      if (response == null) return
      console.log('getParticipantHealthByParticipantId', response);
      setParticipantHealth(response);

      // Actualizar los estados de las enfermedades y medicamentos si están disponibles
      const diseases = response.ParticipantDisseases || [];
      const medicines = response.ParticipantMedicines || [];
      if (diseases.length > 0) {
        setDiseaseName(diseases[0].disease || "");
        setDiseaseDescription(diseases[0].description || "");
      }
      if (medicines.length > 0) {
        setMedicineName(medicines[0].medicine || "");
        setMedicineDescription(medicines[0].description || "");
      }
    } catch (error) {
      console.error("Error fetching participant health data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al obtener los datos de salud del participante.",
      });
    }
  };

  useEffect(() => {
    console.log("Participant contact:", contact);
    if (contact) {
      setFirstName(contact.firstName);
      setFirstSurname(contact.firstSurname);
      setPhoneNumber(contact.phoneNumber);
      setRelationship(contact.relationship);
      setSecondFirstName(contact.secondFirstName);
      setSecondFirstSurname(contact.secondFirstSurname);
      setSecondPhoneNumber(contact.secondPhoneNumber);
      setSecondRelationship(contact.secondRelationship);
    }
  }, [contact]);

  useEffect(() => {
    console.log("Participant state updated:", participantHealth);
    if (participantHealth) {
      setBloodType(participantHealth.bloodType || "");
      setParticipantId(participantHealth.participantId || 0);

      // Verifica si ParticipantDisseases y ParticipantMedicines existen y no están vacíos
      if (participantHealth.ParticipantDisseases && participantHealth.ParticipantDisseases.length > 0) {
        setDiseaseName(participantHealth.ParticipantDisseases[0].disease);
        setDiseaseDescription(participantHealth.ParticipantDisseases[0].description ?? '');
      }

      if (participantHealth.ParticipantMedicines && participantHealth.ParticipantMedicines.length > 0) {
        setMedicineName(participantHealth.ParticipantMedicines[0].medicine);
        setMedicineDescription(participantHealth.ParticipantMedicines[0].description ?? '');
      }
    }
  }, [participantHealth]);

  const handleSaveParticipantHealth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const createParticipantHealth = async () => {
      try {
        const participantHealthData = {
          bloodType,
          participantId,
        };

        const response = await postParticipantHealth(participantHealthData);
        console.log("participantHealth", participantHealthData);

        if (response) {
          const participantHealthId = response.id;

          if (diseaseName && diseaseDescription) {
            const diseaseData = {
              disease: diseaseName,
              description: diseaseDescription,
              participantHealthId: participantHealthId ?? 0,
            };
            await postParticipantDisease(diseaseData);
          }

          if (medicineName && medicineDescription) {
            const medicineData = {
              medicine: medicineName,
              description: medicineDescription,
              participantHealthId: participantHealthId ?? 0,
            };
            await postParticipantMedicine(medicineData);
          }
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "La salud del participante fue registrada con éxito.",
          });
          return;
        }
      } catch (error) {
        console.error("Error al registrar la salud del participante:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al registrar la salud del participante.",
        });
      }
    };

    await createParticipantHealth();
  };

  const handleUpdateParticipantHealth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updateParticipantHealth = async () => {
      const participantHealthData = {
        bloodType,
        participantId,
      };

      try {
        const response = await putParticipantHealthByParticipantId(participantId, participantHealthData);
        console.log("update participantHealth", participantHealthData);
        if (response) {
          const participantHealthId = response.id;

          if (diseaseName && diseaseDescription) {
            const diseaseData = {
              disease: diseaseName,
              description: diseaseDescription,
              participantHealthId: participantHealthId ?? 0,
            };
            await putParticipantDisease(participantId, diseaseData);
          }

          if (medicineName && medicineDescription) {
            const medicineData = {
              medicine: medicineName,
              description: medicineDescription,
              participantHealthId: participantHealthId ?? 0,
            };
            await putParticipantMedicine(participantId, medicineData);
          }
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "La salud del participante fue actualizada con éxito.",
          });
          return;
        }
      } catch (error) {
        console.error("Error al actualizar la salud del participante:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al actualizar la salud del participante.",
        });
      }
    };

    await updateParticipantHealth();
  };

  const handleSaveContact = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const participantContact = {
      firstName,
      firstSurname,
      phoneNumber,
      relationship,
      secondFirstName,
      secondFirstSurname,
      secondPhoneNumber,
      secondRelationship,
      participantId,
    };
    const response = await postContact(participantContact)
    if (response) {
      router.push('/searches')
    }
  };

  const handleUpdateContact = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const participantContact = {
      firstName,
      firstSurname,
      phoneNumber,
      relationship,
      secondFirstName,
      secondFirstSurname,
      secondPhoneNumber,
      secondRelationship,
      participantId,
    };
    const response = await putContactByParticipantId(participantId, participantContact)
    if (response) {
      router.push('/searches')
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      const result = await showDeleteConfirmation();
      if (result.isConfirmed) {
        await deleteContact(id);
        showCustomAlert(
          "¡Eliminado!",
          "El contacto del participante ha sido eliminado.",
          "success"
        );
        router.push("/searches");
      }
    } catch (error) {
      console.error("Error deleting participant contact:", error);
    }
  };


  const optionsBloodType = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "NA", label: "Sin proporcionar" },
  ];
  const optionsKinship = [
    { value: "Hijo/a", label: "Hijo/a" },
    { value: "Pareja/Conyugue", label: "Pareja/Conyugue" },
    { value: "Hermano/a", label: "Hermano/a" },
    { value: "Otro", label: "Otro" },
  ];

  return (
    <div className="container mx-auto bg-gray-gradient p-10 my-4 rounded-3xl">
      <div className="flex flex-row items-center">
        <div className="flex-initial w-1/4">
          <Select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            label="Tipo Sanguineo"
            placeholder="Tipo Sanguineo"
            icon={<BiInjection color="white" />}
            options={optionsBloodType}
          />
        </div>
        <div className="w-2/3 flex justify-end">
          <div className="ml-auto">
            <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex-initial w-1/3">
          <p className="text-xl font-bold text-light-gray">Enfermedades</p>
          <InputField
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            label="Enfermedad"
            placeholder="Enfermedad"
            iconStart={<BsHeartPulse color="white" />}
          />
          <InputField
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            label="Tratamiento"
            placeholder="Tratamiento"
            iconStart={<AiOutlineMedicineBox color="white" />}
          />
        </div>
        <div className="w-2/3 pl-10">
          <TextArea
            value={diseaseDescription}
            onChange={(e) => setDiseaseDescription(e.target.value)}
            label=""
            placeholder="Descripción"
            rows={4}
          />
          <div className="mt-6">
            <TextArea
              value={medicineDescription}
              onChange={(e) => setMedicineDescription(e.target.value)}
              label=""
              placeholder="Descripción"
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center pl-10 m-5">
        <div className="flex-initial w-1/3"></div>
        <div className="flex-initial w-1/3">
          <Button onClick={(e) => handleSaveParticipantHealth(e)} className="bg-red-gradient w-60">Registrar</Button>
        </div>
        <div className="flex-initial w-1/3">
          <Button onClick={(e) => handleUpdateParticipantHealth(e)} className="bg-red-gradient w-60">Actualizar</Button>
        </div>
        <div className="flex-initial w-1/3">
          <Button className="bg-red-gradient w-60">Eliminar</Button>
        </div>
      </div>
      <div className="flex-initial w-1/4">
        <p className="text-xl font-bold text-light-gray">Personas de Contacto</p>
        <Select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          label="Parentesco"
          placeholder="Parentesco"
          icon={<GoPersonAdd color="white" />}
          options={optionsKinship}
        />
      </div>
      <div className="flex items-center">
        <div className="flex-initial w-1/3">
          <InputField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label="Nombre"
            placeholder="Nombre"
            iconStart={<GoPerson color="white" />}
          />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            value={firstSurname}
            onChange={(e) => setFirstSurname(e.target.value)}
            label="Primer Apellido"
            placeholder="Primer Apellido"
            iconStart={<GoPerson color="white" />}
          />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Teléfono"
            placeholder="Teléfono"
            iconStart={<FiPhoneCall color="white" />}
          />
        </div>
      </div>
      <div className="flex-initial w-1/4">
        <Select
          value={secondRelationship}
          onChange={(e) => setSecondRelationship(e.target.value)}
          label="Parentesco"
          placeholder="Parentesco"
          icon={<GoPersonAdd color="white" />}
          options={optionsKinship}
        />
      </div>
      <div className="flex items-center">
        <div className="flex-initial w-1/3">
          <InputField
            value={secondFirstName}
            onChange={(e) => setSecondFirstName(e.target.value)}
            label="Nombre"
            placeholder="Nombre"
            iconStart={<GoPerson color="white" />}
          />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            value={secondFirstSurname}
            onChange={(e) => setSecondFirstSurname(e.target.value)}
            label="Primer Apellido"
            placeholder="Primer Apellido"
            iconStart={<GoPerson color="white" />}
          />
        </div>
        <div className="flex-initial w-1/3 pl-5">
          <InputField
            value={secondPhoneNumber}
            onChange={(e) => setSecondPhoneNumber(e.target.value)}
            label="Teléfono"
            placeholder="Teléfono"
            iconStart={<FiPhoneCall color="white" />}
          />
        </div>
      </div>
      <div className="flex items-center pl-10">
        <div className="flex-initial w-1/3"></div>
        <div className="flex-initial w-1/3">
          <Button onClick={(e) => handleSaveContact(e)} className="bg-red-gradient w-60">Registrar</Button>
        </div>
        <div className="flex-initial w-1/3">
          <Button onClick={(e) => handleUpdateContact(e)} className="bg-red-gradient w-60">Actualizar</Button>
        </div>
        <div className="flex-initial w-1/3">
          <Button onClick={() => handleDeleteContact(Number(participantId))} className="bg-red-gradient w-60">Eliminar</Button>
        </div>
      </div>
    </div>
  );
}
