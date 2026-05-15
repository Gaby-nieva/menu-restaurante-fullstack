import logoImg from '../assets/logo garrison 2.jpeg';
import LogoutButton from "./LogoutButton";

const Header = () => {

    return (
        <nav
            className="navbar py-3 sticky-top"
            style={{ backgroundColor: "#010101" }}
        >

            <div className="container justify-content-center position-relative">

                <img
                    src={logoImg}
                    alt="Logo Garrison"
                    style={{
                        margin: "2px",
                        height: "100px",
                        width: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                    }}
                />

                <div className="position-absolute end-0">
                    <LogoutButton />
                </div>

            </div>

        </nav>
    );
};

export default Header;