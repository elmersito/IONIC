<!DOCTYPE html>
<html>
<head>
    <title>Actualizar Registro</title>
</head>
<body>
    <h1>Actualizar Registro</h1>
    
    <form id="updateForm">
        <label for="id">ID del Registro a Actualizar:</label>
        <input type="text" id="id" name="id" required><br>

        <label for="Nombre">Nuevo Nombre:</label>
        <input type="text" id="Nombre" name="Nombre"><br>

        <label for="Correo">Nueva URL de Correo:</label>
        <input type="text" id="Correo" name="Correo"><br>

        <label for="contrasena">Nueva contraseña:</label>
        <input type="text" id="contrasena" name="contrasena"><br>

        <button type="button" id="putButton">Actualizar con PUT</button>
        <button type="button" id="patchButton">Actualizar con PATCH</button>
    </form>

    <div id="response"></div>

    <script>
        document.getElementById('putButton').addEventListener('click', function () {
            actualizarRegistro('PUT');
        });

        document.getElementById('patchButton').addEventListener('click', function () {
            actualizarRegistro('PATCH');
        });

        function actualizarRegistro(metodo) {
            var id = document.getElementById('id').value;
            var Nombre = document.getElementById('Nombre').value;
            var Correo = document.getElementById('Correo').value;
            var contrasena = document.getElementById('contrasena').value;

            var data = new URLSearchParams();
            data.append('id', id);
            data.append('Nombre', Nombre);
            data.append('Correo', Correo);
            data.append('contrasena', tel);

            fetch('method.php', {
                method: metodo,
                body: data
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                document.getElementById('response').textContent = data;
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
        }
    </script>
</body>
</html>
