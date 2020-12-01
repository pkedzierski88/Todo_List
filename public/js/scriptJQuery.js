//Check off specific todos by clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});


//click on X to delete todo
$("ul").on("click", "span", function(event){
    $(this).parent().remove();
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        $("form").submit();
        //grabbing new todo text from input
        let todoText = ($(this).val());
        //clear input by empty string
        $(this).val("");
        //create a new li and add to ul
        $("ul").append("<li>" + todoText + "</li>");
        
    }
});