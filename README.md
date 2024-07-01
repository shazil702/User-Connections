# User-Connections

## Overview

User-Connections is a web application built using Django for the backend and React for the frontend. The application allows users to manage their profiles, add friends, and perform CRUD operations on user data.

## Features

- User authentication (Login, Logout)
- Manage user profiles
- Add and remove friends
- CRUD operations on users
- Responsive and stylish UI

## Technologies Used

- **Backend**: Django, Django REST Framework, JWT token for Authentication
- **Frontend**: React, Tailwind CSS
- **Database**: PostgreSQL
- **Deployment**: Gunicorn, Nginx

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL
- Git
- A GitHub account with a Personal Access Token

### Installation

#### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/shazil702/User-Connections.git
    cd User-Connections
    ```

2. Set up a virtual environment:

    ```bash
    python -m venv env
    source env/bin/activate  # On Windows, use `env\Scripts\activate`
    ```

3. Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Configure the PostgreSQL database:

    - Create a database and user in PostgreSQL.
    - Update the `DATABASES` setting in `settings.py` with your database credentials.

5. Apply migrations:

    ```bash
    python manage.py migrate
    ```

6. Create a superuser:

    ```bash
    python manage.py createsuperuser
    ```

7. Run the development server:

    ```bash
    python manage.py runserver
    ```

#### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## Usage

1. Open your web browser and go to `http://127.0.0.1:8000` for the backend and `http://localhost:3000` for the frontend.
2. Sign in using the superuser credentials you created.
3. Add, edit, and delete users and manage their friends.

## Contact

If you have any questions or feedback, please feel free to reach out.

- **Email**: shazilva2@gmail.com
- **GitHub**: [shazil702](https://github.com/shazil702)
