import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useFetchIncidencias from '../../hooks/incidencias/useFetchIncidenciasSummary';

const IncidenciasCard = () => {
  const { data: incidencias, loading, error } = useFetchIncidencias();

  return (
    <div className="card p-3">
    <h5>Incidencias Activas</h5>
    <h2 className="fw-semibold">{loading ? <Skeleton height={30} /> : incidencias?.count}</h2>
    {loading ? (
        <Skeleton height={30} />
    ) : (
        <div className="d-flex justify-content-between gap-2">
        <button type="button" className="col-4 btn btn-md badge-danger flex-fill">{incidencias?.high} altas</button>
        <button type="button" className="col-4 btn btn-md badge-warning flex-fill">{incidencias?.medium} medias</button>
        <button type="button" className="col-4 btn btn-md badge-success flex-fill">{incidencias?.low} bajas</button>
        </div>
    )}
    {error && <div>Error: {error}</div>}
    </div>
  );
};

export default IncidenciasCard;
