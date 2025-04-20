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
    $rating = isset($_POST['rating']) ? (int)$_POST['rating'] : 0;
    $feedback = isset($_POST['feedback']) ? trim($_POST['feedback']) : '';
    
    // Validate data
    if (empty($username)) {
        echo json_encode([
            'success' => false,
            'message' => 'Username is required'
        ]);
        exit;
    }
    
    if ($rating < 1 || $rating > 5) {
        echo json_encode([
            'success' => false,
            'message' => 'Rating must be between 1 and 5'
        ]);
        exit;
    }
    
    try {
        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO feedback (username, rating, feedback_text) VALUES (?, ?, ?)");
        $stmt->bind_param("sis", $username, $rating, $feedback);
        
        // Execute statement
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Feedback submitted successfully'
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
