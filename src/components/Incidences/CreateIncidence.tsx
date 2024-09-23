import React from 'react';

const CreateIncidence: React.FC = () => {
  return (
    <div className="container my-4 p-4" style={{backgroundColor: "#cccccc"}}>
        <div className="container my-4 p-4" style={{backgroundColor: "#ffffff"}}>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex">
                        <h4 className="w-100 fw-bold fs-4">Añadir una incidencia</h4>
                    </div> 
                    <h5 className="w-100 fw-lighter fs-6 mb-4">Indica de forma detalla la incidencia</h5>
                    {/*Campo Título */}
                    <input type="text" className="form-control flex-fill my-4" style={{backgroundColor: "#cccccc"}} placeholder="Título" />
                    {/*Campo Descripción */}
                    <input type="text" className="form-control flex-fill my-4" style={{backgroundColor: "#cccccc"}} placeholder="Descripción" />
                    <div className="col-md-3">
                        {/*Desplegable */}
                        <select className="form-select my-4" style={{backgroundColor: "#cccccc"}}>
                            <option>Seleccione una opcion</option>
                            <option>Crítica</option>
                            <option>Alta</option>    
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                    </div>
                    {/*Botón Añadir Usuario*/}
                    <button className="btn btn-dark">Crear Incidencia</button>
                </div>
            </div>
        </div>
      </div>
  );
};

export default CreateIncidence;
