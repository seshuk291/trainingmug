/**
 * You must include the dependency on 'ngMaterial'
 */
var app = angular.module('MyApp', ['validation.match', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngRoute','ngRateIt']);



//Course Play List
app.config(function ($routeProvider,$locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "/views/home.html", 
            controller:"DemoCtrl"
        })
        .when("/courses/java-jee-angular", {
            templateUrl: "/java-jee-angular.html",
            controller:"DemoCtrl"
        })
        .when("/courses/full-stack-web-development",{
            templateUrl:"posts/web-development.html",
            controller:"DemoCtrl"
        })
        .when("/courses/android-application-development",{
            templateUrl:"posts/android.html",
        })
        .when("/courses/dot-net",{
            templateUrl:"posts/dot-net.html",
        })
        .otherwise({
            templateUrl: "/",
        });
    $locationProvider.html5Mode(true).hashPrefix('!');
});

app.directive('refresh',function($location,$route){
    return function(scope, element, attrs) {
        element.bind('click',function(){
            if(element[0] && element[0].href && element[0].href === $location.absUrl()){
                $route.reload();
            }
        });
    }   
});

app.controller("panelController", function ($scope) {
    this.tab = 1;
    this.selectTab = function (setTab) {
        this.tab = setTab;
    };
    this.isSelected = function (checkTab) {
        return this.tab == checkTab;
    };
});





