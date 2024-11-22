import React from 'react'
import Tabla from '../components/tabla'
import Navbar from '../components/navbar'

const Reportes = () => {
    return (
        <>
        <Navbar />
        <div className="p-5">
            <p className='text-2xl font-semibold mb-4'>Historial del mes</p>
            <Tabla />
        </div>
        </>
    )
}

export default Reportes