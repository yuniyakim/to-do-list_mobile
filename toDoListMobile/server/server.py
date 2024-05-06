import os
import psycopg2
from flask import Flask, render_template, request, redirect, url_for
from dotenv import load_dotenv

load_dotenv()
DBNAME=os.getenv('POSTGRES_DB')
DBUSER=os.getenv('POSTGRES_USER')
DBPASS=os.getenv('POSTGRES_PASSWORD')
if not DBNAME or not DBUSER or not DBPASS:
    ValueError('PostgreSQL credentials are missing')

DBHOST='db'
DBPORT='5432'

app = Flask(__name__)

conn = psycopg2.connect(
    database=DBNAME,
    user=DBUSER,
    password=DBPASS,
    host=DBHOST,
    port=DBPORT
)
cur = conn.cursor()

cur.execute(
    'CREATE TABLE IF NOT EXISTS loading_time('
        'id serial PRIMARY KEY,'
        'app varchar (50) NOT NULL,'
        'platform varchar (50) NOT NULL,'
        'time float NOT NULL,'
        'device varchar (50) NOT NULL);'
)
conn.commit()

cur.close()
conn.close()

@app.route('/')
def index():
    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute('SELECT * FROM loading_time')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('index.html', data=data)

@app.route('/desktop')
def desktop():
    app_type = 'desktop'

    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT platform, COUNT(*), MIN(time), AVG(time), MAX(time) FROM loading_time WHERE app = \'{app_type}\' GROUP BY platform;')
    statistics_platform = cur.fetchall()

    cur.execute(f'SELECT platform, device, COUNT(*), MIN(time), AVG(time), MAX(time) FROM loading_time WHERE app = \'{app_type}\' GROUP BY platform, device;')
    statistics_device = cur.fetchall()

    cur.execute(f'SELECT * FROM loading_time WHERE app = \'{app_type}\'')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('report.html', app=app_type, statistics_platform=statistics_platform, statistics_device=statistics_device, data=data)

@app.route('/pwa')
def pwa():
    app_type = 'pwa'

    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT platform, COUNT(*), MIN(time), AVG(time), MAX(time) FROM loading_time WHERE app = \'{app_type}\' GROUP BY platform;')
    statistics_platform = cur.fetchall()

    cur.execute(f'SELECT platform, device, COUNT(*), MIN(time), AVG(time), MAX(time) FROM loading_time WHERE app = \'{app_type}\' GROUP BY platform, device;')
    statistics_device = cur.fetchall()

    cur.execute(f'SELECT * FROM loading_time WHERE app = \'{app_type}\'')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('report.html', app=app_type, statistics_platform=statistics_platform, statistics_device=statistics_device, data=data)

@app.route('/mobile')
def mobile():
    app_type = 'mobile'

    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT platform, COUNT(*), MIN(time), AVG(time), MAX(time) FROM loading_time WHERE app = \'{app_type}\' GROUP BY platform;')
    statistics_platform = cur.fetchall()

    cur.execute(f'SELECT platform, device, COUNT(*), MIN(time), AVG(time), MAX(time) FROM loading_time WHERE app = \'{app_type}\' GROUP BY platform, device;')
    statistics_device = cur.fetchall()

    cur.execute(f'SELECT * FROM loading_time WHERE app = \'{app_type}\'')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('report.html', app=app_type, statistics_platform=statistics_platform, statistics_device=statistics_device, data=data)


@app.route('/add', methods=['POST'])
def add():
    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    data = request.json
    app = data['app']
    platform = data['platform']
    time = data['time']
    device = data['device']

    cur.execute(f'INSERT INTO loading_time (app, platform, time, device) VALUES (\'{app}\', \'{platform}\', {time}, \'{device}\')')
    conn.commit()

    cur.close()
    conn.close()

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
