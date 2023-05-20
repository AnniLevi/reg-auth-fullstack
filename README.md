## Simple registration website with implementation of a frontend and backend

### Features
- Complete implementation of backend (Django) and frontend (React) parts
- The website has 6 sections: Register, Login, Step1, Step2, Step3, and Inside
- Registration process with several steps (forms), which are consecutive and mandatory
- At any point of the steps, the user can go back and forth, or logout
- The project is placed in Docker containers managed with docker-compose
- JWT authentication
- Swagger docs
- Unit tests
- Coverage

### Technologies
- Django Rest Framework
- React
- Docker

### Prerequisites
- Docker

### Usage
Start docker containers
> docker-compose up -d --build

Swagger documentation
> /swagger
