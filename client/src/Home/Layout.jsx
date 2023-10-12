import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Layout() {
    const { userInfo, setUserInfo, userLogged, setUserLogged } = useContext(UserContext)
    let username = userInfo?.username;
    
    async function verifyUser() {
        try {
            await fetch('http://192.168.0.104:4400/profile', {
                method: 'GET',
                credentials: 'include'
            }).then(response => {
                response.json().then(userinfo => {
                    setUserInfo(userinfo)
                })
            })
        } catch (err) {
            console.error(err)
        }
    }
    
    useEffect(() => {
        verifyUser();
    }, [userLogged])
    
    async function logout() {
        await fetch('http://192.168.0.104:4400/logout', {
            method: 'POST',
            credentials: 'include',
        }).then(response => {
            response.json().then(status => {
                if (status === 'ok') {
                    // setRedirect(true)
                }
            })
        })
        setUserInfo(null)
        setUserLogged(false)
    }

    return (
        <header>
            <nav className="flex justify-between py-4 mb-9">
                <h1 className="text-white font-semibold text-2xl"><Link to="/">BLoGG</Link></h1>
                <ul className="text-slate-500 flex h-full items-center gap-10 pr-2">
                    <li className="hover:text-slate-200 transition">
                        {username && (<Link to="/post">Create Post</Link>)}
                        {!username && (<Link to="/signup">Signup</Link>)}
                    </li>
                    <li className="hover:text-slate-200 transition">
                        {username && (<Link to="/login" onClick={logout} className="cursor-pointer">Logout</Link>)}
                        {!username && (<Link to="/login">Login</Link>)}   
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </header>
    )
}