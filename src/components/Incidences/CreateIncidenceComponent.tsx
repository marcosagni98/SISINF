import React, { useState } from "react";

export interface CreateIncidence {
  title: string;
  description: string;
  priority: number;
}

const CreateIncidenceComponent: React.FC = () => {
  const [formData, setFormData] = useState<CreateIncidence>({
    title: "",
    description: "",
    priority: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "priority" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de la incidencia:", formData);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="fw-bold mb-3">Añadir una incidencia</h4>
        <p className="text-muted mb-4">
          Indica de forma detallada la incidencia
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Ingrese el título"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              placeholder="Ingrese la descripción"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="form-label">
              Prioridad
            </label>
            <select
              className="form-select"
              id="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value={0}>Seleccione una opción</option>
              <option value={1}>Alta</option>
              <option value={2}>Media</option>
              <option value={3}>Baja</option>
            </select>
          </div>
          <button type="submit" className="btn btn-dark">
            Crear Incidencia
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIncidenceComponent;
