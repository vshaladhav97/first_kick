$(document).ready(function () {

    // Handler for .ready() called.
    $('html, body').animate({
        scrollTop: $('#login-div').offset().top}, 1000);
});
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }


function checkForm(form) {

    if ($("#imageUpload").val() == "") {
          $('#imageUpload').parent().append('<span class="error">Please upload image.</span>').addClass("has-error");
          return false;
      }
    if (IsEmail($("#email").val()) == false) {
       $('#email').parent().append('<span class="error">Please enter email.</span>').addClass("has-error");
       return false;
    }
     if ($("#first_name").val() == "") {
          $('#first_name').parent().append('<span class="error">Please enter first name.</span>').addClass("has-error");
          return false;
      }

      if ($("#last_name").val() == "") {
          $('#last_name').parent().append('<span class="error">Please enter last name.</span>').addClass("has-error");
          return false;
      }

//      if ($("#mobile").val() == "") {
//          $('#mobile').parent().append('<span class="error">Please enter mobile.</span>').addClass("has-error");
//          return false;
//      }
//
//      if ($("#address").val() == "") {
//          $('#address').parent().append('<span class="error">Please enter address.</span>').addClass("has-error");
//          return false;
//      }
//
//      if ($("#postal_code").val() == "") {
//          $('#postal_code').parent().append('<span class="error">Please enter postal code.</span>').addClass("has-error");
//          return false;
//      }

//    if (isValidPostcode($("#postal_code").val()) == false) {
//      return false;
//    }

    if ($("#password").val().length < 12) {
       $('#password').parent().append('<span class="error">Password should be minimum 12 characters.</span>').addClass("has-error");
       return false;
    }
  }


  $("#first_name,#last_name").on("keypress", function (event) {
    var regex = new RegExp("^[a-zA-Z \b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  });

  $("#mobile,#landline").on("keypress keyup blur",function (event) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
  });

  $("#myModal").on("hidden.bs.modal", function () {
    location.reload();
    });

$(document).on('submit', '#sign-up', function (e) {
    validation = checkForm();
    if (validation == false) {
      return false;
    }
    let formData = new FormData($("#sign-up")[0]);
    $.ajax({
        url: "/staff/",
        method : "POST",
        enctype: 'multipart/form-data',
        data : formData,
        contentType : false,
        processData: false,
        async : false,
        success: function (data) {
            console.log(data);
            $('#myModal').modal('show');
        },
        error: function (data) {
            console.log(data);
        },
    });
})



function editSuperUser(id){
    window.location.href = "/super_user_edit/"+id
}

function setSuperUser(id)
{
    $('#super_user_id').val(id);
}

function deleteStaffRecord(){
//     var token = sessionStorage.getItem("UserDetails");
//    var access = JSON.parse(token)
    id = $('#super_user_id').val();
    $.ajax({
        type: 'delete',
        url: '/super_user/'+id,
//        headers: { Authorization: 'Bearer ' + access.access },
        data: {

        },
        success: function(data) {
            location.reload();
        },
        error: function(data) {
            console.log(data);
//                $('#error-msg').text(data.responseJSON.status);
            },
        });
}