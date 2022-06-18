import React from "react";

function renderOptionsM(marcas) {
  return marcas.map(
    marca => <option value={marca._id} label={marca.nombre} key={marca._id} ></option>
  )
}

function renderOptionsU(usuarios) {
  return usuarios.map(
    usuario => <option value={usuario._id} label={usuario.email} key={usuario._id} ></option>
  )
}

function renderOptionsT(tipoEquipos) {
  return tipoEquipos.map(
    tipoEquipo => <option value={tipoEquipo._id} label={tipoEquipo.nombre} key={tipoEquipo._id} ></option>
  )
}

function renderOptionsE(estados) {
  return estados.map(
    estado => <option value={estado._id} label={estado.nombre} key={estado._id} ></option>
  )
}

export default function Modal({
  inventario,
  marcas,
  usuarios,
  tipoEquipos,
  estados,
  loading,
  closeModal,
  hidden,
  changeInventario,
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
              {inventario._id ? "Editar Inventario" : "Nuevo Inventario"}
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
              <input type={hidden} name="_id" value={inventario._id}></input>
              <div className="row">
                <div className="col"> 
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Modelo:
                    </label>
                    <input
                      disabled={inventario._id ? true : false}
                      readOnly={inventario._id ? true : false}
                      required
                      value={inventario.modelo}
                      name="modelo"
                      type="text"
                      className="form-control"
                      onChange={changeInventario}
                    />
                  </div>
                </div>
                <div className="col"> 
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Serial:
                    </label>
                    <input
                      disabled={inventario._id ? true : false}
                      readOnly={inventario._id ? true : false}
                      required
                      value={inventario.serial}
                      name="serial"
                      type="text"
                      className="form-control"
                      onChange={changeInventario}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Descripción:
                </label>
                <textarea
                  value={inventario.descripcion}
                  name="descripcion"
                  type="text"
                  className="form-control"
                  onChange={changeInventario}
                />
              </div>
              <div className="row">
                <div className="col"> 
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Precio:
                    </label>
                    <input
                      value={inventario.precio}
                      name="precio"
                      type="number"
                      className="form-control"
                      onChange={changeInventario}
                    />
                  </div>
                </div>
                <div className="col"> 
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Color:
                    </label>
                    <input
                      value={inventario.color}
                      name="color"
                      type="text"
                      className="form-control"
                      onChange={changeInventario}
                    />
                  </div>
                </div>
              </div>  
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Foto:
                </label>
                <input
                  value={inventario.foto}
                  name="foto"
                  type="text"
                  className="form-control"
                  onChange={changeInventario}
                />
              </div>
              <div className="row">
                <div className="col"> 
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Marca:
                    </label>
                    <select
                      required
                      className="form-select"
                      aria-label="Default select example"
                      value={inventario.marca}
                      name="marca"
                      onChange={changeInventario}
                    >
                      <option defaultValue={""}></option>
                      {renderOptionsM(marcas)}
                    </select>
                  </div>
                </div>
                <div className="col">   
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Usuario:
                    </label>
                    <select
                      required
                      className="form-select"
                      aria-label="Default select example"
                      value={inventario.usuario}
                      name="usuario"
                      onChange={changeInventario}
                    >
                      <option defaultValue={""}></option>
                      {renderOptionsU(usuarios)}
                    </select>
                  </div>
                </div>  
              </div>
              <div className="row">
                <div className="col">  
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Tipo Equipo:
                    </label>
                    <select
                      required
                      className="form-select"
                      aria-label="Default select example"
                      value={inventario.tipoEquipo}
                      name="tipoEquipo"
                      onChange={changeInventario}
                    >
                      <option defaultValue={""}></option>
                      {renderOptionsT(tipoEquipos)}
                    </select>
                  </div>
                </div>
                <div className="col">    
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Esatado:
                    </label>
                    <select
                      required
                      className="form-select"
                      aria-label="Default select example"
                      value={inventario.estado}
                      name="estado"
                      onChange={changeInventario}
                    >
                      <option defaultValue={""}></option>
                      {renderOptionsE(estados)}
                    </select>
                  </div>
                </div>
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