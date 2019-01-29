<?php

// Debug File
$myfile = fopen("qr_back_debug", "w") or die("Unable to open file!");
$link = mysqli_connect("localhost","root","physics101","Ionic") or die("Boooo");
//get JSON data
try
{
  $tx_id = $_GET['id']; // qr code text!!!!!!
  fwrite($myfile,$tx_id);   
  $Username = $_GET['username'];  // the guy scanning ,used for class

  // -------------- LOGIN  ----------------------
  $Query = mysqli_query($link,"SELECT Class FROM Users WHERE Username='$Username'");
  $Result= mysqli_fetch_assoc($Query);
  $UserClass = $Result['Class'];
  fwrite($myfile,"User class:".$UserClass."\n");
  mysqli_free_result($Result);
 
// -----------------------------------------------------------
// -------------- Participant Details  --------------
  $Query = mysqli_query($link,"SELECT * FROM txusers WHERE tx_id = '$tx_id' ");
  $Result = mysqli_fetch_assoc($Query);
  $P_enr = $Result['enrollment_no'];
  $P_name = $Result['firstname']." ".$Result['lastname'];
  $P_clgid = $Result['college'];
  mysqli_free_result($Result);
  $Query = mysqli_query($link,"Select name from colleges where id='$P_clgid' ");
  $Result = mysqli_fetch_assoc($Query);
  $P_clg = $Result['name']; 
  mysqli_free_result($Result); // good bois always free result 
  $Details = array("flag"=> 1, "TX_ID" => "TX_".$tx_id , "Enrollment_no"=>$P_enr,"Name" => $P_name , "College" => $P_clg);
   fwrite($myfile,$Details);
// -------------- Participant Details Fetched --------------

// ---------   IsPresent?  ---------------
   $Query = mysqli_query($link,"SELECT In_College FROM txusers WHERE tx_Id = '$tx_id'"); 
   $Result = mysqli_fetch_assoc($Query);
   $IsPresent = $Result['In_College'];
   mysqli_free_result($Result);  // good boi
// ---------   IsPresent?  ---------------

// ------------- Registration Desk -----------------
  if($UserClass == 1)
  {
    	$Query = mysqli_query($link,"UPDATE txusers SET In_College=1 WHERE tx_id ='$tx_id'");
     	echo json_encode($Details);
  }
// ------------- Registration Desk -----------------
  
  if($UserClass == 2)
    {
       $event_flag  = 0;
       $clg_flag =  $IsPresent;
       $Query =  mysqli_query($link,"Select event_id from events where  event_co = '$Username' OR event_coco = '$Username' ");
       $Result = mysqli_fetch_assoc($Query); 
       $event_id = $Result['event_id'];// Event of the guy scanning da sheet ,nomsayin ?
       fwrite($myfile,"Aaa".$event_id."\n");
       mysqli_free_result($Result);
       
       $Query = mysqli_query($link,"Select event_id from master where group_members='$tx_id' ");
        //iterate over user's events and see if any one match that of the scanner(co / coco) 
       while($Result = mysqli_fetch_assoc($Query))
       {
          fwrite($myfile,$Result['event_id']."\n");
            if($Result['event_id'] == $event_id)
             {
                $event_flag=1;   
                break;
             }
       }
    
    // let's see if the fockin flags were set or not
    fwrite($myfile,"IsPresent :".$clg_flag."\n"."Event flag: ".$event_flag);
    mysqli_free_result($Result);
      /* 
        IsPresent Event  IsHead
          0       0       0          Piss off mate.
          0       1       0           Same ^
          1       0       0           
          1       0       0
      */

      if($clg_flag==1)
      {
        if($event_flag == 1)
        {
	       
            $Query = mysqli_query($link,"UPDATE master SET In_Event=1 WHERE group_members ='$tx_id' AND event_id=$event_id");
            echo json_encode($Details);     
        }
        else
        {
          echo json_encode(array("flag"=> 0 ,"Message" => "The participant hasn't particiapted in this event!"));
        }
      }
      else 
      {
        echo json_encode(array("flag"=> 0 ,"Message" => "The participant hasn't registered at the desk!"));
      }

  }

    mysqli_close($link);
    fclose($myfile);
}    

catch(Exception $e)
{
  echo json_encode(array("flag"=> 0 ,"Msg" => "Something's not right."));
}

?>
