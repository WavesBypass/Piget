<?php
include 'db.php';

// Try a basic query to see if connection works
$result = $conn->query("SHOW TABLES");

if ($result) {
    echo "✅ Connected successfully!<br>Tables in database:<br>";
    while ($row = $result->fetch_row()) {
        echo "- " . $row[0] . "<br>";
    }
} else {
    echo "❌ Query failed: " . $conn->error;
}

$conn->close();
?>
