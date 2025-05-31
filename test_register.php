<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "dbaas-db-2345187-do-user-22678364-0.e.db.ondigitalocean.com";
$username = "doadmin"; // double-check your actual user here
$password = "AVNS_skBZ06QKHsv48PN5TRz";
$database = "defaultdb";
$port = 25060;

// Create connection
$conn = new mysqli($servername, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully<br>";

// Insert a test user with fixed data
$sql = "INSERT INTO users (username, password) VALUES ('testuser', 'testpass')";
if ($conn->query($sql) === TRUE) {
    echo "Test user inserted successfully";
} else {
    echo "Error inserting test user: " . $conn->error;
}

$conn->close();
