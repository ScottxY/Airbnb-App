## Project Description: Airbnb Search App

This project is an Airbnb search application built using Node.js, Express, MySQL, and EJS templates. The application allows users to search for Airbnb listings based on various criteria such as the number of bedrooms, maximum number of guests, price per night, and amenities. The project includes the following key components:

### Key Components

1. **Server Configuration (`server.js`)**:
   - Sets up an Express server and configures it to use EJS as the templating engine.
   - Defines routes for rendering different pages and handling search queries.
   - Connects to the MySQL database to fetch data based on user input.

2. **Database Configuration (`config.js`)**:
   - Configures the MySQL connection with the necessary credentials.
   - Exports functions to create and manage database connections.

3. **Database Queries (`queries.js`)**:
   - Contains functions to execute SQL queries for fetching listings, amenities, and other related data.
   - Uses parameterized queries to prevent SQL injection and ensure safe database operations.

4. **Views (EJS Templates)**:
   - index.ejs: The main page where users can input their search criteria.
   - listings.ejs: Displays multiple listings that match the search criteria.
   - listing.ejs and listing2.ejs: Display detailed information about a single listing, including amenities and host details.
   - null.ejs: Displays a message when no listings match the search criteria.

### Features

- **Search Functionality**:
  - Users can search for listings based on the number of bedrooms, maximum number of guests, price per night, and selected amenities.
  - The application supports both single listing and multiple listings search.

- **Dynamic Dropdowns**:
  - The application dynamically populates state and city dropdowns based on the selected state using AJAX requests.

- **Detailed Listings**:
  - Each listing page provides detailed information about the listing, including the host's name, location, number of rooms, maximum guests, price per night, and amenities.

### Usage

1. **Home Page**:
   - Users can enter search criteria and select amenities to find listings.

2. **Search Results**:
   - If listings are found, they are displayed on the listings.ejs or listing.ejs pages.
   - If no listings match the criteria, the null.ejs page is displayed.

3. **Detailed Listing Page**:
   - Users can view detailed information about a specific listing, including amenities and host details.

### Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   node server.js
   ```

3. **Access the Application**:
   - Open a web browser and navigate to `http://localhost:3000`.

This project provides a comprehensive solution for searching and displaying Airbnb listings based on user-defined criteria, leveraging the power of Node.js, Express, MySQL, and EJS templates.
