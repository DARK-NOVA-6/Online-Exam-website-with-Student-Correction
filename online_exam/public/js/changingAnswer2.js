$(document)
    .on("click",
        function(e) {
            if (e.target.type == "checkbox" || e.target.type == "radio") {
                if (isSolvedQuestion()) {
                    if (getSelectedOptions().length == 0) {
                        nQuesLeft++;
                    }
                } else {
                    if (getSelectedOptions().length > 0) {
                        nQuesLeft--;
                    }
                }
                changeSelected();
                sendQueryUpdateAnswer(concat(getSelectedOptions()));
                $("#nQuesLeft")
                    .text(nQuesLeft);
            }
        }
    );


$(document)
    .ready(
        () => {
            $('#textAnswerContent')
                .change(
                    () => {
                        newS = $('#textAnswerContent')
                            .val();
                        if (questions[currQues].answer.length == 0)
                            if (newS.length != 0)
                                nQuesLeft--;


                        if (questions[currQues].answer.length != 0)
                            if (newS.length == 0)
                                nQuesLeft++;

                        changeAnswer('textAnswerContent');
                        sendQueryUpdateAnswer(newS);
                        $("#nQuesLeft")
                            .text(nQuesLeft);
                    }
                )
        }
    );

function getSelectedOptions() {
    answer = [];
    for (o in questions[currQues].options) {
        if (o == 0)
            continue;
        order = questions[currQues].options[o].order;
        if (($('#opt' + order).prop('checked')) == true) {
            answer.push(order);
        }
    }
    return answer;
}

function isSolvedQuestion() {
    for (o in questions[currQues].options) {
        if (o == 0)
            continue;
        if (questions[currQues].options[o].isSelected) {
            return true;
        }
    }
    return false;
}

function changeSelected() {
    selected = getSelectedOptions();
    for (option in questions[currQues].options) {
        if (option == 0)
            continue;
        order = questions[currQues].options[option].order;
        getOptionByOrder(order).isSelected =
            selected.includes(order);
    }
}

function changeAnswer(id) {
    text = $('#' + id)
        .val();
    questions[currQues].answer = text;
}

function getOptionByOrder(order) {
    for (option in questions[currQues].options) {
        if (questions[currQues].options[option].order == order)
            return questions[currQues].options[option];
    }
    return null;
}

function concat(answer) {
    concatinatedAsnwer = '';
    answer.forEach(e => {
        concatinatedAsnwer += (e + ',');
    });
    return concatinatedAsnwer;
}


function sendQueryUpdateAnswer(answerAsString) {
    console.log(questions[currQues].id + ' ' + answerAsString);
};