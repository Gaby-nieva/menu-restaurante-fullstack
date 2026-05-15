import './Formulario.css';
import bg from '../assets/textura-grunge-oscura.jpg';

const Formulario = ({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  error,
}) => {

  return (
    <div
      className="fondo-login"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <form onSubmit={handleLogin} className="formulario-blur">

        <h3 className="text-center mb-4 text-white">
          Iniciar sesión
        </h3>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">
            Ingresar
          </button>
        </div>

        <p className="text-center text-white mt-4">
          ¿No tenés cuenta?{" "}
          <a href="/register" className="text-warning">
            Registrarse
          </a>
        </p>

      </form>
    </div>
  );
};

export default Formulario;