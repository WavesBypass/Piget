<?php
session_start();
require 'db.php'; // file to connect to MySQL - I'll provide below

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // sanitize input
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        die('Please fill in all fields');
    }

    // check if username already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        die('Username already taken');
    }

    // hash password securely
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // insert new user
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->execute([$username, $passwordHash]);

    // redirect to login page
    header('Location: login.html');
    exit;
}
?>
