import React from 'react';


const Cards = ({ categoria, imagen, productos, activa, onExpandir, onCerrar, agregarAlCarrito }) => {
    return (
        <div
            className={`card m-4 position-relative ${activa ? 'expanded-card' : ''}`}
            style={{
                width: activa ? '100%' : '20rem',
                maxWidth: activa ? '800px' : '',
                margin: '2rem auto',
                zIndex: activa ? 10 : 1,
                transition: 'all 0.3s ease',
            }}
        >
            <img
                src={imagen}
                className="card-img-top"
                alt={categoria}
                style={{
                    height: activa ? '300px' : '180px',
                    objectFit: 'cover',
                    transition: 'height 0.3s ease',
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{categoria}</h5>

                {!activa && (
                    <button onClick={onExpandir} className="btn btn-primary btn-sm">
                        Ver más
                    </button>
                )}

                {activa && (
                    <>
                        <ul className="list-group list-group-flush mb-3">
                            {productos?.map((prod, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <strong>{prod.name}</strong>
                                        <br />
                                        <small>${prod.price}</small>
                                    </div>
                                    <button
                                        onClick={() => agregarAlCarrito(prod)}
                                        className="btn btn-sm btn-success"
                                    >
                                        Agregar
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <button onClick={onCerrar} className="btn btn-secondary btn-sm">
                            Volver
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cards;