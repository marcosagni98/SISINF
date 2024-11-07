import React from "react";
import Layout from "../components/shared/Layout";
import CreateIncidenceComponent from "../components/Incidences/CreateIncidenceComponent";

/** 
 * Page component for creating a new incidence
 * This component is responsible for rendering the layout and the create incidence form.
 * @returns {JSX.Element} - Renders the layout with the create incidence form inside.
 */
const CreateIncidence: React.FC = () => {
  return (
    <Layout title="Crear Incidencia">
        <CreateIncidenceComponent />
    </Layout>
  );
};

export default CreateIncidence;
