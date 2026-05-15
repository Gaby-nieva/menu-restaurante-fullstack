const Boton = ({ onClick, disabled }) => {
  return (
    <div className="text-center my-4">
      <button className="btn btn-primary" onClick={onClick} disabled={disabled} 
      style= {{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}>
        Hacer Pedido
      </button>
    </div>
  );
};

export default Boton;
