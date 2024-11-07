import React from 'react';
import Layout from '../components/shared/Layout';
import OverviewIncidencesComponent from '../components/Statistics/OverviewIncidencesComponent';
import TotalIncidencesComponent from '../components/Statistics/TotalIncidencesComponent';
import IncidencesResolutionComponent from '../components/Statistics/IncidencesResolutionComponent';

const Statics: React.FC = () => {
  return (
    <div>
      <Layout title="Estadisticas">
        <div className="row my-4">
          <div className="col">
            <OverviewIncidencesComponent />
          </div>
          <div className="col">
            <div className="">
             <TotalIncidencesComponent />
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <div className="">
              <IncidencesResolutionComponent />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Statics;
