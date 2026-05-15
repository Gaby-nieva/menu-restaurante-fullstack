import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger"
      style={{
        borderRadius: "8px",
        fontWeight: "bold",
      }}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;