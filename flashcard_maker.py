import openai
openai.api_key = "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"

def generate_flashcards(number_of_cards, subject, grade):
    prompt = f"""
    Can you make {number_of_cards} flashcard questions and answers for {grade} {subject}? 
    Make it in the form of Q: (question) line break then A: (answer). 
    It should have one empty line between each pair of question and answer
    """

    response = openai.ChatCompletion.create(
        engine="gpt-3.5-turbo",
        prompt=prompt,
        max_tokens=600,
        n=1,
        stop=None,
        temperature=0.7,
    )

    print(response.choices[0].text)
    
generate_flashcards(10, "imaginary", "grade 11")