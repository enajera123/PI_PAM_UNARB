import Link from "next/link";
import Button from "@/components/Button/Button";
import logoUNAPAM from '@/resources/LogoColorful.png';
import Image from 'next/image';

export const Header:React.FC = ()=>{
    return <header className="navbar bg-medium-gray px-5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px'}}>
        <div>
            <Link href="/">
            <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-16 " />
            </Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <a href="/information">
            <Button className="bg-red-gradient">Información</Button>
            </a>
            <Link href="/courses">
            <Button className="bg-red-gradient">Cursos</Button>
            </Link>
            <Link href="/participants">
            <Button className="bg-red-gradient">Participantes</Button>
            </Link>
            <Link href="/register">
            <Button className="bg-red-gradient">Registro</Button>
            </Link>
        </div>
    </header>
}