import React, { useEffect, useState } from "react";
import { CreateIncidence as CreateIncidenceInterface } from "../../interfaces/incidences/CreateIncidence";
import usePostIncidence from "../../hooks/incidences/usePostIncidence";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { IncidencePriority, incidencePriorityMap } from "../../enums/incidencePriority";

const CreateIncidenceComponent: React.FC = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateIncidenceInterface>({
    title: "",
    description: "",
    priority: null,
    userId: null,
  });

  const {
    data: dataCreateIncidence,
    completed: completedCreateIncidence,
    error: errorIncidence,
    post: postIncidence,
  } = usePostIncidence();

  useEffect(() => {
    if (completedCreateIncidence) {
      if (dataCreateIncidence) {
        Swal.fire(
          "Éxito",
          "Has creado una incidencia correctamente",
          "success"
        );
        navigate("/dashboard");
      } else if (errorIncidence) {
        Swal.fire("Error", errorIncidence, "error");
      }
    }
  }, [dataCreateIncidence, errorIncidence, completedCreateIncidence]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "priority" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    formData.userId = user!.id;

    await postIncidence(formData);
  };

  const validateForm = () => {
    if (formData.title.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Introduce un título",
        showConfirmButton: false,
        timer: 1500,
      });

      return false;
    }

    if (formData.description.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Introduce una descripción",
        showConfirmButton: false,
        timer: 1500,
      });

      return false;
    }

    if (!isIncidencePriority(formData.priority)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Selecciona una prioridad válida",
        showConfirmButton: false,
        timer: 1500,
      });

      return false;
    }

    if (user === null) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const isIncidencePriority = (value: any): value is IncidencePriority => {
    return Object.values(IncidencePriority).includes(value);
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
              value={formData.priority ?? ""}
              onChange={handleChange}
            >
              <option value={""}>Seleccione una opción</option>
              <option value={IncidencePriority.High}>{incidencePriorityMap.get(IncidencePriority.High)}</option>
              <option value={IncidencePriority.Medium}>{incidencePriorityMap.get(IncidencePriority.Medium)}</option>
              <option value={IncidencePriority.Low}>{incidencePriorityMap.get(IncidencePriority.Low)}</option>
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
