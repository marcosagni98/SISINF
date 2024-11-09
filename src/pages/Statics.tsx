import React from 'react';
import Layout from '../components/shared/Layout';
import OverviewIncidencesComponent from '../components/Statistics/OverviewIncidencesComponent';
import TotalIncidencesComponent from '../components/Statistics/TotalIncidencesComponent';
import IncidencesResolutionComponent from '../components/Statistics/IncidencesResolutionComponent';

/** 
 * Page for displaying statistics related to incidences
 * This component is responsible for rendering the general layout and the different statistical components,
 * such as an overview of incidences, total incidences, and incidences resolution.
 * @returns {JSX.Element} - Renders the layout with the statistical components inside.
 */
const Statics: React.FC = () => {
  return (
    <div>
      <Layout title="Estadisticas">
        <div className="row my-4">
          <div className="col">
            <OverviewIncidencesComponent />
          </div>
          <div className="col">
            <div className="bg-white">
             <TotalIncidencesComponent />
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <div className="bg-white">
              <IncidencesResolutionComponent />
            </div>
          </div>
        </div>
      </Layout>
      {/* Aquí va la pagian de dashboard*/}
    </div>
  );
};

export default Statics;
