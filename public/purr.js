$(document).ready(function () {

    // kitty name
    localStorage.kittyName = localStorage.kittyName || 'Anonymous';
    writeNameToPage();
    $('#name').click(getNameFromUser);

    // local id: a unique identifier in case no one specifies a name
    localStorage.localId = localStorage.localId || uuidv4();
    // session id: a unique identifier to match start and end together
    sessionStorage.sessionId = Date.now();

    // score setup
    var score = 0;
    var incrementScore = setInterval(function () {
        score += 0.1;
        $('#score').html(score.toFixed(1));
    }, 100);

    // write initial score to database
    apiCheckIn('first');

    // write final score to database
    window.onbeforeunload = function (event) {
        apiCheckIn('last');
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

    function apiCheckIn(type) {
        if (type !== 'first' && type !== 'last') {
            console.error(`Invalid type: ${type}`);
            return;
        }

        data = JSON.stringify({
            name: localStorage.kittyName,
            localId: localStorage.localId,
            sessionId: sessionStorage.sessionId
        });

        $.ajax({
            type: 'post',
            url: '/api/mew/' + type,
            data: data,
            contentType: 'application/json',
            dataType: 'json',
            processData: false,

            success: function(data) {
                console.log(`Successfully registered ${type} event to database.`);
            },

            error: function(data) {
                console.log(`Failed to register ${type} event to database.`);
            },
        });
    }

});