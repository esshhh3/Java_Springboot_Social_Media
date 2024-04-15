# Full-Stack Social Media Application

## Overview

The Full-Stack Social Media Application is a web-based platform built using Spring Boot for the backend and React for the frontend. This application provides a comprehensive solution for users to interact with each other through various social features including user authentication, posting, commenting, liking, adding stories, real-time chatting, and more. The backend is implemented using Spring Boot with WebSocket support for real-time communication, while the frontend is developed using React with Redux for state management.

## Images of the application

<img src="https://media.licdn.com/dms/image/D562DAQGH956QITX3bw/profile-treasury-image-shrink_1280_1280/0/1713162198603?e=1713769200&v=beta&t=X5Lu53Fy_nGJakkNJuUy3K6p7ezLnQiV0w2DKx4V2lM" />
<img src="https://media.licdn.com/dms/image/D562DAQEMppb-yGrHSQ/profile-treasury-image-shrink_800_800/0/1713162179008?e=1713769200&v=beta&t=e3C4GLoQ1H0YNG7UoUtvKkmEpjVlV8tGQ6iDB87aETc" />

## Backend Dependencies (Spring Boot)

### Project Structure
- **springboot-social**: Backend project directory.

### Maven Dependencies
- **spring-boot-starter-websocket**: Provides WebSocket support for real-time communication.
- **spring-boot-starter-data-jdbc**: Starter for JDBC-based data access.
- **spring-boot-starter-data-jpa**: Starter for using Spring Data JPA with Hibernate.
- **spring-boot-starter-web**: Starter for building web, including RESTful, applications using Spring MVC.
- **spring-boot-starter-security**: Starter for using Spring Security.
- **spring-boot-devtools**: Provides development-time support for reloading changes.
- **mysql-connector-j**: MySQL JDBC driver for database connectivity.
- **lombok**: Library to reduce boilerplate code.
- **jjwt-api**: API for JSON Web Tokens (JWT) support.
- **jjwt-impl**: Implementation of JWT for token generation and parsing.
- **jjwt-jackson**: Jackson implementation for JSON processing with JWT.
- **spring-boot-starter-test**: Starter for testing Spring Boot applications.

### Maven Plugins
- **spring-boot-maven-plugin**: Plugin for running Spring Boot applications from Maven.

## Frontend Dependencies (React)

### Project Structure
- **client**: Frontend project directory.

### NPM Dependencies
- **@emotion/react** & **@emotion/styled**: CSS-in-JS library for styling components.
- **@mui/icons-material** & **@mui/material**: Material-UI components library for UI design.
- **@reduxjs/toolkit**: Redux toolkit for state management.
- **@stomp/stompjs**: STOMP protocol library for WebSocket communication.
- **axios**: Promise-based HTTP client for making API requests.
- **formik**: Form library for React forms validation.
- **react**, **react-dom**: Core React libraries.
- **react-redux**: Official React bindings for Redux.
- **react-router-dom**: DOM bindings for React Router.
- **react-stomp**: React library for STOMP protocol.
- **redux**, **redux-thunk**: State management libraries for React.
- **sockjs-client**, **stompjs**: JavaScript libraries for WebSocket communication.
- **yup**: JavaScript schema builder for form validation.

### Dev Dependencies
- **@types/react** & **@types/react-dom**: TypeScript types for React.
- **@vitejs/plugin-react**: Vite plugin for React support.
- **autoprefixer**, **postcss**, **tailwindcss**: CSS preprocessing tools.
- **eslint** & **eslint-plugin-react**: Linting tools for JavaScript and React code.
- **eslint-plugin-react-hooks**, **eslint-plugin-react-refresh**: ESLint plugins for React hooks and refresh.
- **vite**: Next-generation frontend tooling for React.

## Features

- **User authentication**: JWT-based login and registration.
- **Posting**: Create, edit, and delete posts.
- **Commenting**: Add comments to posts.
- **Liking**: Like and unlike posts.
- **Adding Stories**: Share short-lived visual stories.
- **Real-time chatting**: Chat with other users in real-time using WebSocket.
- **Reels**: Upload and share short video clips (Reels).
- **Profile page**: View and edit user profiles.
- **Follow user**: Follow and unfollow other users for updates.

## Database

The application uses MySQL as the relational database management system. Spring Data JPA is utilized for easy and efficient data access and manipulation.

## Setup

1. **Backend Setup**:
   - Navigate to the `springboot-social` directory.
   - Run `mvn spring-boot:run` to start the Spring Boot backend.

2. **Frontend Setup**:
   - Navigate to the `client` directory.
   - Run `npm install` to install frontend dependencies.
   - Run `npm run dev` to start the React frontend.

3. **Database Configuration**:
   - Ensure MySQL is installed and running.
   - Configure database connection properties in `application.properties` file.
   - Run provided SQL scripts to create necessary tables and populate initial data.

## Usage

Upon launching the application, users can perform various social interactions such as:
- Login and register for an account.
- Create, edit, and delete posts.
- Comment on posts and like them.
- Share short-lived visual stories.
- Upload and share short video clips (Reels).
- View and edit user profiles.
- Follow and unfollow other users.
- Chat with other users in real-time.

## Contribution

We welcome contributions from the community to enhance the functionality and usability of the Full-Stack Social Media Application. If you're interested in contributing, please follow the steps below:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.
