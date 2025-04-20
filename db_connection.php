<?php
// Database connection parameters
$servername = "localhost";
$username = "root";     // Default WAMP username
$password = "";         // Default WAMP password (empty)
$dbname = "government_desk";

// Create connection with error handling
try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8mb4 for proper encoding and full Unicode support
    if (!$conn->set_charset("utf8mb4")) {
        throw new Exception("Error setting UTF-8 charset: " . $conn->error);
    }
    
    // Enable error reporting (optional, but recommended during development)
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    
} catch (Exception $e) {
    // Log the error or handle it appropriately
    error_log("Database Connection Error: " . $e->getMessage());
    die("Sorry, there was a problem connecting to the database.");
}
?>
