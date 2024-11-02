import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import IncidencesTableComponent from "../components/Incidences/IncidencesTableComponent";
import useFetchMyIncidences from "../hooks/incidences/useFetchMyIncidences";

const MyIncidences: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: dataMyIncidences,
    completed: completedMyIncidences,
    error: errorMyIncidences,
    fetch: fetchMyIncidences,
  } = useFetchMyIncidences();

  useEffect(() => {
    fetchMyIncidences();
  }, []);

  const handleSearch = () => {
    setPageNumber(1); // Reinicia a la primera página cuando busques
    //fetch(1, 10, searchTerm);
  };

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-dark flex-fill"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rowp-2">
          <IncidencesTableComponent
            data={dataMyIncidences && dataMyIncidences.items}
            completed={completedMyIncidences}
            error={errorMyIncidences}
          />
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber === 1}
            >
              Anterior
            </button>
            <span>Página {pageNumber}</span>
            <button
              className="btn btn-secondary"
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={!dataMyIncidences || dataMyIncidences.items.length < 10}
            >
              Siguiente
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MyIncidences;
