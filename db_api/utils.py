import psycopg2
from psycopg2.extras import RealDictCursor

try:
    connection = psycopg2.connect(
        database="proyecto_db",
        user="ayds123",
        password="ayds123",  # Asegúrate de que la contraseña sea la misma que en docker-compose.yml
        host="db",           # Este "db" debe coincidir con el nombre del servicio en docker-compose.yml
        port="5432",
        cursor_factory=RealDictCursor
    )
    print("Conexión exitosa a la base de datos", connection)
except Exception as e:
    print(f"Error al conectarse a la base de datos: {e}")
