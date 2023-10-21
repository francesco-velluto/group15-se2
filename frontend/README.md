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

## Pages

The server provides a web interface that can be used to interact with the system.

The following pages are available:

### Request Service Page

This page shows the costumer a list of all available services and lets them request a new ticket for a service.

- **URL**: `/` or `/services` (by default, the homepage redirects to this page)

### Ticket Details Page

This page shows the costumer the details of a ticket.

- **URL**: `/tickets/:ticketNumber` where `:ticketNumber` is the number of the ticket