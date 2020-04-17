/* Hide or display  */
function formHandler() {
  document.getElementById('radio').addEventListener('click', function(e) {
    try {
      let element = document.getElementById(e.target.id);
      /* Choose 'Order Problem' vs others*/
      if (element.id === 'radio-3' && element.checked === true) {
        document.getElementById('order-num').required = true;
        document.getElementById('order-num').hidden = false;
        document.getElementById('order-num-label').hidden = false;
      } else if (element.id === 'radio-1' || element.id === 'radio-2') {
        document.getElementById('order-num').required = false;
        document.getElementById('order-num').hidden = true;
        document.getElementById('order-num-label').hidden = true;
      }
    } catch (e) {
      return;
    }
  });
}

window.onload = formHandler;
