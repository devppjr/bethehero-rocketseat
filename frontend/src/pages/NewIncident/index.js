import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.css";
import "../../global.css";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";

export default () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();
  const ongId = localStorage.getItem("ongId");

  async function handleSubmit(env) {
    env.preventDefault();
    try {
      console.log(ongId)
      await api.post(
        "incidents",
        {
          title,
          description,
          value
        },
        {
          headers: {
            Authorization: ongId
          }
        }
      );

      history.push("/profile");
    } catch (error) {
      console.log(error)
      alert("Error ao cadastrar caso : ");
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={Logo} alt="main-logo" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para ajudar a encontrar um heroi para
            resolver isso!
          </p>
          <Link className="back-link" to="/profile">
            <FaArrowLeft height={16} color="#E02041" />
            Fechar
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titulo do Caso"
            value={title}
            onChange={incident => setTitle(incident.target.value)}
          />
          <textarea
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={incident => setDescription(incident.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={incident => setValue(incident.target.value)}
          />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
