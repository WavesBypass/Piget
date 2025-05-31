<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "POST received. Username: " . htmlspecialchars($_POST['username']);
} else {
    echo "Send a POST request to this page.";
}
?>
