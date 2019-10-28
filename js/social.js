 $.getJSON('https://geoip-db.com/json/')
        .done(function(location) {
            console.log(location);
            current_user_location = location
        });

$('#loginbtn').click(function(){
    by=isBuyer?  'dib':  'dis'
    

      username=$('#lusername').val();
      password=CryptoJS.MD5($('#lpassword').val());
      
      $.ajax({
            type: "POST",
            url: "/buyer/login",
            data: "username=" + username + "&password=" + password + "&by="+by,
            success: "success",
            dataType: 'text',
            context: document.body
        }).done(function(Fmsg) {
           
            console.log(Fmsg);
            var obj = jQuery.parseJSON(Fmsg);
            
            if (obj.statuscode == 404) {
              console.log("Hitting 404");
              $('#majorerrorlogin').html(obj.message);
            }
            if (obj.statuscode == 601) {
              $('.sociallogins').addClass('hide');
              $('#loginemail').addClass('hide');
              $('#loginemail').addClass('hide');
              $('#signup').removeClass('hide');
              
              //If buyer Showing Signup part
              $(".wizard .nav-tabs>li").css({
                "width": "49.33%"
              });
              $(".wizard .nav-tabs>li:nth-child(2)").hide();
              $(".wizard .nav-tabs>li:nth-child(3)>span").html("2");
              $(".actionbutton ").removeClass("actionactive");
              $('#join').addClass("actionactive");
              //Showing OTP screen
              $('.emphasis').html(obj.data.User.mobile_number)
              ShowOTPScreen(); 
            }

            if (obj.statuscode==200) {
              ChangesForLoggedInUser('Redirecting');
            }
            
        });
});

$('#resentotp').click(function(){
    by=isBuyer?  'dib':  'dis'
    phone=$('.emphasis').html();
      $.ajax({
            type: "POST",
            url: "/buyer/reotp",
            data: "mobilenumber=" +phone,
            success: "success",
            dataType: 'text',
            context: document.body
        }).done(function(Fmsg) {
            var obj = jQuery.parseJSON(Fmsg);
            console.log(obj);
             if (obj.status) {
              $('#majorerrorstep3').css("color","blue");
              $('#majorerrorstep3').html(obj.message); 
             }else
            {
              $('#majorerrorstep3').css("color","red");
              $('#majorerrorstep3').html(obj.message);
            }
          });
      });
//Fb Login

function FbLogin(e) {
   
    //console.log('Hitting here');
    FB.api("/me?fields=id,email,name,first_name,last_name,gender,updated_time,picture", function(e) {
    softLogin(e.id,e.email,e.first_name,e.last_name,e.name,e.picture.data.url,'fb')
    //console.log(JSON.stringify(e))
    }, {
        scope: "email,user_likes"
    })
}

window.fbAsyncInit = function() {
        FB.init({
            appId: "1540857126165017",
            status: !0,
            xfbml: !0,
            version: "v2.8"
        })
    },
    function(e, o, a) {
        var l, i = e.getElementsByTagName(o)[0];
        e.getElementById(a) || (l = e.createElement(o), l.id = a, l.src = "//connect.facebook.net/en_US/sdk.js", i.parentNode.insertBefore(l, i))
    }(document, "script", "facebook-jssdk"), $(document).ready(function() {
        $('div[id="facebook_custom_buton"]').unbind().click(function() {
            FB.login(function(e) {
              //e.authResponse &&
                 FbLogin(e)
            }, {
                scope: "email,public_profile",
                return_scopes: !0
            })
        })
    });

   
 
 //GOOGLE SIGN IN

