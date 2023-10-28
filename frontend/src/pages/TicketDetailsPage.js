import { useParams } from "react-router-dom";
import { Row, Button, Card, Alert, CardBody } from 'react-bootstrap';
import { getTicketDetails } from "../api/BackendInterface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs"
import Navbar from "./Navbar";

function TicketDetailsPage() {
    const { ticketNumber } = useParams();
    const [errorMsg, setErrorMsg] = useState("");
    const [ticket, setTicket] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getTicketDetails(ticketNumber).then(t => {
            setTicket(t);
        }).catch(err => {
            setTicket({});
            setErrorMsg(err.message);
        })
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTicket((t) => {
                const val = { ...t, estimated_waiting_time: t.estimated_waiting_time - 1 };
                return val;
            });
        }, 60000);

        // Clean up the interval when the component unmounts or when the effect runs again.
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Navbar />
            <div className='p-3 d-flex text-center justify-content-center'>
                {errorMsg ?
                    <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible={true}>
                        {errorMsg}
                    </Alert>
                    :
                    <Card>
                        <Card.Img src="/ticket_image.png" style={{ maxHeight: 500, height: "auto", width: "auto" }} />
                        <Card.ImgOverlay>
                            <CardBody className="card-content">
                                <Row className="ticket-info-row">
                                    Ticket number: <span id="ticket-number">{ticket.number}</span>
                                </Row>
                                <Row className="ticket-info-row" id="service-tag">{ticket.service_tag}</Row>
                                <Row className="ticket-info-row" id="ticket-status">Status: {ticket.status}</Row>
                                <Row className="ticket-info-row" id="ticket-date">{dayjs(ticket?.date).format("DD/MM/YYYY, HH:mm:ss")}</Row>
                                <Row className="ticket-info-row" id="estimated-wait-time">
                                    Waiting time: <span>{Math.round(ticket.estimated_waiting_time)} min</span>
                                </Row>
                                <Button onClick={() => navigate('/')} style={{ backgroundColor: "#87CEEB", color: "black", border: "0px" }}>
                                    Request new service
                                </Button>
                            </CardBody>
                        </Card.ImgOverlay>
                    </Card>
                }
            </div>
        </div>
    );
}

export default TicketDetailsPage;