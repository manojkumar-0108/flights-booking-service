# 📅 Flights Booking Service

🛒 **`Flexible Booking Management`**: This service facilitates flight bookings and reservations, providing users with an easy and efficient way to secure their travel plans.

💳 **`Robust Payment Processing`**: The service manages payments using secure and reliable methods, including idempotency keys for consistent and repeatable transactions.

🎫 **`Real-Time Availability Checks`**: It ensures that booking requests are processed based on real-time data, avoiding overbooking and ensuring accurate seat availability.

⏱️ **`Timely Booking Validation`**: The service validates booking requests against tight time constraints to prevent expired bookings and ensure smooth transactions.

🏛️ **`Efficient Queue Handling`**: Utilizes a message queue system for managing booking-related events and updates, ensuring smooth communication and timely processing.

📌 Note: This service is dependent on `flights`✈️ service.

## 🔍 Exploring the `Folder Structure`

The `src` folder houses all the actual source code of the project, excluding any tests. It's organized into various subfolders to keep the codebase clean and maintainable. Let's take a look inside the `src` folder:

- ⚙️ **`config`**: This folder contains configurations and setups for libraries or modules. For example:

  - **`server-config.js`**: Sets up `dotenv` for using environment variables in a cleaner fashion.

  - **`logger-config.js`**: Configuring a logging library for meaningful logs is also managed here.

  - **`config.json`**: Sets up `database` configuration, contains development, testing and production environment configuration such as
    - "username"
    - "password"
    - "database"
    - "host"
    - "dialect"

- 💼 **`controllers`**: Acts as the intermediary between incoming requests and the business layer:

  - Receives incoming requests and data, then passes them to the business layer.
  - Structures API responses based on the business layer's output before sending them to the client.

- ⚠️ **`errors`**: Contains custom error classes used across the project to handle exceptions.

- 🔍 **`middlewares`**: Intercepts incoming requests and allows for the implementation of:

  - Validators,
  - authenticators,
  - and other request interception logic.

- 🛠️ **`migrations`**: Houses database migration files to manage schema changes over time:

  - Creating new tables, altering existing tables, and adding indexes.

- 🧩 **`models`**: Contains JavaScript representations of database schemas.

- 🗃️ **`repositories`**: Provides logic for interacting with the database:

  - Houses all `raw` queries or `ORM` queries.

- 🌐 **`routes`**: Defines API routes for the application:

  - Registers routes with corresponding middlewares and controllers.

- 📝 **`seeders`**: Populates the database with default values for roles, such as customer, flight_company, and admin.

- 🔧 **`services`**: Manages core application functionality and business logic, communicating with the repository layer for database interaction.

- 🔧 **`utils`**: Contains utility functions, helper methods, enums, and error handlers:
  - These functions provide common support to the rest of the application.

## 🥇 Project Setup

1. ⬇️ **Download**: Grab this project template from GitHub and open it in your favorite text editor.

2. 📥 **Install Dependencies**: Navigate to the project folder and execute the following command to install all necessary dependencies:

   ```
   npm install
   ```

3. 🔌**Environment Configuration**: In the root directory, create a `.env` file and add the following environment variables:

   ```
    PORT=
    FLIGHT_SERVICE=
    RABBITMQ_URL=
    QUEUE_NAME=
   ```

   Here's an example configuration:

   ```
    PORT=4000
    FLIGHT_SERVICE='http://localhost:3000'
    RABBITMQ_URL='amqp://localhost'
    QUEUE_NAME='noti-queue'
   ```

4. 🚀 **Initialize Sequelize**: Navigate to the `src` folder and execute the following command to initialize Sequelize:

   ```
   npx sequelize init
   ```

   This will create a `config.json` file inside the `config` folder.

5. 🔌 **Configure Database**: Open `config.json` and update the database configuration:

   - Add your database username, password, and dialect (e.g., `mysql`, `mariadb`, `mssql`, etc.).