var googleUser = {};
function startApp() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '889998454159-mmo6ubfshprl3nld20gitq8kg2s1n093.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });

      attachSignin(document.getElementById('gSignIn'));
    });
  }
 function attachSignin(element) {
   
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          //console.log('attachSignin');
          //console.log('googleUser');
           onSignIn(googleUser);
        }, function(error) {
          //console.log(error);
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  function onSignIn(googleUser) {
    //console.log('onSignin')
    var profile = googleUser.getBasicProfile();
    var g_id = profile.getId();
    var email = profile.getEmail();
    var first_name = profile.getGivenName();
    var last_name = profile.getFamilyName();
    var name = profile.getName();
    var profile_pic = profile.getImageUrl();
    var main_email = email;
    softLogin(g_id,email,first_name,last_name,name,profile_pic,'gm')
}


function softLogin(g_id,email,first_name,last_name,name,profile_pic,by)
{
  if(by=='gm' || by=='slg')
  {
    datapoints="g_id=" + g_id; 
  }else if(by=='fb' || by=='slf')
  {
    datapoints="f_id=" + g_id; 
  }
  datapoints+= "&email=" + email 
  datapoints+= "&first_name=" + first_name 
  datapoints+= "&last_name=" + last_name 
  datapoints+= "&name=" + name 
  datapoints+= "&profile_pic=" + encodeURIComponent(profile_pic)
  datapoints+= "&country="+current_user_location.country_name
  datapoints+= "&state="+current_user_location.state
  //datapoints+= "&countrycode="+current_user_location.country_code
  datapoints+= "&city="+current_user_location.city
  datapoints+= "&lat="+current_user_location.latitude
  datapoints+= "&long="+current_user_location.longitude
  datapoints+= "&postal="+current_user_location.postal
  datapoints+= "&by="+by
  console.log("IN SOFTLOGIN");
  //console.log(datapoints);
  $.ajax({
            type: "POST",
            url: "/buyer/login",
            data: datapoints,
            success: "success",
            dataType: 'text',
            context: document.body
        }).done(function(Fmsg) { 
          /// console.log("NEW CONTROLER RESPONSE");
            console.log(Fmsg);
            var obj = jQuery.parseJSON(Fmsg);
          
            if (obj.statuscode == 200) {
            //ChangesForLoggedInUser(Fmsg)   
            }
            if(obj.statuscode==406)
            {
              //FB login was success but the used is not present in db
              FB.logout(function(response) {
              console.log('logging out');
              $('#majorerrorlogin').html(obj.message);
               });
            }
            if(obj.statuscode==600)
            {
                $('#usernameemail').val(obj.data.User.business_email);
                $('#fname').val(obj.data.User.first_name);
                $('#lname').val(obj.data.User.last_name);
                by='diX'
                ShowSoftJoin(true);
            }
            if(obj.statuscode==601)
            {
               $('.emphasis').html(obj.data.User.mobile_number)
               ShowOTPScreen(true)
                
            }
        });
}



function ChangesForLoggedInUser(Fmsg)
{
  //Whatt all change to be done on UI once the user is logged in
  console.log(Fmsg);
  window.location.href = "https://www.xerve.in/";
}

function ShowSoftJoin(isBuyer)
{
            $('ul.nav-tabs li').removeClass('active');
            $('.tab-pane').removeClass('active');
            $('#st1').addClass('active');
            $("#Stp-1").addClass('active');


            $('#join').addClass('actionactive');
            $('#login').removeClass('actionactive');

            $('.sociallogins').addClass('hide');
            $('#loginemail').addClass('hide');
            $('#signup').removeClass('hide');
            $('#forgotpasswordblock').addClass('hide');

            if (isBuyer) {
                $('.onlyseller').hide();
                $(".wizard .nav-tabs>li").css({
                    "width": "49.33%"
                });
                $(".wizard .nav-tabs>li:nth-child(2)").hide();
                $(".wizard .nav-tabs>li:nth-child(3)>span").html("2");
            } else {
                $('.onlyseller').show();
                $(".wizard .nav-tabs>li").css({
                    "width": "33.33%"
                });
                $(".wizard .nav-tabs>li:nth-child(2)").show();
                $(".wizard .nav-tabs>li:nth-child(3)>span").html("3");
            }
}

