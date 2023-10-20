# Backend server documentation

## Installation

Make sure you have Node.js and npm installed. Then run `npm install`. This will install all the dependencies.

## Running the server

Run `node index` to start the server. It will listen on port 3000.

## API

The server provides APIs that can be used to interact with the system and eventually the database.

The following APIs are available:

### GET /api/services

Returns a list of all the available services.

- **Parameters**: none
- **Body**: none
- **Response**:
  - _HTTP 500 Internal Server Error_: if an error occurs
  - _HTTP 200 OK_: if the request is successful
    - **_Body_**: `{ services: [ { id: number, name: string } ] }` where `id` is the unique identifier of the service and `name` is the name of the service

### POST /api/tickets

Requests a new ticket for service and return the ticket number assigned.

- **Parameters**: none
- **Body**:
  - **_Body_**: `{ serviceId: number }` where `serviceId` is the unique identifier of the service
- **Response**:
  - _HTTP 404 Not Found_: if the service with the specified `serviceId` does not exist
  - _HTTP 500 Internal Server Error_: if an error occurs
  - _HTTP 200 OK_: if the request is successful
    - **_Body_**: `{ ticketNumber: number }` where `ticketNumber` is the number of the ticket assigned

### GET api/tickets/:ticketNumber

Returns the details of the ticket with the specified number.

- **Parameters**:
  - `ticketNumber`: the ticket number of the ticket
- **Body**: none
- **Response**:
  - _HTTP 404 Not Found_: if the ticket with the specified `ticketNumber` does not exist
  - _HTTP 500 Internal Server Error_: if an error occurs
  - _HTTP 200 OK_: if the request is successful
    - **_Body_**: `{ ticketNumber: number, service: string, status: string, creationTime: string, estimatedTime: string }` where `ticketNumber` is the number of the ticket, `service` is the name of the related service, `status` is the status of the ticket, `creationTime` is the time when the ticket was created and `estimatedTime` is the estimated time of the ticket