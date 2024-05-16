import Link from "next/link";
import Button from "@/components/Button/Button";
import logoUNAPAM from '@/resources/LogoColorful.png';
import logoUNA from '@/resources/LogoUNA.png';
import Image from 'next/image';

export const Header: React.FC = () => {
    return <header className="bg-light-gray px-5 flex justify-between items-center">
        <div className="flex gap-1 items-center">
            <div className="bg-medium-gray rounded-bl-3xl rounded-br-3xl p-2">
                <Image src={logoUNA} alt="logoUNA" className="w-20" />
            </div>
            <Link href="/">
                <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-16 " />
            </Link>
        </div>
        <div className="flex gap-1 items-center">
            <a href="/information">
                <Button className="bg-red-gradient">Información</Button>
            </a>
            <Link href="/courses">
                <Button className="bg-red-gradient">Cursos</Button>
            </Link>
            <Link href="/searches">
                <Button className="bg-red-gradient">Participantes</Button>
            </Link>
            <Link href="/users">
                <Button className="bg-red-gradient">Usuarios</Button>
            </Link>
            <Link href="/report">
                <Button className="bg-red-gradient">Reportes</Button>
            </Link>
        </div>
    </header>
}