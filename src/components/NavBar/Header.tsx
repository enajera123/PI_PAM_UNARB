import Link from "next/link";
import Button from "@/components/Button/Button";
export const Header:React.FC = ()=>{
    return <header className="navbar bg-light-gray px-5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px'}}>
        <div>
            <Link href="/">
                LOGO
            </Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <Link href="/Information">
            <Button className="text-dark-gray bg-light-gray">Información</Button>
            </Link>
            <Link href="/Courses">
            <Button className="text-light-red bg-white">Cursos</Button>
            </Link>
            <Link href="/Participants">
            <Button className="bg-red-gradient">Participantes</Button>
            </Link>
            <Link href="/Register">
            <Button className="text-black bg-white">Registro</Button>
            </Link>
        </div>
    </header>
}