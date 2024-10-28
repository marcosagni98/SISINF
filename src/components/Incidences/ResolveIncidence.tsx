import React from 'react';
import Layout from '../shared/Layout';
import NavItem from '../shared/NavItem';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ResolveIncidence: React.FC = () => {
  return (
    <div>
      <Layout title='Resolver Incidencia'>
            <h1>Error en la impresora</h1>
            <div className="container my-4 p-4" style={{backgroundColor: "#ffffff"}}>
                <input type="text" className="form-control flex-fill my-4 bg-input" placeholder="Descripción detallada de la forma de resolver la incidencia" />
                <NavItem to='/' icon={faCheck} label='Resolver Incidencia' className='btn-dark text-light'/>
            </div>
      </Layout>
    </div>
  );
};

export default ResolveIncidence;
