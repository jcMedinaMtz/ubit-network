<?php
    // Información de la base de datos que definitivamente no debería de ir aquí, pero bueno
    $user = 'root';
    $pass = '';
    $DB = new PDO(
        'mysql:host=localhost;dbname=unboundit', $user, $pass) or die 
        ('Imposible conectar con la base de datos');
        
    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Registrar al usuario y verificar que todo salga bien
    try {
        $success = register($DB);
        if ($success) {
            echo 'Se registro al usuario con éxito';
        } else {
            echo 'Ocurrió un error, quizá debas intentar de nuevo';
        }

    } catch (Exception $ex) {
        echo $ex->getMessage();
    }

    /**
     * Función de registro principal
     * @return
     * @param DB instancia del modelo que representa la conexión con la base de datos
     * @author Miguel Amatón
     */
    function register($DB = null) 
    {
        if (empty($DB))
            throw new Exception('La instancia de la conexión es incorrecta');

        // Obtener los datos del usuario
        // Nombre 
        $name = $_POST['name'] ?? null;
        if (empty($name))
            throw new Exception('No se especificó un nombre de usuario');

        // Correo
        $email = $_POST['email'] ?? null;
        if (empty($email))
            throw new Exception('No se especificó un correo electrónico');

        // Profesión (Opcional)
        $profession = $_POST['profession'] ?? null;

        // Saber si está interesado en network o solo como estudiante
        $is_network = $_POST['is_network'] ?? null;
        $is_network = $is_network == 'on' ? 1 : 0;

        // Guardar lo que se tiene hasta ahora del lead
        $leadStatement = $DB->prepare('INSERT INTO leads (name, email, profession, is_network) VALUES (?, ?, ?, ?)');
        $save = $leadStatement->execute([$name, $email, $profession, $is_network]);

        // Verificar si se logró guardar el LEAD
        if ($save) {
            $lead_id = $DB->lastInsertId();
        } else {
            throw new Exception('El correo ya está registrado, u ocurrió un error al registrar sus datos');
        }

        // Dependiendo del resultado anterior revisamos si guardaremos intereses o habilidaes
        $interests = $_POST['interests'] ?? null;
        if (!empty($interests) && is_string($interests)) {

            $interests = explode(',', trim($interests));
            $interestStatement = $DB->prepare('INSERT INTO interests (description, lead_id) values (?, ?)');

            foreach ($interests as $interest) {
                $interestStatement->execute([$interest, $lead_id]);
            }
        }

        // Consultar las habilidades en caso de que se trate de un interesado por unbound it
        if ($is_network) {
            $skills = $_POST['skills'] ?? null;
            if (!empty($skills) && is_string($skills)) {

                $skills = explode(',', trim($skills));
                $skillsStatement = $DB->prepare('INSERT INTO skills (description, lead_id) values (?, ?)');
            
                foreach ($skills as $skill) {
                    $skillsStatement->execute([$skill, $lead_id]);
                }
            }
        }

        // Si llegamos hasta aquì todo salió bien
        return true;
    }
?>