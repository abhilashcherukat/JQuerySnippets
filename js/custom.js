var current_user_location;
var isBuyer = true;
var isLogin = true;
var current_user_location = [];
$(document).ready(function() {

     $.getJSON('https://geoip-db.com/json/')
        .done(function(location) {
            console.log(location);
            current_user_location = location
        });


    $("#gopage").click(function() {
       
        Search();
    });


    $(".eyeposition").click(function() {
        console.log("HIttingl");
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            $(".eyeposition").removeClass('glyphicon-eye-open');
            $(".eyeposition").addClass('glyphicon-eye-close');
        } else {
            x.type = "password";
            $(".eyeposition").addClass('glyphicon-eye-open');
            $(".eyeposition").removeClass('glyphicon-eye-close');
        }
    });

    $('#owlhome_ad').owlCarousel({
        autoplay: true,
        slidespeed: 500,
        stopOnHover: false,
        items: 2,
        itemsDesktop: [1199, 2],
        itemsMobile: [479, 2],
        navigation: true,
        autoplayHoverPause: true,
        pagination: false,
        loop: true,
        margin: 1,
    });

    $('#owlhome_ad').find('.owl-prev').html("<i class='glyphicon glyphicon-menu-left'></i>");
    $('#owlhome_ad').find('.owl-next').html("<i class='glyphicon glyphicon-menu-right'></i>");
    $('#owlhome_ad').find('.owl-prev').addClass('pull-left');
    $('#owlhome_ad').find('.owl-next').addClass('pull-right');

    // tab-CONTENT
    $('ul.Nav_Deal li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.Nav_Deal li').removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    });

    // TAB-New Arrival
    $('ul.NDX li').click(function() {
        var NewAr_id = $(this).attr('data-tab');

        $('ul.NDX li').removeClass('active');
        $('.Panel_Tab').removeClass('active');

        $(this).addClass('active');
        $("#" + NewAr_id).addClass('active');
    });

    // Tab-Price & Categories
    $('ul.SUPD li').click(function() {
        var SuPD_id = $(this).attr('data-tab');

        $('ul.SUPD li').removeClass('active');
        $('.SUPS-Tab').removeClass('active');

        $(this).addClass('active');
        $("#" + SuPD_id).addClass('active');
    });

    // SEARCH INPUT
    $('#search_form input[type="search"]').on('input propertychange', function() {
        var $this = $(this);
        var visible = Boolean($this.val());
        $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
    }).trigger('propertychange');

    $('#close-search').click(function() {
        $(this).siblings('input[type="search"]').val('').trigger('propertychange').focus();
    });

    // MainMenu
    $('#gn-menu').click(function() {
        $('.gn-menu-main').toggleClass("active");
        //console.log("Hit");
    });

    // Side Seller SubMenu
    $('#SMNL').click(function() {
        //console.log("Seller hit");
        $(this).toggleClass("active");
        $('.SMNL').toggleClass("active");
    });



   
   

    

    $('.whobutton').click(function() {

        $('#loadinggif').addClass('hide');
        //console.log($(this).attr('id'));
        if ($(this).attr('id') == 'sellerbtn') {
            isBuyer = false;

           
            $('#sellerbtn').addClass('active1');
            $('#buyerbtn').removeClass('active1');
            $('#topline').html('Extra Discounts, Best Deals & More.');

            //UNTIL LINKEDIN IS RESOLVED
            //$('#sociallogin_buyer').addClass('hide');
            //$('#sociallogin_seller').removeClass('hide');
            
            $('#forgotpasswordblock').addClass('hide');

            if (isLogin == false) {
                $('.onlyseller').show();
            } else {
                $('.onlyseller').hide();
            }

        } else {
            isBuyer = true;
            //Wizard button show
           

            $('#sellerbtn').removeClass('active1');
            $('#buyerbtn').addClass('active1');
            $('#topline').html('New Clients, Profitable Sales & More.');

             //UNTIL 
            //$('#sociallogin_seller').addClass('hide');
            //$('#sociallogin_buyer').removeClass('hide');
           
            $('#forgotpasswordblock').addClass('hide');
            if (isLogin == false) {
                $('.onlyseller').hide();

            } else {
                $('.onlyseller').show();


            }

        }
    });

    $('.actionbutton').click(function() {

        $('#loadinggif').addClass('hide');

        console.log($(this).attr('id'));
        if ($(this).attr('id') == 'join') {
            isLogin = false;



            $('#join').addClass('actionactive');
            $('#login').removeClass('actionactive');

            $('.sociallogins').addClass('hide');
            $('#loginemail').addClass('hide');
            $('#signup').removeClass('hide');
            $('#forgotpasswordblock').addClass('hide');

            if (isBuyer) {
                $('.onlyseller').hide();
               
            } else {
                $('.onlyseller').show();
                
            }

        } else {
            isLogin = true;
            $('#join').removeClass('actionactive');
            $('#login').addClass('actionactive');

            $('.sociallogins').removeClass('hide');
            $('#signup').addClass('hide');
            $('#loginemail').removeClass('hide');
            $('#forgotpasswordblock').addClass('hide');


            $('#spn_passwordincorrect').addClass('invisible');

        }
    });

    $('#forgotpasslink').click(function() {
        $('#forgotpasswordblock').removeClass('hide');
        $("#error_userforemail").hide();
        $(".create_new_pass_link").addClass('hide');;
    });

    $('#forgotpass_btn').click(function() {

        
        if ($('#UserForgPassEmail').val() == "") {
            $("#msg_verificationcode").html("<span class='error_msg'>Email/Mobile Number should be specified</span>");
            $("#msg_verificationcode").removeClass('hide');
            return;
        }
        $('#forgotpasswordblock').addClass('hide');
        $('#loadinggif').removeClass('hide');
        if ($('#UserForgPassEmail').val().indexOf('@') > 0) {
            datak = "email=" + $('#UserForgPassEmail').val() + "&mobile_no=0&email_id=1";
        } else {
            datak = "email=" + $('#UserForgPassEmail').val() + "&mobile_no=1&email_id=0";
        }
        $.ajax({
            type: "POST",
            url: '/users/forgotpassword',
            data: datak,
            success: "success",
            dataType: 'text',
            context: document.body,
            success: function(msg) {
                if (msg == "Yes") {
                    $('#loadinggif').addClass('hide');
                    msg = " <span style='color:#000;margin-top:10px;font-size:14px;'>We have SMSed you a <span style='color:#FF0000;'>Verification Code</span> for New Xerve Password creation.</span>"
                    $("#msg_verificationcode").html(msg);
                    $("#msg_verificationcode").removeClass('hide');
                    $(".create_new_pass_link").removeClass('hide');
                } else {
                    $("#msg_verificationcode").html("<span class='error_msg'>Email/Mobile Number not found</span>");
                    $("#msg_verificationcode").removeClass('hide');
                }
                $('#loadinggif').addClass('hide');
            },

            error: function(jqXHR, exception) {
                if (jqXHR.status == 404) {
                    msg = "Service not available now";
                }
                $("#msg_verificationcode").html("<span class='error_msg'>" + msg + "</span>");
                $("#msg_verificationcode").removeClass('hide');
                $('#loadinggif').addClass('hide');
            }
        });
    });

   
   

    $("#step1Next").click(function() {
        $("#majorerror").html("");
            if (isBuyer) {
                IsFormValid=validate(isBuyer);
                console.log("Form Validity:"+IsFormValid);
                if(!IsFormValid)
                {
                         $("#majorerror").html("All fields are mandatory and in correct format");   
                } else 
                {
                // ajaxCall to server to add
                    password=CryptoJS.MD5($('#password').val());
                    fname=$('#fname').val();          
                    lname=$('#lname').val(); 
                    username=$('#usernameemail').val();
                    mobilenumber=$('#mobilenumber').val();
                    gender=$('#gender').val();
                    datapoints= "username=" + username 
                    datapoints+= "&first_name=" + fname 
                    datapoints+= "&last_name=" + lname 
                    datapoints+= "&password=" + password 
                    datapoints+= "&gender=" + gender 
                    datapoints+= "&by=byr"  
                    datapoints+= "&mobilenumber="+mobilenumber
                    datapoints+= "&country="+current_user_location.country_name
                    datapoints+= "&state="+current_user_location.state
                    datapoints+= "&city="+current_user_location.city
                    datapoints+= "&lat="+current_user_location.latitude
                    datapoints+= "&long="+current_user_location.longitude
                    datapoints+= "&postal="+current_user_location.postal


                      $.ajax({
                            type: "POST",
                            url: "/buyer/register",
                            data: datapoints,
                            success: "success",
                            dataType: 'text',
                            context: document.body
                        }).done(function(Fmsg) {
                           
                            console.log(Fmsg);
                            var obj = jQuery.parseJSON(Fmsg);
                            
                            if (obj.statuscode == 200) {
                                //MOVE TO NEXT STEP
                                console.log(obj.data.User.mobile_number)
                                $('.emphasis').html(obj.data.User.mobile_number)
                                $('#uid').val(obj.data.User.id);
                                ShowOTPScreen();
                               
                            }else
                            {
                                $("#majorerrorstep1").html(obj.message);
                            }
                        });
                    }
            }else{

                IsFormValid=validate(isBuyer);
                console.log("Form Validity:"+IsFormValid);
                if(!IsFormValid)
                {
                         $("#majorerror").html("All fields are mandatory and in correct format");   
                } else 
                {
                    $(".onlyseller").show();
                    $('ul.nav-tabs li').removeClass('active');
                    $('.tab-pane').removeClass('active');

                    $('#st2').addClass('active');
                    $("#Stp-2").addClass('active');   
                }
            }    
        
    });

    $("#step2Next").click(function() {
        if (!isBuyer) {
            password=CryptoJS.MD5($('#password').val());
                    fname=$('#fname').val();          
                    lname=$('#lname').val(); 
                    username=$('#usernameemail').val();
                    mobilenumber=$('#mobilenumber').val();
                    gender=$('#gender').val();
                    compname=$('#comname').val();
                    landline=$('#landline').val();
                    category=$('#category').val();

                    datapoints= "username=" + username 
                    datapoints+= "&first_name=" + fname 
                    datapoints+= "&last_name=" + lname 
                    datapoints+= "&password=" + password 
                    datapoints+= "&gender=" + gender 
                    datapoints+= "&by=slr"  
                    datapoints+= "&mobilenumber="+mobilenumber
                    datapoints+= "&compname="+compname
                    datapoints+= "&landline="+landline
                    datapoints+= "&category="+category
                    

                    datapoints+= "&country="+current_user_location.country_name
                    datapoints+= "&state="+current_user_location.state
                    datapoints+= "&city="+current_user_location.city
                    datapoints+= "&lat="+current_user_location.latitude
                    datapoints+= "&long="+current_user_location.longitude
                    datapoints+= "&postal="+current_user_location.postal

                    $.ajax({
                            type: "POST",
                            url: "/buyer/register",
                            data: datapoints,
                            success: "success",
                            dataType: 'text',
                            context: document.body
                        }).done(function(Fmsg) {
                           
                            console.log(Fmsg);
                            var obj = jQuery.parseJSON(Fmsg);
                            
                            if (obj.statuscode == 200) {
                                //MOVE TO NEXT STEP
                                console.log(obj.data.User.mobile_number)
                                $('.emphasis').html(obj.data.User.mobile_number);
                                $('#uid').val(obj.data.User.id);
                                
                                ShowOTPScreen();
                               
                            }else
                            {
                                $("#majorerrorstep2").html(obj.message);
                            }
                        });
        } else {

             console.log('Invalid operation');
        }
    })


    $("#step3join").click(function() {

        phone=$('.emphasis').html();
        otp=$("#otp").val();
        uid=$('#uid').val();
      $.ajax({
            type: "POST",
            url: "/buyer/verifyotp",
            data: "mobilenumber=" +phone+"&otp="+otp+"&uid="+uid,
            success: "success",
            dataType: 'text',
            context: document.body
        }).done(function(Fmsg) {
            var obj = jQuery.parseJSON(Fmsg);
            console.log(obj);
             if (obj.status) {
               ChangesForLoggedInUser("Redirecting...");
             }else
            {
              $('#majorerrorstep3').css("color","red");
              $('#majorerrorstep3').html(obj.message);
            }
          });
    });

  
   function ShowOTPScreen(isBuyer)
{

              $('.sociallogins').addClass('hide');
              $('#loginemail').addClass('hide');
              $('#signup').removeClass('hide');
             
              $(".actionbutton ").removeClass("actionactive");
              $('#join').addClass("actionactive");
              //Showing OTP screen
             
              $('ul.nav-tabs li').removeClass('active');
              $('.tab-pane').removeClass('active');

              $('#st3').addClass('active');
              $("#Stp-3").addClass('active');  
      
    }


   function showSignupScreen()
   {
    $('ul.nav-tabs li').removeClass('active');
    $('.tab-pane').removeClass('active');
    $('#st1').addClass('active');
    $("#Stp-1").addClass('active');
   }

    JsonString = JSON.parse('[{"v":"default","t":"Select Category"},{"v":"1","t":"Accounting and Taxation"},{"v":"4","t":"Architecture and Interior Design"},{"v":"5","t":"Arts and Crafts"},{"v":"6","t":"Audio and Video"},{"v":"112","t":"Automobiles - Cars and Bikes"},{"v":"7","t":"Baby and Kids"},{"v":"92","t":"Bags and Luggage"},{"v":"8","t":"Banking and Finance"},{"v":"9","t":"Beauty and Personal Care"},{"v":"10","t":"Belts and Wallets"},{"v":"11","t":"Bikes and Accessories"},{"v":"12","t":"Books and Magazines"},{"v":"13","t":"BPO Solutions"},{"v":"114","t":"Business Products and Services"},{"v":"14","t":"Cameras and Camcorders"},{"v":"15","t":"Cars and Accessories"},{"v":"85","t":"Catering and Decorations"},{"v":"76","t":"Clothing and Accessories"},{"v":"86","t":"Coaching and Preparation"},{"v":"16","t":"Computers and Laptops"},{"v":"77","t":"Concierge and Housekeeping"},{"v":"17","t":"Construction and Building Materials"},{"v":"18","t":"Consulting and Advisory"},{"v":"20","t":"Design"},{"v":"82","t":"Digital TV and DTH"},{"v":"22","t":"Education and Learning"},{"v":"23","t":"Electronics and Appliances"},{"v":"24","t":"Energy and Environment"},{"v":"25","t":"Engineering and Manufacturing"},{"v":"110","t":"Entertainment and Leisure"},{"v":"27","t":"Events and Parties"},{"v":"29","t":"Fashion and Lifestyle"},{"v":"109","t":"Food and Dining"},{"v":"105","t":"Footwear"},{"v":"32","t":"Franchise and Biz Opportunities"},{"v":"106","t":"Furniture"},{"v":"93","t":"Gifts and Cards"},{"v":"94","t":"Grocery and Health Foods"},{"v":"35","t":"Handbags and Purses"},{"v":"84","t":"Health and Wellness"},{"v":"104","t":"Home and Kitchen"},{"v":"36","t":"Home Decor and Kitchen"},{"v":"78","t":"Housing and Real Estate"},{"v":"95","t":"Industrial Tools and Supplies"},{"v":"38","t":"Information and Research"},{"v":"39","t":"Insurance"},{"v":"41","t":"Jewellery"},{"v":"42","t":"Jobs and Careers"},{"v":"96","t":"Lab Equipment and Supplies"},{"v":"43","t":"Legal"},{"v":"44","t":"Logistics and Transportation"},{"v":"45","t":"Luggage and Travel Bags"},{"v":"46","t":"Luxury Products and Services"},{"v":"47","t":"Maintenance and Repair"},{"v":"48","t":"Marketing and Media"},{"v":"49","t":"Medical and Healthcare"},{"v":"113","t":"Miscellaneous"},{"v":"50","t":"Mobiles and Tablets"},{"v":"51","t":"Movies and Music"},{"v":"87","t":"Musical Instruments, Stage Equipment"},{"v":"53","t":"Outdoor and Adventure"},{"v":"54","t":"Packaging and Labeling"},{"v":"97","t":"Perfumes and Deodorants"},{"v":"56","t":"Pets and Pet Care"},{"v":"83","t":"Photography"},{"v":"57","t":"Printing and Signage"},{"v":"58","t":"Real Estate and Facility Management"},{"v":"108","t":"Recharge and Bill Payment"},{"v":"59","t":"Recruiting and Staffing"},{"v":"60","t":"Renting and Hiring"},{"v":"80","t":"Restaurants and Pubs"},{"v":"62","t":"Safety"},{"v":"63","t":"Security and Investigation"},{"v":"98","t":"Smart Devices and Wearables"},{"v":"88","t":"Social Welfare"},{"v":"40","t":"Software"},{"v":"89","t":"Spirituality and Healing"},{"v":"64","t":"Sports and Fitness"},{"v":"111","t":"Stationery and Supplies"},{"v":"99","t":"Stationery and Supplies and books"},{"v":"65","t":"Studio and Production"},{"v":"28","t":"Sunglasses and Eyewear"},{"v":"66","t":"Technology"},{"v":"67","t":"Telecom and Internet"},{"v":"68","t":"Toys and Video Games"},{"v":"69","t":"Training and Certification"},{"v":"70","t":"Translation and Interpreting"},{"v":"107","t":"Travel and Hotels"},{"v":"103","t":"Video Games and Consoles"},{"v":"90","t":"Visa and Immigration"},{"v":"72","t":"Watches and Accessories"},{"v":"101","t":"Watches and Clocks"},{"v":"73","t":"Wedding and Bridal"}]');
    for (i = 0; i < JsonString.length; i++) {
        var o = new Option(JsonString[i].t, JsonString[i].v);
        //jquerify the DOM object 'o' so we can use the html method
        //$(o).html('option text');
        $('#category').append(o);
    }

});


