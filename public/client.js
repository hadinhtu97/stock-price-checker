'use strict'

$(document).ready(function () {
    $('#form1').submit((event) => {
        $.ajax({
            url: '/api/stock-prices?' + $('#form1').serialize(),
            type: 'get',
            success: data => {
                $('#output').html(JSON.stringify(data))
            }
        });

        event.preventDefault();
    });
    $('#form2').submit((event) => {
        $.ajax({
            url: '/api/stock-prices?' + $('#form2').serialize(),
            type: 'get',
            success: data => {
                $('#output').html(JSON.stringify(data))
            }
        });

        event.preventDefault();
    });
});