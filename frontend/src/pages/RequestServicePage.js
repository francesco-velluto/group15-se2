import { useEffect, useState } from "react";
import { createNewTicket, getAllAvailableServices } from "../api/BackendInterface";
import { Alert, Card, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RequestServicePage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const fetchServicesList = async () => {
        try {
            const servicesList = await getAllAvailableServices();
            setServices(servicesList);
        } catch (err) {
            setServices([]);
            setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServicesList();
    }, []);

    return (
        <div>
            <main>
                <Row className="title-navbar text-center py-3">
                    <h1>Office Queue Management System</h1>
                </Row>
                <Container className="card-container">
                    {!loading && errMsg && 
                        <Alert key={"danger"} variant="danger" 
                            onClose={() => setErrMsg("")} dismissible> {errMsg} </Alert>}
                    {loading ? 
                        <Container className="d-flex my-5 justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Container>
                        :
                        <Row xs={1} md={2} className="g-4 mt-3 mx-4 justify-content-center">
                            {services.map((s) => (
                                <ServiceCard key={s.id} serviceTag={s.tag_name} serviceId={s.id} 
                                    setErrMsg={setErrMsg}/>
                            ))}
                        </Row>}
                </Container>
            </main>
        </div>
    );
}

function ServiceCard(props) {
    const navigate = useNavigate();

    const newTicket = async () => {
        try {
            // post a new ticket request and redirect to the ticket details page
            const { ticketNumber } = await createNewTicket(props.serviceId);
            navigate(`/tickets/${ticketNumber}`);
        } catch (err) {
            props.setErrMsg(err.message);
        }
    }

    return (
        <Card style={{ width: "18rem" }} id="service-card" className="text-center justify-content-center align-items-center m-4" onClick={newTicket}>
            {/* temporary image */}
            <Card.Img className="card-icon pt-2" variant="top" src="logo192.png"
                style={{ maxWidth: '128px', maxHeight: '128px', width: 'auto', height: 'auto' }} />
            
            <Card.Body>
                <Card.Title>{props.serviceTag}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default RequestServicePage;
