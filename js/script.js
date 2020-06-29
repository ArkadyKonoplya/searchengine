host = location.hostname;
uri = location.pathname;

$('.top-menu > a[href="' + uri + '"] , .tabs_list > a[href="' + uri + '"]').addClass('active');

$(function() {

    posiscroll = $('.promo').offset().top;

    if ($(window).width() > 768) {

        if ($(window).scrollTop() > posiscroll) $('.whitefix , .button-up').show();

        $(window).scroll(function() {
            if ($(this).scrollTop() > posiscroll) {
                $('.whitefix').slideDown(300);
                $('.button-up').fadeIn(200);
            } else {
                $('.whitefix').slideUp(300);
                $('.button-up').fadeOut(200);
            }
        })

    } else {

        $('.whitefix').show();

        if ($(window).scrollTop() > posiscroll) $('.button-up').show();

        $(window).scroll(function() {
            if ($(this).scrollTop() > posiscroll) {
                $('.button-up').fadeIn(200);
            } else {
                $('.button-up').fadeOut(200);
            }
        })

        $('.container > .logo').click(function() {
            $('.top-menu').slideToggle();
        })

    }

    $('.button-up').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 750);
        return false;
    })

})

if (uri == '/') {

    $(document).on('click', '.weedle-widget .weedle-header', function() {

        if ($(window).width() < 768) {

            that = $(this).closest('li').find('.new');

            if (that.is(':hidden')) {
                $('.new').slideUp();
                that.slideDown();
            } else {
                that.slideUp();
            }

        }

    })

    in_1 = setInterval(function() {
        if ($('.weedle-widget').html()) {
            $('.weedle-offers_list').wrap("<div class='new'></div>");
            clearInterval(in_1);
        }
    }, 250)

    in_2 = setInterval(function() {
        if ($('.tp-sbscr-widget').html()) {
            $('.tp-sbscr-widget-header , .tp-sbscr-widget-description-wrapper , .tp-sbscr-widget-agreement__text').remove();
            $('.tp-sbscr-widget-button-wrapper > button').html('РџРѕРґРїРёСЃР°С‚СЊСЃСЏ');
            clearInterval(in_2);
        }
    }, 250)

    in_3 = setInterval(function() {
        if ($('.tp-btsbscriptn-widget').html()) {

            $('a.btsbscriptn-providers__facebook').attr({ 'href': $('a.btsbscriptn-providers__facebook').attr('href').replace('hydra.aviasales.ru', 'search.' + host) });
            $('a.btsbscriptn-providers__viber').attr({ 'href': $('a.btsbscriptn-providers__viber').attr('href').replace('hydra.aviasales.ru', 'search.' + host) });
            $('a.btsbscriptn-providers__slack').attr({ 'href': $('a.btsbscriptn-providers__slack').attr('href').replace('hydra.aviasales.ru', 'search.' + host) });

            $('a.btsbscriptn-providers__facebook').html($('a.btsbscriptn-providers__facebook').html().replace('РІ ', ''));
            $('a.btsbscriptn-providers__viber').html($('a.btsbscriptn-providers__viber').html().replace('РІ ', ''));
            $('a.btsbscriptn-providers__slack').html($('a.btsbscriptn-providers__slack').html().replace('РІ ', ''));
            $('a.btsbscriptn-providers__telegram').html($('a.btsbscriptn-providers__telegram').html().replace('РІ ', ''));

            clearInterval(in_3);

        }
    }, 250)

} else if (uri == '/insurance') {

    z = i = 0;

    s = Math.round((+($('.images > img').length)) - (+($('.gallery.container').width()) / 160));

    setInterval(function() {

        if (i == 0) {
            animate = "-=160px";
            x = 1;
            if (z) i++;
        } else if (i == s) {
            animate = "+=160px";
            x = -1;
            i--;
        }

        $('.images > img').eq(i).animate({ "margin-left": animate }, "slow");

        i = i + x;

        z = true;

    }, 2500)

    in_1 = setInterval(function() {
        if ($('.sravni_widget_submit').html()) {
            $('.sravni_widget_submit').attr('target', '_blank');
            clearInterval(in_1);
        }
    }, 250)

}

$('#preloader').delay(500).fadeOut('fast');

$('.support > button').click(function() {
    $('.overlay').fadeIn();
    subsheight = $('.subscription').height() + 90;
    if ($(window).height() < subsheight) {
        $('html , body').css({ 'overflow-y': 'hidden' });
        $('.overlay').css({ 'overflow-y': 'scroll' });
    }
})

$('.subscription-close').click(function() {
    $('.overlay').fadeOut();
    if ($(window).height() < subsheight) {
        $('html , body').css({ 'overflow-y': 'auto' });
        $('.overlay').css({ 'overflow-y': 'hidden' });
    }
})

$('.subscription-button').click(function() {

    mail = $('.subscription-input');
    message = $('.subscription-textarea');
    pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!mail.val() || mail.val().search(pattern) != 0) {
        mail.css({ 'border': '1px solid #ff6663' });
    } else {
        mail.css({ 'border': '1px solid transparent' });
        if (message.val().length < 10) {
            message.css({ 'border': '1px solid #ff6663' });
        } else {
            message.css({ 'border': '1px solid transparent' });
            $.ajax({
                url: 'sendmail.php',
                type: "POST",
                data: ({ 'mail': mail.val(), 'message': message.val() }),
                dataType: "html",
                beforeSend: function() {
                    $('.subscription-form').addClass('before');
                    $('.subscription-result-img').show();
                    $('.subscription-button').html('РџРћР–РђР›РЈР™РЎРўРђ РџРћР”РћР–Р”РРўР•');
                    $('.subscription-input , .subscription-button , .subscription-textarea').attr({ 'disabled': 'disabled' });
                },
                success: function success(data) {
                    $('.subscription-button').hide();
                    $('.subscription-title').html('Р’Р°С€Рµ СЃРѕРѕР±С‰РµРЅРёРµ РѕС‚РїСЂР°РІР»РµРЅРѕ!');
                    $('.subscription-info').html('РњС‹ РїСЂРёС€Р»РµРј РѕС‚РІРµС‚ РЅР° РІР°С€ e-mail');
                    setTimeout("$('.subscription-result-img').attr({'src':'/img/mail.jpg'})", 2000);
                }
            })
        }
    }

})