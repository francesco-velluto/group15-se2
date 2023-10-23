import { useEffect, useState } from "react";
import { getAllAvailableServices } from "../api/BackendInterface";
import { Card, Container, Row } from "react-bootstrap";

function RequestServicePage() {
    const [services, setServices] = useState([]);

    const fetchServicesList = async () => {
        try {
            const servicesList = await getAllAvailableServices();
            setServices(servicesList);
        } catch (err) {
            setServices([]);
            console.log("error: " + err);
        }
    };

    useEffect(() => {
        fetchServicesList();
    }, []);

    return (
        <div>
            <main className="main-content">
                <Row className="title-navbar text-center py-3">
                    <h1>Office Queue Management System</h1>
                </Row>
                <Container className="card-container">
                    <Row xs={1} md={2} className="g-4 mt-3 mx-4 justify-content-center">
                        {services.map((s) => (
                            <ServiceCard key={s.id} serviceTag={s.tag_name} />
                        ))}
                    </Row>
                </Container>
            </main>
        </div>
    );
}

function ServiceCard(props) {

    const createNewTicket = async () => {
        // TO-DO: post a new ticket request and redirect to the ticket details page
    }

    return (
        <Card style={{ width: "18rem" }} id="service-card" className="text-center m-4" onClick={createNewTicket}>
            {/* temporary image */}
            <Card.Img className="card-icon" variant="top" src="logo192.png" />

            <Card.Body>
                <Card.Title>{props.serviceTag}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default RequestServicePage;
