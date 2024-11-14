import React from 'react';
import Layout from '../components/shared/Layout';
import OverviewIncidencesComponent from '../components/Statistics/OverviewIncidencesComponent';
import TotalIncidencesComponent from '../components/Statistics/TotalIncidencesComponent';
import IncidencesResolutionComponent from '../components/Statistics/IncidencesResolutionComponent';

/**
 * Stadistics page component that displays various statistics related to incidences.
 * This page provides an overview of incidences, total counts, and resolution heatmaps.
 */
const Stadistics: React.FC = () => {
  return (
    <div>
      <Layout title="Estadisticas">
      <div className="row my-4">
        {/* Overview of incidences */}
        <div className="col-xl-6">
          <OverviewIncidencesComponent />
        </div>
        {/* Total incidences bar chart */}
        <div className="col-xl-6">
            <div className="">
          <TotalIncidencesComponent />
            </div>
        </div>
      </div>
      <div className="row my-4">
        {/* Heatmap of incidences resolution */}
        <div className="col-xl-6">
            <div className="">
          <IncidencesResolutionComponent />
            </div>
        </div>
      </div>
    </Layout>
    </div>
  );
};

export default Stadistics;
