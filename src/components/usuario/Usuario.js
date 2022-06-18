import React, { useEffect, useState } from "react";
import {
  obtenerTodosUsuarios,
  guardar,
  editarPorId,
} from "../../services/UsuarioService";
import TablaModulos from "./TablaModal";
import Modal from "./Modal";

export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]);

  const [usuario, setUsuario] = useState({
    _id: "",
    nombre: "",
    email: "",
    estado: true,
  });

  const [error, setError] = useState(false);

  const [hidden] = useState("hidden");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    getUsuarios();
  }, []);

  const changeUsuario = (e) => {
    e.preventDefault();
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(usuario);
    if (usuario._id) {
      editarUsuario();
    } else {
      guardarUsuario();
    }
    resetEstado();
  };

  const guardarUsuario = () => {
    console.log(usuario)
    guardar(usuario)
      .then((r) => {
        setUsuarios([...usuarios, r.data]);
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
    const estadoFilter = usuarios.filter((est) => est._id === id)[0];
    setUsuario({
      ...estadoFilter,
    });
  };

  const editarUsuario = () => {
    editarPorId(usuario._id, usuario)
      .then((r) => {
        console.log(r.data._id);
        const id = r.data._id;
        if (!r.data.estado) {
          const activos = usuarios.filter((est) => est._id !== id);
          setUsuarios(activos);
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
    setUsuario({
      _id: "",
      nombre: "",
      email: "",
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
      <TablaModulos componentes={usuarios} openEditById={openEditById} />
      <Modal
        usuario={usuario}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeUsuario={changeUsuario}
        error={error}
        add={add}
      />
    </div>
  );
}
