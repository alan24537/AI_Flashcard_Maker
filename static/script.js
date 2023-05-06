const flashcards = document.getElementsByClassName("flashcards")[0];
const createCard = document.getElementsByClassName("create-card")[0];
// let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// contentArray.forEach(divMaker);

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

    grade.value = '';
    topic.value = '';
    NumofCards.value = '';
}

// function delFlashcards() {
//     localStorage.clear();
//     flashcards.innerHTML = '';
//     contentArray = [];
// }

// function showCreateCardBox() {
//     createCard.style.display = "block";
// }


$(document).ready(function() {
			$("#generate").click(function() {
				var grade = $("#grade").val();
				$.ajax({
					url: "/ajax_example",
					type: "POST",
					data: {grade: grade},
					success: function(result) {
						$("#result_grade").html(result.message);
					}
				});

        var topic = $("#topic").val();
				$.ajax({
					url: "/ajax_example",
					type: "POST",
					data: {topic: topic},
					success: function(result) {
						$("#result_topic").html(result.message);
					}
				});

        var topic = $("#NumofCards").val();
				$.ajax({
					url: "/ajax_example",
					type: "POST",
					data: {NumofCards: NumofCards},
					success: function(result) {
						$("#result_NumofCards").html(result.message);
					}
				});
        
			});
		});