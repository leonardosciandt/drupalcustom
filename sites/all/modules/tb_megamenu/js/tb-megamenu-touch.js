Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.createTouchMenu = function(items) {
    items.children('a').each(function () {
      var $item = $(this);
      var tbitem = $(this).parent();
      $item.click(function (event) {
        event.preventDefault();

        // Menu doesn't have a child menu. Redirect to the URL normally.
        if (!$item.hasClass('dropdown-toggle')) {
          var $uri = $item.attr('href');
          window.location.href = $uri;
          return;
        }

        // Menu is open. Should close when tapped again.
        if ($item.hasClass('tb-megamenu-clicked')) {
          $item.removeClass('tb-megamenu-clicked');
          tbitem.removeClass('open');
          return;
        }

        // Menu is closed. Should open and close any other open menus.
        tbitem.parent().find('li').removeClass('open');
        tbitem.parent().find('a').removeClass('tb-megamenu-clicked');
        tbitem.addClass('open');
        $item.addClass('tb-megamenu-clicked');
      }).closest('li').mouseleave(function (event) {
        var $target = $(event.toElement);
        if ($target.parents('.tb-megamenu-nav').length > 0) {
          return;
        }

        $item.removeClass('tb-megamenu-clicked');
        tbitem.removeClass('open');
      });
    });
     /*
     items.children('a').children('span.caret').each( function() {
	var $item = $(this).parent();
        $item.click(function(event){
          tbitem = $item.parent();
          if ($item.hasClass('tb-megamenu-clicked')) {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            if(tbitem.hasClass('open')){
              tbitem.removeClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
          else {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){
              tbitem.addClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
        });
     });
     */
  }

  Drupal.TBMegaMenu.eventStopPropagation = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else if (window.event) {
      window.event.cancelBubble = true;
    }
  }
  Drupal.behaviors.tbMegaMenuTouchAction = {
    attach: function(context) {
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(isTouch){
        $('html').addClass('touch');
        Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
      }
    }
  }
})(jQuery);
