/*const userFullName = document.getElementById('userFullName');
const userSurname = document.getElementById('userSurname');
const userBio = document.getElementById('userBio');
const userEmail = document.getElementById('userEmail');
const age = document.getElementById('age');
const birthDay = document.getElementById('birthDay');
const phoneNumber = document.getElementById('phoneNumber');
const foodType = document.getElementById('foodType');
const genDer = document.getElementById('genDer');
const addBtn = document.getElementById('addBtn');

const database = firebase.database();

addBtn.addEventListener('click',(e) => {
    e.preventDefault();
    database.ref('/users/'+userFullName.value).set({
        userFullName: userFullName.value,
        userSurname: userSurname.value,
        userBio: userBio.value,
        userEmail: userEmail.value,
        age: age.value,
        birthDay: birthDay.value,
        phoneNumber: phoneNumber.value,
        foodType: foodType.value,
        genDer: genDer.value
    });
});*/

// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName(){
    var userFullName = document.getElementById("userFullName").value;
    var flag = false;
    if(userFullName === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
/*function checkUserSurname(){
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userSurnameError").style.display = "block";
    }else{
        document.getElementById("userSurnameError").style.display = "none";
    }
}*/
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserAge(){
    var userAge = document.getElementById("userAge").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
    //var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }
    //else if(userSurname === ""){
    //    return checkUserSurname();
    //}
    else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                //userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userBio: "Write something in here",
                userAge: "User Age",
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace("loginpage.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
    
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Welcome to foodmate', 
            }).then((value) => {
                setTimeout(function(){
                    window.location.replace("menu.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{
            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
            //document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
            document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
            /*document.getElementById("userPfEmail").innerHTML = dataSnapShot.val().userEmail;
            document.getElementById("userPfAge").innerHTML = dataSnapShot.val().userAge;
            document.getElementById("userPfBirthday").innerHTML = dataSnapShot.val().userBirthday;
            document.getElementById("userPfPhoneNumber").innerHTML = dataSnapShot.val().userPhoneNumber;
            document.getElementById("userPfFoodType").innerHTML = dataSnapShot.val().userFoodType;
            document.getElementById("userPfGender").innerHTML = dataSnapShot.val().userGender;*/
        })
    } else {
    //   No user is signed in.
    }
});
// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm(){
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    //var userPfSurname = document.getElementById("userPfSurname").innerHTML;
    var userPfBio = document.getElementById("userPfBio").innerHTML;
    /*var userPfEmail = document.getElementById("userPfEmail").innerHTML;
    var userPfAge = document.getElementById("userPfAge").innerHTML;
    var userPfBirthday = document.getElementById("userPfBirthday").innerHTML;
    var userPfPhoneNumber = document.getElementById("userPfPhoneNumber").innerHTML;
    var userPfFoodType = document.getElementById("userPfFoodType").innerHTML;
    var userPfGender = document.getElementById("userPfGender").innerHTML;*/
    document.getElementById("userFullName").value = userPfFullName; 
    //document.getElementById("userSurname").value = userPfSurname; 
    document.getElementById("userBio").value = userPfBio; 
    /*document.getElementById("userEmail").value = userPfEmail; 
    document.getElementById("age").value = userPfAge; 
    document.getElementById("birthday").value = userPfBirthday; 
    document.getElementById("phoneNumber").value = userPfPhoneNumber; 
    document.getElementById("foodType").value = userPfFoodType; 
    document.getElementById("genDer").value = userPfGender;*/
}

// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile(){
    let userFullName = document.getElementById("userFullName").value 
    //let userSurname = document.getElementById("userSurname").value 
    let userBio = document.getElementById("userBio").value
    /*let userEmail = document.getElementById("userEmail").value
    let userAge = document.getElementById("age").value
    let userBirthday = document.getElementById("birthday").value
    let userPhoneNumber = document.getElementById("phoneNumber").value
    let userFoodType = document.getElementById("foodType").value
    let userGender = document.getElementById("genDer").value*/
    var userFullNameFormate = /^([A-Za-z.\s_-])/; 
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }
    //}else if(userSurname === ""){
    //    return checkUserSurname();
    //}
    else{
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userFullName: userFullName,
            //userSurname: userSurname,
            userBio: userBio,
            /*userEmail: userEmail,
            userAge: userAge,
            userBirthday: userBirthday,
            userPhoneNumber: userPhoneNumber,
            userFoodType: userFoodType,
            userGender: userGender,*/
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.', 
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("profileSection").style.display = "block";

                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Log Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("loginpage.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}



/*Below is okay */

/*read URL
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#p-image')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
*/

/*Forgot Password*/
$("#btn-resetPassword").click(function()
{
    var auth = firebase.auth();
    var email = $("#userSIEmail").val();

    if(email != "")
    {
        auth.sendPasswordResetEmail(email).then(function()
        {
            window.alert("Email has been sent to you, Please check and Verify");
        })
        .catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            onsole.log(errorMessage);

            window.alert("Message : " + errorMessage);
        });
    }
    else
    {
        window.alert("Please write your email first");
    }
});


/*================================Profile Section======================================*/
var selectedFile;
/*hide submit button*/
$( document ).ready(function(){
    $("#uploadButton").hide();
})

/*upload image to firebase*/
$("#file").on("change", function(event){
    selectedFile = event.target.files[0];
    $("#uploadButton").show();
});

/*Submit function*/
function uploadFile(){
    alert('You have been upload your profile picture!!!!')
    // Create a root reference
    var user = firebase.auth().currentUser;
    var uid;
            if (user != null) {
                uid = user.uid;
            }
    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/profileImage' + filename);
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
            var postKey = firebase.database().ref('/UserProfileImg/').push().key;
            var updates = {};
            var postData= {
                url : downloadURL,
                user : user.uid,
            };
            updates['/UserProfileImg/'+postKey] = postData;
            firebase.database().ref().update(updates);
            console.log('File available at', downloadURL);
        });
    });
}

/*=====================================Display Profile Image===============================================
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
            return firebase.database().ref('/UserProfileImg/').once('value').then(function(snapshot) {
                var PostObject = snapshot.val();
                var username= (snapshot.val() && snapshot.val().username) || 'Anonymous';
                var Keys = Object.keys(PostObject);
                var currentRow;
                for (var i = 0; i < keys.length; i++){
                    var currentObject = PostObject[Keys[i]];
                    if (i % 3 == 0){
                        currentRow= document.createElement("div");
                        $(currentRow).addClass("row");
                        $("#ImgHolder").append(currentRow);
                    }
                    var col = document.createElement("div");
                    $(col).addClass("col-lg-12");
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
 */

