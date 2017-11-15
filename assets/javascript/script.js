var status;
var undoHolder;//make it an array with position
function updateElements() {
    $('#itemsLeft').text(`${$('.todoItem').length} items left`);
    if ($('.todoItem').text()) {
        $('.todoFunctions').css('display', 'block');
    }
    else if (!undoHolder) {
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
function updateLists(state) {
    if (state === 'completed') {
        $('input:checkBox:not(:checked)').not($('#allCheck')).parent().hide();
        $('input:checked').parent().show();
    }
    else if (state === 'active') {
        $('input:checked').not($('#allCheck')).parent().hide();
        $('input:not(:checked)').parent().show();
    }
    else {
        $('input').parent().show();
    }
}
$('#inputLine').on('keyup', function (event) {
    if (event.key === 'Enter' && $('#inputLine').val()) {
        var newTodo = $(`<div class="todoItem">${$('#inputLine').val()}</div>`);
        $('#inputLine').val('');
        $('#todoHolder').prepend(newTodo);
        newTodo.prepend($('<input class="checkLeft check" type="checkBox">'));
        newTodo.append($('<button class="deleteItem">X</button>'));
        updateElements();
        updateLists(status);
    }
});
$('body').on('click', '.deleteItem', function () {
    undoHolder = $(this).parent();
    $(this).parent().detach();
    $('.undo').show();
    updateElements();
    updateClear();
});
$('body').on('change', '.checkLeft', function () {
    updateClear();
    updateLists(status);
    if (this.checked) {
        $(this).parent().css('text-decoration', 'line-through');
    }
    else {
        $('#allCheck').prop('checked', false);
        $(this).parent().css('text-decoration', 'none');
    }
});
$('#allCheck').on('change', function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
    if(this.checked){
        $('#todoHolder').children().css('text-decoration', 'line-through');
    }
    else{
        $('#todoHolder').children().css('text-decoration', 'none');
    }
    updateClear();
});
$('#clearCompleted').on('click', function () {
    undoHolder = $('input:checked').not($('#allCheck')).parent();
    $('input:checked').not($('#allCheck')).parent().detach();
    updateClear();
    updateElements();
    $('#allCheck').prop('checked', false);
    $('.undo').show();
});
$('.undo').on('click', function () {
    $('.undo').hide();
    $('#todoHolder').prepend(undoHolder);
    updateClear();
    updateElements();
});
$('.lists').on('click', function () {
    $(this).css({ 'background-color': 'teal', 'color': 'white' });
    $('.lists').not(this).removeAttr('style');
    status = this.id;
    updateLists(status);
});