import openai
openai.api_key = "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"

def conversion(st,num):
    st = st.split("\n")
    news = list(filter(None, st))

    newnews = []
    for i in range(num):
        card = [news[i*2],news[i*2+1]]
        newnews.append(card)
    return newnews

def generate_flashcards(number_of_cards, subject, grade):
    prompt = f"""
    Can you make {number_of_cards} flashcard questions and answers for {grade} {subject}? 
    Make it in the form of Q: (question) line break then A: (answer). 
    It should have one empty line between each pair of question and answer
    """

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=600,
        n=1,
        stop=None,
        temperature=0.7,
    )
    
    print(conversion(response.choices[0].text,number_of_cards))
    
generate_flashcards(10, "imaginary", "grade 11")