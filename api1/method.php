<?php
require "config/Conexion.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Consulta SQL para seleccionar datos de la tabla
        $sql = "SELECT id, nombre, correo, contrasena FROM usuarios";

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
        // Recibir los datos del formulario HTML
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
        $correo = isset($_POST['correo']) ? $_POST['correo'] : null;
        $Contrasena = isset($_POST['contrasena']) ? $_POST['contrasena'] : null;

        // Insertar los datos en la tabla
        $sql = "INSERT INTO usuarios (id, nombre, correo, contrasena) VALUES ('$id', '$nombre', '$correo', '$Contrasena')";

        if ($conexion->query($sql) === TRUE) {
            echo "Datos insertados con éxito.";
        } else {
            echo "Error al insertar datos: " . $conexion->error;
        }

        $conexion->close();
        break;

    case 'PUT':
        // Obtener los datos de la solicitud JSON
        $datos = json_decode(file_get_contents("php://input"), true);

        // Asegúrate de que los datos necesarios estén presentes
        if (isset($datos['id']) && isset($datos['nombre']) && isset($datos['correo']) && isset($datos['contrasena'])) {
            $id = $datos['id'];
            $nombre = $datos['nombre'];
            $correo = $datos['correo'];
            $Contrasena = $datos['contrasena'];

            $sql = "UPDATE usuarios SET nombre = '$nombre', correo = '$correo', contrasena = '$Contrasena' WHERE id = $id";

            if ($conexion->query($sql) === TRUE) {
                echo "Registro actualizado con éxito.";
            } else {
                echo "Error al actualizar registro: " . $conexion->error;
            }
        } else {
            echo "Faltan datos obligatorios en la solicitud.";
        }

        $conexion->close();
        break;

    case 'DELETE':
        // Obtener los datos de la solicitud JSON
        $datos = json_decode(file_get_contents("php://input"), true);

        // Verificar si se proporciona el parámetro id en el JSON
        if (isset($datos['id'])) {
            // Procesar solicitud DELETE
            $id = $datos['id'];
            $sql = "DELETE FROM usuarios WHERE id = $id";

            // Realizar la consulta DELETE
            if ($conexion->query($sql) === TRUE) {
                echo "Registro eliminado con éxito.";
            } else {
                echo "Error al eliminar registro: " . $conexion->error;
            }
        } else {
            echo "El parámetro id no se proporcionó en el JSON.";
        }

        $conexion->close();
        break;

    default:
        echo 'undefined request type!';
}
?>
