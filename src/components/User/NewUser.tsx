    import React from "react";
    import 'bootstrap/dist/css/bootstrap.min.css';
    import Layout from '../shared/Layout';

    const NewUser = () => {
        return(
            <Layout title=''>
            <div className="container my-4 p-4 bg-main">
                <div className="container my-4 p-4" style={{backgroundColor: "#ffffff"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex">
                                <h4 className="w-100 fw-bold fs-4">Añadir Usuario</h4>
                            </div> 
                            <h5 className="w-100 fw-lighter fs-6 mb-4">Registra un nuevo usuario</h5>
                            {/*Campo Nombre */}
                            <input type="text" className="form-control flex-fill my-4 bg-input" placeholder="Nombre" />
                            {/*Campo Email */}
                            <input type="text" className="form-control flex-fill my-4 bg-input" placeholder="Email" />
                            <div className="col-md-3">
                                {/*Desplegable */}
                                <select className="form-select my-4 bg-input">
                                    <option>Seleccione una opcion</option>
                                    <option>Usuario</option>
                                    <option>Técnico</option>    
                                    <option>Administrador</option>
                                </select>
                            </div>
                            {/*Botón Añadir Usuario*/}
                            <button className="btn btn-dark">Añadir Usuario</button>
                        </div>
                    </div>
                </div>
            </div>
            </Layout>
        );
    }


    export default NewUser;