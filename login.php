<?php
session_start();
require 'db.php'; // your DB connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $remember = isset($_POST['remember_me']);

    if (empty($username) || empty($password)) {
        die('Please fill in all fields');
    }

    // fetch user from DB
    $stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // valid login
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $username;

        if ($remember) {
            // create a cookie valid for 30 days
            setcookie('piget_remember', session_id(), time() + (86400 * 30), "/"); 
        }

        // redirect to game main page (e.g., index.html)
        header('Location: index.html');
        exit;
    } else {
        die('Invalid username or password');
    }
}
?>
