# Prueba desarrolladores

## Descripción

Esta prueba está diseñada para evaluar habilidades en el desarrollo con Laravel, específicamente en la creación de una maqueta web y la implementación de funcionalidades utilizando AJAX.

Una vez se registra un usuario, aparecera al lado derecho en una tabla. Se maneja para mostrar los usuarios una paginación y en cada pagina se mostraran 14 usuarios.

## Tecnologías utilizadas

- Framework PHP Laravel 11
- PHP 8.2
- Vue 3 (integrado dentro del framework Laravel)
- JavaScript
- Base de datos: PostgreSQL

## Observación

Cualquier inquietud u observación puedes escribirme a salgadosb1986@gmail.com, en cuanto pueda te brindare el soporte para el caso en el menor tiempo posible.

## Pasos de instalación en un entorno local

Si deseas implementar esta aplicación en tu entorno local, sigue estos pasos:

1. Clona el repositorio:

git clone https://github.com/sebastesb1986/prueba-desarrolladores.git


2. Genera la clave de la aplicación y realiza las instalaciones necesarias:

```plaintext
php artisan key
composer install
npm install

3. Copia el archivo `.env.example` a `.env` y configura tu entorno local:

DB_CONNECTION=pgsql # o el de tu preferencia
DB_HOST=TU HOST
DB_PORT=TU PUERTO
DB_DATABASE=TU_DATABASE
DB_USERNAME=TU USERNAME
DB_PASSWORD=TU_PASSWORD


4. Crear la base de datos en tu entorno(mysql, postgres, sqlserver, sqlite) y asinar el nombre para el caso TU_DATABASE

5. Ejecuta las migraciones

php artisan migrate

6. Inicia el servidor de desarrollo y el servidor de Laravel:

php artisan serve
npm run dev

7. Accede a la aplicación desde tu navegador:

Sitio principal: http://127.0.0.1:8000

Saludos.
