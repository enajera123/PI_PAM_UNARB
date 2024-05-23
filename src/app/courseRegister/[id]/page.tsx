'use client'
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import TextArea from "@/components/TextArea/TextArea";
import Checkbox from "@/components/Checkbox/Checkbox";
import { BsFillPersonCheckFill, BsHeartPulse } from "react-icons/bs";
import { FaHashtag, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useCourseStore } from "@/store/coursesStore";
import { useRouter } from "next/navigation";
import { showCustomAlert } from "@/utils/alerts";

export default function CourseRegister({ params }: { params: { id: string } }) {
    const { getCourseById } = useCourseStore()
    const [course, setCourse] = useState<Course | null>(null)
    const [courseNumber, setCourseNumber] = useState("");
    const [quota, setQuota] = useState("");
    const [name, setName] = useState("");
    const [professor, setProfessor] = useState("");
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [needMedicalReport, setNeedMedicalReport] = useState(false);
    const { putCourse } = useCourseStore();
    const router = useRouter();

    async function fetchCourse() {
        const response = await getCourseById(parseInt(params.id))
        setCourse(response)
    }
    useEffect(() => {
        if (params.id) {
            fetchCourse()
        }
    }, [])
    useEffect(() => {
        if (course) {
            setCourseNumber(course.courseNumber)
            setQuota(course.quota.toString())
            setName(course.name)
            setProfessor(course.professor)
            setInitialDate(course.initialDate)
            setFinalDate(course.finalDate)
            setLocation(course.location || "");
            setDescription(course.description || "")
            setNeedMedicalReport(course.needMedicalReport === "Yes" as unknown as YesOrNo ? true : false);
        }
    }, [course])

    const handleSaveCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const course = {
            courseNumber,
            initialDate,
            finalDate,
            name,
            location: location || null,
            professor,
            quota: parseInt(quota),
            description: description || null,
            state: "Active" as unknown as State,
            needMedicalReport: needMedicalReport ? "Yes" as unknown as YesOrNo : "No" as unknown as YesOrNo,
        };
        const response = await putCourse(Number(params.id), course);
        if (response) {
            showCustomAlert("¡Actualizado!", "El curso ha sido actualizado correctamente.", "success").then((result) => {
            if (result.isConfirmed) {
                router.push('/courses');
            }
        });
        }
    };

    return (
        <div className="container mx-auto max-w-5xl my-4 bg-gray-gradient p-10 flex flex-col justify-center items-center rounded-3xl">
            <p className="text-xl font-bold text-light-gray">Gestión de cursos</p>
            <div className="container max-w-3xl bg-dark-gray p-5 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputField
                            label="Código"
                            value={courseNumber}
                            onChange={(e) => setCourseNumber(e.target.value)}
                            placeholder="Ingresar el código"
                            iconStart={<FaHashtag color="white" />}
                        />
                    </div>
                    <div>
                        <InputField
                            label="Cupos"
                            value={quota}
                            onChange={(e) => setQuota(e.target.value)}
                            type="number"
                            min = {0}
                            placeholder="Cantidad de cupos"
                            iconStart={<FaUsers color="white" />}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputField
                            label="Nombre del curso"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ingresar el nombre"
                            iconStart={<IoNewspaperOutline color="white" />}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputField
                            label="Persona que lo imparte"
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)}
                            placeholder="Ingresar nombre de la persona que lo imparte"
                            iconStart={<BsFillPersonCheckFill color="white" />}
                        />
                    </div>
                    <div>
                        <InputField
                            label="Fecha de inicio"
                            value={initialDate}
                            onChange={(e) => setInitialDate(e.target.value)}
                            placeholder="Ingresar fecha"
                            type="date"
                            iconStart={<FaRegCalendarAlt color="white" />}
                        />
                    </div>
                    <div>
                        <InputField
                            label="Fecha de finalización"
                            value={finalDate}
                            onChange={(e) => setFinalDate(e.target.value)}
                            placeholder="Ingresar fecha"
                            type="date"
                            iconStart={<FaRegCalendarAlt color="white" />}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputField
                            label="Lugar donde se imparte"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Ingresar lugar donde se imparte el curso"
                            iconStart={<BsHeartPulse color="white" />}
                        />
                    </div>
                    <div className="col-span-2">
                        <TextArea
                            label="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ingresar pequeña descripción del curso"
                            rows={4}
                        />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <Checkbox
                            label="Requiere dictamen"
                            checked={needMedicalReport}
                            onChange={() => setNeedMedicalReport(!needMedicalReport)}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-center mt-4">
                    <Button onClick={(e) => handleSaveCourse(e)} className="bg-red-gradient w-60">Guardar</Button>
                    <Button onClick={() => router.push('/courses')} className="bg-red-gradient w-60 ml-4">Cancelar</Button>
                </div>
            </div>
        </div>
    );
}
