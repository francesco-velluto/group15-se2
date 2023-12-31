import './App.css';
import {Route, Routes} from "react-router-dom";
import RequestServicePage from "./pages/RequestServicePage";
import TicketDetailsPage from "./pages/TicketDetailsPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<RequestServicePage />}/> // By default, the homepage is RequestServicePage
            <Route path="/services" element={<RequestServicePage />}/>
            <Route path="/tickets/:ticketNumber" element={<TicketDetailsPage />}/>
        </Routes>
    );
}

export default App;
