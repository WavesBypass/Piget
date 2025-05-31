<?php
$host = 'localhost';  // or your DB host (DigitalOcean managed DB host)
$db   = 'piget_db';   // your database name
$user = 'piget_user'; // your database user
$pass = 'your_password'; // your DB password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (Exception $e) {
    error_log($e->getMessage());
    exit('Database connection failed'); // hide error from users
}
?>
