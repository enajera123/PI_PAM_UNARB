import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import InputField from "@/components/InputField/InputField";
import TextArea from "@/components/TextArea/TextArea";
import { BsFillPersonCheckFill, BsHeartPulse } from "react-icons/bs";
import { FaHashtag, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";

export default function courseRegister() {
    return(
        <div className="max-w-5xl my-4 container mx-auto bg-gray-gradient p-10 flex flex-col justify-center items-center h-auto rounded-3xl">
            <p className="text-xl font-bold text-light-gray">Gestión de cursos</p>
            <div className="max-w-3xl container bg-dark-gray p-5 rounded-3xl">  
                <div className="flex flex-row items-center">
                    <div className="flex-initial w-1/2">
                        <InputField
                            label="Código"
                            placeholder="Ingresar el código"
                            iconStart={<FaHashtag color="white" />}/>
                    </div>
                    <div className="flex-initial w-1/2 pl-4">
                        <InputField
                            label="Cupos"
                            placeholder="Cantidad de cupos"
                            iconStart={<FaUsers color="white" />}/>
                    </div>
                </div>                                          
                <div className="flex-initial w-full">
                    <InputField
                        label="Nombre del curso"
                        placeholder="Ingresar el nombre"
                        iconStart={<IoNewspaperOutline color="white" />}/>
                </div> 
                <div className="flex-initial w-full">
                    <InputField
                        label="Persona que lo imparte"
                        placeholder="Ingresar nombre de la persona que lo imparte"
                        iconStart={<BsFillPersonCheckFill color="white" />}/>
                </div> 
                <div className="flex flex-row items-center">
                    <div className="flex-initial w-1/2">
                        <InputField
                            label="Fecha de inicio"
                            placeholder="Ingresar fecha"
                            type="date"
                            iconStart={<FaRegCalendarAlt color="white" />}/>
                    </div>
                    <div className="flex-initial w-1/2 pl-4">
                        <InputField
                            label="Fecha de finalización"
                            placeholder="Ingresar fecha"
                            type="date"
                            iconStart={<FaRegCalendarAlt color="white" />}/>
                    </div>
                </div>
                <div className="flex-initial w-full">
                <InputField
                    label="Lugar donde se imparte"
                    placeholder="Ingresar lugar donde se imparte el curso"
                    iconStart={<BsFillPersonCheckFill color="white" />}/>
                </div> 
                 <div className="flex-initial w-full">
                <TextArea  
                    label="Descripción"
                    placeholder="Ingresar pequeña descripción del curso"
                    rows={4}/>
                </div> 
                <div className="mx-auto max-w-md justify-center">
                    <Checkbox label="Requiere dictamen" />
                </div>
                <div className="flex flex-row items-center justify-center ">                   
                    <Button className="bg-red-gradient w-60">Guardar</Button>
                    <Button className="bg-red-gradient w-60">Eliminar</Button>                  
                </div>
                
            </div>          
        </div> 
           
    );

}