function validate(forBuyer) {
        var name_regex = /^[a-zA-Z]+$/;
        var email_regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
        var zip_regex = /^[0-9]+$/;
        var mobile_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/;

        var Flag = [];

        var firstname = $('#fname').val()
        if (!firstname.match(name_regex) || firstname.length == 0) {
            Flag[0] = false;
            $('#fname').addClass("input-ERR");
        } else {
            Flag[0] = true;
             $('#fname').removeClass("input-ERR");
        }

        var lastname = $('#lname').val()
        if (!lastname.match(name_regex) || lastname.length == 0) {
            Flag[1] = false;
            $('#lname').addClass("input-ERR");
        } else {
            Flag[1] = true;
             $('#lname').removeClass("input-ERR");
        }

        var email = $('#usernameemail').val()
        if (!email.match(email_regex) || email.length == 0) {
            Flag[2] = false;
            $('#usernameemail').addClass("input-ERR");
        } else {
            Flag[2] = true;
             $('#usernameemail').removeClass("input-ERR");
        }

        var mobile = $('#mobilenumber').val()
        if (!mobile.match(mobile_regex) || mobile.length == 0) {
            Flag[3] = false;
            $('#mobilenumber').addClass("input-ERR");
        } else {
            Flag[3] = true;
             $('#mobilenumber').removeClass("input-ERR");
        }
         var password = $('#password').val()
        if (password.length == 0) {
            Flag[4] = false;
            $('#password').addClass("input-ERR");
        } else {
            Flag[4] = true;
             $('#password').removeClass("input-ERR");
        }
        console.log(Flag);

        for (i = 0; i < Flag.length; i++) {
            console.log("Flag"+i+" is "+Flag[i]);
            if (Flag[i]==false) {
                return false;
            }
        }
        return true;
}


