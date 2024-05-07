import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import logoUNAPAM from '@/resources/LogoColorful.png';
import Image from 'next/image';
import { GoKey } from 'react-icons/go';
import { HiOutlineIdentification } from 'react-icons/hi';
export default function logIn() {
    return(
        <div className="container grid grid-cols-3 mt-4 items-center mx-auto max-w-3xl">
            <div className="col-span-1 grid grid-col-2">
                <div className="container bg-white  p-4 flex flex-col items-center rounded-l-3xl">
                        <p className="text-2xl font-bold text-medium-gray text-center">Ingreso al sistema</p>
                        <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
                </div>
            </div>
            <div className="col-span-2">
                <div className="container bg-gray-gradient px-10 py-20 rounded-3xl">
                    <InputField
                        label="Identificación"
                        placeholder="Identificación"
                        iconStart={<HiOutlineIdentification color="white" />}/>
                    <InputField
                        label="Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        iconStart={<GoKey color="white" />}/>
                    <div className="flex justify-center mt-24">
                        <Button className="bg-dark-red w-full max-w-md">Ingresar</Button> 
                    </div>
                </div>
            </div>
        </div>
    );
}