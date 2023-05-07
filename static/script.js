// const flashcards = document.getElementsByClassName("flashcards")[0];
const createCard = document.getElementsByClassName("create-card")[0];
// let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// // contentArray.forEach(divMaker);

// function divMaker(text) {
//     var div = document.createElement("div");
//     var h2_grade = document.createElement('h2');
//     var h2_topic = document.createElement('h2');
//     var h2_NumofCards = document.createElement('h2');

//     div.className = 'flashcard';

//     h2_grade.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
//     h2_grade.innerHTML = text.my_grade;

//     h2_topic.setAttribute("style", "text-align:center; display:none; color:red");
//     h2_topic.innerHTML = text.my_topic;

//     h2_NumofCards.setAttribute("style", "text-align:center; display:none; color:red");
//     h2_NumofCards.innerHTML = text.my_NumofCards;

//     div.appendChild(h2_grade);
//     div.appendChild(h2_topic);
//     div.appendChild(h2_NumofCards);

//     div.addEventListener("click", function () {
//     if (h2_topic.style.display == "none")
//         h2_topic.style.display = "block";
//     else
//         h2_topic.style.display = "none";
//     })

//     flashcards.appendChild(div);
// }

function addFlashcard() {
    const grade = document.getElementById("grade");
    const topic = document.getElementById("topic");
    const NumofCards = document.getElementById("NumofCards");
    var flashcard_info = {
        'my_grade': grade.value,
        'my_topic': topic.value,
        'NumofCards': NumofCards.value
    }

    console.log(flashcard_info);
}

function createFlashcard(cards) {

}

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

// function showCreateCardBox() {
//     createCard.style.display = "block";
// }


$(document).ready(function() {
    $("#generate").click(function() {
        var grade = $("#grade").val();
        $.ajax({
            url: "/ajax_grade",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({grade: grade}),
            success: function(result) {
                console.log(result);
            }
        });
        
    });
});
$(document).ready(function() {
  $("#generate").click(function() {
      var topic = $("#topic").val();
      $.ajax({
          url: "/ajax_topic",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({topic: topic}),
          success: function(result) {
              console.log(result);
          }
      });
      
  });
});
$(document).ready(function() {
    $("#generate").click(function() {
        var NumofCards = $("#NumofCards").val();
        $.ajax({
            url: "/ajax_NumofCards",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({NumofCards: NumofCards}),
            success: function(result) {
                console.log(result);    
            }
        });
        
    });
  });
  $(document).ready(function() {
    $("#generate").click(function() {
        $.ajax({
            url: "/ajax_get_cards",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function(result) {
                console.log(result); 
            
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