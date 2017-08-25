from app import app
from flask import render_template
from flask_wtf import Form

@app.route('/')
@app.route('/index')
@app.route('/index.html')

def index():
    return render_template('index.html')

@app.route('/home.html')

def home():
    return render_template('home.html')

@app.route('/grades.html')

def grades():
    return render_template('grades.html')

@app.route('/questions.html')

def questions():
    return render_template('questions.html')