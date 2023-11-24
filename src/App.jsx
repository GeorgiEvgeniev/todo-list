import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Todo from "./pages/Todo/Todo";
import { Global } from "./main";

const App = () => {
    return (
        <div className="app-wrapper">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Global Root={() => <Todo />} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
