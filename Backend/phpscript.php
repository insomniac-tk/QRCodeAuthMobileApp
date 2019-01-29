<?php   

$username = $_GET['username'];
$password = $_GET['password'];
$myfile = fopen("login_debug", "w") or die("Unable to open file!");

//initializing our variables
   //$username = filter_var($obj->Username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   //$password = filter_var($obj->Password, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
//connect with DB
$db = new mysqli("localhost","root","physics101","Ionic");
//queries and shit
try{
      $query = "SELECT * FROM Users WHERE Username='$username' AND Password='$password'";
      //Execute query
      $sql = $db->query($query);
      $n = $sql->num_rows;    
      if($n > 0){
                 echo json_encode(array("flag"=> 1 ,"Message" => "Yayyyy" , "Username" => $username));
                } 
      else{
            echo json_encode(array("flag"=>0));
      }
}catch (Exception $e) { 
      echo json_encode(array("Message" => "Something's not right.")); 
    } 
    fwrite($myfile,$User_id);
    fclose($myfile);
 mysqli_close($db);
?>
