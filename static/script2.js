function createFlashcards(raw_fcs) {
    let questions = [];
    let answers = [];
    
    for (let i = 0; i < raw_fcs.length; i ++) {
        questions.push(raw_fcs[i][0]);
    }
    for (let i = 0; i < raw_fcs.length; i ++) {
        answers.push(raw_fcs[i][1]);
    }

    const flashcards = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = answers[i];

      const flashcard = {
        question: question,
        answer: answer,
        flipped: false
      };

      flashcards.push(flashcard);
    }

    return flashcards;
  }

function delFlashcards() {
    const flashcardsContainer = document.getElementById('flashcards-container');
    // Clear the div
    while (flashcardsContainer.firstChild) {
        flashcardsContainer.removeChild(flashcardsContainer.firstChild);
    }
}

function fileToText(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            var text = reader.result;
            resolve(text);
        }
        reader.onerror = reject;
    });
}
$(document).ready(function() {
    $("#generate").click(async function() {
        var note = await fileToText(document.getElementById("note").files[0]);
        var ex = document.getElementById("note").files[0].name.split(".").pop();
        var NumofCards = $("#NumofCards").val();
        document.getElementById("loading_circle").style.width = "7%";
        document.getElementById("loading_circle").style.height = "7%";
        $.ajax({
            url: "/note/ajax_create_cards",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                note: note, 
                NumofCards: NumofCards, 
                ex: ex}),
            success: function(result) {
                console.log(result); 
            
                document.getElementById("loading_circle").style.width = "0%";
                document.getElementById("loading_circle").style.height = "0%";

                const flashcards = createFlashcards(result);

                const flashcardsContainer = document.getElementById('flashcards-container');

                flashcards.forEach(flashcard => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('flashcard');
                cardElement.innerHTML = `
                    <div class="front">
                    ${flashcard.question}
                    </div>
                    <div class="back">
                    ${flashcard.answer}
                    </div>
                `;
                cardElement.addEventListener('click', () => {
                    cardElement.classList.toggle('flipped');
                    flashcard.flipped = !flashcard.flipped;
                });
                flashcardsContainer.appendChild(cardElement);
                });
            }
        });
        
    });
});

  const navSlide = () => {
    const e = document.querySelector(".e");
    const navbar = document.querySelector(".nav-bar");
    const navLinks = document.querySelectorAll(".nav-bar li");

    e.onclick = () => {
       
    navbar.classList.toggle("nav-active");
        
     //Animation links
    navLinks.forEach((link, index) => {
       if (link.style.animation) {
           link.style.animation = "";
       } else {
           link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7+1}s`;
          }
       });
     //e animation
    e.classList.toggle("toggle");
   }
    
   }

window.onload = () => navSlide();