6. 💾 **Database Setup**: Populate the database by running the following commands:

   ```
   npx sequelize db:create
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

7. ⚡**Start the Server**: Begin running the server using this command:

   ```
   npm start
   ```

## ⚙️ Technologies Used

- **`Node.js`**: A versatile, server-side JavaScript runtime for building scalable and efficient applications.

- **`Express.js`**: A minimalist web framework for Node.js, providing robust routing and middleware capabilities.

- **`Git`**: A version control system for managing code changes and collaboration among team members.

- **`MSSQL`**: A relational database management system that offers robust data storage and querying capabilities.

- **`Sequelize ORM`**: An object-relational mapping tool for Node.js that simplifies database interactions and model management.

- **`Postman`**: A popular API development tool for testing, documenting, and collaborating on APIs.

- **`RabbitMQ`**: A robust message broker software that facilitates communication between different parts of the application by enabling asynchronous message passing and queuing. It supports advanced routing, distributed systems, and flexible message delivery, making it a reliable tool for managing events and notifications in the system.

## 📦 Packages and Their Usage

- **`amqplib`** 📬 : This package is a client for working with RabbitMQ, a popular message broker. It enables you to establish connections to RabbitMQ servers, manage message queues, publish messages, and consume messages from queues. It's essential for implementing asynchronous messaging and communication between different parts of your application.

- **`axios`** 🌐: A popular HTTP client for making requests to RESTful APIs and other web services. It provides a simple interface for sending GET, POST, PUT, DELETE, and other HTTP requests. With its promise-based syntax, axios makes it easy to handle asynchronous operations and manage responses.

- **`node-cron`** ⏰: A scheduling package that allows you to set up cron jobs in your Node.js applications. Cron jobs are tasks that run at specified intervals, such as every minute, hour, or day. This package is useful for automating repetitive tasks such as sending reminders, cleaning up data, or generating reports.

- **`dotenv`** 🔧: Loads environment variables from a `.env` file into `process.env`, allowing you to securely store sensitive information such as API keys and database credentials.

- **`express`** 🚀: A web application framework for Node.js that provides a minimalist structure for building APIs and web applications. It offers routing, middleware, and other essential features for building scalable server-side applications.

- **`http-status-codes`** 📜: A package providing easy access to standard HTTP status codes, which makes it convenient to set response statuses and handle different types of API responses.

- **`pluralize`** 🔀: A utility library for transforming singular words into plural and vice versa. This is used mainly to converting models name in plural form, which is a use case in identity reset function.

- **`sequelize`** 💽: An object-relational mapping (ORM) library for Node.js, allowing you to interact with your database using models and associations. It simplifies database operations and offers a high-level abstraction.

- **`sequelize-cli`** 🛠️: A command-line interface for Sequelize that provides commands for managing migrations, models, and other database-related tasks. It facilitates database schema changes and updates.

- **`tedious`** 💾: A Node.js driver for interacting with Microsoft SQL Server databases. It allows you to execute queries, manage transactions, and handle database connections.

- **`winston`** 🛡️: A logging library for Node.js that supports various log levels and transports (such as file or console logging). It helps you track and manage application logs effectively for debugging and monitoring purposes.

## Project Details

### 💾 Database Structure

The project uses a relational database to store data for various entities:

**DATABASE NAME** : `FlightsDB`

---

- **Bookings** 📅: Stores bookings information such as noOfSeats, totalCost, status, etc.

  ```
      +-------------------------+
      |        Bookings         |
      +-------------------------+
      |  id  -> (PK, Identity)  |
      |  flightId               |
      |  userId                 |
      |  status   (Check const) |
      |  noOfSeats  (Default)   |
      |  totalCosts             |
      |  createdAt              |
      |  updatedAt              |
      +-------------------------+

      [status] values IN: ['pending','cancelled','initiated','booked']
      [noOfSeats] default value : 1

  ```

---

### 🌐 API Calls

The API endpoints use different `HTTP` methods(`GET`, `POST`, `PUT`, `DELETE`) and follow `RESTful` design principles.

---

The project provides a variety of API endpoints for different functionalities:

- **API GATEWAY BASE ADDRESS** : `http:localhost:3001/`

- **Bookings**: Endpoints for flights bookings.

  | HTTP Method | Endpoint                    | Middleware                     | Controller            |
  | :---------- | :-------------------------- | :----------------------------- | :-------------------- |
  | GET         | `/api/v1/bookings/ping`     |                                | `PingCheckController` |
  | POST        | `/api/v1/bookings/`         | `validateCreateBookingRequest` | `createBooking`       |
  | POST        | `/api/v1/bookings/payments` |                                | `makePayment`         |

---

### 📨 Publish to Message Queue

- The Flights Bookings Service upon successfull booking, publish to message queues to send and handle notifications efficiently. The service establishes a connection with RabbitMQ and send messages to specific queues. These messages can include reminders and notifications related to flight bookings confirmations and schedules.

- When a new message is send to the queue, the reminder service will processes the message by extracting the relevant information and taking appropriate action, such as sending an email or SMS reminder to the customer.

---

## 💵 Payments Handling

The `makePayment` function efficiently manages payments by conducting thorough validations, updating booking statuses upon successful payment, sending booking confirmation messages, and ensuring appropriate error handling for various scenarios.

### 📋 Key Steps:

1. **Transaction Initialization**

   - The function starts by initializing a database transaction using `sequelize.transaction()`.
   - If any operation fails during the payment process, the transaction is rolled back to maintain data integrity.

2. **Booking Validation**

   - Before processing payment, the function fetches booking details using `bookingRepository.get(data.bookingId, transaction)`.
   - If the booking status is already `CANCELLED` or `BOOKED`, an error is thrown to prevent further processing and avoid double payments or payments on cancelled bookings.

3. **Payment Time Validation**

   - The function checks whether the booking has expired by comparing the booking time with the current time.
   - If the booking has expired (exceeds a 5-minute deadline), the booking is cancelled using the `cancelBooking` function and an error is thrown.

4. **Amount Validation**

   - The function verifies whether the payment amount matches the booking's total cost.
   - If the payment amount does not match the expected total cost, an error is thrown, indicating a payment failure due to incorrect amounts.

5. **User Validation**

   - The function ensures that the user making the payment matches the user associated with the booking to prevent unauthorized payments.
   - If the user IDs do not match, an error is thrown.

6. **Payment Processing**

   - Once all validations pass, the function assumes the payment is successful and updates the booking status to `BOOKED`.
   - The function also retrieves flight details using the `ServerConfig.FLIGHT_SERVICE` and `axios.get`.

7. **Message Queue Handling**

   - After confirming the booking, the function sends a confirmation message to the message queue using `MessageQueue.sendData`.
   - The message contains booking confirmation details and is sent to the recipient's email.

8. **Error Handling**

   - If an error occurs during payment processing, the transaction is rolled back.
   - If the error is an instance of `AppError`, it is thrown for further handling.
   - Otherwise, an `InternalServerError` is thrown, indicating a payment failure.

This structured approach ensures that the payment process is robust, secure, and reliable.

---

### ⚠️ Error Handling

Error handling is a crucial aspect of the project, ensuring smooth operation and useful feedback for clients:

- **Custom Error Classes**: The project uses custom error classes like `BaseError`, `BadRequestError`, `InternalServerError`, and `AppError` to manage different types of errors and return appropriate HTTP status codes.

- **Middleware**: The `errorHandler` middleware function intercepts and handles exceptions by identifying the type of error and responding accordingly. It is executed just before express default error handler runs

- **Structured Responses**: Errors are structured as JSON objects with properties such as status code, message, and error explanation. This consistent response format simplifies troubleshooting for clients.

- **Default Handling**: If an unknown error occurs, the middleware throws a custom `InternalServerError` and log the error in `Logger`.

- **Logging**: All errors are logged for monitoring and troubleshooting purposes, enabling quick identification and resolution of problems.

The combination of these features ensures reliable and user-friendly error handling throughout the application.

---
