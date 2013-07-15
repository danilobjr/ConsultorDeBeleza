 $(document).ready(function() {



   if ($.browser.msie && ($.browser.version == 8 || $.browser.version == 7 || $.browser.version == 6)) {
   }
   else {
   
  $(".box-product > div").hover(
  function () {
 
   $(this).siblings().stop().animate({
  opacity: .6

}, 500)
  },
  function () {
  
      $(this).siblings().stop().animate({
  opacity: 1

}, 500)
   
  }
);  
    $(".product-grid > div").hover(
  function () {
 
   $(this).siblings().stop().animate({
  opacity: .6
}, 500)
  },
  function () {
  
      $(this).siblings().stop().animate({
  opacity: 1
}, 500)
   
  }
);
    
   }
   
  $(".box-category > ul > li a ").hover(function () {
$(this).stop().animate({ left: "5" }, "fast"); },
function () {
$(this).stop().animate({ left: "0" }, "medium");
}); 
  
//carousel image opacity
  $('.jcarousel-skin-opencart img').css('opacity', '0.6');
  
  $('.jcarousel-skin-opencart img').hover(
      function () {
        
         $(this).stop().animate({
        opacity: 1
      }, 500)
        },
        function () {
        
            $(this).stop().animate({
        opacity: 0.6
      }, 500)
         
        }
      );
       
$("#menu > ul > li").hover(function()
{
  /*lert('on menu');*/
  //$(this).stop().children('div').show();
  $(this).children('div').stop(true, true).slideDown('fast', function() 
  {
    // Animation complete.
  });
},
function () 
{
  $(this).children('div').stop(true, true).slideUp('medium', function()
  {
    // Animation complete.
  });   
}); 
 
 
  // Animation for header switchers
$('.switcher').hover(function() {
$(this).find('.option').stop(true, true).slideDown(300);
},function() {
$(this).find('.option').stop(true, true).slideUp(150);
}); 
});



  //Add product
  function addtocart() {
    var options = [];
    
    $('form_add_product').find('.option').each(function(i, selected) {
      options[i] = $(selected).val();
    });

    
    /*
    $('div.loading').block({ 
      message: 'Processing',
      css: { 
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px',
        'border-radius': '8px',
        'font-weight': 'bold',
        opacity: .8, 
        color: '#FFF'
      } 
    });
    */
    
    $.ajax({
      type: "POST",
      url: "/includes/cart_class.php?action=add_product",
      data: { 'product_id': $('#add_to_cart_pid').val(), 'qty': $('#add_to_cart_qty').val() },

      success: function() {
        
          $.get("/includes/cart_class.php?action=get_cart_total", function(cart) {
          $("#cart_total").html(cart);
          $("#cart_total").focus();
          $("#cart_total").fadeOut('fast');
          $("#cart_total").fadeIn('slow');

            //$("#cart").fadeOut('slow').html(cart).fadeIn('slow');
            
        });
        
          $.get("/includes/cart_class.php?action=get_cart", function(cart) {
          $("#cartcontent").html(cart);

            //$("#cart").fadeOut('slow').html(cart).fadeIn('slow');
            
        });       
                
        //$('div.loading').unblock();

          $.get("/includes/cart_class.php?action=show_errors", function(cart) {
                                       

            //$("#show_errors").fadeOut('slow').html(cart).fadeIn('slow');
            
        });
                              
      }
    });
    return false;
    
  }
  
  //Add product
  function delfromcart(productid) {
    var options = [];
    
    
    $.ajax({
      type: "POST",
      url: "/includes/cart_class.php?action=del_product",
      data: { 'product_id': productid },

      success: function() {
        
          $.get("/includes/cart_class.php?action=get_cart_total", function(cart) {
          $("#cart_total").html(cart);
          $("#cart_total").focus();
          $("#cart_total").fadeOut('fast');
          $("#cart_total").fadeIn('slow');

            //$("#cart").fadeOut('slow').html(cart).fadeIn('slow');
            
        });
        
          $.get("/includes/cart_class.php?action=get_cart", function(cart) {
          $("#cartcontent").html(cart);

            //$("#cart").fadeOut('slow').html(cart).fadeIn('slow');
            
        });       
                
        //$('div.loading').unblock();

          $.get("/includes/cart_class.php?action=show_errors", function(cart) {
                                       

            //$("#show_errors").fadeOut('slow').html(cart).fadeIn('slow');
            
        });
                              
      }
    });
    return false;
    
  } 


CURRENCY_SYM="R$";
CURRENCY_ACCURACY="2";
THOUSANDS_SEPARATOR=",";
DECIMAL_SYMBOL=".";

function numberToCurrency(number){
  
  var currency="";
  
  if(isNaN(parseFloat(number))) number=0;

  if(number<0)
    currency+="-";

  number = Math.abs(number);
  
  currency += CURRENCY_SYM;
  
  if(number>0 && number <0)
    currency+="0";

  var lessthanone = Math.round( (number-parseInt(number)) * (Math.pow(10,CURRENCY_ACCURACY)) );
  
  if(lessthanone >= Math.pow(10,CURRENCY_ACCURACY)){

    number++;
      
    lessthanone -= Math.pow(10,CURRENCY_ACCURACY);
    
  }//end if
  
  lessthanone = lessthanone.toString()
  
  while(lessthanone.length<CURRENCY_ACCURACY)
    lessthanone = "0" + lessthanone;    

  var withThousands = parseInt(number).toString();
    var objRegExp  = new RegExp('(-?[0-9]+)([0-9]{3})');

  while(objRegExp.test(withThousands))
       withThousands = withThousands.replace(objRegExp, '$1'+THOUSANDS_SEPARATOR+'$2');
    
  currency+=withThousands;

  if(CURRENCY_ACCURACY!=0)
    currency+=DECIMAL_SYMBOL+lessthanone;
    
  return currency;
  
}

function currencyToNumber(currency){
  var number=0;
  var thousSep=THOUSANDS_SEPARATOR;
  if(thousSep=="." || thousSep=="*" || thousSep=="[" || thousSep=="]" || thousSep=="-" || thousSep=="+")
    thousSep="\\"+thousSep;
  var objRegExp  = new RegExp(thousSep,"g");
  currency=currency.replace(objRegExp,"");
  currency=currency.replace(CURRENCY_SYM,"");
  currency=currency.replace(DECIMAL_SYMBOL,".");
  if(currency)
    number=parseFloat(currency);
  return number
}
