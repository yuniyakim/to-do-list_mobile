import os
import psycopg2
from flask import Flask, render_template, request, redirect, url_for, Response
from flask_cors import CORS
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
CORS(app)


conn = psycopg2.connect(
    database=DBNAME,
    user=DBUSER,
    password=DBPASS,
    host=DBHOST,
    port=DBPORT
)
cur = conn.cursor()

cur.execute(
    'CREATE TABLE IF NOT EXISTS render_time('
        'id serial PRIMARY KEY,'
        'app varchar (50) NOT NULL,'
        'platform varchar (50) NOT NULL,'
        'time float NOT NULL,'
        'device varchar (50) NOT NULL);'
)
conn.commit()

cur.execute(
    'CREATE TABLE IF NOT EXISTS cpu('
        'id serial PRIMARY KEY,'
        'app varchar (50) NOT NULL,'
        'platform varchar (50) NOT NULL,'
        'cpu_max float NOT NULL,'
        'device varchar (50) NOT NULL);'
)
conn.commit()

cur.execute(
    'CREATE TABLE IF NOT EXISTS ram('
        'id serial PRIMARY KEY,'
        'app varchar (50) NOT NULL,'
        'platform varchar (50) NOT NULL,'
        'ram_before float NOT NULL,'
        'ram_after float NOT NULL,'
        'ram_max float NOT NULL,'
        'device varchar (50) NOT NULL);'
)
conn.commit()

cur.execute(
    'CREATE TABLE IF NOT EXISTS app_size('
        'id serial PRIMARY KEY,'
        'app varchar (50) NOT NULL,'
        'platform varchar (50) NOT NULL,'
        'size float NOT NULL,'
        'device varchar (50) NOT NULL);'
)
conn.commit()

cur.close()
conn.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/cpu')
def cpu():
    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT * FROM cpu;')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('cpu.html', data=data)


@app.route('/ram')
def ram():
    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT * FROM ram;')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('ram.html', data=data)


@app.route('/size')
def app_size():
    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT * FROM app_size;')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('size.html', data=data)


@app.route('/rendertime')
def render_time():
    return render_template('rendertime.html')


@app.route('/rendertime/desktop')
def rendertime_desktop():
    app_type = 'desktop'

    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT platform, COUNT(*), MIN(time), AVG(time), MAX(time) FROM render_time WHERE app = \'{app_type}\' GROUP BY platform;')
    statistics_platform = cur.fetchall()

    cur.execute(f'SELECT platform, device, COUNT(*), MIN(time), AVG(time), MAX(time) FROM render_time WHERE app = \'{app_type}\' GROUP BY platform, device;')
    statistics_device = cur.fetchall()

    cur.execute(f'SELECT * FROM render_time WHERE app = \'{app_type}\'')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('rendertime_app.html', app=app_type, statistics_platform=statistics_platform, statistics_device=statistics_device, data=data)


@app.route('/rendertime/pwa')
def rendertime_pwa():
    app_type = 'pwa'

    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT platform, COUNT(*), MIN(time), AVG(time), MAX(time) FROM render_time WHERE app = \'{app_type}\' GROUP BY platform;')
    statistics_platform = cur.fetchall()

    cur.execute(f'SELECT platform, device, COUNT(*), MIN(time), AVG(time), MAX(time) FROM render_time WHERE app = \'{app_type}\' GROUP BY platform, device;')
    statistics_device = cur.fetchall()

    cur.execute(f'SELECT * FROM render_time WHERE app = \'{app_type}\'')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('rendertime_app.html', app=app_type, statistics_platform=statistics_platform, statistics_device=statistics_device, data=data)


@app.route('/rendertime/mobile')
def rendertime_mobile():
    app_type = 'mobile'

    conn = psycopg2.connect(
        database=DBNAME,
        user=DBUSER,
        password=DBPASS,
        host=DBHOST,
        port=DBPORT
    )
    cur = conn.cursor()

    cur.execute(f'SELECT platform, COUNT(*), MIN(time), AVG(time), MAX(time) FROM render_time WHERE app = \'{app_type}\' GROUP BY platform;')
    statistics_platform = cur.fetchall()

    cur.execute(f'SELECT platform, device, COUNT(*), MIN(time), AVG(time), MAX(time) FROM render_time WHERE app = \'{app_type}\' GROUP BY platform, device;')
    statistics_device = cur.fetchall()

    cur.execute(f'SELECT * FROM render_time WHERE app = \'{app_type}\'')
    data = cur.fetchall()

    cur.close()
    conn.close()

    return render_template('rendertime_app.html', app=app_type, statistics_platform=statistics_platform, statistics_device=statistics_device, data=data)


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

    cur.execute(f'INSERT INTO render_time (app, platform, time, device) VALUES (\'{app}\', \'{platform}\', {time}, \'{device}\')')
    conn.commit()

    cur.close()
    conn.close()

    return redirect(url_for('render_time'))


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
