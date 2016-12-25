$(document).ready(function () {
    $(".loader").fadeOut("slow");
    

    // Login registration form
    $('.login').click(function () {
        window.loginstate = document.getElementById("loginid").className;
        window.regstate = document.getElementById("registerid").className;
    });

    var fun1 = function(){
         $('#loginid').addClass('modal-login');
            $('#registerid').removeClass('register');
            $('.modal-register-btn').hide();
            $('.modal-login-btnbtn').show();
            $('.modal-title').html("Register Your Account");
            $('#center-line').addClass('center-line-register');
            $('#center-line').removeClass('center-line-login');
            $('.modal-social-icons').css("padding-top", "50%");
            $('.social-login-text').html("Sign up with<br/> Social Media Accounts");
            $('.newto-alert').addClass("hide");
    }
    
    var fun2 = function(){
        $('#loginid').removeClass('modal-login');
            $('#registerid').addClass('register');
            $('.modal-register-btn').show();
            $('.modal-login-btnbtn').hide();
            $('.modal-title').html("Login to Your Account");
            $('#center-line').addClass('center-line-login');
            $('#center-line').removeClass('center-line-register');
            $('.modal-social-icons').css("padding-top", "0%");
            $('.social-login-text').html("Sign in with<br/> Social Media Accounts");
            // $('newto-alert').addClass("hide");
    }

    if (loginstate = 'modal-login') {
        $('.modal-login-btnbtn').hide();
        $('#center-line').removeClass('center-line-register');
        $('.modal-social-icons').css("padding-top", "0%");
        //            $('.social-login-text').addClass("hide");
        $('.social-login-text').html("Sign in with<br/> Social Media Accounts");
    }

    $('.login').click(function (callback) {
        if (loginstate == 'modal-login') {
            fun2();
        }
    });
    
  
    
    $('#signup-r').click(function(callback) {
        if (loginstate != 'modal-login') {
            fun1();
        }
        else if (regstate != 'register') {
             fun1();
        }
    });
    
    $('.modal-register-btn').click(function (loginstate,callback) {
         if (loginstate != 'modal-login') {
            fun1();
        }
    });


    $('.modal-login-btnbtn').click(function (regstate,callback) {
        if (regstate != 'register') {
            fun2();
            // $('.social-login-text').addClass("hide");
            $('.newto-alert').removeClass("hide");
        }
    });

   
     $('#dropdown').hover(function () {
        $(".all-courses").toggleClass("display slideInLeft");

    });
    
     /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $("#pVideo").attr('src');
    
    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function(){
        $("#pVideo").attr('src', '');
    });
    
    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function(){
        $("#pVideo").attr('src', url);
    });
    
     //Way points

        
});