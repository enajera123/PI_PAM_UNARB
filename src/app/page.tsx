"use client"
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import logoUNAPAM from '@/resources/LogoColorful.png';
import Image from 'next/image';
import Link from 'next/link';
import { GoKey } from 'react-icons/go';
import { HiOutlineIdentification } from 'react-icons/hi';
import { useUsersStore } from '@/store/usersStore';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

export default function logIn() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { authenticateUser } = useUsersStore();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState<Partial<User>>("" || { email: "", password: "" })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    const Login = async () => {
        try {   
            console.log(data)
            const Iniciar = await authenticateUser(data as User);
            console.log(Iniciar,"inicio")
            if(Iniciar){
                    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Autenticación exitosa'
    });
    router.push('/information')
}else{ Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Error al autenticar. Por favor, inténtalo de nuevo.'
});}
           

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al autenticar. Por favor, inténtalo de nuevo.'
            });
            console.log(error)
        }

    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, email: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, password: e.target.value });
    };


    return (
        <div className="bg-light-gray h-screen flex items-center">
            <div className="container grid grid-cols-3 items-center mx-auto max-w-3xl">
                <div className="col-span-1 grid grid-col-2">
                    <div className="container bg-white  p-4 flex flex-col items-center rounded-l-3xl">
                        <p className="text-2xl font-bold text-medium-gray text-center">Ingreso al sistema</p>
                        <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="container bg-gray-gradient px-10 py-20 rounded-3xl">
                        <InputField
                            value={data.email || ""}
                            onChange={handleEmailChange}
                            label="Identificación"
                            placeholder="Identificación"
                            iconStart={<HiOutlineIdentification color="white" />} />
                        <InputField
                            value={data.password || ""}
                            onChange={handlePasswordChange}
                            label="Contraseña"
                            placeholder="Contraseña"
                            type="password"
                            iconStart={<GoKey color="white" />} />
                        <Link href="/health">
                            <div className="text-white text-lg text-right">¿Recuperar contraseña?</div>
                        </Link>
                            <div className="flex justify-center mt-24">
                                <Button className="bg-dark-red w-full max-w-md" onClick={Login}>Ingresar</Button>
                            </div>
                    </div>
                </div>
            </div>
        </div>


    );
}