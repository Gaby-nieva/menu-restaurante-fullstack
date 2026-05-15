import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import bg from "../assets/textura-grunge-oscura.jpg";
import "../components/Formulario.css";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: `${name} ${lastname}`,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrarse");
        return;
      }

      alert("Usuario creado correctamente");

      navigate("/login");

    } catch (error) {

      console.log(error);

      setError("Error del servidor");
    }
  };

  return (

    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <form
        onSubmit={handleRegister}
        className="formulario-blur"
      >

        <h3 className="text-center mb-4 text-white">
          Registrarse
        </h3>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Nombre"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          className="form-control mb-3"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary">
            Crear cuenta
          </button>
        </div>

        <p className="text-center text-white mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-warning">
            Ingresar
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;