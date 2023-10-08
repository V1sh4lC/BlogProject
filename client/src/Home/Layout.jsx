import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <header>
            <nav className="flex justify-between py-4 mb-9">
                <h1 className="text-white font-semibold text-2xl"><Link to="/">BLoGG</Link></h1>
                <ul className="text-slate-500 flex h-full items-center gap-10 pr-2">
                    <li className="hover:text-slate-200 transition"><Link to="/signup">Signup</Link></li>
                    <li className="hover:text-slate-200 transition"><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </header>
    )
}