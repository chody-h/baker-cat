// kitty name
setName();

// local id: a unique identifier in case no one specifies a name
localStorage.localId = localStorage.localId || uuidv4();

// score setup
var sessionId = new Date();
var score = 0;
var incrementScore = setInterval(function () {
    score += 0.1;
    document.getElementById('score').innerHTML = score.toFixed(1);
}, 100);


// When the user clicks on the cat's name, change the name to an input box.
// When the user presses enter or clicks out, change the input to the name.
function writeName() {
    var input = '<input type="text" id="nameInput">';
    document.getElementById('nameContainer').innerHTML = input;
    // set focus on input
    document.getElementById('nameInput').focus();

    document.getElementById('nameInput')
        .addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                var name = document.getElementById('nameInput').value;
                localStorage.kittyName = name;
                setName();
            }
        });
    document.getElementById('nameInput')
        .addEventListener('focusout', function (event) {
            var name = document.getElementById('nameInput').value;
            localStorage.kittyName = name;
            setName();
        });
}

// Hide the input box and show the new name instead.
function setName() {
    var newName = localStorage.kittyName || 'Anonymous';
    var nameDiv = '<span id="name" onclick="writeName()">' + newName + '</span>';
    document.getElementById('nameContainer').innerHTML = nameDiv;
}

// Generate a GUID for the user so we can uniquely identify baker cat sessions.
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }