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
import useFetchUsers from "../hooks/users/useFetchUsers";
import { UserRole } from "../enums/userRole";
import { toLocalDate } from "../utils/toLocalDate";

const IncidenceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [dataInitialized, setDataInitialized] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const {
    data: dataIncidence,
    completed: completedIncidence,
    error: errorIncidence,
    fetch: fetchIncidence,
  } = useFetchIncidence();

  const {
    data: dataIncidenceWorklog,
    completed: completedIncidenceWorklog,
    error: errorIncidenceWorklog,
    fetch: fetchIncidenceWorklog,
  } = useFetchIncidenceWorklog();

  const {
    data: dataIncidenceHistory,
    completed: completedIncidenceHistory,
    error: errorIncidenceHistory,
    fetch: fetchIncidenceHistory,
  } = useFetchIncidenceHistory();

  const {
    data: dataUsers,
    completed: completedUsers,
    error: errorUsers,
    fetch: fetchUsers,
  } = useFetchUsers();

  useEffect(() => {
    if (id !== undefined && user !== null && !dataInitialized) {
      const incidenceId = parseInt(id);
      fetchIncidence(incidenceId);
      fetchIncidenceWorklog(incidenceId);
      fetchIncidenceHistory(incidenceId);
      if (user.role === UserRole.Administrator) {
        fetchUsers({
          orderBy: "id",
          orderDirection: "asc",
          pageNumber: 1,
          pageSize: 1000,
          search: "",
        });
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
      /*
      newConnection
        .start()
        .then(() => {
          console.log("Conexión de SignalR iniciada");
          newConnection.on("ReceiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        })
        .catch((err) => console.error("Error al iniciar la conexión:", err));

      return () => {
        newConnection.stop().then(() => {
          console.log("Conexión de SignalR detenida");
        });
      };
      */
    }
  }, [id, user]);
  /*
  const sendMessage = async (incidentId, messageText) => {
    if (connection) {
      try {
        await connection.invoke(
          "SendMessage",
          incidentId,
          user.id,
          messageText
        );
        setNewMessage("");
      } catch (err) {
        console.error("Error al enviar el mensaje:", err);
      }
    }
  };
*/

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
          eventEmitter.emit("statusUpdated", {
            username: user!.name,
            payload: newStatusPayload,
          });

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
          <IncidenceChatComponent />
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
            handlePriorityChange={function (
              newPriority: IncidencePriority
            ): void {
              throw new Error("Function not implemented.");
            }}
            users={dataUsers === null ? null : dataUsers.items}
            completedUsers={completedUsers}
            errorUsers={errorUsers}
          />
          <IncidenceWorklogComponent
            data={dataIncidenceWorklog}
            completed={completedIncidenceWorklog}
            error={errorIncidenceWorklog}
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