app.controller('FormCtrl', ['$scope', '$rootScope', 'Data', '$mdDialog', function ($scope, $rootScope, Data, $mdDialog) {



    $scope.reset = function () {
        console.log("reset function triggered");
        $('.modal').modal('hide');
        toast("reset", "success", "success");
    }
    var scrollPos = 0;
    jQuery(document).on('click', '[data-toggle*=modal]', function () {
        jQuery('[role*=dialog]').each(function () {
            switch (jQuery(this).css('display')) {
            case ('block'):
                {
                    jQuery('#' + jQuery(this).attr('id')).modal('hide');
                    break;
                }
            }
        });
    });

    //Toast Notifier
    function toast(mode, status, message) {

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        if (mode == "signup" && status == "success" && message == "success") {
            toastr.success('Your Registration is success .. Happy Learning !!!', 'Register Success!');
        } else if (mode == "signup" && status == "error" && message == "failed") {
            toastr.error('Sorry some internal error occured.. Please try again!!', 'Internal Error!');
        } else if (mode == "signup" && status == "error" && message == "exists") {
            toastr.error('Email is already exists, Register with a different email!!', 'User Alerady Exists!');
        }


        if (mode == "login" && status == "success" && message == "success") {
            toastr.success('Login Success .. Happy Learning !!!', 'Login Success!');
        } else if (mode == "login" && status == "error" && message == "nouser") {
            toastr.error('No User exists with this email. Please signup!!', 'No User Exists!');
        } else if (mode == "login" && status == "error" && message == "incorrect") {
            toastr.error('Incorrect Credentials, Please provide the correct credentials!!', 'Incorrect Credentials!');
        }

        //Display The Message for form password reset
        if (mode == "reset" && status == "success" && message == "success") {
            toastr.success('Login details are sent to your registered email id');
        }
    }

    $scope.signUpSpinButtonText = "SIGN UP";
    $scope.loginSpinButtonText = "LOGIN";
    $scope.buttonColor = "";

    $scope.showDialog = true;
    console.log('FormCtrl is invoked..');

    // $scope.loginform = {email:'',password:''};

    $scope.resetCount = 0;
    $scope.loginform = {};



    $scope.resetForm = function (form_) {
        console.log("Reset Form is invoked...");
        $scope.myform1.loginemail.$error = {};
        $scope.myform1.password1.$error = {};
        $scope.myform1.loginemail.$setUntouched();
        $scope.myform1.password1.$setUntouched();
        $scope.myForm.registeremail.$setUntouched();
        $scope.myForm.userName.$setUntouched();
        $scope.myForm.password.$setUntouched();
        $scope.myForm.confirmPassword.$setUntouched();
        $scope.myForm.registeremail.$error = {};
        $scope.myForm.userName.$error = {};
        $scope.myForm.password.$error = {};
        $scope.myForm.phone.$error = {};
        $scope.myForm.confirmPassword.$error = {};
        $scope.myForm.phone.$setUntouched();
        $scope.myform1.$setPristine();
        // $scope.myform1.$setPristine();
        $scope.myform1.$setUntouched();
    };



    $scope.singupform = {
        userName: '',
        email: '',
        contactno: '',
        password: '',
        confirmPassword: '',
        termsNConditions: true
    };

    $scope.SignUpFormController = function (signupform) {
        $scope.test = "false";
        $scope.test = "true";
        $scope.signUpSpinButtonText = "Creating Account...";
        setTimeout(function () {
            $scope.signUpSpinButtonText = "Creating Account...";
        }, 1000);

        console.log("SubmitRegistration function invoked...");
        if (signupform.termsNConditions === true) {
            $scope.signupform.termsNConditions = 1;
        } else {
            $scope.signupform.termsNConditions = 0;
        }

        console.log(signupform.termsNConditions);
        console.log(signupform.contactno);

        Data.post('signUp', {
            customer: signupform
        }).then(function (results) {
            console.log("Results status:" + results.status);
            console.log("Message: " + results.message);
            console.log("contact no : " + results.contactno);


            if (results.status === 'success') {
                console.log('Registration success');
                //$scope.hide = true;
                setTimeout(function () {
                    $scope.signUpSpinButtonText = "SIGN UP";
                    $('.modal').modal('hide');
                    $('.login').hide('#login-button');
                    $('#account').removeClass('hide');
                }, 1000);
                toast("signup", "success", results.message);
                $scope.hide = "true";
                console.log($scope.hide);
                $scope.myForm.$setPristine();
            } else if (results.status !== 'success') {
                console.log('Registration failed');
                $scope.signUpSpinButtonText = "SIGNUP";
                setTimeout(function () {
                    $scope.signUpSpinButtonText = "SIGNUP";
                    // $('.modal').modal('hide');
                }, 1000);
                toast("signup", "error", results.message);
                //  $scope.myForm.$setPristine();
            }

            //  Data.toast(results);
            /*    if (results.status == "success") {
                    $location.path('dashboard');
                } */
        });

    };


    /* Login Functionality */

    // Login Functionality Implementation
    $scope.loginform = {
        email: '',
        password: ''
    };
    $scope.submitLoginForm = function (loginform) {
        console.log("Login Form function is invoked...");
        $scope.loginSpinButtonText = "Authenticating...";

        Data.post('login', {
            customer: loginform
        }).then(function (results) {

            if (results.status == "success") {
                
                setTimeout(function () {
                    $scope.loginSpinButtonText = "LOGIN";
                    $('.modal').modal('hide');
                    $('.login').hide('#login-button');
                    $('#account').removeClass('hide');
                }, 1000);
                toast("login", "success", results.message);
                $scope.hide = "true";
                console.log($scope.hide);
                $scope.myForm.$setPristine();
            } else if (results.status == "error") {
                console.log('Registration failed');
                $scope.loginSpinButtonText = "LOGIN";

                $scope.hide = "true";
                console.log('hide');
                
                toast("login", "error", results.message);
                
            }
        });

    };

      }]);

app.controller('courseCtrl',function($scope){

    
    angular.element(document).ready(function () {
        
        //Angular breaks if this is done earlier than document ready.

        
        $(".rateYo5").on("rateyo.init", function (e, data) {
 
          console.log("RateYo initialized! with " + data.rating);
          });
 
    
    
         rate = function (selector, ratingvalue,width) {
            return $(selector).rateYo({
                rating: ratingvalue,
                starWidth: width,
                readOnly: true
            });
            //   console.log(ratingvalue);
        }
        rate('.rateYo8', 5, "22px");
        rate('.rateYo5', 5, "18px");
        rate('.rateYo4', 4, "18px");
        rate('.rateYo3', 3, "18px");
        rate('.rateY2', 2, "18px");
        rate('.rateY1', 1, "18px");
        rate('.rateYo', 5, "18px");
        rate('.rateYo1', 4.5, "18px");
    });
    
    
     $('.collapse').on('shown.bs.collapse', function () {
            $(this).parent().find('.fa-chevron-circle-down')
                   .removeClass('fa-chevron-circle-down')
                   .addClass('fa-chevron-circle-up');
        }).on('hidden.bs.collapse', function () {
            $(this).parent().find(".fa-chevron-circle-up")
                   .removeClass("fa-chevron-circle-up")
                   .addClass("fa-chevron-circle-down");
        });
    
    
    
    $('#expand').click(function(){
        $('.panel-collapse.collapse').collapse('show');
    }); 
    
    $('#collapse').click(function(){
        $('.panel-collapse.collapse.in').collapse('hide');
    });   
    
    
    
    
});
    


