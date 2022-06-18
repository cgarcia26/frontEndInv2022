import React from "react";

function renderOptionsU(usuarios) {
  return usuarios.map(
    usuario => <option value={usuario._id} label={usuario.email} key={usuario._id} ></option>
  )
}

export default function Modal({
  tipoEquipo,
  usuarios, 
  loading,
  closeModal,
  hidden,
  changeTipoEquipo,
  error,
  add,
}) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {tipoEquipo._id ? "Editar Tipo Equipo" : "Nuevo Tipo Equipo"}
            </h5>
            {loading && (
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={add}>
              <input type={hidden} name="_id" value={tipoEquipo._id}></input>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Nombre:
                </label>
                <input
                  disabled={tipoEquipo._id ? true : false}
                  readOnly={tipoEquipo._id ? true : false}
                  required
                  value={tipoEquipo.nombre}
                  name="nombre"
                  type="text"
                  className="form-control"
                  onChange={changeTipoEquipo}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Usuario:
                </label>
                <select
                  required
                  className="form-select"
                  aria-label="Default select example"
                  value={tipoEquipo.usuario}
                  name="usuario"
                  onChange={changeTipoEquipo}
                >
                  <option defaultValue={""}></option>
                  {renderOptionsU(usuarios)}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Estado:
                </label>
                <select
                  disabled={tipoEquipo._id ? false : true}
                  readOnly={tipoEquipo._id ? false : true}
                  required
                  className="form-select"
                  aria-label="Default select example"
                  value={tipoEquipo.estado}
                  name="estado"
                  onChange={changeTipoEquipo}
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
              <div className="modal-footer">
                <div
                  className={error ? "alert alert-danger" : "d-none"}
                  role="alert"
                >
                  ¡Ha ocurrido un error!
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
                {loading ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
