import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../shared/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSearch, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavItem from '../shared/NavItem';




const Users: React.FC = () => {
    return(
        <Layout title='Configuracion usuarios'>
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex my-3">
                    <h4 className="w-100 fw-bold fs-4"></h4>
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
            {/* Tabla de Usuarios */}
            <div className="p-2">
                <div className="table-responsive card">
                    <table className="table table-borderless table-striped">
                        <thead>
                        <tr className="text-uppercase">
                            <th className="fw-semibold bg-dark text-light">Nombre</th>
                            <th className="fw-semibold bg-dark text-light">Email</th>
                            <th className="fw-semibold bg-dark text-light">Rol</th>
                            <th className="fw-semibold bg-dark text-light">Acciones</th>    
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Juan Perez</td>
                            <td>juan@ejemplo.com</td>
                            <td>Usuario</td>
                            <td className="d-flex justify-content-start gap-5">
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Maria Gonzalez</td>
                            <td>maria@ejemplo.com</td>
                            <td>Técnico</td>
                            <td className="d-flex justify-content-start gap-5">
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button type="button" className="btn p-0">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Carlos Rodriguez</td>
                            <td>carlos@ejemplo.com</td>
                            <td>Administrador</td>
                            <td className="d-flex justify-content-start gap-5">
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