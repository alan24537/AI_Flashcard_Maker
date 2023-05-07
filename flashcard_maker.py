import openai
openai.api_key = "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"

def __conversion(st,num):
    st = st.split("\n")
    news = list(filter(None, st))

    newnews = []
    for i in range(num):
        card = [news[i*2],news[i*2+1]]
        newnews.append(card)
    return newnews

def generate_flashcards(data):
    grade = data[0]
    subject = data[1]
    number_of_cards = data[2]
    desc = data[3]
    
    if desc == "":
        prompt = f"""
        Make {number_of_cards} flashcard questions and answers for {grade} {subject}. 
        It must follow the format of Question \\n Answer \\n\\n the repeat for the next set of questions and answers.
        """
    else:
        prompt = f"""
        Make {number_of_cards} flashcard questions and answers for grade {grade} {subject}. 
        It must follow the format of Question \\n Answer \\n\\n the repeat for the next set of questions and answers.
        Extra Details: {desc}
        """

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=600,
        n=1,
        stop=None,
        temperature=0.7,
    )
    print("________________")
    print(response.choices[0].text)
    print("________________")
    
    cards = __conversion(response.choices[0].text,int(number_of_cards))
    return cards

    

def generate_flashcards_with_note(data):
    note = data[0]
    file_ex = data[1]
    number_of_cards = data[2]
    
    prompt = f"""
    Using the following note (which is a .{file_ex} file), generate {number_of_cards} flashcard questions and answers.
    It must follow the format of Question: (actual question) \\n Answer: (actual answer) \\n\\n the repeat for the next set of questions and answers.
    Note: {note}
    """
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=600,
        n=1,
        stop=None,
        temperature=0.7,
    )
    print("________________")
    print(response.choices[0].text)
    print("________________")
    
    cards = __conversion(response.choices[0].text,int(number_of_cards))
    return cards