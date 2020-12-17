(function($){
    $.fn.focusTextToEnd = function(){
        this.focus();
        var $thisVal = this.val();
        this.val('').val($thisVal);
        return this;
    }
}(jQuery));

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        if($(this).val() < 1) {
            console.log("Empty String!");
        } else{
            $("#inputForm").submit();
        }
    }
});

$(".checkButton").on("click", function(){
    $(".checkForm").submit();
});

$(".editButton").on("click", function(){
    // $(".editForm").hide();
    $(this).siblings(".editForm").toggle();
    $(this).siblings(".editForm").children("input").focusTextToEnd();
});


$(".deleteButton").on("click", function(){
    $(".deleteForm").submit();
});

