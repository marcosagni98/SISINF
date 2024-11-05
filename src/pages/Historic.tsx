import React, { useEffect } from "react";
import Layout from "../components/shared/Layout";
import HistoricTableComponent from "../components/Historic/HistoricTableComponent";
import useFetchHistoric from "../hooks/historic/useFetchHistoric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Historic: React.FC = () => {
  const {
    data: dataHistoric,
    completed: completedHistoric,
    error: errorHistoric,
    fetch: fetchHistoric,
  } = useFetchHistoric();

  useEffect(() => {
    fetchHistoric();
  }, []);

  return (
    <div>
      <Layout title="Historico de Incidencias">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex my-3">
              <div className="d-flex align-self-center gap-2 offset-9 col-3">
                <input
                  type="text"
                  className="form-control flex-fill bg-input"
                  placeholder="Buscar incidencia"
                />
                <button type="button" className="btn btn-light flex-fill">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              {/* Boton de Añadir Usuario */}
            </div>
          </div>
        </div>
        {/* Tabla de Mis Incidencias */}
        <div className="p-2">
          <HistoricTableComponent
            data={dataHistoric}
            completed={completedHistoric}
            error={errorHistoric}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Historic;
