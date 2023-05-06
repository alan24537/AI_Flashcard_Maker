const flashcards = document.getElementsByClassName("flashcards")[0];
const createCard = document.getElementsByClassName("create-card")[0];
const grade = document.getElementById("grade");
const topic = document.getElementById("topic");
const NumofCards = document.getElementById("NumofCards");
let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

contentArray.forEach(divMaker);

function divMaker(text) {
    var div = document.createElement("div");
    var h2_grade = document.createElement('h2');
    var h2_topic = document.createElement('h2');
    var h2_NumofCards = document.createElement('h2');

    div.className = 'flashcard';

    h2_grade.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
    h2_grade.innerHTML = text.my_grade;

    h2_topic.setAttribute("style", "text-align:center; display:none; color:red");
    h2_topic.innerHTML = text.my_topic;

    h2_NumofCards.setAttribute("style", "text-align:center; display:none; color:red");
    h2_NumofCards.innerHTML = text.my_NumofCards;

    div.appendChild(h2_grade);
    div.appendChild(h2_topic);
    div.appendChild(h2_NumofCards);

    div.addEventListener("click", function () {
    if (h2_topic.style.display == "none")
        h2_topic.style.display = "block";
    else
        h2_topic.style.display = "none";
    })

    flashcards.appendChild(div);
}

function addFlashcard() {
    var flashcard_info = {
        'my_grade': grade.value,
        'my_topic': topic.value,
        'NumofCards': NumofCards.value
    }
    console.log(flashcard_info);

    contentArray.push(flashcard_info);
    localStorage.setItem('items', JSON.stringify(contentArray));
    divMaker(contentArray[contentArray.length - 1]);
    grade.value = '';
    topic.value = '';
    NumofCards.value = '';
}

function delFlashcards() {
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

function showCreateCardBox() {
    createCard.style.display = "block";
}
