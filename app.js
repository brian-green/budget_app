var budgetController = (function(){
  // no calculations as of yet
})();

// handles UI interactions
var UIController = (function(){

// object allowing one stop spot changes to class names
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

// publically available functions
  return {
    // input function
    getInput: function() {
      return {
        // we like query selector because the class syntax is the same as the DOMs
        type: document.querySelector(DOMstrings.inputType).value, // returns inc or exp (income or expense)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    // makes class hooks publically available
    getDOMstrings: function(){
      return DOMstrings;
    }
  };
})();

// global controller, arguments are different to allow one stop name change (below)
var controller = (function(budgetCtrl,UICtrl){

  // Event listener function
  var setupEventListeners = function() {

    // connection to class names
    var DOM = UICtrl.getDOMstrings();

    // calls add budget item function on click of + button
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // calls add budget on `enter` press
    // this is global because it does not depend on an element interaction
    document.addEventListener('keypress',function(event){
      //we can use, e or event as the event passed as an argument
      // console.log(event);
      // you can see the kind of object an event is, see the prototypes
      //keycode identifies the key that is pressed
      if (event.KeyCode  === 13 || event.which === 13) {
        ctrlAddItem();
      }

    });

  };

  // function to add budget item
  var ctrlAddItem = (function(){

    //1. add budget item
    var input = UICtrl.getInput();
    console.log(input);
    //2. added item to budget budgetController
    //3. add to the ui
    //4. calculate the budget
    //5. display the bugdget in the ui

  });

  // init functions
  return {
    init: function(){
      console.log("App is loading.");
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
