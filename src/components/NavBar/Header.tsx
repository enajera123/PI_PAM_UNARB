import Link from "next/link";
import Button from "@/components/Button/Button";
export const Header:React.FC = ()=>{
    return <header className="navbar bg-medium-gray px-5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px'}}>
        <div>
            <Link href="/">
                LOGO
            </Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <a href="/information">
            <Button className="text-dark-gray bg-light-gray">Información</Button>
            </a>
            <Link href="/courses">
            <Button className="text-light-red bg-white">Cursos</Button>
            </Link>
            <Link href="/participants">
            <Button className="bg-red-gradient">Participantes</Button>
            </Link>
            <Link href="/register">
            <Button className="text-black bg-white">Registro</Button>
            </Link>
        </div>
    </header>
}