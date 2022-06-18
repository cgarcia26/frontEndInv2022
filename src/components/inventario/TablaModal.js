import React from "react";

function getMarcaName(marcas, id) {
  return marcas.filter(marca => marca._id === id )[0] ? marcas.filter(marca => marca._id === id )[0].nombre : ""
}

function getUsuarioName(usuarios, id) {
  return usuarios.filter(usuario => usuario._id === id )[0] ? usuarios.filter(usuario => usuario._id === id )[0].email : ""
}

function getEstadoName(estados, id) {
  return estados.filter(estado => estado._id === id )[0] ? estados.filter(estado => estado._id === id )[0].nombre : ""
}

function getTipoEquipoName(tipoEquipos, id) {
  return tipoEquipos.filter(tipoEquipo => tipoEquipo._id === id )[0] ? tipoEquipos.filter(tipoEquipo => tipoEquipo._id === id )[0].nombre : ""
}

export default function TablaModulos({ componentes, marcas, usuarios, estados, tipoEquipos, openEditById }) {
  return (
    <div className="table-responsive-xl">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Serial</th>
            <th scope="col">Modelo</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha Compra</th>
            <th scope="col">Color</th>
            <th scope="col">Precio</th>
            <th scope="col">Marca</th>
            <th scope="col">Usuario</th>
            <th scope="col">Estado</th>
            <th scope="col">Tipo Equipo</th>            
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((est, index) => {
            const dateC = new Date(est.fechaCompra);
            const months = [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Augosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ];
            const creacion = `${dateC.getFullYear()}-${
              months[dateC.getMonth()]
            }-${dateC.getDate()}`;
            return (
              <tr key={est._id}>
                <th scope="row">{index + 1}</th>
                <td>{est.serial}</td>
                <td>{est.modelo}</td>
                <td>{est.descripcion}</td>
                <td>{creacion}</td>
                <td>{est.color}</td>
                <td>${est.precio}</td>
                <td>{getMarcaName(marcas, est.marca)}</td>
                <td>{getUsuarioName(usuarios, est.usuario)}</td>
                <td>{getEstadoName(estados, est.estado)}</td>
                <td>{getTipoEquipoName(tipoEquipos, est.tipoEquipo)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data={est._id}
                    onClick={openEditById}
                  >
                    <i className="fa-solid fa-pen-to-square" data={est._id}></i>
                  </button>
                  <button type="button" className="btn btn-outline-danger">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
