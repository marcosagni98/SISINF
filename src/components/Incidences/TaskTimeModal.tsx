import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';

const MySwal = withReactContent(Swal);

const TaskTimeModal: React.FC = () => {
  const [timeInput, setTimeInput] = useState<string>('');

  const openModal = () => {
    MySwal.fire({
      title: '<h5><FontAwesomeIcon icon="clock" /> Ingresar Tiempo para la Tarea</h5>',
      html:
        '<label for="taskTimeInput" class="form-label">Ingresar tiempo (formato HH:MM)</label>' +
        '<input type="text" id="taskTimeInput" class="swal2-input" placeholder="Ej. 2:30 para 2 horas y 30 minutos">',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const inputElement = (document.getElementById('taskTimeInput') as HTMLInputElement).value;
        const timePattern = /^([0-9]{1,2}):([0-5][0-9])$/;
        if (!inputElement || !timePattern.test(inputElement)) {
          Swal.showValidationMessage('Por favor, ingresa un tiempo válido en formato HH:MM.');
          return;
        }
        return inputElement;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setTimeInput(result.value);
        MySwal.fire({
          icon: 'success',
          title: 'Tiempo Guardado',
          text: `El tiempo ${result.value} ha sido guardado exitosamente.`,
        });
      }
    });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        Abrir Modal de Tiempo
      </button>
    </div>
  );
};

export default TaskTimeModal;
