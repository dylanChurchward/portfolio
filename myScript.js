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
        // $("#convertImg").css({"width": "100%"})
    } else {
        $("#aboutMeText").css({"width": "80%", "height": "auto"});
        $("p").css({"font-size": ""});
        $("#myImg").css({"width": "75%", "height": "auto"});
        $("#aboutMe").css({"margin-top": "1%"})
        $(".navbar-brand").css({"font-size": ""})
        $(".navbar").css({"padding-top": "", "padding-bottom": ""});
        $("h1").css({"margin-top": ""})
        // $("#convertImg").css({"width": "90%"})
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



// Javascript for convert values pages

// keyup event listener for celcius text box
$("#celcius").on("keyup", async function () {
    const url =`https://server-for-projects.herokuapp.com/celciusToFahrenheit/` + $(this).val();
    const response = await fetch(url, {
        method: 'GET'
    })

    const responseData = await response.json();
    $("#fahrenheit").val(responseData.result);
});

// keyup event listener for fahrenheit text box
$("#fahrenheit").on("keyup", async function () {
    const url =`https://server-for-projects.herokuapp.com/fahrenheitToCelcius/` + $(this).val();
    const response = await fetch(url, {
        method: 'GET'
    })

    const responseData = await response.json();
    $("#celcius").val(responseData.result);

});

// keyup event listener for centimeters text box
$("#centimeters").on("keyup", async function () {
    const url =`https://server-for-projects.herokuapp.com/centimetersToInches/` + $(this).val();
    const response = await fetch(url, {
        method: 'GET'
    })

    const responseData = await response.json();
    $("#inches").val(responseData.result);
});

// keyup event listener for inches text box
$("#inches").on("keyup", async function () {
    const url =`https://server-for-projects.herokuapp.com/inchesToCentimeters/` + $(this).val();
    const response = await fetch(url, {
        method: 'GET'
    })

    const responseData = await response.json();
    $("#centimeters").val(responseData.result);
});

// keyup event listener for pounds text box
$("#pounds").on("keyup", async function () {
    const url =`https://server-for-projects.herokuapp.com/poundsToKilograms/` + $(this).val();
    const response = await fetch(url, {
        method: 'GET'
    })

    const responseData = await response.json();
    $("#kilograms").val(responseData.result);
});

// keyup event listener for kilograms text box
$("#kilograms").on("keyup", async function () {
    const url =`https://server-for-projects.herokuapp.com/kilogramsToPounds/` + $(this).val();
    const response = await fetch(url, {
        method: 'GET'
    })

    const responseData = await response.json();
    $("#pounds").val(responseData.result);
});


});