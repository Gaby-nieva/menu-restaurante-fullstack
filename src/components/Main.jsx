import { useEffect, useState } from 'react';
import Cards from './Cards.jsx';
import Boton from './Boton.jsx';
import { jwtDecode } from "jwt-decode";

import comidaImg from '../assets/comida.jpeg';
import bebidasImg from '../assets/bebidas.jpeg';
import postresImg from '../assets/postres.jpeg';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [cardActiva, setCardActiva] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    fetch("https://menu-restaurante-fullstack.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);


  const comida = products.filter(
    (p) => p.category?.toLowerCase() === "comida"
  );

  const bebidas = products.filter(
    (p) => p.category?.toLowerCase() === "bebidas"
  );

  const postres = products.filter(
    (p) => p.category?.toLowerCase() === "postres"
  );

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
  };

  const hacerPedido = () => {
    if (carrito.length === 0) {
      alert("⚠️ No hay productos en el carrito.");
      return;
    }
    setMostrarModal(true);
  };

  const getImagen = () => {
    if (cardActiva === 'Comida') {
      return comidaImg;
    }
    if (cardActiva === 'Bebidas') {
      return bebidasImg;
    }
    if (cardActiva === 'Postres') {
      return postresImg;
    }

    return null;
  };

  const getProductos = () => {
    if (cardActiva === 'Comida') {
      return comida;
    }
    if (cardActiva === 'Bebidas') {
      return bebidas;
    }
    if (cardActiva === 'Postres') {
      return postres;
    }

    return [];
  };

  const agruparCarrito = () => {
    const agrupado = {};

    carrito.forEach((item) => {
      if (agrupado[item.name]) {
        agrupado[item.name].cantidad += 1;
      } else {
        agrupado[item.name] = {
          ...item,
          cantidad: 1,
        };
      }
    });

    return Object.values(agrupado);
  };



  return (
    <>

      {/* CARDS / CARRITO */}

      {cardActiva && (
        <div className="overlay" onClick={() => setCardActiva(null)} />
      )}

      <div className="container mt-5">
        <div className="row justify-content-center g-4">

          {cardActiva === null ? (
            <>
              <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                <Cards
                  key={cardActiva}
                  categoria="Comida"
                  imagen={comidaImg}
                  productos={comida}
                  activa={false}
                  onExpandir={() => setCardActiva('Comida')}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                <Cards
                  key={cardActiva}
                  categoria="Bebidas"
                  imagen={bebidasImg}
                  productos={bebidas}
                  activa={false}
                  onExpandir={() => setCardActiva('Bebidas')}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                <Cards
                  key={cardActiva}
                  categoria="Postres"
                  imagen={postresImg}
                  productos={postres}
                  activa={false}
                  onExpandir={() => setCardActiva('Postres')}
                />
              </div>
            </>
          ) : (
            <div className="col-12 d-flex justify-content-center">
              <Cards
                key={cardActiva}
                categoria={cardActiva}
                imagen={getImagen()}
                productos={getProductos()}
                activa={true}
                onCerrar={() => setCardActiva(null)}
                agregarAlCarrito={agregarAlCarrito}
              />
            </div>
          )}

        </div> {/* cierra row */}
      </div>   {/* cierra container */}

      {cardActiva === null && carrito.length > 0 && (
        <div className="container bg-dark text-white p-4 rounded my-4">
          <h4>🛒 Su Pedido</h4>
          <ul className="list-group mb-3">
            {agruparCarrito().map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <div>
                  {item.name} x {item.cantidad}
                </div>
                <div>
                  ${item.price * item.cantidad}
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarDelCarrito(i)}>
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h5>Total: ${carrito.reduce((a, b) => a + b.price, 0)}</h5>
        </div>
      )}


      {/* MENSAJE UX */}

      {carrito.length === 0 && (
        <p className='text-center text-light mt-3'>
          Agregá productos al carrito para hacer el pedido
        </p>
      )}

      {/* BOTÓN */}

      {cardActiva === null && (
        <div className="d-flex justify-content-center my-4">
          <Boton onClick={hacerPedido} disabled={carrito.length === 0} />
        </div>
      )}

      {/* MODAL */}

      {mostrarModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>🧾Su Pedido {""}
                  <span className='badge bg-primary ms-2'>
                    {carrito.length}
                  </span>
                </h5>
                <button className="btn-close" onClick={() => setMostrarModal(false)} />
              </div>

              <div className="modal-body">
                <h5>Total: ${carrito.reduce((a, b) => a + b.price, 0)}</h5>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                  Cerrar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");

                      const decoded = jwtDecode(token);

                      const pedido = {
                        user: decoded.id,

                        products: carrito.map((item) => ({
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                        })),

                        total: carrito.reduce((a, b) => a + b.price, 0),
                      };



                      const response = await fetch(
                        "https://menu-restaurante-fullstack.onrender.com/api/orders",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },

                          body: JSON.stringify(pedido),
                        }
                      );

                      const data = await response.json();
                      console.log(data);
                      setCarrito([]);
                      setMostrarModal(false);
                      alert("Pedido realizado!");
                    }
                    catch (error) {
                      console.log(error);
                      alert("Error al guardar pedido");
                    }
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;