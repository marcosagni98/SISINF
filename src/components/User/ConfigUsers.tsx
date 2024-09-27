import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../shared/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSearch, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavItem from '../shared/NavItem';




const Users: React.FC = () => {
    return(
        <Layout title='Configuracion usuarios'>
            {/* Tabla de Usuarios */}
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex my-3">
                    <h4 className="w-100 fw-bold fs-4">Incidencias Recientes</h4>
                    {/* Buscador de Incidencias */}
                    <div className="d-flex align-self-center gap-2 float-left w-50">
                        <input type="text" className="form-control flex-fill" placeholder="Buscar incidencia" />
                        <button type="button" className="btn btn-dark flex-fill"><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                    {/* Boton de Añadir Usuario */}
                    <div>
                        <NavItem to="/newuser" icon={faPlus} label="Nuevo Usuario"/>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <div className="table-responsive card">
                    <table className="table table-borderless table-striped">
                        <thead>
                        <tr className="text-uppercase">
                            <th className="fw-semibold bg-dark text-light">Nombre</th>
                            <th className="fw-semibold bg-dark text-light">Email</th>
                            <th className="fw-semibold bg-dark text-light">Rol</th>
                            <th className="fw-semibold bg-dark text-light">Acciones</th>
                            <th className="fw-semibold bg-dark text-light"> </th>
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
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faTrash} />
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
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faTrash} />
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

export default Users;