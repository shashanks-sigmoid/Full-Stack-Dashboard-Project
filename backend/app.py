
import os
import json
from datetime import datetime, timezone, timedelta
import psycopg2
import psycopg2.extras
from flask import Flask, render_template, session, request, redirect, url_for,jsonify,Response
from werkzeug.security import generate_password_hash, check_password_hash
import csv
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
# Init app
app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.urandom(12).hex()
app.config["SECRET_KEY"] = os.urandom(12).hex()

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

CORS(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route('/login', methods=['POST'])
def login():
    _json = request.json
    _email = _json['email']
    _password = _json['password']

    access_token = create_access_token(identity=_email)
  
    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                        user=os.getenv('USER'),
                        password=os.getenv('PASSWORD'), 
                        host="localhost", port="5432")

    # print(_password)
    if _email and _password:
        #check user exists          
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
          
        sql = "SELECT * FROM users WHERE email=%s"
        sql_where = (_email,)
          
        cursor.execute(sql, sql_where)
        row = cursor.fetchone()

        if not row:
          resp = jsonify({'message' : 'Bad Request - invalid credendtials'})
          return resp,400

        # print(row)
        email = row['email']
        password = row['password']
        if row:
            if check_password_hash(password, _password):
                session['username'] = email
                cursor.close()
                resp = jsonify({'message' : 'You are logged in successfully',
                "access_token": access_token})
                return resp,200
            else:
                resp = jsonify({'message' : 'Bad Request - invalid password'})
                return resp,400
    else:
        resp = jsonify({'message' : 'Bad Request - invalid credendtials'})
        return resp,400


@app.route('/logout')
def logout():
    if 'username' in session:
        session.pop('username', None)
    response = jsonify({'message' : 'You successfully logged out'})
    unset_jwt_cookies(response)
    return response
  

@app.post('/column_name')
# @jwt_required()
def column_name():
    table_name = request.json.get("table_name")

    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                        user=os.getenv('USER'),
                        password=os.getenv('PASSWORD'), 
                        host="localhost", port="5432")


    cur = conn.cursor()
    # print("hello")
    cur.execute(f"SELECT Column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '{table_name}';")
    data = cur.fetchall()
    cur.close()
    conn.close()
  
    return {"data":data}
   
def save_csv(filename,column_name,row_data):
  with open(filename, 'w') as csvfile: 
    csvwriter = csv.writer(csvfile) 
    csvwriter.writerow(column_name) 
    csvwriter.writerows(row_data)
  return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-disposition":
                 "attachment; filename=filename"})
  

@app.post('/filter')
# @jwt_required()
def filter():
    filter_data=request.json
    print("filter_data",filter_data)
    table_name=filter_data["table_name"]
    column=",".join(filter_data["column"])
    filter_query="" if not len(filter_data["filter"]) else " where "
 
    count_string=0
    count_int=0
    count_time=0
    for filter_column in filter_data["filter"]:
      if filter_column["type"]=="string":
        if count_string or count_int or count_time:
          filter_query+=" and "
        filter_query+="lower("+filter_column["column"]+") like "
        val=filter_column["value"].lower()
        if filter_column["filter_type"]=="Starts With":      
          filter_query+=f"'{val}%'"
        elif filter_column["filter_type"]=="Ends With":     
          filter_query+=f"'{val}%'"
        elif filter_column["filter_type"]=="Contains":
          filter_query+=f"'%{val}%'"         
        count_string+=1
      elif filter_column["type"]=="int":
        if count_string or count_int or count_time:
          filter_query+=" and "
        filter_query+=str(filter_column["column"])
        val=filter_column["value"]
        if filter_column["filter_type"]=="Less Than":      
          filter_query+=f" < {val}"
        elif filter_column["filter_type"]=="More Than":     
          filter_query+=f" > {val}"
        elif filter_column["filter_type"]=="Equal to":
          filter_query+=f" = {val}"         
        count_int+=1
      elif filter_column["type"]=="timestamp":
        if count_string or count_int or count_time:
          filter_query+=" and "
        filter_query+="TO_CHAR("+str(filter_column["column"])+",'YYYY-MM-DD')"
        start_date=filter_column["dateRange"][0]
        end_date=filter_column["dateRange"][1]
        filter_query+=f" Between '{start_date}' and '{end_date}'"            
        count_int+=1
    if filter_data["sorted_by"][0]:
      filter_query+=" order by "+filter_data["sorted_by"][0]+" "+filter_data["sorted_by"][1];
    if filter_data["limit"]=="50":
      filter_query+=" limit 50"
          
    print("filter_query",filter_query)

    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                        user=os.getenv('USER'),
                        password=os.getenv('PASSWORD'), 
                        host="localhost", port="5432")

    cur = conn.cursor()
    cur.execute(f"SELECT {column} FROM public.{table_name}{filter_query}")
    data = cur.fetchall()
    cur.close()
    conn.close()
    csv_column=filter_data["column"] 
    
    if filter_data["download"]=="true":
      filename="./../frontend/src/output/filtered_data.csv"
      save_csv(filename,csv_column,data)
    result={"data":data,"size":len(data),"column":csv_column}
    return result
    
