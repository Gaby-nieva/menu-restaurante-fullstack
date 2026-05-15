const Footer = () => {
    return (
        <footer className="text-white text-center py-4 mt-5" style={{ backgroundColor: "#010101" }}>
            <p className="mb-3">&copy; 2025 Garrison. Todos los derechos reservados.</p>
            
            <div>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white mx-2">
                    <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white mx-2">
                    <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white mx-2">
                    <i className="fab fa-twitter fa-lg"></i>
                </a>
                <a href="mailto:contacto@garrison.com" className="text-white mx-2">
                    <i className="fas fa-envelope fa-lg"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
