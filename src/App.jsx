import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Note from "./Note"
import Login from "./pages/login"
import Registrasi from "./pages/Registrasi"
import { getToken } from "./api"
// import { setTokens } from "./token"

function App() {
    // INI FILE APP YANG SAYA UBAH
    const [token,setToken] = useState(null);

    const handleLogin = (tokens) => {
        setToken(tokens)
    }
    
    const handleLogout = () => {
        setToken(null)
        localStorage.removeItem('token');
    }

    useEffect(() => {
        const tokens = getToken()
        setToken(tokens);
    },[])
    // Ini berubah lagi
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout token={token} onLogout={handleLogout}/>}>
                {token !== null ? 
                    <Route>
                        <Route path={"/Note"} element={<Note />} /> 
                        <Route path="*" element={<Navigate to={"/Note"}/>}/>
                    </Route>
                : <Route path={"/Note"} element={<h1 className="text-white grid place-items-center mt-[16rem] font-bold text-[4rem]">Not Found</h1>} />}
                {
                    token !== null ? null : 
                   <Route>
                     <Route path={"/Registrasi"} element={<Registrasi />} />
                     <Route path={"/Login"} element={<Login onLogin={handleLogin}/>} />
                   </Route>
                }
                </Route>
                <Route path="*" element={<Navigate to={"/Login"}/>}/>
            </Routes>

        </BrowserRouter>

    )
}

export default App