<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers for JSON response
header('Content-Type: application/json');

// Include database connection file
require_once 'connection.php';

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    
    // Validate data
    if (empty($username) || empty($phone)) {
        echo json_encode([
            'success' => false,
            'message' => 'Username and phone number are required'
        ]);
        exit;
    }
    
    // Validate phone format (basic validation)
    if (!preg_match('/^[0-9\+\-\(\) ]{7,20}$/', $phone)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid phone number format'
        ]);
        exit;
    }
    
    try {
        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO callback (username, phone) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $phone);
        
        // Execute statement
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Callback request submitted successfully'
            ]);
        } else {
            throw new Exception($stmt->error);
        }
        
        // Close statement
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}

// Connection will be closed automatically when the script ends
?>