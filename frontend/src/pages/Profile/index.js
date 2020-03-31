import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaPowerOff, FaTrashAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import "./styles.css";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";

export default () => {
  const [casos, setCasos] = useState([]);

  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setCasos(casos.filter(item => item.id !== id));
      alert("Deletado com Sucesso!");
    } catch (error) {
      console.log("Erro ao deletar!");
    }
  }

  useEffect(() => {
    async function loadData() {
      const response = await api.get("profile", {
        headers: {
          Authorization: ongId
        }
      });
      setCasos(response.data);
    }
    loadData();
  }, [ongId]);

  return (
    <>
      <ToastContainer />
      <div className="profile-container">
        <header>
          <img src={Logo} alt="main-logo" />
          <span>Bem Vindo, {ongName}</span>
          <Link className="button" to="incidents/new">
            Cadastrar novo Caso
          </Link>
          <button onClick={handleLogout}>
            <FaPowerOff size={18} color="#E02041" />
          </button>
        </header>
        <h1>Casos cadastrados</h1>
        <ul>
          {casos.map(item => (
            <li key={item.id}>
              <div>

                <button
                  onClick={() => handleDeleteIncident(item.id)}
                  tyoe="button"
                >
                  <FaTrashAlt size={20} color="#a8a8b3" />
                </button>
              </div>
              <strong>CASO:</strong>
              <p>{item.title}</p>
              <strong>DESCRIÇÃO:</strong>
              <p>{item.description}</p>
              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(item.value)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
