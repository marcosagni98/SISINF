// CreateIncidence.tsx

import React from "react";
import Layout from "../components/shared/Layout";
import CreateIncidenceComponent from "../components/Incidences/CreateIncidenceComponent";

const CreateIncidence: React.FC = () => {
  return (
    <Layout title="Crear Incidencia">
        <CreateIncidenceComponent />
    </Layout>
  );
};

export default CreateIncidence;
