import psycopg2

# Update these values as needed
DB_NAME = 'EdT'
DB_USER = 'postgres'
DB_PASSWORD = 'njm@2001'
DB_HOST = 'localhost'
DB_PORT = 5432

USERNAME = 'admin'
PASSWORD_HASH = 'pbkdf2_sha256$1000000$0YZasxlrbwYYx3wqMhxF0F$NxGryQoEMjMZfY0wXa4SDIb+vkPVvU7jiWwRW+3k1Fo='

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
cur = conn.cursor()

cur.execute("UPDATE webapp_user SET password = %s WHERE username = %s", (PASSWORD_HASH, USERNAME))
conn.commit()

cur.execute("SELECT id, username, password FROM webapp_user WHERE username = %s", (USERNAME,))
print(cur.fetchone())

cur.close()
conn.close()
