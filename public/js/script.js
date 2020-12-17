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
            $("#inputForm").submit(function (e) {
                e.preventDefault();
                let toDoItem = $(this).serialize();
                $.post("/todos", toDoItem, function(data) {
                    $("#toDoList").append(
                        `
                        <li>
                            <form class="editForm">
                                <span>Edytuj: </span><input type=text name=todo[edit] value="${data.text}" placeholder="Edytuj..." maxlength="30" autocomplete="off" required>
                                <button>Zapisz</button>
                            </form>
                            <form class="checkForm" action="/todos/${data._id}" method="POST">
                                <button class="checkButton">
                                    <i class="far fa-circle"></i>
                                </button>
                            </form>
                            <span>${data.text}</span>
                            <form class="deleteForm" action="/todos/${data._id}" method="POST">
                                <button class="deleteButton"><i class="fas fa-trash-alt"></i></button>
                            </form>
                            <button class="editButton"><i class="fas fa-pencil-alt"></i></button>
                      </li>
                        `
                    );
                });
            });
        }
    }
});

$("#toDoList").on("click", ".editButton", function(){
    $(this).siblings(".editForm").toggle();
    $(this).siblings(".editForm").children("input").focusTextToEnd();
});


$(".checkButton").on("click", function(){
    $(".checkForm").submit();
});




$(".deleteButton").on("click", function(){
    $(".deleteForm").submit();
});

