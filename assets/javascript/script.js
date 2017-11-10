var newTodo;
var inputHolder;
var status='all';
function updateElements() {
    $('#itemsLeft').text(`${$('.todoItem').length} items left`)
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
function updateLists(state){
    if(state==='completed'){
        $('input:checkBox:not(:checked)').not($('#allCheck')).parent().hide();
        $('input:checked').parent().show();
    }
    else if(state==='active'){
        $('input:checked').not($('#allCheck')).parent().hide();
        $('input:not(:checked)').parent().show();
    }
    else{
        $('input').parent().show();
    }
}
$('#inputLine').on('keyup', function (event) {
    if (event.key === 'Enter') {
        newTodo = $('<div>');
        newTodo.attr('class', 'todoItem');
        newTodo.text($('#inputLine').val());
        $('#inputLine').val('');
        $('#todoHolder').after(newTodo);
        newTodo.prepend($('<input class="checkLeft check" type="checkBox">'));
        newTodo.append($('<button class="deleteItem">X</button>'));
        $('.todoFunctions').css('display', 'block');
        updateElements();
    }
});
$('body').on('click', '.deleteItem', function () {
    $(this).parent().remove();
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
        $('#allCheck').prop('checked',false);
        $(this).parent().css('text-decoration', 'none')
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
$('.lists').on('click',function(){
    status=this.id;
    updateLists(status);
});