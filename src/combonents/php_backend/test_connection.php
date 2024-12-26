<?php
include("config/connectdb.php");

// If connection is successful, return a success message
if ($conn) {
    echo json_encode(["message" => "Database connection successful."]);
} else {
    echo json_encode(["error" => "Database connection failed."]);
}
?>
