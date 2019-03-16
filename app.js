var budgetController = (function(){

  // Expense and Income constructors
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //data structure
  var data = {
    allItems: {
      exp:[],
      inc:[]
    },
    totals: {
      //may just use a counter instead
      exp:0,
      inc:0
    }
  };

  //public addItem function
  return {
    addItem: function(type, des, val){
      var newItem, ID;

      //creating ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id +1;
      } else {
        ID = 0;
      }

      //create new item with inc or exp type as the condition
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      //push data to data structure
      data.allItems[type].push(newItem);

      //return new element
      return newItem;
    },
    // testing function to see data structure without current UI
    testing: function(){
	     console.log(data);
    }
  };

})();

// Global constructor for testing
// test case: var inc1 = new Income(2,"Pay day",5000);
// var Income = function(id, description, value) {
//   this.id = id;
//   this.description = description;
//   this.value = value;
// };

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
    var input, newItem;

    //1. add budget item
    input = UICtrl.getInput();
      //console.log(input);
    //2. added item to budget budgetController
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
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
