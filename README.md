
# EduShare

Welcome to EduShare, a social media platform dedicated to sharing school notes. EduShare leverages the power of Spring for the backend and React for the frontend, creating a robust and user-friendly experience for students worldwide. This platform is designed to facilitate the exchange of school notes, allowing users to access a wealth of knowledge for their academic needs.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setting Up the Database](#setting-up-the-database)
  - [Setting Up Clodinary](#setting-up-cloudinary)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [License](#license)

## Introduction

EduShare aims to democratize access to educational materials by enabling a community where students can share and access school notes effortlessly. Built with Spring and React, and running on a PostgreSQL database, EduShare offers a seamless experience for users looking to enhance their learning.

## Installation

### Prerequisites

Before installing EduShare, ensure you have the following installed on your system:

- Java JDK 11 or later
- Node.js and npm
- PostgreSQL

### Setting Up the Database

1. Install PostgreSQL and create a new database for EduShare.
2. Create the `env.properties` file in the backend's `CapstoneProject` directory. 
3. Update the following properties with your database details:

   ```properties
   PG_USERNAME={PG_USERNAME}
   PG_PASSWORD={PG_PASSWORD}
   PG_DB_NAME={PG_DB_NAME}
   ```

### Setting Up Cloudinary

1. In the same `env.properties` file, update the following properties with your Cloudinary details:

   ```properties
   CLOUDINARY_NAME={CLOUDINARY_NAME}
   CLOUDINARY_API_KEY={CLOUDINARY_API_KEY}
   CLOUDINARY_SECRET={CLOUDINARY_SECRET}
   ```

### Running the Application

1. **Start the Backend:**

   Navigate to the root directory of the Spring project and run:

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will start on port 3000.

2. **Start the Frontend:**

   Navigate to the `front-end/Capstone_Frontend` directory inside the project and run:

   ```bash
   npm install
   npm run dev
   ```

   The frontend development server will start on port 5173. Access it by going to `http://localhost:5173` in your web browser.

## Usage

After starting both the backend and frontend servers, users can access EduShare through their web browser by navigating to `http://localhost:5173`. From there, users can register an account, log in, and start sharing or browsing school notes.

## Features

EduShare offers a variety of features designed for easy sharing and accessing educational materials:

- User registration and authentication
- Ability to post, edit, and delete notes
- Search functionality for finding specific notes
- Categories for organizing notes by subject

## Dependencies

- Spring Boot for the backend
- React and Vite for the frontend
- PostgreSQL for the database
- Cloudinary for storing images

## Configuration

Before running the application, ensure you configure the `env.properties` file with your PostgreSQL database and Cloudinary information. This includes the database name, user, and password.

## License

EduShare is free to use for personal purposes. For more details, see the LICENSE file.
