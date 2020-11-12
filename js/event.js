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
    alert('Event created succesfully')
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
                    if (i % 4 == 0){
                        currentRow= document.createElement("div");
                        $(currentRow).addClass("row p-5");
                        $("#contentholder").append(currentRow);
                    }
                    var col = document.createElement("div");
                    $(col).addClass("col-lg-3");
                    var image = document.createElement("img");
                    $(image).addClass("contentImage");
                    image.src = currentObject.url;
                    var p1 = document.createElement("p");
                    $(p1).html(currentObject.EventN);
                    $(p1).addClass("EventTitle");
                    /*var p2 = document.createElement("p");
                    $(p2).html(currentObject.FoodCat);
                    $(p2).addClass("contentcaption");*/
                    var p3 = document.createElement("p");
                    $(p3).html(currentObject.EventD);
                    $(p3).addClass("EDate");
                    var p4 = document.createElement("p");
                    $(p4).html(currentObject.EventT);
                    $(p4).addClass("ETime");
                    var p5 = document.createElement("p");
                    $(p5).html(currentObject.EventM);
                    $(p5).append('<i class="fas fa-user"></i>')
                    $(p5).addClass("EMember");
                    /*var p6 = document.createElement("p");
                    $(p6).html(currentObject.Des);
                    $(p6).addClass("contentcaption");
                    var p7 = document.createElement("p");
                    $(p7).html(currentObject.address);
                    $(p7).addClass("contentcaption");*/

                    /*Join Button Auto Create*/
                    var joinbtn= document.createElement("button");
                    $(joinbtn).addClass("joinbtn")
                    joinbtn.innerHTML = "CLICK ME"; 
                    joinbtn.setAttribute('content', 'JOIN');
                    joinbtn.textContent = 'Join';
                    $(joinbtn).on("click", function(event){
                        
                        alert('test Join');
                    });
                    /*Search Button Auto Create*/
                    var morebtn= document.createElement("button");
                    $(morebtn).addClass("morebtn")
                    morebtn.innerHTML = "CLICK ME"; 
                    morebtn.setAttribute('style', 'background-color: black,font-color: white');
                    morebtn.setAttribute('content', 'Learn More');
                    morebtn.textContent = 'Learn More....';
                    $(morebtn).on("click", function(event){
                        popUp();
                    });
                    /*Update Button Auto Create
                    var updatebtn= document.createElement("button");
                    $(updatebtn).addClass("updatebtn")
                    updatebtn.innerHTML = "CLICK ME"; 
                    updatebtn.setAttribute('style', 'background-color: black,font-color: white');
                    updatebtn.setAttribute('content', 'Update');
                    updatebtn.textContent = 'Update';
                    $(updatebtn).on("click", function(event){
                        //join button will add
                        alert('test Update');
                    });
                    /*Delete Button Auto Create
                    var deletebtn= document.createElement("button");
                    $(deletebtn).addClass("deletebtn")
                    deletebtn.innerHTML = "CLICK ME"; 
                    deletebtn.setAttribute('style', 'background-color: black,font-color: white');
                    deletebtn.setAttribute('content', 'DELETE');
                    deletebtn.textContent = 'Delete';
                    $(deletebtn).on("click", function(event){
                        //join button will add
                        alert('test delete');
                    });*/

                    $(col).append(image);
                    $(col).append(p1,p3,p4,p5,joinbtn,morebtn);
                    
                    $(currentRow).append(col);
                }
      });
}

function popUp(){
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'test';
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    cancel.innerHTML = '&times;';
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
    var message = document.createElement('span');
    message.innerHTML = "There will have event detail here";
    popup.appendChild(message);                                    
    popup.appendChild(cancel);
    document.body.appendChild(popup);
    }


 // Get the modal
 var modal = document.getElementById("myModal");

 // Get the button that opens the modal
 var btn = document.getElementsByClassName("morebtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal
 btn.onclick = function () {
   modal.style.display = "block";
 };

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
   modal.style.display = "none";
 };

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 };