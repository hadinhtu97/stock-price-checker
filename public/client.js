'use strict'

$(document).ready(function () {
    $('#form1').submit((event) => {
        $.ajax({
            url: '/api/stock-prices',
            type: 'get',
            data: $('form1').serialize(),
            success: data => {
                $('#output').html(JSON.stringify(data))
            }
        });

        event.preventDefault();
    });
    $('#form2').submit((event) => {
        $.ajax({
            url: '/api/stock-prices',
            type: 'get',
            data: $('form2').serialize(),
            success: data => {
                $('#output').html(JSON.stringify(data))
            }
        });

        event.preventDefault();
    });
});