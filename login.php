<?php
session_start();
require_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // In a real application, you would verify the username and password
    // against stored values. Here we're just recording the login.
    
    $sql = "INSERT INTO users (name, email, login_time) VALUES (?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    
    // Using username for both name and email in this basic example
    // In a real app, you would retrieve the actual email from your database
    $stmt->bind_param("ss", $username, $username);
    
    if ($stmt->execute()) {
        $_SESSION['username'] = $username;
        echo "<script>alert('Login successful!');</script>";
        echo "<script>window.location.href = 'index.html';</script>";
    } else {
        echo "<script>alert('Error logging in: " . $conn->error . "');</script>";
        echo "<script>window.location.href = 'login.html';</script>";
    }
    
    $stmt->close();
    $conn->close();
}
?>