# <u>Blogz</u>

## Overview

This project is a simple blogging platform where users can create, view, and manage blog posts. The platform is built using the following technologies:


Live on vercel: https://blogz-ashen.vercel.app/
Backend on render: https://blogz-joww.onrender.com/


### Prerequisites

- Node.js (>=14.x)
- PostgreSQL
- Yarn or npm

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/hassanmodev/blogz
    cd server
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Set up environment variables:
    Create a `.env` file in the `server` directory and add the following variables:
    ```env
    DATABASE_URL=postgresql://username:password@localhost:5432/blogz
    JWT_SECRET=your_jwt_secret
    ```

4. Run database migrations:
    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

5. Start the backend server:
    ```bash
    yarn run dev
    ```

### Frontend Setup

1. Navigate to the `client` directory:
    ```bash
    cd blogz-ui
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Start the frontend development server:
    ```bash
    yarn start
    ```

## Approach

### Frontend

The frontend is built using React.js with TypeScript for type safety. State management is handled using Redux Toolkit. The UI is designed to be responsive and user-friendly.

### Backend

The backend is built using Nestjs. PostgreSQL is used as the database, and Prisma is used for ORM. JWT-based authentication is implemented for secure user login and registration.

### Deployment

The project was deployed on Render for the backend and vercel for the frontend.