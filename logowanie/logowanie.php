<html>
<body>

<?php 

  // $conn = new mysqli('freedomenasdl.cba.pl', 'oliwia123119', 'Eziood123');

  // Check connection
  
  $DBconnect = mysqli_connect('mysql.cba.pl', 'oliwia123119', 'Eziood123','oliwia123119');
  
    
    if (!$DBconnect) {
        die("Connection failed: " . mysqli_connect_error());
    }
   $sql = "SELECT login, haslo FROM logowanie";
   $result=mysqli_query($DBconnect,$sql);

   $zalogowano=false;
   $login;
   if(mysqli_num_rows($result)>0)
   {
    while($row=mysqli_fetch_assoc($result))
    {
      if($_POST["login"]==$row['login']&&$_POST["password"]==$row['haslo'])
      {
        $zalogowano=true;
        $login=$_POST["login"];
      }
    }
   } else
   echo "0 results";
   
    
  if($zalogowano)
    echo "Jestes zalogowany jako: ".$login;
  else
    echo "Nie udało Ci się zalogować!";
//     echo $user_haslo."</br>";

  echo '</br><button onclick="history.go(-1);">Back </button>';
  mysqli_close($DBconnect);
?>

</body>
</html>