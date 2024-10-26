import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faList, faChartBar, IconDefinition, faUser, faHistory, faMessage, faEye, faExpand, faSearch} from '@fortawesome/free-solid-svg-icons';
import Layout from '../shared/Layout';

const MyIncidences: React.FC = () => {
  return (
    <div>
    <Layout title='Mis Incidencias'>
    <div className="row">
            <div className="col-md-12">
                <div className="d-flex my-3">
                    <h4 className="w-100 fw-bold fs-4" />
                    {/* Buscador de Incidencias */}
                    <div className="d-flex align-self-center gap-2 float-left w-50">
                        <input type="text" className="form-control flex-fill" placeholder="Buscar incidencia" />
                        <button type="button" className="btn btn-dark flex-fill">Buscar</button>
                    </div>
                    {/* Boton de Añadir Usuario */}
                </div>
            </div>
    </div>
    {/* Tabla de Mis Incidencias */}
        <div className="p-2">
            <div className="table-responsive card">
                <table className="table table-borderless table-striped">
                    <thead>
                    <tr className="text-uppercase">
                        <th className="fw-semibold bg-dark text-light">ID</th>
                        <th className="fw-semibold bg-dark text-light">Título</th>
                        <th className="fw-semibold bg-dark text-light">Estado</th>
                        <th className="fw-semibold bg-dark text-light">Prioridad</th>
                        <th className="fw-semibold bg-dark text-light"></th>
                            
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">#1234</th>
                        <td>Error en la impresora</td>
                        <td><span className="badge badge-warning text-dark">En progreso</span></td>
                        <td><span className="badge badge-danger">Alta</span></td>
                        <td className="d-flex justify-content-start gap-2">
                            <button type="button" className="btn p-0">
                                <FontAwesomeIcon icon={faExpand} />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">#1235</th>
                        <td>Actualización de software</td>
                        <td><span className="badge badge-success">Completado</span></td>
                        <td><span className="badge badge-warning text-dark">Media</span></td>
                        <td className="d-flex justify-content-start gap-2">
                            <button type="button" className="btn p-0">
                                <FontAwesomeIcon icon={faExpand} />
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
    </div>
  );
};

export default MyIncidences;