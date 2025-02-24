import psycopg2

try:
    conn = psycopg2.connect(
        database="proyecto_db",
        user="ayds123",
        password="ayds123",  # Asegúrate de que la contraseña sea la misma que en docker-compose.yml
        host="db",           # Este "db" debe coincidir con el nombre del servicio en docker-compose.yml
        port="5432"
    )
    print("Conexión exitosa a la base de datos",conn)
except Exception as e:
    print(f"Error al conectarse a la base de datos: {e}")


def getUsers(conn=conn):
    # Cursor que maneja la conexión
    cur = conn.cursor()
    # Execute permite realizar las consultas
    cur.execute("SELECT * FROM users;")
    rows = cur.fetchall()
    cur.close()
    return rows

def createUser(profile_picture_url, name, rut, password, tel, email, status, area):
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (profile_picture_url, name, rut, password, tel, email, status, area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);",
        (profile_picture_url, name, rut, password, tel, email, status, area)
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    return new_id

# def createRendicion(fecha, monto, conn=conn):
#     cur = conn.cursor()
#     cur.execute("INSERT INTO rendicion (fecha, monto) VALUES (%s, %s) RETURNING id;", (fecha, monto))
#     conn.commit()
#     new_id = cur.fetchone()[0]
#     cur.close()
#     return new_id


# def updateRendicion(id, fecha, monto, conn=conn):
#     cur = conn.cursor()
#     # Ejecutamos la actualización y verificamos cuántas filas fueron afectadas
#     cur.execute("UPDATE rendicion SET fecha = %s, monto = %s WHERE id = %s;", (fecha, monto, id))
#     updated_rows = cur.rowcount  # rowcount te indica cuántas filas fueron afectadas
#     conn.commit()
#     cur.close()
#     return updated_rows

# def deleteRendicion(id, conn=conn):
#     cur = conn.cursor()
#     cur.execute("DELETE FROM rendicion WHERE id = %s;", (id,))
#     conn.commit()
#     cur.close()
