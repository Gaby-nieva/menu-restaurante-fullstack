import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">

      <Header />

      <div className="flex-grow-1">
        <Main />
      </div>

      <Footer />

    </div>
  );
};

export default Home;