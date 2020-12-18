(function($){
    $.fn.focusTextToEnd = function(){
        this.focus();
        var $thisVal = this.val();
        this.val('').val($thisVal);
        return this;
    }
}(jQuery));

//ADD
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
        $("#inputForm").find("input").val("");
    });
});

//EDIT
$("#toDoList").on("click", ".editButton", function(){
    $(this).siblings(".editForm").toggle();
    $(this).siblings(".editForm").children("input").focusTextToEnd();

});

//CHECK & UNCHECK
$("#toDoList").on("submit", ".checkForm", function(e){
    e.preventDefault();
    let actionUrl = $(this).attr("action");
    $.ajax({
        url: actionUrl,
        type: "PUT"
    });
    if($(this).children().children().hasClass("fa-check")){
        $(this).children().children().remove();
        $(this).children().append(`<i class="far fa-circle"></i>`);
    } else {
        $(this).children().children().remove();
        $(this).children().append(`<i class="fas fa-check"></i>`);
    }
    $(this).siblings("span").toggleClass("completed");
});


//DELETE
$("#toDoList").on("submit", ".deleteForm", function(e){
    e.preventDefault();
    let actionUrl = $(this).attr("action");
    let $itemToDelete = $(this).parent();
    $.ajax({
        url: actionUrl,
        type: "DELETE",
        itemToDelete: $itemToDelete,
        success: function(){
            this.itemToDelete.remove();
        }
    });
});

