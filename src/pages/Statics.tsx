import React from 'react';
import Layout from '../components/shared/Layout';

const Statics: React.FC = () => {
  return (
    <div>
      <Layout title="Estadisticas">
        <div className="row my-4">
          <div className="col">
            <div className="bg-white">
              Grafico1
            </div>
          </div>
          <div className="col">
            <div className="bg-white">
              Grafico2
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <div className="bg-white">
              Grafico3
            </div>
          </div>
          <div className="col">
            <div className="bg-white">
              Grafico4
            </div>
          </div>
        </div>
      </Layout>
      {/* Aquí va la pagian de dashboard*/}
    </div>
  );
};

export default Statics;
