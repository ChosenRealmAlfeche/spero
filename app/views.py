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
    return render_template('home.html')

@app.route('/grades.html')
@app.route('/grades')
def grades():
    return render_template('grades.html')

@app.route('/questions.html')
@app.route('/questions')
def questions():
    return render_template('questions.html')

#use for login button
@app.route('/login')
def login(): 
    cursor = conn.cursor()
    cursor.execute("SELECT * from users")
    row = cursor.fetchone()
    session['loggedIN'] = True
    #user ID
    session['uID'] = row[0]
    #gradelevel
    session['gL'] = int(row[-1])
    #not finished yet
    #expect return js.dumps({"success" : False})
    #if success true refresh page I'll redirect it if session is available
    #if success false just preventDefault to out put error
    return render_template('home.html')

#user register
@app.route('/registerUser', methods=['GET'])
def register():
    username = str(request.form['username'])
    password = str(request.form['password'])
    grade = str(request.form['grade'])
    email = str(request.form['email'])
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username,password,email,gradeLevel) VALUES (%s,%s,%s,%s)",(username,password,grade,email))
    conn.commit()
    #expect success : False
    ret = { 'success' : True}
    return js.dumps(ret)

@app.route('/updateGradeLevel')
def updateGL():
    if 'loggedIN' in session:
        if( session['loggedIN']):
            if(session['gL'] < 10):
                session['gL'] += 1
                cursor = conn.cursor()
                cursor.execute("UPDATE users SET gradeLevel = %s WHERE user_id = %s", (session['gL'],session['uID']))
                conn.commit()
                #returns successful or not if successful it also returns the upgraded gradelevel json format
                return js.dumps({'success' : True, 'gradeLevel' : str(session['gL'])})
            else:
                return js.dumps({'success' : False})
    return redirect(url_for('index'))

@app.route('/insertRiasec', methods=['GET'])
def insertRiasec():
    if "loggedIN" in session:
        if(session['loggedIN']):
            uid = session['uID']
            r = str(request.form('R'))
            i = str(request.form('I'))
            a = str(request.form('A'))
            s = str(request.form('S'))
            e = str(request.form('E'))
            c = str(request.form('C'))
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