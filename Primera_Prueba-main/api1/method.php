<?php
require "config/Conexion.php";

  //print_r($_SERVER['REQUEST_METHOD']);
  switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
      // Consulta SQL para seleccionar datos de la tabla
$sql = "SELECT id, Nombre, Correo, contrasena FROM practica";

$query = $conexion->query($sql);

if ($query->num_rows > 0) {
    $data = array();
    while ($row = $query->fetch_assoc()) {
        $data[] = $row;
    }
    // Devolver los resultados en formato JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo "No se encontraron registros en la tabla.";
}

$conexion->close();
      break;


    case 'POST':
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Recibir los datos del formulario HTML
        $Id = $_POST['id'];
        $Nombre = $_POST['Nombre'];
        $Correo = $_POST['Correo'];
        $Contrasena = $_POST['contrasena'];
     
    
        // Insertar los datos en la tabla
        $sql = "INSERT INTO practica (id, Nombre, Correo, contrasena ) VALUES ('$Id', '$Nombre','$Correo', '$Contrasena')"; // Reemplaza con el nombre de tu tabla
    
        if ($conexion->query($sql) === TRUE) {
            echo "Datos insertados con éxito.";
        } else {
            echo "Error al insertar datos: " . $conexion->error;
        }
    } else {
        echo "Esta API solo admite solicitudes POST.";
    }
    
    $conexion->close();
      break;
      case 'PATCH':
        if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
          parse_str(file_get_contents("php://input"), $datos);
      
          $Id = $datos['id'];
          $Nombre = $datos['Nombre'];
          $Correo = $datos['Correo'];
          $Contrasena = $datos['contrasena'];
      
          if ($_SERVER['REQUEST_METHOD'] === 'PATCH') { // Método PATCH
              $actualizaciones = array();
              if (!empty($Nombre)) {
                  $actualizaciones[] = "Nombre = '$Nombre'";
              }
              if (!empty($Correo)) {
                  $actualizaciones[] = "Correo = '$Correo'";
              }
              if (!empty($Contrasena)) {
                  $actualizaciones[] = "contrasena = '$Contrasena'";
              }
      
              $actualizaciones_str = implode(', ', $actualizaciones);
              $sql = "UPDATE practica SET $actualizaciones_str WHERE id = $Id";
          }
      
          if ($conexion->query($sql) === TRUE) {
              echo "Registro actualizado con éxito.";
          } else {
              echo "Error al actualizar registro: " . $conexion->error;
          }
      } else {
          echo "Método de solicitud no válido.";
      }
      
      $conexion->close();
       break;

    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);

        // Asegúrate de que los datos necesarios estén presentes
        if (isset($datos['id']) && isset($datos['Nombre']) && isset($datos['Correo']) && isset($datos['contrasena'])) {
            $Id = $datos['id'];
            $Nombre = $datos['Nombre'];
            $Correo = $datos['Correo'];
            $Contrasena = $datos['contrasena'];

            $sql = "INSERT INTO practica (id, Nombre, Correo, contrasena) VALUES (?, ?, ?, ?)";
            $stmt = $conexion->prepare($sql);

            // Enlaza los parámetros y sus tipos
            $stmt->bind_param("sssi", $Id, $Nombre, $correo, $Contrasena);

            if ($stmt->execute()) {
                $response = array("message" => "Registro insertado con éxito.");
                echo json_encode($response);
            } else {
                $response = array("error" => "Error al insertar registro: " . $stmt->error);
                echo json_encode($response);
            }

            $stmt->close();
        } else {
            $response = array("error" => "Faltan datos obligatorios en la solicitud.");
            echo json_encode($response);
        }
      break;
  
      
    case 'DELETE':
        // Obtener el contenido del cuerpo de la solicitud
        $json = file_get_contents('php://input');
        
        // Decodificar el JSON en un array asociativo
        $data = json_decode($json, true);
        
        // Verificar si la solicitud es DELETE
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            // Verificar si se proporciona el parámetro id_alumno en el JSON
            if (isset($data['id'])) {
                // Procesar solicitud DELETE
                $Id = $data['id'];
                $sql = "DELETE FROM practica WHERE id = $Id";
        
                // Realizar la consulta DELETE
                if ($conexion->query($sql) === TRUE) {
                    echo "Registro eliminado con éxito.";
                } else {
                    echo "Error al eliminar registro: " . $conexion->error;
                }
            } else {
                echo "El parámetro id_alumno no se proporcionó en el JSON.";
            }
        } else {
            echo "Método de solicitud no válido.";
        }
        
        // Cerrar la conexión a la base de datos
        $conexion->close();
      break;


     default:
       echo 'undefined request type!';
  }
?>