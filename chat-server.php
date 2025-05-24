<?php
// Run with: php chat-server.php
set_time_limit(0);
ob_implicit_flush();

$address = '0.0.0.0';
$port = 8080;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    die("socket_create() failed: " . socket_strerror(socket_last_error()) . "\n");
}

socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

if (!socket_bind($socket, $address, $port)) {
    die("socket_bind() failed: " . socket_strerror(socket_last_error($socket)) . "\n");
}

if (!socket_listen($socket)) {
    die("socket_listen() failed: " . socket_strerror(socket_last_error($socket)) . "\n");
}

$clients = [$socket];

function sendMessage($msg, $clients, $sender) {
    foreach ($clients as $client) {
        if ($client != $sender && $client != $clients[0]) {
            socket_write($client, $msg, strlen($msg));
        }
    }
}

echo "Server started on $address:$port\n";

while (true) {
    $read = $clients;
    $write = null;
    $except = null;

    $numChangedSockets = socket_select($read, $write, $except, null);

    if ($numChangedSockets === false) {
        echo "socket_select() failed: " . socket_strerror(socket_last_error()) . "\n";
        break;
    }

    foreach ($read as $read_socket) {
        if ($read_socket === $socket) {
            $newsock = socket_accept($socket);
            if ($newsock) {
                $clients[] = $newsock;
                $welcome = "New client connected.\n";
                socket_write($newsock, $welcome, strlen($welcome));
                echo $welcome;
            }
        } else {
            $data = @socket_read($read_socket, 2048, PHP_NORMAL_READ);
            if ($data === false || $data === '') {
                $index = array_search($read_socket, $clients);
                if ($index !== false) {
                    unset($clients[$index]);
                }
                socket_close($read_socket);
                echo "Client disconnected.\n";
            } else {
                $data = trim($data);
                if ($data) {
                    echo "Received: $data\n";
                    sendMessage($data . "\n", $clients, $read_socket);
                }
            }
        }
    }
}

// No socket_close here because server runs indefinitely