<?php
session_start();
session_unset();
session_destroy();
header("Location: Iniciar sesion.html");
exit();
?>
