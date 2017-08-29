from app import app,conn
from flask import render_template, request, session, redirect, url_for
import json as js
import time

# wala pa nako na ilisan ang link para sa css, fonts, img, and include sa
# mga html files. butangi lag static/ sa atubangan sa mga link for
# exampl:
# static/include/footer.html or static/css/bootstrap.min.css
# etc.

@app.route('/')
@app.route('/index')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/home.html')
@app.route('/home')
def home():
    if not 'loggedIN' in session:
        if(not session['loggedIN']):
            return redirect(url_for('index'))
    return render_template('home.html')

@app.route('/grades.html')
@app.route('/grades')
def grades():
    if not 'loggedIN' in session:
        if(not session['loggedIN']):
            return redirect(url_for('index'))
    return render_template('grades.html')

@app.route('/questions.html')
@app.route('/questions')
def questions():
    if not 'loggedIN' in session:
        if(not session['loggedIN']):
            return redirect(url_for('index'))
    return render_template('questions.html')

#use for login button
@app.route('/login',methods=['POST'])
def login(): 
    cursor = conn.cursor()
    uname = request.json["username"]
    password = request.json["pass"]
    cursor.execute("SELECT user_id, username, password, gradeLevel, trackEquipped, carrerChosen, programChosen, email FROM users WHERE username = '%s' AND password = '%s'" % (uname,password))
    row = cursor.fetchone()
    if(row):
        session['loggedIN'] = True
    #user ID
        session['uID'] = row[0]
    #gradelevel
        session['gL'] = int(row[3])
        ret = {'success' : True, 'User' : {'id' : str(row[0]), 'username' : str(row[1]), 'password' : str(row[2]), 'gradeLevel' : str(row[3]), 'equippedTrack' : str(row[4]), 'chosenCareer' : str(row[5]), 'chosenProgram' : str(row[6]), 'email' : str(row[7])}}
    else:
        ret = {'success' : False}
    #if success is true just use ret['User'] to get the user infos
    return js.dumps(ret)

#user register
@app.route('/registerUser', methods=['GET'])
def register():
    content = request.get_json(force=True)
    username = str(content['username'])
    password = str(content['password'])
    grade = str(content['grade'])
    email = str(content['email'])
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username,password,email,gradeLevel) VALUES (%s,%s,%s,%s)",(username,password,grade,email))
    conn.commit()
    #expect success : False
    ret = { 'success' : True}
    return js.dumps(ret)

@app.route('/updateUser')
def updateGL():
    if 'loggedIN' in session:
        if( session['loggedIN']):
            content = request.get_json(force=True)
            un = content['username']
            pw = content['password']
            gl = content['gradeLevel']
            et = content['equippedTrack']
            cc = content['chosenCareer']
            cp = content['chosenProgram']
            email = content['email']

            cursor = conn.cursor()
            cursor.execute("UPDATE users SET username = %s, password = %s, gradeLevel = %s, trackEquipped = %s, carrerChosen = %s, programChosen = %s, email = %s WHERE user_id = %s" % (un,pw,gl,et,cc,cp,email,session['uID']))

    return redirect(url_for('index'))

@app.route('/insertRiasec', methods=['GET'])
def insertRiasec():
    if "loggedIN" in session:
        if(session['loggedIN' ]):
            uid = session['uID']
            content = request.get_json(force=True)
            r = str(content('R'))
            i = str(content('I'))
            a = str(content('A'))
            s = str(content('S'))
            e = str(content('E'))
            c = str(content('C'))
            date = time.strftime("YYYY-MM-DD")

            cursor = conn.cursor()
            cursor.execute("INSERT INTO riasec( user_id, realistic, investigative, artistic, social, enterprising, conventional, completedOn) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(uid,r,i,a,s,e,c,date))
            cursor.commit()
            #returns successfull or not wala pa nako na butangan og {'success' : False} pero expect lng
            return {'success':True}
    return redirect(url_for('index'))

#idk how to input grades and how you pass it
#@app.route('/insertGrades')
#@app.route('/updateGrades')

#idk what you need so ako gi kuha tanan og ako gi tagsatagsa
@app.route('/getRiasec')
def getRiasec():
    if "loggedIN" in session:
        if(session['loggedIN']):
            cursor = conn.cursor()
            cursor.execute("SELECT realistic, investigative, artistic, social, enterprising, conventional FROM riasec WHERE user_id = %s ORDER BY completedOn DESC",(session['uID']))
            row = cursor.fetchone()
            if(row):
                dump = {"r" : row[0], "i" : row[1], "a" : row[2], "s" : row[3], "e" : row[4], "c" : row[5], "success" : True}
            else:
                dump = {"success" : False}

            #returns json { r : score, i : score, a : score, etc..}
            return js.dumps(dump)
    return redirect(url_for('index')) 

@app.route('/getAllGrades')
def getALlGrades():
    if "loggedIN" in session:
        if(session['loggedIN']):
            cursor = conn.cursor()
            cursor.execute("SELECT gradelevel, quarter, english, math, science, filipino, aralPan, mapeh FROM grades WHERE user_id = %s",(session['uID']))
            rows = cursor.fetchall()
            ret = {}
            for row in rows:
                ret[row[0]][row[1]] = { 'english' : row[2], 'math' : row[3], 'science' : row[4], 'filipino' : row[5], 'aralPan' : row[6], 'mapeh' : row[7]}
            return js.dumps(ret)
    return redirect(url_for('index'))

@app.route('/getTracks')
def getTracks():
    return js.dumps( { "0":"STEM", "1":"ABM", "2":"GAS", "3":"SPORTSTRACK", "4":"ARTSDESIGN", "5":"HUMMS"})

@app.route('/courses')
def getCourse():
    return js.dumps( { "STEM" : {"1" : "Compsci", "2" : "Physics", "3" : "Math"},
                        "ABM" : {"1" : "Bomba", "2" : "HRM", "3" : "Accounting"},
                        "GAS" : {"1" : "Polics", "2" : "Military", "3" : "Airforce"},
                        "SPORTSTRACK" : {"1" : "Coach", "2" : "PE Teacher", "3" : "Zumba Instructor"},
                        "ARTSDESIGN" : {"1" : "Fine Arts", "2" : "Architecture and Design", "3" : "Tourism?"},
                        "HUMMS": {"1" : "Reed", "2" : "Philisophy", "3" : "Humanities"}
                    })

@app.route('/logout')
def logout():
    session.pop('uID',None)
    session.pop('gL',None)
    session.pop('loggedIN',None)

    return redirect(url_for('index'))