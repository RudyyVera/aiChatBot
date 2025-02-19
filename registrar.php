<?php

include("con_db.php");

if (isset($_POST['iniciar'])){
    if (strlen($_POST['email']) < 1 &&strlen($_POST['password']) < 1) {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        $fechareg = date("d/m/y");
        $consulta = "INSERT INTO datos(email, password, fecha_reg) VALUES ('$email','$password','$fechareg')";
        $resultado = mysqli_query($conex,$consulta);
        if ($resultado) {
            ?>
            <h3 class="ok">Sesión iniciada</h3>
            <?php
        }else{
            ?>
            <h3 class="bad">Ha ocurrido un error</h3>
            <?php
        }
    }else{
        ?>
        <h3 class="bad">Falta completar</h3>
        <?php
    }
}
?>  