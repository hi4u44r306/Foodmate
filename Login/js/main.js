(function ($) {
  "use strict";

  /*==================================================================
    [ Focus Contact2 ]*/
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);

/*--------------------login function-----------------------------------*/
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDsdhPvgN77OI8NmoDyKUe6skFt0tICQaE",
  authDomain: "foodm-25102.firebaseapp.com",
  databaseURL: "https://foodm-25102.firebaseio.com",
  projectId: "foodm-25102",
  storageBucket: "foodm-25102.appspot.com",
  messagingSenderId: "445892133338",
  appId: "1:445892133338:web:added75b00be7925bac0e3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();


function signIn() {

  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));



  //Take user to a different or home page

}

function signOut() {

  auth.signOut();
  alert("Signed Out");

}


auth.onAuthStateChanged(function (user) {

  if (user) {

    var email = user.email;
    window.location.href = 'file:///C:/Users/mcu/Downloads/Foodmate%20website%20firebase%20works/menu/menu.html';

    //is signed in

  } else {

    alert("Welcome to Foodmate")
  };

  //no user is signed in   
});


