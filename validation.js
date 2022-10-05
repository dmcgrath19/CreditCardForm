import EmberRouter from '@ember/routing/router';
import config from '.config/environment';

export default class Router extends EmberRouter{
    location = config.locationType;
    rootURL = config.rootURL;
}

Router.map(function(){
    this.route('cardNum');
});

function storeData(){
    var newCard = this.store.createRecord('card', {
        name: document.getElementById("name").value,
        cardNum: document.getElementById("cardNum").value,
        date: document.getElementById("date").value,
        cvv: document.getElementById("cvv").value
    });
    newCard.save();
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function errorMessage() {
    if (!checkLuhn(document.getElementById("cardNum").value))
    {
        alert("Please enter a valid Credit card number")
    }
    else if (required(document.getElementById("cardNum").value)||required(document.getElementById("name").value)||required(document.getElementById("cvv").value)){
        alert("empty")
        return false;
    }
    else
        storeData();
        alert("Your payment is processing! Thanks for your purchase");
}
function checkLuhn(value) {
      if (/[^0-9-\s]+/.test(value)) return false;
  
      var nCheck = 0, nDigit = 0, bEven = false;
      value = value.replace(/\D/g, "");
  
      for (var n = value.length - 1; n >= 0; n--) {
          var cDigit = value.charAt(n),
              nDigit = parseInt(cDigit, 10);
  
          if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
          }
  
          nCheck += nDigit;
          bEven = !bEven;
      }
  
      return (nCheck % 10) == 0;
  }

function required(inputtx) 
{
     if (inputtx.value.length == 0)
      { 
         alert("message");  	
         return false; 
      }  	
      return true; 
} 

function clearFields(){
    document.getElementById("cardNum").value = NaN;
    document.getElementById("name").value = '';
    document.getElementById("date").value = '';
    document.getElementById("cvv").value = NaN;
}
