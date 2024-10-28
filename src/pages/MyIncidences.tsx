import React, { useEffect } from "react";
import Layout from "../components/shared/Layout";
import IncidencesTableComponent from "../components/Incidences/IncidencesTableComponent";
import useFetchMyIncidences from "../hooks/incidences/useFetchMyIncidences";

const MyIncidences: React.FC = () => {
  const {
    data: dataMyIncidences,
    completed: completedMyIncidences,
    error: errorMyIncidences,
    fetch: fetchMyIncidences,
  } = useFetchMyIncidences();

  useEffect(() => {
    fetchMyIncidences();
  }, []);

  return (
    <div>
      <Layout title="Mis Incidencias">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex my-3">
              <div className="d-flex align-self-center gap-2 offset-9 col-3 pe-2">
                <input
                  type="text"
                  className="form-control flex-fill"
                  placeholder="Buscar incidencia"
                />
                <button type="button" className="btn btn-dark flex-fill">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rowp-2">
          <IncidencesTableComponent
            data={dataMyIncidences}
            completed={completedMyIncidences}
            error={errorMyIncidences}
          />
        </div>
      </Layout>
    </div>
  );
};

export default MyIncidences;
