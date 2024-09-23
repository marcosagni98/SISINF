import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';

interface Incidencias {
  count: number;
  high: number;
  medium: number;
  low: number;
}

const useFetchIncidencias = () => {
  const [data, setData] = useState<Incidencias | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/incidencias-summary/1`);
        if (!response.ok) throw new Error('Error fetching incidencias');
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIncidencias();
  }, []);

  return { data, loading, error };
};

export default useFetchIncidencias;
