import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarComponent from "./Components/NavbarComponent";
import Details from "./pages/Details";
import Footer from "./Components/Footer/Footer";
import SearchMovie from "./pages/SearchMovie";
import Error from "./pages/Error";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
function App() {
    return (
        <BrowserRouter>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/search" element={<SearchMovie />} />

                {/* authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* handle error path */}
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
