import IncidenceChatComponent from "../components/Incidences/IncidenceChatComponent";
import IncidenceDetailsComponent from "../components/Incidences/IncidenceDetailsComponent";
import IncidenceHistoryComponent from "../components/Incidences/IncidenceHistoryComponent";
import IncidenceInfoComponent from "../components/Incidences/IncidenceInfoComponent";
import IncidenceWorklogComponent from "../components/Incidences/IncidenceWorklogComponent";
import Layout from "../components/shared/Layout";

const IncidenceDetails = () => {
  return (
    <Layout title="Inicio">
        <div className="row">
            <div className="col-8 mb-4">
                <IncidenceInfoComponent />
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
