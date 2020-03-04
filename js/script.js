/* Store HTML references */
const quizHolder = document.getElementById("quiz");
const resultsHolder = document.getElementById("results");
const submitButton = document.getElementById("submit");
const api =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";
(function() {
  // Begin scoping function
  fetch(api)
    .then(response => response.json())
    .then(data => {
      let items = data.results;
      var solutions = [];

      function buildQuiz() {
        /* Store HTML output */
        const output = [];
        var question = [];

        for (let i = 0; i < items.length; i++) {
          question = items[i];

          /* Pushing the question to HTML */
          output.push(
            `
            <h3 id="ask${i + 1}" class="question">
            <span>Category: ${question.category}</span> | 
            <span>Difficulty: ${question.difficulty}</span><br>
            <span class="result correct" id="correct${i}">+</span>
            <span class="result wrong" id="wrong${i}">-</span>
            <b>${i + 1}: </b>
            ${question.question}
            </h3>
            `
          );

          /* Pushing correct answers to solutions array to interact with results */
          solutions.push(question.correct_answer);

          /* Combine to HTML string */
          quizHolder.innerHTML = output.join("");
        }
      }

      /* Show the quiz */
      buildQuiz();

      $("#ask1").show();
      var correctPoints = 0;
      var counter = 20;
      var arr = [];
      var tot = "";
      var num = 1;

      var interval = setInterval(function() {
        counter -= 1;
        $("#time").text(counter);
        if (counter == 6) {
          $("#timer").css("color", "yellow");
        }
        if (counter == 0 && num <= 10) {
          $("button").hide();
          $("h3").hide();
          $("#time").hide();
          $("h1").hide();
          $("#questionMark").hide();
          $("#timeout").show();
          $("#retryButton").show();
          sfondo("black");
        } //set timeout
      }, 1000); //set interval
      //false section start
      $("#F").click(function() {
        arr.push("False");
        $("#ans" + num).text("False");
        counter = 20;
        num += 1;
        tot = "ask" + num;
        if (num <= 10) {
          $(".question").hide();
          $("#" + tot).show();
        } //if continue
        else {
          $("button").hide();
          $("#time").hide();
          $("h3").show();
          $("h4").show();
          $("#retryButton").show();
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] === solutions[i]) {
              $("#correct" + i).show();
              correctPoints += 1;
            } //if show correct solutions
            else {
              $("#wrong" + i).show();
            } //else show wrong solutions
            $("#score").text("Score: " + correctPoints + "/10");
          } //for
        } //else  complete
      });
      //true section start
      $("#T").click(function() {
        arr.push("True");
        $("#ans" + num).text("True");
        num += 1;
        tot = "ask" + num;
        counter = 20;
        if (num <= 10) {
          $(".question").hide();
          $("#" + tot).show();
        } //if continue
        else {
          $("button").hide();
          $("#time").hide();
          $("h3").show();
          $("h4").show();
          $("#retryButton").show();
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] === solutions[i]) {
              $("#correct" + i).show();
              correctPoints += 1;
            } //if show correct solutions
            else {
              $("#wrong" + i).show();
            } // else show wrong solutions
            $("#score").text("Score " + correctPoints + " /10");
          } //for
        } // else complete
      }); //V click
      $("#retryButton").click(function() {
        location.reload(false);
      });
    })
    .catch(error => console.error(error));
})(); // End scoping function
