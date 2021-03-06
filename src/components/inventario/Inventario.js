import React, { useEffect, useState } from "react";
import {
  obtenerTodos,
  guardar,
  editarPorId,
} from "../../services/InventarioService";
import {
  obtenerTodosMarcas
} from "../../services/MarcaService";
import {
  obtenerTodosUsuarios
} from "../../services/UsuarioService";
import {
  obtenerTodosTipoEquipos
} from "../../services/TipoEquipoService";
import {
  obtenerTodosEstados
} from "../../services/EstadoService";
import TablaModulos from "./TablaModal";
import Modal from "./Modal";

export default function Inventario() {
  const [inventarios, setInventarios] = useState([]);

  const [marcas, setMarcas] = useState([]);

  const [usuarios, setUsuarios] = useState([]);
  
  const [tipoEquipos, setTipoEquipos] = useState([]);
  
  const [estados, setEstados] = useState([]);

  const [inventario, setInventario] = useState({
    _id: "",
    modelo: "",
    serial: "",
    descripcion: "",
    foto: "",
    precio: "",
    color: "",
    marca: "",
    usuario: "",
    tipoEquipo: "",
    estado: "",
  });

  const [error, setError] = useState(false);

  const [hidden] = useState("hidden");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInventarios = () => {
      obtenerTodos()
        .then((r) => {
          console.log(r);
          setInventarios(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getMarcas = () => {
      obtenerTodosMarcas()
        .then((r) => {
          console.log(r);
          setMarcas(r.data);
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
    const getEstados = () => {
      obtenerTodosEstados()
        .then((r) => {
          console.log(r);
          setEstados(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getInventarios();
    getMarcas();
    getUsuarios();
    getTipoEquipos();
    getEstados();
  }, []);

  const changeInventario = (e) => {
    e.preventDefault();
    setInventario({
      ...inventario,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(inventario);
    if (inventario._id) {
      editarInventario();
    } else {
      guardarInventario();
    }
    resetEstado();
  };

  const guardarInventario = () => {
    guardar(inventario)
      .then((r) => {
        setInventarios([...inventarios, r.data]);
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
      const estadoFilter = inventarios.filter((est) => est._id === id)[0];
      setInventario({
        ...estadoFilter,
      });
  };

  const editarInventario = () => {
    editarPorId(inventario._id, inventario)
      .then((r) => {
        console.log(r.data._id);
        const id = r.data._id;
        if (!r.data.estado) {
          const activos = inventarios.filter((est) => est._id !== id);
          setInventarios(activos);
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
    setInventario({
      _id: "",
      modelo: "",
      serial: "",
      descripcion: "",
      foto: "",
      precio: "",
      color: "",
      marca: "",
      usuario: "",
      tipoEquipo: "",
      estado: "",
    });
  };

  return (
    <div className="container-fluid">
      <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={resetEstado}
      >
        <i className="fa-solid fa-plus"></i>
        Agregar
      </button>
      <TablaModulos 
      componentes={inventarios}
      marcas={marcas} 
      usuarios={usuarios}
      tipoEquipos={tipoEquipos}
      estados={estados}
      openEditById={openEditById} />
      <Modal
        inventario={inventario}
        marcas={marcas}
        usuarios={usuarios}
        tipoEquipos={tipoEquipos}
        estados={estados}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeInventario={changeInventario}
        error={error}
        add={add}
      />
    </div>
  );
}
