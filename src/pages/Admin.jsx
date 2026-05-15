import { useEffect, useState } from "react";

const Admin = () => {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  // OBTENER PRODUCTOS

  const obtenerProductos = () => {

    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  // OBTENER PEDIDOS

  const obtenerPedidos = () => {

    fetch("http://localhost:3000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {

    obtenerProductos();
    obtenerPedidos();

  }, []);

  // ELIMINAR PRODUCTO

  const eliminarProducto = async (id) => {

    try {

      await fetch(
        `http://localhost:3000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      obtenerProductos();

    } catch (error) {

      console.log(error);
    }
  };

  // ACTUALIZAR PRECIO

  const actualizarPrecio = async (id, nuevoPrecio) => {

    try {

      await fetch(
        `http://localhost:3000/api/products/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            price: nuevoPrecio,
          }),
        }
      );

      obtenerProductos();

    } catch (error) {

      console.log(error);
    }
  };

  // ACTUALIZAR ESTADO PEDIDO

  const actualizarEstadoPedido = async (
    id,
    nuevoEstado
  ) => {

    try {

      await fetch(
        `http://localhost:3000/api/orders/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: nuevoEstado,
          }),
        }
      );

      obtenerPedidos();

    } catch (error) {

      console.log(error);
    }
  };


  // ELIMINAR PEDIDO

  const eliminarPedido = async (id) => {

    const confirmar = window.confirm(
      "¿Eliminar pedido?"
    );

    if (!confirmar) return;

    try {

      await fetch(
        `http://localhost:3000/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      obtenerPedidos();

    } catch (error) {

      console.log(error);
    }
  };

  // CREAR PRODUCTO

  const crearProducto = async () => {

    try {

      await fetch(
        "http://localhost:3000/api/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...newProduct,
            price: Number(newProduct.price),
          }),
        }
      );

      setNewProduct({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });

      obtenerProductos();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container mt-5 text-light">

      <h1 className="mb-4">
        Panel Admin
      </h1>

      {/* TOP SECTION */}

      <div className="row mb-4">

        {/* AGREGAR PRODUCTO */}

        <div className="col-md-6 mb-4">

          <div className="card bg-secondary p-4 h-100">

            <h4 className="mb-3">
              Agregar producto
            </h4>

            <input
              type="text"
              placeholder="Nombre"
              className="form-control mb-2"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
            />

            <select
              className="form-control mb-2"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
            >

              <option value="">
                Seleccionar categoría
              </option>

              <option value="comida">
                Comida
              </option>

              <option value="bebidas">
                Bebidas
              </option>

              <option value="postres">
                Postres
              </option>

            </select>

            <input
              type="number"
              placeholder="Precio"
              className="form-control mb-2"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="URL imagen"
              className="form-control mb-3"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Descripción"
              className="form-control mb-3"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />

            <button
              className="btn btn-success"
              onClick={crearProducto}
            >
              Agregar producto
            </button>

          </div>

        </div>

        {/* PEDIDOS */}

        <div className="col-md-6 mb-4">

          <div
            className="card bg-dark text-white p-4 h-100"
            style={{
              maxHeight: "700px",
              overflowY: "auto",
            }}
          >

            <h4 className="mb-4">
              Pedidos
            </h4>

            {orders.length === 0 ? (

              <p>No hay pedidos todavía.</p>

            ) : (

              orders.map((order) => (

                <div
                  key={order._id}
                  className="card bg-secondary text-white mb-3 p-3"
                >

                  <h5>
                    Usuario: {order.user}
                  </h5>

                  <p>
                    Total: ${order.total}
                  </p>

                  <p>
                    Fecha:
                    {" "}
                    {new Date(order.createdAt)
                      .toLocaleDateString()}
                  </p>

                  <hr />

                  <h6>
                    Productos:
                  </h6>

                  {order.products.map((prod, index) => (

                    <div key={index}>
                      {prod.name} - ${prod.price}
                    </div>

                  ))}

                  {/*  ESTADO  */}

                  <hr />

                  <p>
                    Estado:
                    {" "}

                    {
                      order.status === "pendiente"
                        ? (
                          <span className="badge bg-warning text-dark">
                            Pendiente
                          </span>
                        )
                        : (
                          <span className="badge bg-success">
                            Entregado
                          </span>
                        )
                    }
                  </p>

                  <div className="d-flex gap-2 mt-3">

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        actualizarEstadoPedido(
                          order._id,

                          order.status === "pendiente"
                            ? "entregado"
                            : "pendiente"
                        )
                      }
                    >
                      Cambiar Estado
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        eliminarPedido(order._id)
                      }
                    >
                      Eliminar Pedido
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* PRODUCTOS */}

      <div
        style={{
          maxHeight: "700px",
          overflowY: "auto",
        }}
      >

        <h2 className="mb-4">
          Productos
        </h2>

        {products.length === 0 ? (

          <p>No hay productos cargados.</p>

        ) : (

          products.map((prod) => (

            <div
              key={prod._id}
              className="card bg-dark text-white mb-3 p-3"
            >

              <h5>{prod.name}</h5>

              <p>
                Categoría: {prod.category}
              </p>

              <p>
                Precio actual: ${prod.price}
              </p>

              <div className="d-flex gap-2">

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    eliminarProducto(prod._id)
                  }
                >
                  Eliminar
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => {

                    const nuevoPrecio = prompt(
                      "Nuevo precio:"
                    );

                    if (nuevoPrecio) {

                      actualizarPrecio(
                        prod._id,
                        Number(nuevoPrecio)
                      );
                    }
                  }}
                >
                  Editar precio
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Admin;