# from database import db, ma
# from modal import Product, Review
from datetime import datetime
from sqlalchemy.types import Unicode 
import os

from flask import Flask, render_template, request, redirect, url_for,jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Init app
app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                            user=os.getenv('USER'),
                            password=os.getenv('PASSWORD'), 
                            host="localhost", port="5432")

    cur = conn.cursor()
    # print("hello")
    cur.execute('''SELECT * FROM public.customers''')
    data = cur.fetchall()
    cur.close()
    conn.close()
  
    return {"data":data}

@app.route('/column_name', methods=['POST'])
def column_name():
    table_name = request.json.get("table_name")
    print(table_name)
    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                            user=os.getenv('USER'),
                            password=os.getenv('PASSWORD'), 
                            host="localhost", port="5432")

    cur = conn.cursor()
    # print("hello")
    cur.execute(f"SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '{table_name}';")
    data = cur.fetchall()
    cur.close()
    conn.close()
  
    return {"data":data}




if __name__ == "__main__":
    app.run(port=5051, debug = True)