$(document).ready(function () {

    // kitty name
    localStorage.kittyName = localStorage.kittyName || 'Anonymous';
    writeNameToPage();
    $('#name').click(getNameFromUser);

    // local id: a unique identifier in case no one specifies a name
    localStorage.localId = localStorage.localId || uuidv4();

    // score setup
    var sessionId = new Date();
    var score = 0;
    var incrementScore = setInterval(function () {
        score += 0.1;
        $('#score').html(score.toFixed(1));
    }, 100);

    // write final score to database
    window.onbeforeunload = function (event) {
        console.log("now is the time to save to the database");
    };


    // When the user clicks on the cat's name, change the name to an input box.
    // When the user presses enter or clicks out, change the input to the name.
    function getNameFromUser() {
        // show input, hide name
        $('#nameInput').removeClass('hidden');
        $('#name').addClass('hidden');
        nameInput.value = localStorage.kittyName || 'Anonymous';
        // set focus on input
        nameInput.focus();
        nameInput.select();

        $('#nameInput')
            .keyup(function (event) {
                if (event.key === 'Enter') {
                    localStorage.kittyName = $('#nameInput').val() || "Anyonymous";
                    writeNameToPage();
                }
            })
            .focusout(function (event) {
                localStorage.kittyName = $('#nameInput').val() || "Anyonymous";
                writeNameToPage();
            });
    }

    // Hide the input box and show the new name instead.
    function writeNameToPage() {
        $('#name').html(localStorage.kittyName);
        $('#nameInput').addClass('hidden');
        $('#name').removeClass('hidden');
    }

    // Generate a GUID for the user so we can uniquely identify baker cat sessions.
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

});