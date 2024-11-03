import { useEffect } from "react";
import { useParams } from "react-router-dom";
import IncidenceChatComponent from "../components/Incidences/IncidenceChatComponent";
import IncidenceDetailsComponent from "../components/Incidences/IncidenceDetailsComponent";
import IncidenceHistoryComponent from "../components/Incidences/IncidenceHistoryComponent";
import IncidenceInfoComponent from "../components/Incidences/IncidenceInfoComponent";
import IncidenceWorklogComponent from "../components/Incidences/IncidenceWorklogComponent";
import Layout from "../components/shared/Layout";
import useFetchIncidence from "../hooks/incidences/useFetchIncidence";

const IncidenceDetails = () => {
  const { id } = useParams();

  const {
    data: dataIncidence,
    completed: completedIncidence,
    error: errorIncidence,
    fetch: fetchIncidence,
  } = useFetchIncidence();

  useEffect(() => {
    if (id !== undefined) {
      fetchIncidence(parseInt(id));
    }
  }, [id]);

  return (
    <Layout title="Inicio">
      <div className="row">
        <div className="col-8 mb-4">
          <IncidenceInfoComponent
            data={
              dataIncidence
                ? {
                    title: dataIncidence?.title,
                    desc: dataIncidence?.description,
                  }
                : null
            }
            completed={completedIncidence}
            error={errorIncidence}
          />
          <IncidenceChatComponent />
        </div>
        <div className="col-4 mb-4 d-flex flex-column gap-3">
          <IncidenceDetailsComponent />
          <IncidenceWorklogComponent />
          <IncidenceHistoryComponent />
        </div>
      </div>
    </Layout>
  );
};

export default IncidenceDetails;