@app.post('/save_data')
# @jwt_required()
def save_data():
    # save_data=request.json
    # print("saved_data",save_data)
    # col = ', '.join(list(save_data.keys()))
    # val = ', '.join(str(x) for x in save_data.values())
    
    # print(keys)
    # print(values)

    save_data=request.json
    print("saved_data",save_data)
    print(type(save_data))
    col=",".join(list(save_data.keys()))
    values=list(save_data.values())
    val=""
    for i in range(5):
      if i!=4:
        val+=f"'{values[i]}'"
        val+=","
      else:
        val+=f"'{json.dumps(values[i])}'"
      
    
    query=f"INSERT INTO public.save_query ({col}) VALUES ({val})"
    print("query",query)
    
    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                        user=os.getenv('USER'),
                        password=os.getenv('PASSWORD'), 
                        host="localhost", port="5432")

    cur = conn.cursor()
    cur.execute(query)

    conn.commit()
    cur.close()
    conn.close()
    
    return {"data":save_data}
    
@app.get('/get_all_saved_data')
def get_all_saved_data():
    
    query=f"SELECT * FROM public.save_query"
    print("query",query)
    
    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                        user=os.getenv('USER'),
                        password=os.getenv('PASSWORD'), 
                        host="localhost", port="5432")

    cur = conn.cursor()
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    conn.close()
    # print(data)
    return {"data":data}
  
  
@app.get('/get_saved_data_by_id/<id>')
def get_saved_data_by_id(id):
    query=f"SELECT query, query_name FROM public.save_query WHERE id={id}"
    print("query",query)
    
    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                        user=os.getenv('USER'),
                        password=os.getenv('PASSWORD'), 
                        host="localhost", port="5432")

    cur = conn.cursor()
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    conn.close()
    
    return {"data":data}

@app.patch('/update_query/<id>')
def update_query(id):
    id = id
    updated_data = request.json

    col=",".join(list(save_data.keys()))
    values=list(save_data.values())
    val=""
    for i in range(5):
      if i!=4:
        val+=f"'{values[i]}'"
        val+=","
      else:
        val+=f"'{json.dumps(values[i])}'"
      
    sql = f"SELECT * FROM public.save_query WHERE id={id}"

    conn = psycopg2.connect(database=os.getenv('DATABASE'), 
                        user=os.getenv('USER'),
                        password=os.getenv('PASSWORD'), 
                        host="localhost", port="5432")

    cur = conn.cursor()
    cur.execute(sql)
    data = cur.fetchall()
    cur.close()
    conn.close()

    return data
    


if __name__ == "__main__":
    app.run(port=5051, debug = True)
  



    
    





