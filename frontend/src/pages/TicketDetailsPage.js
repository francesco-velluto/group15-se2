import { useParams } from "react-router-dom";
import { Row, Col, Button, CardHeader, Card, Container, Alert, CardText, CardBody, CardTitle, CardFooter } from 'react-bootstrap';
import { getTicketDetails } from "../api/BackendInterface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs"
import Navbar from "./Navbar";

function TicketDetailsPage() {
    const { ticketNumber } = useParams();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState({});
    const navigate = useNavigate();
    // TODO - implement ticket details page

    useEffect(() => {
        getTicketDetails(ticketNumber).then(t=>{
            setTicket(t);
        }).catch(err=>{
            setTicket({});
            setErrorMsg(err.message);
        })
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

    // EXAMPLE OF API CALL USAGE:



    const fetchGetTicket = async () => {
        try {
            const t = await getTicketDetails(ticketNumber);
            setTicket(t);
        } catch (err) {
            setTicket({});
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div /* style={{backgroundColor: "#D8D8D8"}} */>
            <Navbar />
            <Container className='p-3 d-flex text-center justify-content-center'>
                {errorMsg && <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible={true}>{errorMsg}</Alert>}
                {! errorMsg &&
                    <Card>
                        {/* <Card.Img src="/ticket_image.png" style={{ maxHeight: 300, height: "auto", width: "auto" }}/>
                        <Card.ImgOverlay> */}
                            <CardBody className="m-4">
                                <Row className="ticket-info-row" id="ticket-number"><h2>Ticket number: {ticket.number}</h2></Row>
                                <Row className="ticket-info-row" id="service-tag"><h5><strong>{ticket.service_tag}</strong></h5></Row>
                                {/* <Row className="ticket-info-row" id="ticket-status">Status: {ticket.status}</Row> */}
                                <Row className="ticket-info-row" id="ticket-date">{dayjs(ticket.date).format("DD/MM/YYYY, HH:mm:ss")}</Row>
                                <Row className="ticket-info-row" id="estimated-wait-time">Waiting time: {Math.round(ticket.estimated_waiting_time)} min</Row>
                                <Button onClick={() => navigate('/') } style={{backgroundColor: "#87CEEB", color: "black", border: "0px"}}>
                                    Request new service
                                </Button>
                            </CardBody>
                        {/* </Card.ImgOverlay> */}
                    </Card>}
            </Container>
        </div>
    );
}

export default TicketDetailsPage;