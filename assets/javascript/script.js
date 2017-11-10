var newTodo;
var inputHolder;
var elements = 0;
function updateElements() {
    $('#itemsLeft').text(`${elements} items left`)
    if (!$('.todoItem').text()) {
        $('.todoFunctions').css('display', 'none');
    }
}
function updateClear() {
    if (!$('.checkLeft:checked').length) {
        $('.clear').hide();
    }
    else {
        $('.clear').show();
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
        newTodo.prepend($('<input class="checkLeft check" type="checkBox">'));
        newTodo.append($('<button class="deleteItem">X</button>'));
        $('.todoFunctions').css('display', 'block');
        updateElements();
    }
});
$('body').on('click', '.deleteItem', function () {
    elements--;
    $(this).parent().remove();
    updateElements();
    updateClear();
});
$('body').on('change', '.checkLeft', function () {
    if (this.checked) {
        $(this).next().css('text-decoration', 'line-through');
    }
    else {
        $('#allCheck').prop('checked',false);
        $(this).next().css('text-decoration', 'none')
    }
});
$('#allCheck').on('change', function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
    updateClear();
});
$('#clearCompleted').on('click', function () {
    var countChecked = $("input:checked").not($('#allCheck')).length;
    elements -= countChecked;
    $('input:checked').not($('#allCheck')).parent().remove();
    updateElements();
    updateClear();
    $('#allCheck').prop('checked',false);
});
$('#all').on('click', function () {
    $('input').parent().show();
});
$('#active').on('click', function () {
    $('input:checked').not($('#allCheck')).parent().hide();
    $('input:not(:checked)').parent().show();
});
$('#completed').on('click', function () {
    $('input:checkBox:not(:checked)').not($('#allCheck')).parent().hide();
    $('input:checked').parent().show();
});
$('body').on('click', '.check', function () {
    updateClear();
});