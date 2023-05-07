from flask import Flask, render_template, request, jsonify
from flashcard_maker import generate_flashcards, generate_flashcard_with_description, generate_flashcards_with_note
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

data_list = []

@app.route('/')
def render_home():
    return render_template('index.html')

@app.route('/note')
def render_note():
    print("note")
    return render_template('index2.html')

@app.route('/ajax_grade', methods=['POST'])
def ajax_get_grade():
    data = request.get_json()
    grade = data['grade']
    data_list.append(grade)
    return grade
    
@app.route('/ajax_topic', methods=['POST'])
def ajax_get_topic():
    data = request.get_json()
    topic = data['topic']
    data_list.append(topic)
    return topic
    
@app.route('/ajax_NumofCards', methods=['POST'])
def ajax_get_numOfCards():
    data = request.get_json()
    NumofCards = data['NumofCards']
    data_list.append(NumofCards)
    return NumofCards

@app.route('/ajax_get_cards', methods=['POST'])
def ajax_send_cards():
    print(data_list)
    cards = generate_flashcards(data_list)
    data_list.clear()
    return jsonify(cards)
     
if 'app' == '__main__':
    app.run()

app.run(host='0.0.0.0', port=8080, debug=True)