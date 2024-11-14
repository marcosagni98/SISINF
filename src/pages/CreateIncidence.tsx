// CreateIncidence.tsx

import React from "react";
import Layout from "../components/shared/Layout";
import CreateIncidenceComponent from "../components/Incidences/CreateIncidenceComponent";

/**
 * Page component for creating a new incidence.
 * Wraps the `CreateIncidenceComponent` within the main layout.
 */
const CreateIncidence: React.FC = () => {
  return (
    <Layout title="Crear Incidencia">
      {/* Render the form component for creating a new incidence */}
      <CreateIncidenceComponent />
    </Layout>
  );
};

export default CreateIncidence;
