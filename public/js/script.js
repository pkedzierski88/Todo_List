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

$(".deleteButton").on("click", function(){
    $(".deleteForm").submit();
});