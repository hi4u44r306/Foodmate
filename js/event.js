/*==================================Create Event Section==========================================*/
var selectedFile;
/*hide submit button*/
$( document ).ready(function(){
    $("#EventuploadButton").hide();
})

/*upload image to firebase*/
$("#Eventfile").on("change", function(event){
    selectedFile = event.target.files[0];
    $("#EventuploadButton").show();
});

/*Submit function*/
function EventuploadFile(){
    alert('You have been upload your Event image!!!!')
    // Create a root reference
    var user = firebase.auth().currentUser;
    var uid;
            if (user != null) {
                uid = user.uid;
            }
    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/EventImage' + filename);
    var uploadTask = storageRef.put(selectedFile);  
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            var postKey = firebase.database().ref('/EventImg/').push().key;
            var updates = {};
            var postData= {
                url : downloadURL,
                user : user.uid,
            };
            updates['/EventImg/'+postKey] = postData;
            firebase.database().ref().update(updates);
            console.log('File available at', downloadURL);
        });
    });
}

/*=====================================Display Event Image & Event Info=============================================== */
var user = firebase.auth().currentUser;
var uid;
            if (user != null) {
                uid = user.uid;
            }
$(document).ready(function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var token = firebase.auth().currentUser.uid;
          queryDatabase(token);
        } else {
          // No user is signed in.
        }
      });
});


function queryDatabase(token){
        var userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/EventImg/').once('value').then(function(snapshot) {
                var PostObject = snapshot.val();
                var username= (snapshot.val() && snapshot.val().username) || 'Anonymous';
                var keys = Object.keys(PostObject);
                var currentRow;
                for (var i = 0; i < keys.length; i++){
                    var currentObject = PostObject[keys[i]];
                    if (i % 3 ==0){
                        currentRow= document.createElement("div");
                        $(currentRow).addClass("row");
                        $("#eventholder").append(currentRow);
                    }
                    var col = document.createElement("div");
                    $(col).addClass("col-lg-4");
                    var image = document.createElement("img");
                    $(image).addClass("ContentImage");
                    image.src = currentObject.url;
                    var p = document.createElement("p");
                    $(p).html(currentObject.caption);
                    $(col).append(image);
                    $(col).append(p);
                    $(currentRow).append(col);
                }

                // ...
      });
}