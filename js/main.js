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
function login() {

  var InputUse = document.getElementById("UserName").value;
  var InputPwd = document.getElementById("UserPwd").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(InputUse, InputPwd)
    .then(function (user) {
      window.location.href = "menu.html";

    }).catch(function (error) {
      alert(error.message)
    });
}

//signup//
const auth = firebase.auth();

function signUp() {

  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));

  alert("Signed Up");

}

//Logout//

function signOut() {

  auth.signOut();
  alert("Signed out")
}

auth.onAuthStateChanged(function (user) {

  if (user) {

    var email = user.email;
    alert("Active User" + email);

  } else {
    alert("No Active User");

  }

});

/*create event*/
function CreateOneEvent() {
  alert("test");

  x = document.getElementById("FoodCategory");
  var i = x.selectedIndex;
  var FoodCategory = x.options[i].text;
  x = document.getElementById("EventName");
  var EventName = x.value;
  x = document.getElementById("EventDate");
  var EventDate = x.value;
  x = document.getElementById("Member");
  var Member = x.value;
  x = document.getElementById("Description");
  var Description = x.value;
  x = document.getElementById("Location");
  var Location = x.value;
  alert(FoodCategory + "," + EventName + "," + EventDate + "," + Member + "," + Description + "," + Location);
  AddData(FoodCategory, EventName, EventDate, Member, Description, Location)
}

/*create successfully*/
function AddData(P1, P2, P3, P4, P5, P6) {
  var User = "Paul";
  //alert("AAA");
  //var User = firebase.auth().currentUser;
  //alert("Test"+User);
  var K = P2 + " " + P3;
  var ref = db.collection('Foodmate').doc(K);
  ref.set({
    FoodCategory: P1, EventName: P2, EventDate: P3, Member: P4, Description: P5, Location: P6
  }).then(() => {
    alert('新增成功');
  });
}