# Backend server documentation

## Installation

Make sure you have Node.js and npm installed. Then run `npm install`. This will install all the dependencies.

## Running the server

Run `npm start` to start the server. It will listen on http://localhost:3000 by default.

## API calls

In `/src/api/BackendInterface.js` there is the template for the API calls. The server will respond with a JSON object. Refer to the documentation of the backed for more information on data returned.

Below, an example of how to use the API is shown:

```javascript
import * as BackendInterface from "../api/BackendInterface";

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
```

- ### getAllAvailableServices
    It is used to get all available services.

    - Parameters: none
    - Return value: 

        ```javascript
        [
            {id: 1, tag_name: "Postal Stamps"},
            {id: 2, tag_name: "Money Orders"},
            {id: 3, tag_name: "P.O. Box Services"}
        ]
        ```
        It can also return an error in case of failure on the backend side

- ### createNewTicket
    It is used to create a new ticket linked to a specific service. It is basically a post call to the server, sending the service to request.

    - Parameters: `serviceId`
    - Return value: 

        ```javascript
        { ticketNumber: string, service: string, status: string, estimatedTime: number }
        
        Example:

        {ticketNumber: "4", service: "Postal Stamps", status: "waiting", estimatedTime: 45}
        ```
        It can also return an error in case of failure on the backend side or a wrong service type requested

## Pages

The server provides a web interface that can be used to interact with the system.

The following pages are available:

### Request Service Page

This page shows the costumer a list of all available services and lets them request a new ticket for a service.

- **URL**: `/` or `/services` (by default, the homepage redirects to this page)

### Ticket Details Page

This page shows the costumer the details of a ticket.

- **URL**: `/tickets/:ticketNumber` where `:ticketNumber` is the number of the ticket


## Components

- ### RequestServiceType

    This is the main component, presented when the application starts. It contains the list of services available at the moment, taken from the DB, by calling the `getAllAvailableServices` function.

    Each service is shown using the `ServiceCard` component
- ### ServiceCard

    This component is made of an image and the name of the service. By clicking on it, the `newTicket` function is triggered. When the function has returned with the ticket number, the application goes to the `/tickets/:ticketNumber` route.

- ### TicketDetailsPage

    This component shows all information about a single ticket (ticket number, service name and a waiting time estimation)