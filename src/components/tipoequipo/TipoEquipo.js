import React, { useEffect, useState } from "react";
import {
  obtenerTodosTipoEquipos,
  guardar,
  editarPorId,
} from "../../services/TipoEquipoService";
import { obtenerTodosUsuarios } from "../../services/UsuarioService";
import TablaModulos from "../iu/TablaModal";
import Modal from "./Modal";

export default function TipoEquipo() {
  const [tipoEquipos, setTipoEquipos] = useState([]);

  const [usuarios, setUsuarios] = useState([]);

  const [tipoEquipo, setTipoEquipo] = useState({
    _id: "",
    nombre: "",
    usuario: { _id: "", email: "" },
    estado: true,
  });

  const [error, setError] = useState(false);

  const [hidden] = useState("hidden");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTipoEquipos = () => {
      obtenerTodosTipoEquipos()
        .then((r) => {
          console.log(r);
          setTipoEquipos(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getUsuarios = () => {
      obtenerTodosUsuarios()
        .then((r) => {
          console.log(r);
          setUsuarios(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getTipoEquipos();
    getUsuarios();
  }, []);

  const changeTipoEquipo = (e) => {
    e.preventDefault();
    setTipoEquipo({
      ...tipoEquipo,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(tipoEquipo);
    if (tipoEquipo._id) {
      editarTipoEquipo();
    } else {
      guardarTipoEquipo();
    }
    resetEstado();
  };

  const guardarTipoEquipo = () => {
    guardar(tipoEquipo)
      .then((r) => {
        setTipoEquipos([...tipoEquipos, r.data]);
        changeError(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        changeError(true);
        setLoading(false);
      });
  };

  const closeModal = () => {
    resetEstado();
    changeError(false);
  };

  const changeError = (e) => {
    setError(e);
  };

  const openEditById = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
    const id = e.target.getAttribute("data");
    console.log(id);
    const estadoFilter = tipoEquipos.filter((est) => est._id === id)[0];
    setTipoEquipo({
      ...estadoFilter,
    });
  };

  const editarTipoEquipo = () => {
    editarPorId(tipoEquipo._id, tipoEquipo)
      .then((r) => {
        console.log(r.data._id);
        const id = r.data._id;
        if (!r.data.estado) {
          const activos = tipoEquipos.filter((est) => est._id !== id);
          setTipoEquipos(activos);
        }
        changeError(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        changeError(true);
        setLoading(false);
      });
  };

  const resetEstado = () => {
    setTipoEquipo({
      _id: "",
      nombre: "",
      usuario: { _id: "", email: "" },
      estado: true,
    });
  };

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa-solid fa-plus"></i>
        Agregar
      </button>
      <TablaModulos componentes={tipoEquipos} openEditById={openEditById} />
      <Modal
        tipoEquipo={tipoEquipo}
        usuarios={usuarios}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeTipoEquipo={changeTipoEquipo}
        error={error}
        add={add}
      />
    </div>
  );
}
