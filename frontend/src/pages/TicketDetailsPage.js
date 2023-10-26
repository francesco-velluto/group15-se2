import { useParams } from "react-router-dom";
import { Row, Col, Button, CardHeader, Card, Container, Alert, CardText, CardBody, CardTitle, CardFooter } from 'react-bootstrap';
import { getTicketDetails } from "../api/BackendInterface";
import { useEffect, useState } from "react";
//import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs"

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
        <>
            <div>
                <Row className="title-navbar text-center py-3">
                    <h1>Office Queue Management System</h1>
                </Row>
                <Container className='p-3 text-center'>
                    <Row>
                        <Col></Col>
                        <Col>
                        <Card>
                            <CardHeader>
                                {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible={true}>{errorMsg}</Alert>
                                    : <h1>Ticket number: <div id="ticket-number">{ticket.number}</div></h1>}
                            </CardHeader>
                            <CardBody>
                                <CardTitle id="service-tag">Service: {ticket.service_tag}</CardTitle>
                                <CardTitle id="ticket-status">Status: {ticket.status}</CardTitle>
                                <CardTitle id="ticket-date">Date: {dayjs(ticket.date).format("DD/MM/YYYY, HH:mm:ss")}</CardTitle>
                                <CardTitle id="estimated-wait-time">Estimated waiting time: {Math.round(ticket.estimated_waiting_time)} min</CardTitle>
                                
                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => navigate('/') }>
                                    New service
                                </Button>
                            </CardFooter>
                        </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>

            </div>
        </>
    );
}

export default TicketDetailsPage;