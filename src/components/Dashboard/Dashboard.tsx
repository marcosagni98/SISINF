import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEye, faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../shared/Sidebar';
import Topbar from '../shared/Topbar';
import Layout from '../shared/Layout';
import IncidenciasCard from './IncidenciasCard';

const Dashboard = () => {
  return (
    <Layout title="Inicio">
        <div className="row">
            <div className="col-4 mb-4">
                <IncidenciasCard />
            </div>

            {/* Tiempo Medio de Resolución */}
            <div className="col-4 mb-4">
                <div className="card p-3">
                    <h5>Tiempo Medio de Resolución</h5>
                    <h2 className="fw-semibold">4h 23min</h2>
                    <p className="text-success"><FontAwesomeIcon icon={faArrowDown} /> 30 min menos respecto al mes anterior</p>
                </div>
            </div>

            {/* Satisfacción del Usuario */}
            <div className="col-4 mb-4">
                <div className="card p-3">
                    <h5>Satisfacción del Usuario</h5>
                    <h2 className="fw-semibold">98%</h2>
                    <p className="text-success"><FontAwesomeIcon icon={faArrowUp} /> 21% respecto al mes anterior</p>
                </div>
            </div>
        </div>
        {/* Tabla de Incidencias Recientes */}
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex my-3">
                    <h4 className="w-100 fw-bold fs-4">Incidencias Recientes</h4>
                    {/* Buscador de Incidencias */}
                    <div className="d-flex align-self-center gap-2 float-right w-50">
                        <input type="text" className="form-control flex-fill" placeholder="Buscar incidencia" />
                        <button type="button" className="btn btn-dark flex-fill"><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <div className="table-responsive card">
                    <table className="table table-borderless table-striped">
                        <thead>
                        <tr className="text-uppercase">
                            <th className="fw-semibold bg-dark text-light">ID</th>
                            <th className="fw-semibold bg-dark text-light">Título</th>
                            <th className="fw-semibold bg-dark text-light">Estado</th>
                            <th className="fw-semibold bg-dark text-light">Prioridad</th>
                            <th className="fw-semibold bg-dark text-light">Asignado a</th>
                            <th className="fw-semibold bg-dark text-light"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">#1234</th>
                            <td>Error en la impresora</td>
                            <td><span className="badge badge-warning text-dark">En progreso</span></td>
                            <td><span className="badge badge-danger">Alta</span></td>
                            <td>Juan Perez</td>
                            <td className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">#1235</th>
                            <td>Actualización de software</td>
                            <td><span className="badge badge-success">Completado</span></td>
                            <td><span className="badge badge-warning text-dark">Media</span></td>
                            <td>Maria Gonzalez</td>
                            <td className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
  );
}

export default Dashboard;
