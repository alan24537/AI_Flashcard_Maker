from flask import Flask, render_template, request, redirect
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
def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]



#Set up website with index.html
app = Flask('app')

@app.route('/')
def hello_world():
    return render_template('index.html')

#When the button is clicked on html, execute the function
@app.route('/submit', methods = ['POST'])
def sumbit():
  #Saves the array result of get_completion() to return_results. This allows both variables to be taken.
  return_results = get_completion()

  #Sets both values in the array to variables
  display_word = return_results[0]
  display_url = return_results[1]

  return render_template('index.html', display_word=display_word, display_url=display_url)
  


if 'app' == '__main__':
    app.run()

app.run(host='0.0.0.0', port=8080)