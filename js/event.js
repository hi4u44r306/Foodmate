// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if (user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot) => {
            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
            document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
            document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
            document.getElementById("userPfAge").innerHTML = dataSnapShot.val().userAge;
        })
    } else {
        //   No user is signed in.
    }
});


/*==================================Create Event Section==========================================*/
var selectedFile;
/*hide submit button*/
$(document).ready(function(){
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
    var storageRef = firebase.storage().ref('/Event/' + filename);
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
            var postKey = firebase.database().ref('/Event/').push().key;
            var updates = {};
            var postData= {
                url : downloadURL,
                FoodCat: $("#FoodCategory").val(),
                EventN: $("#EventName").val(),
                EventD: $("#EventDate").val(),
                EventT: $("#Eventtime").val(),
                EventM: $("#Eventmember").val(),
                Des: $("#Description").val(),
                address: $("#address").val(),
                user : user.uid,
            };
            updates['/Event/'+postKey] = postData;
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
            return firebase.database().ref('/Event/').once('value').then(function(snapshot) {
                var PostObject = snapshot.val();
                var username= (snapshot.val() && snapshot.val().username) || 'Anonymous';
                var keys = Object.keys(PostObject);
                var currentRow;
                for (var i = 0; i < keys.length; i++){
                    var currentObject = PostObject[keys[i]];
                    if (i % 3 == 0){
                        currentRow= document.createElement("div");
                        $(currentRow).addClass("row p-5");
                        $("#contentholder").append(currentRow);
                    }
                    var col = document.createElement("div");
                    $(col).addClass("col-lg-4");
                    var image = document.createElement("img");
                    $(image).addClass("contentImage");
                    image.src = currentObject.url;
                    var p = document.createElement("p");
                    $(p).html(currentObject.EventN);
                    //$(p).html(currentObject.FoodCat);
                    //$(p).html(currentObject.EventD);
                    //$(p).html(currentObject.EventT);
                    //$(p).html(currentObject.EventM);
                    //$(p).html(currentObject.Des);
                    //$(p).html(currentObject.address);
                    $(p).addClass("contentcaption");
                    var button= document.createElement("button");
                    $(button).on("click", function(event){
                        //join button will add
                        alert('test');
                    })
                    $(col).append(image);
                    $(col).append(p);
                    $(col).append(button);
                    $(currentRow).append(col);
                }
      });
}