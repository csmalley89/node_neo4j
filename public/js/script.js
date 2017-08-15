$(document).ready(function() {
    console.log('script loaded.');

    $.get('/try', data => console.log('data', data));

})