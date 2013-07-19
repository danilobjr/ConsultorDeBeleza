$(function () {

    /* ANO */

    $('span.ano').text(new Date().getFullYear());

    /* Slide PRODUTOS */

    $('#slideProdutos').jcarousel({
        wrap: 'circular',
        visible: 5
    });

    $('.jcarousel-item').click(function (e) {
        var produto = $(e.currentTarget);
        var idProduto = produto.data().idProduto;

        var display = $('.pseudo-display');
        var figuras = display.children().removeClass('active');

        var figuraEscolhida = figuras.filter('[data-id-produto=' + idProduto + ']');
        figuraEscolhida.addClass('active');
    });
});