import React from 'react';
import Layout from '../components/shared/Layout';
import OverviewIncidencesComponent from '../components/Statistics/OverviewIncidencesComponent';
import TotalIncidencesComponent from '../components/Statistics/TotalIncidencesComponent';
import IncidencesResolutionComponent from '../components/Statistics/IncidencesResolutionComponent';
import IncidencesSeverityComponent from '../components/Statistics/IncidencesSeverityComponent';

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
          <div className="col-4">
            <div className="bg-white">
              <IncidencesSeverityComponent />
            </div>
          </div>
        </div>
      </Layout>
      {/* Aquí va la pagian de dashboard*/}
    </div>
  );
};

export default Statics;
