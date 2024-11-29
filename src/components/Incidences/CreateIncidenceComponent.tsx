import React, { useEffect, useState } from "react";
import { CreateIncidence as CreateIncidenceInterface } from "../../interfaces/incidences/CreateIncidence";
import usePostIncidence from "../../hooks/incidences/usePostIncidence";
import usePostDescriptionIA from "../../hooks/incidences/usePostDescriptionIA";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IncidencePriority, incidencePriorityMap } from "../../enums/incidencePriority";

const CreateIncidenceComponent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateIncidenceInterface>({
    title: "",
    description: "",
    priority: null,
  });

  const { post: postIncidence } = usePostIncidence();
  const { post: postDescription } = usePostDescriptionIA();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "priority" ? parseInt(value) : value,
    }));
  };

  const handleImproveDescription = async (e: React.MouseEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Check if title has at least 20 characters
    if (formData.title.trim().length < 20) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El título debe tener al menos 20 caracteres para mejorar la descripción",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const { data, error } = await postDescription({
      title: '',
      currentDescription: formData.description, 
    });

    if (data) {
      setFormData((prevData) => ({
        ...prevData,
        description: data.improveDescription,
      }));
      Swal.fire({
        icon: "success",
        title: "Descripción mejorada",
        text: "La descripción ha sido mejorada con IA",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { data, error } = await postIncidence(formData);

    if (data?.statusCode === 201) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Has creado una incidencia correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
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

    if (formData.title.trim().length < 20) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El título debe tener al menos 20 caracteres",
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

    return true;
  };

  const isIncidencePriority = (value: any): value is IncidencePriority => {
    return Object.values(IncidencePriority).includes(value);
  };

  return (
    <div className="card bg-main">
      <div className="card-body">
        <h4 className="fw-bold mb-3">Añadir una incidencia</h4>
        <p className="text-muted mb-4">Indica de forma detallada la incidencia</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
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
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              placeholder="Ingrese la descripción"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Disable the button if title has less than 20 characters */}
          <button 
            type="button"
            className="btn button-main-dark mt-2 mb-3" 
            onClick={handleImproveDescription}
            disabled={formData.title.trim().length < 20}
          >
            Mejorar descripción con IA
          </button>

          <div className="mb-4">
            <label htmlFor="priority" className="form-label">Prioridad</label>
            <select
              className="form-select"
              id="priority"
              value={formData.priority ?? ""}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value={IncidencePriority.High}>
                {incidencePriorityMap.get(IncidencePriority.High)}
              </option>
              <option value={IncidencePriority.Medium}>
                {incidencePriorityMap.get(IncidencePriority.Medium)}
              </option>
              <option value={IncidencePriority.Low}>
                {incidencePriorityMap.get(IncidencePriority.Low)}
              </option>
            </select>
          </div>

          <button type="submit" className="btn button-main-dark">
            Crear Incidencia
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIncidenceComponent;