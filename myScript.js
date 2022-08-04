$(function () {
    
// call windowChange() first thing to ensure proper element scaling 
windowChange();    

// change the sizes and layouts of various elements based on the screen size
function windowChange() {
    if ($(window).width() < 1000) {
        $("#aboutMeText").css({"width": "100%", "height": "auto"});
        $("p").css({"font-size": "95%"});
        $("#myImg").css({"width": "100%", "height": "auto"});
        $("#aboutMe").css({"margin-top": ""});
        $(".navbar-brand").css({"font-size": "125%"})
        $(".navbar").css({"padding-top": "1%", "padding-bottom": "1%"});
        $("h1").css({"margin-top": "10%"})
    } else {
        $("#aboutMeText").css({"width": "80%", "height": "auto"});
        $("p").css({"font-size": ""});
        $("#myImg").css({"width": "75%", "height": "auto"});
        $("#aboutMe").css({"margin-top": "1%"})
        $(".navbar-brand").css({"font-size": ""})
        $(".navbar").css({"padding-top": "", "padding-bottom": ""});
        $("h1").css({"margin-top": ""})
    }
}

// call windowChange() function each time the screen is resized 
$(window).resize(function() {
    windowChange();
});

// make the currently select navigation link active, remove active class from previously active link
$(".nav-link").on("click", function() {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
});


});