<?php
$host = 'dbaas-db-2345187-do-user-22678364-0.e.db.ondigitalocean.com';
$port = 25060;
$db   = 'defaultdb';
$user = 'doadmin';
$pass = 'AVNS_skBZ06QKHsv48PN5TRz';

// Enable SSL connection
$conn = new mysqli($host, $user, $pass, $db, $port, '/etc/ssl/certs/ca-certificates.crt');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
