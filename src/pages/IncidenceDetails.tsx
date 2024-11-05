import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IncidenceChatComponent from "../components/Incidences/IncidenceChatComponent";
import IncidenceDetailsComponent from "../components/Incidences/IncidenceDetailsComponent";
import IncidenceHistoryComponent from "../components/Incidences/IncidenceHistoryComponent";
import IncidenceInfoComponent from "../components/Incidences/IncidenceInfoComponent";
import IncidenceWorklogComponent from "../components/Incidences/IncidenceWorklogComponent";
import Layout from "../components/shared/Layout";
import useFetchIncidence from "../hooks/incidences/useFetchIncidence";
import { API_BASE_URL } from "../config";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useAuth } from "../hooks/useAuth";
import useFetchIncidenceWorklog from "../hooks/incidences/useFetchIncidenceWorklog";
import useFetchIncidenceHistory from "../hooks/incidences/useFetchIncidenceHistory";
import Swal from "sweetalert2";
import usePutIncidentInfo from "../hooks/incidences/usePutIncidentInfo";
import eventEmitter from "../utils/eventEmitter";
import usePutIncidentStatus from "../hooks/incidences/usePutIncidentStatus";
import { IncidenceStatus, incidenceStatusMap } from "../enums/incidenceStatus";
import { UpdateIncidenceStatus } from "../interfaces/incidences/UpdateIncidenceStatus";
import { IncidencePriority } from "../enums/incidencePriority";
import { UserRole } from "../enums/userRole";
import { toLocalDate } from "../utils/toLocalDate";
import usePutIncidentPriority from "../hooks/incidences/usePutIncidentPriority";
import useFetchTechnicians from "../hooks/users/useFetchTechnicians";
import usePutIncidentTechnician from "../hooks/incidences/usePutIncidentTechnician";
import usePostWorklog from "../hooks/incidences/usePostWorklog";
import useFetchMessages from "../hooks/incidences/useFetchMessages";

const IncidenceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [dataInitialized, setDataInitialized] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const {
    data: dataIncidence,
    completed: completedIncidence,
    error: errorIncidence,
    fetch: fetchIncidence,
  } = useFetchIncidence();

  let {
    data: dataIncidenceWorklog,
    completed: completedIncidenceWorklog,
    error: errorIncidenceWorklog,
    fetch: fetchIncidenceWorklog,
  } = useFetchIncidenceWorklog();

  let {
    data: dataIncidenceHistory,
    completed: completedIncidenceHistory,
    error: errorIncidenceHistory,
    fetch: fetchIncidenceHistory,
  } = useFetchIncidenceHistory();

  const {
    data: dataTechnicians,
    completed: completedTechnicians,
    error: errorTechnicians,
    fetch: fetchTechnicians,
  } = useFetchTechnicians();

  const {
    data: dataMessages,
    completed: completedMessages,
    error: errorMessages,
    fetch: fetchMessages,
  } = useFetchMessages();

  useEffect(() => {
    if (id !== undefined && user !== null && !dataInitialized) {
      const incidenceId = parseInt(id);
      fetchIncidence(incidenceId);
      fetchIncidenceWorklog(incidenceId);
      fetchIncidenceHistory(incidenceId);
      fetchMessages(incidenceId);
      if (user.role === UserRole.Administrator) {
        fetchTechnicians();
      }
      setDataInitialized(true);
    }

    if (user !== null && connection === null) {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${API_BASE_URL}/messagehub?userId=${user.id}`, {
          withCredentials: false,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      setConnection(newConnection);
      
      newConnection
        .start()
        .then(() => {
          console.log("Conexión de SignalR iniciada");
          newConnection.on("ReceiveMessage", (message) => {
            console.log(message);
          });
        })
        .catch((err) => console.error("Error al iniciar la conexión:", err));

      return () => {
        newConnection.stop().then(() => {
          console.log("Conexión de SignalR detenida");
        });
      };
    }
  }, [id, user]);
  
  const sendMessage = async (newMessage: string) => {
    if (connection) {
      try {
        await connection.invoke(
          "SendMessage",
          parseInt(id!),
          user!.id,
          newMessage
        );
      } catch (err) {
        console.error("Error al enviar el mensaje:", err);
      }
    }
  };

  const { put: putIncidenceInfo } = usePutIncidentInfo();

  const changeTitleModal = () => {
    Swal.fire({
      title: '<h5><FontAwesomeIcon icon="pencil" /> Editar título</h5>',
      html:
        '<label for="newTitleInput" class="form-label">Ingrese el nuevo título de la incidencia</label>' +
        `<input type="text" id="newTitleInput" class="swal2-input" placeholder="Nuevo título" value="${
          dataIncidence!.title
        }">`,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const inputElement = (
          document.getElementById("newTitleInput") as HTMLInputElement
        ).value;
        if (inputElement.trim() === "") {
          Swal.showValidationMessage("Por favor, ingrese un título válido.");
          return;
        }
        return inputElement;
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const { data, error } = await putIncidenceInfo(parseInt(id!), {
          title: result.value,
          description: dataIncidence!.description,
        });

        if (data?.statusCode === 200) {
          dataIncidence!.title = result.value;
          eventEmitter.emit("titleUpdated", result.value);

          Swal.fire({
            icon: "success",
            title: "Título actualizado",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Hubo un problema al actualizar el título. ${error}.`,
          });
        }
      }
    });
  };

  const changeDescriptionModal = () => {
    Swal.fire({
      title: '<h5><FontAwesomeIcon icon="pencil" /> Editar descripción</h5>',
      html:
        '<label for="newDescriptionInput" class="form-label">Ingrese la nueva descripción de la incidencia</label>' +
        `<textarea id="newDescriptionInput" class="swal2-input w-100" placeholder="Nueva descripción">${
          dataIncidence!.description
        }</textarea>`,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const inputElement = (
          document.getElementById("newDescriptionInput") as HTMLInputElement
        ).value;
        if (inputElement.trim() === "") {
          Swal.showValidationMessage(
            "Por favor, ingrese una descripción válida."
          );
          return;
        }
        return inputElement;
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const { data, error } = await putIncidenceInfo(parseInt(id!), {
          title: dataIncidence!.title,
          description: result.value,
        });

        if (data?.statusCode === 200) {
          dataIncidence!.description = result.value;
          eventEmitter.emit("descriptionUpdated", result.value);

          Swal.fire({
            icon: "success",
            title: "Descripción actualizada",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Hubo un problema al actualizar el título. ${error}.`,
          });
        }
      }
    });
  };

  const { put: putIncidenceStatus } = usePutIncidentStatus();

  const changeStatusModal = (newStatus: IncidenceStatus) => {
    Swal.fire({
      title: `<h5><FontAwesomeIcon icon="pencil" /> Cambiar estado a ${incidenceStatusMap.get(
        newStatus
      )}</h5>`,
      html:
        '<label for="newStateReasonInput" class="form-label">Ingrese el motivo del nuevo estado de la incidencia</label>' +
        '<input type="text" id="newStateReasonInput" class="swal2-input" placeholder="Motivo">',
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const inputElement = (
          document.getElementById("newStateReasonInput") as HTMLInputElement
        ).value;

        return inputElement;
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const newStatusPayload: UpdateIncidenceStatus = {
          changedBy: user!.id,
          resolutionDetails: result.value,
          statusId: newStatus,
        };

        const { data, error } = await putIncidenceStatus(
          parseInt(id!),
          newStatusPayload
        );

        if (data?.statusCode === 200) {
          dataIncidence!.status = newStatus;

          const emitHistoryPayload = {
            changedAt: new Date().toUTCString(),
            changedBy: user!.id,
            changedByUserName: user!.name,
            resolutionDetails: result.value,
            status: newStatus,
          };
          eventEmitter.emit("statusUpdated", emitHistoryPayload);

          Swal.fire({
            icon: "success",
            title: "Estado actualizado",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Hubo un problema al actualizar el estado. ${error}.`,
          });
        }
      }
    });
  };

  const { put: putIncidencePriority } = usePutIncidentPriority();

  const changePriority = async (newPriority: IncidencePriority) => {
    const { data, error } = await putIncidencePriority(parseInt(id!), {
      priorityId: newPriority,
    });

    if (data?.statusCode === 200) {
      dataIncidence!.priority = newPriority;
      eventEmitter.emit("priorityUpdated", newPriority);

      Swal.fire({
        icon: "success",
        title: "Prioridad actualizada",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema al actualizar la prioridad. ${error}.`,
      });
    }
  };

  const { put: putIncidentTechnician } = usePutIncidentTechnician();

  const setNewTechnician = async (
    newTechnicianId: number,
    newTechnicianName: string
  ) => {
    const { data, error } = await putIncidentTechnician(parseInt(id!), {
      technicianId: newTechnicianId,
    });

    if (data?.statusCode === 200) {
      dataIncidence!.technicianId = newTechnicianId;
      dataIncidence!.technicianName = newTechnicianName;
      eventEmitter.emit("technicianUpdated", newTechnicianName);

      Swal.fire({
        icon: "success",
        title: "Nuevo técnico asignado",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema al asignar un nuevo técnico. ${error}.`,
      });
    }
  };

  const { post: postWorklog } = usePostWorklog();

  const inputWorklogModal = () => {
    Swal.fire({
      title: '<h5><FontAwesomeIcon icon="pencil" /> Imputación de tiempo</h5>',
      html:
        '<label for="workLogInput" class="form-label">Ingrese el tiempo en minutos a imputar</label>' +
        `<input type="number" id="workLogInput" class="swal2-input" placeholder="Minutos"/>`,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const inputElement = (
          document.getElementById("workLogInput") as HTMLInputElement
        ).value;
        if (inputElement.trim() === "") {
          Swal.showValidationMessage("Por favor, ingrese un tiempo.");
          return;
        }
        return inputElement;
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const createWorklogPayload = {
          incidentId: parseInt(id!),
          minWorked: parseInt(result.value),
          technicianId: user!.id,
        };
        const { data, error } = await postWorklog(createWorklogPayload);

        if (data?.statusCode === 201) {
          dataIncidence!.description = result.value;

          const emitWorklogPayload = {
            logDate: new Date().toUTCString(),
            minWorked: parseInt(result.value),
            technicianName: user!.name,
          };
          eventEmitter.emit("worklogAdded", emitWorklogPayload);

          Swal.fire({
            icon: "success",
            title: "Añadida imputación de tiempo",
          });
        } else if (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Hubo un problema al imputar tiempo. ${error}.`,
          });
        }
      }
    });
  };

  return (
    <Layout title="Inicio">
      <div className="row">
        <div className="col-8 mb-4">
          <IncidenceInfoComponent
            data={
              dataIncidence
                ? {
                    title: dataIncidence.title,
                    desc: dataIncidence.description,
                  }
                : null
            }
            completed={completedIncidence}
            error={errorIncidence}
            handleEditTitle={changeTitleModal}
            handleEditDescription={changeDescriptionModal}
          />
          <IncidenceChatComponent
            data={dataMessages}
            completed={completedMessages}
            error={errorMessages}
            handleSendMessage={sendMessage}
          />
        </div>
        <div className="col-4 mb-4 d-flex flex-column gap-3">
          <IncidenceDetailsComponent
            dataIncidence={
              dataIncidence
                ? {
                    priority: dataIncidence.priority,
                    status: dataIncidence.status,
                    assignedTo:
                      dataIncidence.technicianId !== null
                        ? dataIncidence.technicianName
                        : "Sin asignar",
                    createdBy: dataIncidence.userName,
                    createdAt: toLocalDate(dataIncidence.createdAt),
                  }
                : null
            }
            completedIncidence={completedIncidence}
            errorIncidence={errorIncidence}
            handleStatusChange={changeStatusModal}
            handlePriorityChange={changePriority}
            technicians={dataTechnicians === null ? null : dataTechnicians}
            completedTechnicians={completedTechnicians}
            errorTechnicians={errorTechnicians}
            handleNewTechnician={setNewTechnician}
          />
          <IncidenceWorklogComponent
            data={dataIncidenceWorklog}
            completed={completedIncidenceWorklog}
            error={errorIncidenceWorklog}
            handleOpenModal={inputWorklogModal}
          />
          <IncidenceHistoryComponent
            data={dataIncidenceHistory}
            completed={completedIncidenceHistory}
            error={errorIncidenceHistory}
          />
        </div>
      </div>
    </Layout>
  );
};

export default IncidenceDetails;
