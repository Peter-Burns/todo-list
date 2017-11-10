var newTodo;
var inputHolder;
var elements = 0;
function updateElements() {
    $('#itemsLeft').text(`${elements} items left`)
    if (!$('.todoItem').text()) {
        $('.todoFunctions').css('display', 'none');
    }
}
$('#inputLine').on('keyup', function (event) {
    if (event.key === 'Enter') {
        elements++;
        newTodo = $('<div>');
        newTodo.attr('class', 'todoItem');
        newTodo.html('<p>' + $('#inputLine').val() + '</p>');
        $('#inputLine').val('');
        $('#todoHolder').after(newTodo);
        newTodo.prepend($('<input class="checkLeft" type="checkBox">'));
        newTodo.append($('<button class="deleteItem">X</button>'));
        $('.todoFunctions').css('display', 'block');
        updateElements();
    }
});
$('body').on('click', '.deleteItem', function () {
    elements--;
    $(this).parent().remove();
    updateElements();
});
$('body').on('change', '.checkLeft', function () {
    if (this.checked) {
        $(this).next().css('text-decoration', 'line-through');
    }
    else {
        $(this).next().css('text-decoration', 'none')
    }
});
$('#allCheck').on('change', function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
});
$('#clearCompleted').on('click', function () {
    var countChecked = $("input:checked").not($('#allCheck')).length;
    elements -= countChecked;
    $('input:checked').not($('#allCheck')).parent().remove();
    updateElements();
});