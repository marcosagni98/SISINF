import React from 'react';
import Layout from '../shared/Layout';
import './../../App.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NavItem from '../shared/NavItem';

const CreateIncidence: React.FC = () => {
  return (
    <Layout title=''>
    <div className="container my-4 p-4 bg-main">
        <div className="container my-4 p-4" style={{backgroundColor: "#ffffff"}}>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex">
                        <h4 className="w-100 fw-bold fs-4">Añadir una incidencia</h4>
                    </div> 
                    <h5 className="w-100 fw-lighter fs-6 mb-4">Indica de forma detalla la incidencia</h5>
                    {/*Campo Título */}
                    <input type="text" className="form-control flex-fill my-4 bg-input" placeholder="Título" />
                    {/*Campo Descripción */}
                    <input type="text" className="form-control flex-fill my-4 bg-input" placeholder="Descripción" />
                    <div className="col-md-3">
                        {/*Desplegable */}
                        <select className="form-select my-4 bg-input">
                            <option>Seleccione una opcion</option>
                            <option>Crítica</option>
                            <option>Alta</option>    
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                    </div>
                    {/*Botón Añadir Usuario*/}
                    <div className='bg-light pe-5'>
                        <NavItem icon={faPlus} to='/' label='Crear Incidencia' />
                    </div>
                </div>
            </div>
        </div>
      </div>
      </Layout>
  );
};

export default CreateIncidence;
