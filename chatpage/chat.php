<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>

<!-- Include Firebase Database -->
<script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-database.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBg9H7N-ac0U50o8kqLg42GWanBXcUXkeA",
        authDomain: "test-566bf.firebaseapp.com",
        databaseURL: "https://test-566bf.firebaseio.com",
        projectId: "test-566bf",
        storageBucket: "test-566bf.appspot.com",
        messagingSenderId: "644388114136",
        appId: "1:644388114136:web:40128730da3253ef5c91ad"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var myName = prompt("Enter your name");
</script>

<!-- create a form to send message -->
<form onsubmit="return sendMessage();">
    <input id="message" placeholder="Enter message" autocomplete="off">
 
    <input type="submit">
</form>
     
<script>
    function sendMessage() {
        // get message
        var message = document.getElementById("message").value;
 
        // save in database
        firebase.database().ref("messages").push().set({
            "sender": myName,
            "message": message
        });
 
        // prevent form from submitting
        return false;
    }
</script>

<!-- create a list -->
<ul id="messages"></ul>
     
<script>
    // listen for incoming messages
    firebase.database().ref("messages").on("child_added", function (snapshot) {
        var html = "";
        // give each message a unique ID
        html += "<li id='message-" + snapshot.key + "'>";
        // show delete button if message is sent by me
        if (snapshot.val().sender == myName) {
            html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                html += "Delete";
            html += "</button>";
        }
        html += snapshot.val().sender + ": " + snapshot.val().message;
        html += "</li>";
 
        document.getElementById("messages").innerHTML += html;
    });
</script>

