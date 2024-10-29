import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/shared/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import UsersTableComponent from "../components/User/UsersTableComponent";
import useFetchUsers from "../hooks/users/useFetchUsers";

const Users: React.FC = () => {
  const {
    data: dataUsers,
    completed: completedUsers,
    error: errorUsers,
    fetch: fetchUsers,
  } = useFetchUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title="Configuracion usuarios">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex my-3">
            <div className="d-flex align-self-center gap-2 offset-9 col-3">
              <input
                type="text"
                className="form-control flex-fill bg-input"
                placeholder="Buscar incidencia"
              />
              <button type="button" className="btn bg-input flex-fill">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        {/* Tabla de Usuarios */}
        <div className="p-2">
          <UsersTableComponent
            data={dataUsers}
            completed={completedUsers}
            error={errorUsers}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
