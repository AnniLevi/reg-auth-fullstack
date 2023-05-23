## Simple registration website with implementation of a frontend and backend

### Features
- Complete implementation of backend (Django) and frontend (React) parts
- The website has 7 sections: Login, Register, Name, Contacts, Location, Result and Profile
- Registration process with several steps (forms), which are consecutive and mandatory
- At any point of the steps, the user can go back and forth, or logout
- The project is placed in Docker containers managed with docker-compose
- JWT authentication
- Swagger docs
- Unit tests
- Coverage
- Designed using Material UI

### Technologies
- Django Rest Framework
- React
- Docker

### Prerequisites
- Docker

### Usage
Start docker containers
(from root directory)
> docker-compose up -d --build

Coverage
(from backend directory)
> coverage run manage.py test discover

> coverage html

Swagger documentation
> backend_url/swagger

Admin interface
> backend_url/admin
