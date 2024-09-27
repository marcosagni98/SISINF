import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faList, faChartBar, IconDefinition, faUser, faHistory, faMessage, faEye } from '@fortawesome/free-solid-svg-icons';

const MyIncidences: React.FC = () => {
  return (
    <div>
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
  );
};

export default MyIncidences;