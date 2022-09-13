import { Link } from 'react-router-dom'
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState('')


    const handleSubmit = async e => {
        e.preventDefault();
//comprobar si los campos estan llenos
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
//comprobar si las contraseñas son iguales
        if (password != repetirPassword) {
            setAlerta({
                msg: 'Las contraseñas no son iguales',
                error: true
            })
            return
        }
//comprobar el tamaño de la contraseña
        if (password.length < 6) {
            setAlerta({
                msg: 'Contraseña muy corta agraga minimo 6 caracteres',
                error: true
            })
            return
        }
        setAlerta({})

        //crear el usuario en la API
        try {
            const {data} = await clienteAxios.post(`/usuarios`,{nombre,email,password});
           setAlerta({
            msg:data.msg,
            error:false
           })
           setNombre('')
           setEmail('')
           setPassword('')
           setRepetirPassword('')
        } catch (error) {
        setAlerta({
            msg:error.response.data.msg,
            error:true
        })
        }
    }
    const { msg } = alerta
    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl">Crea tu cuenta y Administra tus
                <span className="text-slate-700"> Proyectos</span>  </h1>
            {msg && <Alerta alerta={alerta} />}
            <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
                onSubmit={handleSubmit}>
                <div>
                    <label className="block text-l font-bold">Nombre</label>
                    <input type="text" id="nombre"
                        placeholder="Ingresa tu Nombre"
                        className="w-full mt-3 p-3 border-2"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>

                <div>
                    <label className="block text-l font-bold my-5">Email</label>
                    <input type="email" id="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="block text-l font-bold">Password</label>
                    <input type="Password" id="Password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="block text-l font-bold">Repetir Password</label>
                    <input type="Password" id="Password2"
                        placeholder="Repetir Password"
                        className="w-full mt-3 p-3 border-2"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)} />
                </div>

                <input
                    type="submit"
                    value="Crear cuenta"
                    className="bg-gray-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">
                    Olvide mi password
                </Link>

            </nav>
        </>
    )
}

export default Registrar;
