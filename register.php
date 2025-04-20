<?php
session_start();
require_once 'db_connection.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password']; // In a real app, you should hash this
    
    // Insert user data into database
    $sql = "INSERT INTO users (name, email, login_time) VALUES (?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $fullname, $email);
    
    if ($stmt->execute()) {
        // Registration successful
        echo "<script>alert('Registration successful! You can now log in.');</script>";
        echo "<script>window.location.href = 'login.html';</script>";
    } else {
        // Registration failed
        echo "<script>alert('Registration failed: " . $conn->error . "');</script>";
        echo "<script>window.location.href = 'register.html';</script>";
    }
    
    $stmt->close();
    $conn->close();
}
?>
