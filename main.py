from flask import Flask, render_template, request, Response
from flashcard_maker import generate_flashcards, generate_flashcards_with_note
import genanki
import openai
openai.api_key  = ('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')
arr =[]

#Set up website with index.html
app = Flask(__name__)

@app.route('/')
def render_home():
    return render_template('index.html')

@app.route('/note')
def render_note():
    print("note")
    return render_template('index2.html')

@app.route('/ajax_get_cards', methods=['POST'])
def ajax_send_cards():
    data = request.get_json()
    grade = data['grade']
    topic = data['topic']
    NumofCards = data['NumofCards']
    details = data['details']
    
    return generate_flashcards([grade, topic, NumofCards, details])
     
     
@app.route('/note/ajax_create_cards', methods=['POST'])
def ajax_get_note():
    data = request.get_json()
    note = data['note']
    NumofCards = data['NumofCards']
    ex = data['ex']
    arr=generate_flashcards_with_note([note, ex, NumofCards])
    return arr

#DOWNLOAD
@app.route('/download-deck')
def download_deck():
    questions=[]
    answers=[]
    for i in range (0, arr.len()):
        questions.append(arr[i])
        answers.append(arr[i])

    # create an Anki deck
    model = genanki.Model(
        1607392319,
        'Simple Model',
        fields=[{'name': 'Question'}, {'name': 'Answer'}],
        templates=[{
            'name': 'Card 1',
            'qfmt': '{{Question}}',
            'afmt': '{{FrontSide}}<hr id="answer">{{Answer}}',
        }]
    )

if 'app' == '__main__':
    app.run()

app.run(host='0.0.0.0', port=8080, debug=True)

#DOWNLOAD
@app.route('/download-deck')
def download_deck():
    questions=[]
    answers=[]
    for i in range (0, arr.len()):
        questions.append(arr[i])
        answers.append(arr[i])

    # create an Anki deck
    model = genanki.Model(
        1607392319,
        'Simple Model',
        fields=[{'name': 'Question'}, {'name': 'Answer'}],
        templates=[{
            'name': 'Card 1',
            'qfmt': '{{Question}}',
            'afmt': '{{FrontSide}}<hr id="answer">{{Answer}}',
        }]
    )
    deck = genanki.Deck(
        2059400110,
        'Example Deck'
    )
    
    for i in range(len(questions)):
        note = genanki.Note(
            model=model,
            fields=[questions[i], answers[i]]
        )
        deck.add_note(note)

    # return the deck as a file
    deck_bytes = deck.write_to_bytes()
    return Response(
        deck_bytes,
        mimetype='application/octet-stream',
        headers={
            'Content-Disposition': 'attachment; filename=example_deck.apkg'
        }
    )




     
if 'app' == '__main__':
    app.run()

app.run(host='0.0.0.0', port=8080, debug=True)