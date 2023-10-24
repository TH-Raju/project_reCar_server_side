# Recar - Buy and Sell Used Cars

Recar is a web application built with Node.js and Express.js, following the MVC (Model-View-Controller) pattern. It provides a platform for users to buy and sell used cars. Whether you're looking to sell your old car or find a great deal on a pre-owned vehicle, Recar has you covered.

Visit our website: [Recar](https://resale-handing.web.app/)

## Table of Contents

- [Features](#features)
  - [Prerequisites](#prerequisites)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
  - [Category Routes](#category-routes)
  - [Booking Routes](#booking-routes)
  - [Product Routes](#product-routes)
  - [Payment Routes](#payment-routes)
  - [JWT Authentication](#jwt-authentication)
- [License](#license)

## Features

- **User Management**: Create, delete, and update user profiles. Admins can access user details using email or user ID.

- **Category Management**: Browse available car categories and view individual categories.

- **Booking System**: Make and manage bookings for cars.

- **Product Listings**: View a list of cars available for sale, create new car listings, and view individual car details.

- **Payment Integration**: Securely make payments and create payment intents for car purchases.

- **JWT Authentication**: Protect routes and ensure secure access to specific functionalities.

### Prerequisites

To run this project, you need to have the following software installed on your system:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure it's running)

# API Routes

- User routes

  - /users (GET)
  - /users (POST)
  - /users/:id (DELETE)
  - /users/admin/:email (GET)
  - /users/seller/:email (GET)
  - /users/admin/:id (PUT)

- Categoriy routes

  - /categoriy (GET)
  - /categoriy (PUT)
  - /categoriy/:id (get Single)

  - /categoriyProduct (GET)

- Booking routes

  - /bookings (GET)
  - /bookings/:id (GET Single)
  - /bookings (POST)
  - /bookings/:id (DELETE)

- Product routes

  - /product (GET)
  - /product (POST)
  - /product/:id (GET Single)

- Payment routes

  - /payment (POST)
  - /create-payment-intent (POST)

- JWT
  - /jwt (GET)

## License

- This project is licensed under the [TH-Raju](https://tofajjol-hosen-raju.web.app/).
