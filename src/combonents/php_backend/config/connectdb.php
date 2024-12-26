  <?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $db ="dacn";


  // $servername = "localhost";
  // $username = "lav20242_flower";
  // $password = "ZRnHVcPj3TTMq67TV36T";
  // $db ="lav20242_flower";
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query('set names utf8');
    // FetchAll(Fetch_Assoc) mãng
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }
  
  ?>
  