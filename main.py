from flask import Flask, render_template, request, redirect, jsonify
from flashcard_maker import generate_flashcards
import re
import random

# import subprocess

# Define the package you want to install
# package = 'openai'

# # Run the pip install command using subprocess
# subprocess.call(['pip', 'install', package])

import openai
import os
openai.api_key  = ('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')


#Set up website with index.html
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/ajax_example', methods=['POST'])
def addFlashcard():
    grade = request.form['grade']
    topic = request.form['topic']
    NumofCards = request.form['NumofCards']
    
    return generate_flashcards(NumofCards, topic, grade)

if 'app' == '__main__':
    app.run()

app.run(host='0.0.0.0', port=8080, debug=True)