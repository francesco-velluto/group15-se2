import { useEffect, useState } from "react";
import { createNewTicket, getAllAvailableServices } from "../api/BackendInterface";
import {Alert, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function RequestServicePage() {
    const navigate = useNavigate();

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

    const navigateToTicketDetailsPage = () => {
        const ticketNumber = document.querySelector("#ticket-number").value;
        navigate(`/tickets/${ticketNumber}`);
    }

    useEffect(() => {
        fetchServicesList();
    }, []);

    const icons = ["mailstamp.png", "money.png", "parachute.png", "post_send.png", "post_tracking.png", "registered.png"];
    const colors = ["#E1E1E1", "#FFE1E1", "#A0E1E1", "#E1E1A0", "#E1E1FF", "#E1C1A1"];
    
    return (
        <div>
            <main>
                <Navbar />
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
                        <>
                            <Form className="d-flex justify-content-center">
                                <Form.Group>
                                    <Form.Label><b>Already have a ticket?</b> Search your ticket by ticket number below to get the details.</Form.Label>
                                    <Row xs={1} md={2} className="d-flex justify-content-center">
                                        <Col md={7}>
                                            <Form.Control type="text" placeholder="Ticket number" id="ticket-number" />
                                        </Col>
                                        <Col md={3}>
                                            <Form.Control type="button" value="Search" className="btn btn-primary" onClick={navigateToTicketDetailsPage} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                            <Row xs={1} md={2} className="g-4 mt-3 mx-4 justify-content-center">
                                {services.map((s, i) => (
                                    <ServiceCard key={s.id} serviceTag={s.tag_name} serviceId={s.id} icon={icons[i%icons.length]} color={colors[i%colors.length]}
                                                 setErrMsg={setErrMsg}/>
                                ))}
                            </Row>
                        </>
                    }
                </Container>
            </main>
        </div>
    );
}

function ServiceCard(props) {
    const navigate = useNavigate();

    const newTicket = async () => {
        //debugger;
        try {
            // post a new ticket request and redirect to the ticket details page
            const ticketNumber = await createNewTicket(props.serviceId);
            
            navigate(`/tickets/${ticketNumber}`);
        } catch (err) {
            props.setErrMsg(err.message);
        }
    }

    return (
        <Card style={{ width: "18rem", backgroundColor: props.color }} id="service-card" className="text-center justify-content-center align-items-center m-4" onClick={newTicket}>
            {/* temporary image */}
            <Card.Img className="card-icon pt-3" variant="top" src={"service_icons/" + props.icon}
                style={{ maxWidth: '128px', maxHeight: '128px', width: 'auto', height: '110px'  }} />
            
            <Card.Body>
                <Card.Title>{props.serviceTag}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default RequestServicePage;
