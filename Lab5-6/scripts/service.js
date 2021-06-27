// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://flaviocopes.com/javascript-regular-expressions/
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
} 

function validateName(nm) {
    var a = document.getElementById(nm).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    //var filter = /^[a-zA-Z]+[-. ]?$/;
    var filter = /^[a-zA-Z\-\s]+$/i;//include spaces
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
} 

function validateCard(card){
    var a = document.getElementById(card).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^\(?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}




// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = ["06/29/2020","07/07/2020","07/10/2020"];
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    var sVet = $("#selectVet").children("option:selected").val();
    if(sVet == "Zoya Macleod"){
        if(date.getDay() == 1 || date.getDay() == 0 || date.getDay() == 5)
        return [false];
    }else if(sVet == "Amelie Nunez"){
        if (date.getDay() === 0 || date.getDay() === 2 || date.getDay() === 6)
        return [false];
    }else{
        if (date.getDay() === 3 || date.getDay() === 4 || date.getDay() === 6)
        return [false];
    }
    // Sunday is Day 0, disable all Sundays
    
    
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) === -1 ]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for phone. Please enter a phone number with the format 123-123-1234");
            $("#phone").val("");
            $("#phone").addClass("error");
            $("#submitbtn").prop('disabled',true);
        }
        else {
            $("#phone").removeClass("error");
        }
    });

    $("#inputName").on("change", function(){//validate name
        //check name contains no symbols or numbers
        if(!validateName("inputName")){
            alert("Please use alphabetic characters only");
            $("#inputName").val("");
            $("#inputName").addClass("error");
            $("#submitbtn").prop('disabled',true);
        }else {
            $("#inputName").removeClass("error");
        }
    });

    $("#debit").on("change", function(){//validate credit card
        if (!validateCard("debit")){
            alert("Wrong format for credit card. Please enter a credit card with the format 1234-1234-1234-1234");
            $("#debit").val("");
            $("#debit").addClass("error");
            $("#submitbtn").prop('disabled',true);
        }
        else {
            $("#debit").removeClass("error");
        }
    });

    $("#submitbtn").click(function(){//when the confirm appointment button is pressed
        var date = $("#dateInput").datepicker('getDate');
        var d = ("0" + date.getDate()).slice(-2);
        var m = ("0" + (date.getMonth() + 1)).slice(-2);
        var y = date.getFullYear();

        var time = $("#timeInput").val();

    
        var sService = $("#selectService").children("option:selected").val();
        var sVet = $("#selectVet").children("option:selected").val();

        var nm = $("#inputName").val();
        var em = $("#inputEmail").val();
        var p = $("#phone").val();
        var cc = $("#debit").val();

        //var date = $("#dateInput").val($.datepicker.formatDate('dd-mm-yyyy', new Date()));
        document.getElementById("infoFill").innerHTML = "Name: " + nm + "<br>Email: " + em +
                                                    "<br>Phone Number: " + p + "<br>Credit Card: " + cc +
                                                    "<br>Date: " + m + "/" + d + "/" + y   + "<br>"+
                                                    "Time (24hr): " + time  + "<br>"+     
                                                    "Service: " + sService + "<br>"+
                                                    "Veterinarian: " + sVet;
    })

    //undisable button once everything is filled
    $("#submitbtn").prop('disabled', true);

    $("#inputName, #inputEmail, #phone, #debit").keyup(function(){
        if($("#inputName").val() != '' && $("#inputEmail").val() != '' && $("#phone").val() != '' && $("#debit").val() != '' && $("#dateInput").datepicker("getDate") != null ){
            $("#submitbtn").prop('disabled',false);
        }else{
            $("#submitbtn").prop('disabled',true);
        }
    });

    $("#dateInput").change(function(){
        if($("#inputName").val() != '' && $("#inputEmail").val() != '' && $("#phone").val() != '' && $("#debit").val() != '' && $("#dateInput").datepicker("getDate") != null ){
            $("#submitbtn").prop('disabled',false);
        }else{
            $("#submitbtn").prop('disabled',true);
        }
    });








    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery
    // You can try different themes (the names are under the calendars) / This is Excite Bike
    // To use a different theme you must include its css in your HTML file.
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/
    $( "#dateInput" ).datepicker({
            
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates

            
        }
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });


});

//fix navbar


