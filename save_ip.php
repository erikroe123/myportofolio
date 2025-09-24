<?php

$servername = "localhost"; 
$username = "id22277099_hayo_apa"; 
$password = "Qwerty1!"; 
$dbname = "id22277099_hai"; 

// Membuat koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mendapatkan data POST
$postData = file_get_contents("php://input");
$data = json_decode($postData, true);
$ip_address = $data['ip'];

// Menyimpan alamat IP ke dalam database
$sql = "INSERT INTO ip_addresses (ip_address) VALUES ('$ip_address')";

if ($conn->query($sql) === TRUE) {
    echo "Alamat IP berhasil disimpan.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Menutup koneksi database
$conn->close();
?>
