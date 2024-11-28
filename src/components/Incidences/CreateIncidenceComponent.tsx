import React, { useEffect, useState } from "react";
import { CreateIncidence as CreateIncidenceInterface } from "../../interfaces/incidences/CreateIncidence";
import usePostIncidence from "../../hooks/incidences/usePostIncidence";
import usePostDescriptionIA from "../../hooks/incidences/usePostDescriptionIA";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IncidencePriority, incidencePriorityMap } from "../../enums/incidencePriority";

/**
 * Component for creating a new incidence.
 * Provides a form for users to enter details about the incidence, including title, description, and priority.
 */
const CreateIncidenceComponent: React.FC = () => {
  /** React Router's navigate function */
  const navigate = useNavigate();

  /** State for storing form data including title, description, and priority */
  const [formData, setFormData] = useState<CreateIncidenceInterface>({
    title: "",
    description: "",
    priority: null,
  });

  /** Hook for handling the incidence creation API call */
  const { post: postIncidence } = usePostIncidence();

  const { post: postDescription } = usePostDescriptionIA();

  /**
   * Handles changes to input fields.
   * Updates the formData state based on the field being changed.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "priority" ? parseInt(value) : value,
    }));
  };

  useEffect(() => {
    console.log('Componente re-renderizado. Datos actuales:', formData);
  }, [formData]); // Este efecto se ejecutará cada vez que formData cambie

  const handleImproveDescription = async () => {
    const { data, error } = await postDescription({
      title: formData.title,
      currentDescription: formData.description, 
    });
    console.log(data);
    console.log(formData.title);
    console.log(formData.description);
    if (data) {
      // Update the form fields with the data returned by the API
      setFormData((prevData) => ({
        ...prevData,
        description: data.improveDescription, // assuming the API response contains 'improvedDescription'
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

  /**
   * Handles form submission for creating an incidence.
   * Sends a request to create the incidence and handles success or error responses.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /** Validate form fields before submitting */
    if (!validateForm()) {
      return;
    }

    /** Sends the request to create a new incidence */
    const { data, error } = await postIncidence(formData);

    /** Handle successful creation */
    if (data?.statusCode === 201) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Has creado una incidencia correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    }
    /** Handle creation error */
    else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  /**
   * Validates the form inputs to ensure all fields are filled correctly.
   * Displays error messages if any validation fails.
   */
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

    return true;
  };

  /**
   * Checks if the provided value is a valid incidence priority.
   */
  const isIncidencePriority = (value: any): value is IncidencePriority => {
    return Object.values(IncidencePriority).includes(value);
  };

  /**
   * Renders the form for creating a new incidence
   */
  return (
    <div className="card bg-main">
      <div className="card-body">
        <h4 className="fw-bold mb-3">Añadir una incidencia</h4>
        <p className="text-muted mb-4">Indica de forma detallada la incidencia</p>
        <form onSubmit={handleSubmit}>
          {/* Input for Title */}
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

          {/* Textarea for Description */}
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

          {/* Select for Priority */}
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

          {/* Submit Button */}
          <button type="submit" className="btn button-main-dark">
            Crear Incidencia
          </button>
        </form>
        {/* Button to improve description with AI */}
        <button className="btn button-main-dark mt-2" onClick={handleImproveDescription}>
          Mejorar descripción con IA
        </button>
      </div>
    </div>
  );
};

export default CreateIncidenceComponent;
