import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEye, faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="container my-4 p-4" style={{backgroundColor: "#cccccc"}}>
      <div className="row">
        {/* Incidencias Activas */}
        <div className="col-md-4 mb-4">
          <div className="card p-3">
            <h5>Incidencias Activas</h5>
            <h2 className="fw-semibold">12</h2>
            <div className="d-flex justify-content-between gap-2">
              <span className="col-4 btn btn-md btn-danger flex-fill">5 altas</span>
              <span className="col-4 btn btn-md btn-warning flex-fill text-dark">2 medias</span>
              <span className="col-4 btn btn-md btn-success flex-fill">3 bajas</span>
            </div>
          </div>
        </div>

        {/* Tiempo Medio de Resolución */}
        <div className="col-md-4 mb-4">
          <div className="card p-3">
            <h5>Tiempo Medio de Resolución</h5>
            <h2 className="fw-semibold">4h 23m</h2>
            <p className="text-success"><FontAwesomeIcon icon={faArrowDown} /> 30 min menos respecto al mes anterior</p>
          </div>
        </div>

        {/* Satisfacción del Usuario */}
        <div className="col-md-4 mb-4">
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
                <button className="btn btn-dark flex-fill"><FontAwesomeIcon icon={faSearch} /></button>
            </div>
          </div>
          <div className="">
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
                    <td>#1234</td>
                    <td>Error en la impresora</td>
                    <td><span className="badge bg-warning text-dark">En progreso</span></td>
                    <td><span className="badge bg-danger">Alta</span></td>
                    <td>Juan Perez</td>
                    <td className="d-flex justify-content-end gap-2">
                        <button className="btn p-0">
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button className="btn p-0">
                            <FontAwesomeIcon icon={faMessage} />
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>#1235</td>
                    <td>Actualización de software</td>
                    <td><span className="badge bg-success">Completado</span></td>
                    <td><span className="badge bg-warning text-dark">Media</span></td>
                    <td>Maria Gonzalez</td>
                    <td className="d-flex justify-content-end gap-2">
                        <button className="btn p-0">
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button className="btn p-0">
                            <FontAwesomeIcon icon={faMessage} />
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
