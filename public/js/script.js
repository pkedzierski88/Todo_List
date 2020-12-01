$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        if($(this).val() < 1) {
            console.log("Empty String!");
        } else{
            $("#inputForm").submit();
        }
    }
});

$(".updateButton").on("click", function(){
    $(".updateForm").submit();
});

$(".deleteButton").on("click", function(){
    $(".deleteForm").submit();
});