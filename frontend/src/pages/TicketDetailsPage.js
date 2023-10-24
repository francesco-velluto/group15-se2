import { useParams } from "react-router-dom";

import * as BackendInterface from "../api/BackendInterface";

function TicketDetailsPage() {
    const { ticketNumber } = useParams();
    //const [ticket, setTicket] = useState({});
    // TODO - implement ticket details page

    
       // EXAMPLE OF API CALL USAGE:

        BackendInterface.getTicketDetails(ticketNumber)
            .then((response) => {
                if(response.status === 200)
                    return response.json();

                // handle error
                throw new Error("Error in response");
            }).then((data) => {

                // handle data
                console.log(data);
            }).catch((error) => {
                // handle error
                console.log(error);
            });
     

    return (
        <div>
            <h1>Ticket Details Page</h1>
        </div>
    );
}

export default TicketDetailsPage;