app.controller('DemoCtrl',function($timeout, $q, $log) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled = false;

    self.repos = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    
//     $('.panel-heading').click(function() {
//        console.log("clicked");
//        $("span", this).toggleClass("fa-chevron-circle-up fa-chevron-circle-down");
//    });

//     $scope.$on('$locationChangeStart', function(event) {
//        $route.reload();
//    }); 
    
    
    
    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */

    //Initialize All jQuery plugins when DOM is completely loaded

    angular.element(document).ready(function () {
        
        //Angular breaks if this is done earlier than document ready.

        
        $(".rateYo5").on("rateyo.init", function (e, data) {
 
          console.log("RateYo initialized! with " + data.rating);
          });
 
    
    
         rate = function (selector, ratingvalue,stars) {
            return $(selector).rateYo({
                rating: ratingvalue,
                numStars: stars,
                starWidth: "18px",
                readOnly: true
            });
            //   console.log(ratingvalue);
        }
        
        rate('.rateYo5', 5,5);
        rate('.rateYo4', 5,4);
        rate('.rateYo3', 5,3);
        rate('.rateY2', 5,2);
        rate('.rateY1', 5,1);
        rate('.rateYo', 5,5);
        rate('.rateYo1', 4.5,5);

        
        
        //word scroll
        $("#changethewords").typed({
            strings: ["Java JEE ANGULAR", ".NET Internship", "Android", "Hibernate", "Spring", "Phone Gap"],
            typeSpeed: 100,
            loop: true
        });



        // Instantiate the Bootstrap carousel 
        $(".owl-demo").owlCarousel({

            // autoPlay: 1000, //Set AutoPlay to 3 seconds
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            navigation: true,
            navigationText: [
  				      		"<i class='fa fa-angle-left fa-2x left'></i>",
  				            "<i class='fa fa-angle-right fa-2x right'></i>"
  		           			 ],
            rewindNav: true,
            scrollPerPage: false,
        });

        var owl = $(".slider");

        owl.owlCarousel({
            navigation: false, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            autoPlay: 2000,
            pagination: false,
            dots: false,
            autoplayHoverPause: false,
            stopOnHover: true
        });

        var owl = $(".slider");

        owl.owlCarousel({
            navigation: false, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            autoPlay: 2000,
            pagination: false,
            dots: false,
            autoplayHoverPause: false,
            stopOnHover: true
        });

        $(".linked-in").on('mouseover', function (e) {
            carousel.trigger('owl.stop');
        });

        $(".linked-in").on('mouseleave', function (e) {
            carousel.trigger('owl.play');
        });



        //Limit The length of the title of All courses

        $(".title").each(function (i) {
            len = $(this).text().length;
            if (len > 70) {
                $(this).text($(this).text().substr(0, 70) + '...');
            }
        });

        // rating plugin
        var itemCount = jQuery(".all-courses").length;

        if (itemCount > 3) {
            jQuery('.next-v1, .prev-v1').hide();
        } else {
            jQuery('.next-v1, .prev-v1').show();
        }

//        
        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 80
        });

            // Closes the Responsive Menu on Menu Item Click
            $('.navbar-collapse ul li a').click(function() {
                $('.navbar-toggle:visible').click();
            });

            // Offset for Main Navigation
            $('#mainNav').affix({
                offset: {
                    top: 100
                }
            });

        $('.jswp-1-1').waypoint(function (direction) {

            $('.jswp-1-1').addClass('animated fadeInLeft');

        }, {
            offset: '80%'
        });

        $('.jswp-1-2').waypoint(function (direction) {

            $('.jswp-1-2').addClass('animated fadeInRight');

        }, {
            offset: '80%'
        });
        $('.jswp-2-1').waypoint(function (direction) {

            $('.jswp-2-1').addClass('animated fadeInLeft');

        }, {
            offset: '80%'
        });

        $('.jswp-2-2').waypoint(function (direction) {

            $('.jswp-2-2').addClass('animated fadeInRight');

        }, {
            offset: '80%'
        });

        $('.jswp-3-1').waypoint(function (direction) {

            $('.jswp-3-1').addClass('animated fadeInLeft');

        }, {
            offset: '80%'
        });

        $('.jswp-3-2').waypoint(function (direction) {

            $('.jswp-3-2').addClass('animated fadeInRight');

        }, {
            offset: '80%'
        });

        $('.jswp-4-1').waypoint(function (direction) {

            $('.jswp-4-1').addClass('animated fadeInLeft');

        }, {
            offset: '80%'
        });

        $('.jswp-4-2').waypoint(function (direction) {

            $('.jswp-4-2').addClass('animated fadeInRight');

        }, {
            offset: '80%'
        });



        $('.btn-danger').on('click', function () {
            $("#kartik").rating('destroy');
        });

        $('.btn-success').on('click', function () {
            $("#kartik").rating('create');
        });

        $('#rating-input').on('rating.change', function () {
            alert($('#rating-input').val());
        });

        $(".btn-nav").on("hover", function () {
            $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
            $(this).toggleClass("animated");
        });


    });


    //angualr controller

    function querySearch(query) {
        var results = query ? self.repos.filter(createFilterFor(query)) : self.repos,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }



    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
        var repos = [
            {
                'name': 'Java Jee Angular (industry redy program)',
                'url': '#/post/java-jee-angular',
                'imageurl': 'images/java.png',
                'lectures': '150',
                'hours': '60',
                'quizes': '100',
                'rating': 5
        },
            {
                'name': 'UI Developer ( Industry Ready Program )',
                'url': 'https://github.com/angular/angular',
                'imageurl': 'img/coding.svg',
                'lectures': '200',
                'hours': '100',
                'quizes': '150',
                'rating': 5
        },
            {
                'name': 'Complete Java Programming ( JSE  7 / JSE 8)',
                'url': 'https://github.com/angular/material',
                'imageurl': 'img/java-bnr.jpg',
                'lectures': '80',
                'hours': '30',
                'quizes': '50',
                'rating': 4
        },
            {
                'name': 'SQL & JDBC',
                'url': 'https://github.com/angular/bower-material',
                'imageurl': 'img/database.svg',
                'lectures': '200',
                'hours': '100',
                'quizes': '150',
                'rating': 4
        },
            {
                'name': 'Web Development using Servlets & JSP',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'img/webde.png',
                'lectures': '60',
                'hours': '20',
                'quizes': '30',
                'rating': 5
        },
            {
                'name': 'Struts Framework',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'img/structs.jpg',
                'lectures': '50',
                'hours': '30',
                'quizes': '30',
                'rating': 4.5
        },
            {
                'name': 'Developing a web application from scratch',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'img/webdesigning.jpg',
                'lectures': '50',
                'hours': '20',
                'quizes': '30',
                'rating': 5
        },
            {
                'name': 'Spring Framework',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'img/spring.png',
                'lectures': '50',
                'hours': '30',
                'quizes': '30',
                'rating': 4.5
        },
            {
                'name': 'Hibernate',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'img/Hibernate.jpg',
                'lectures': '40',
                'hours': '25',
                'quizes': '30',
                'rating': 4.5

        },
            {
                'name': 'Developing an application from scratch',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'images/java.png',
                'lectures': '50',
                'hours': '30',
                'quizes': '30',
                'rating': 5

        },
            {
                'name': 'SQL /PLSQL',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'images/java.png',
                'lectures': '50',
                'hours': '30',
                'quizes': '35',
                'rating': 4

        },
            {
                'name': 'Developing an application database from scratch',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'images/java.png',
                'lectures': '30',
                'hours': '20',
                'quizes': '50',
                'rating': 4.5

        },
            {
                'name': 'Android',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'img/android.svg',
                'lectures': '100',
                'hours': '30',
                'quizes': '50',
                'rating': 4.5

        },
            {
                'name': 'Developing an application database from scratch',
                'url': 'https://github.com/angular/material-start',
                'imageurl': 'img/database.svg',
                'lectures': '30',
                'hours': '20',
                'quizes': '40',
                'rating': 5

        }
      ];
        return repos.map(function (repo) {
            repo.value = repo.name.toLowerCase();
            return repo;
        });
    }



    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) >= 0);
        };


    }
}
);
/*
    Toster
*/