function Search() {
    searchTerm = escape($("#SearchSubCategory").val());
    console.log(searchTerm)

    searchTerm = searchTerm.replace("%3C", "");
    console.log(searchTerm)
    searchTerm = searchTerm.replace("%3E", "");
    console.log(searchTerm)


    location.href = "http://www.xerve.in/prices?q=" + searchTerm;
}





function startDictation() {

  
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    recognition = new window.SpeechRecognition();
    // var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    $(".Home_search").addClass('X-Speak');
    $(".Home_search input").val('');
    $('.Home_search input').attr('placeholder', 'Please Speak Now (Say what you need)');
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = function(e) {
        document.getElementById('SearchSubCategory').value = e.results[0][0].transcript;

        recognition.stop();

        $(".Home_search").removeClass('X-Speak');
        $('.Home_search input').attr('placeholder', 'Search . Compare . Save');
        // document.getElementById('labnol').submit();

        suggestions_push_click_default(e.results[0][0].transcript);
    };
    recognition.onerror = function(e) {
        recognition.stop();
        $(".Home_search").removeClass('X-Speak');
        $('.Home_search input').attr('placeholder', 'Search . Compare . Save');
    }
    recognition.onsoundend = function() {
        $(".Home_search").removeClass('X-Speak');
        $('.Home_search input').attr('placeholder', 'Search . Compare . Save');
    }
    // }
}

