import { useParams } from "react-router-dom";
import { Row, Col, CardHeader, Card, Container, Alert, CardText, CardBody, CardTitle } from 'react-bootstrap';
import { getTicketDetails } from "../api/BackendInterface";
import { useEffect, useState } from "react";
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";



function TicketDetailsPage() {
    const { ticketNumber } = useParams();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState();
    const navigate = useNavigate();
    // TODO - implement ticket details page

    useEffect(() => {
        fetchGetTicket(ticketNumber);

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
                                    : <h1>Ticket number: {ticket.number}</h1>}
                            </CardHeader>
                            <CardBody>
                                <CardTitle>Service: {ticket.service}</CardTitle>
                                <CardTitle>Status: {ticket.status}</CardTitle>
                                
                            </CardBody>

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