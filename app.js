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

var UIController = (function(){

// object allowing one stop spot changes to class names
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function() {
      return {
        // we like query selector because the class syntax is the same as the DOMs
        type: document.querySelector(DOMstrings.inputType).value, // returns inc or exp (income or expense)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: function(obj, type){
      // Create HTML string with placeholders
      var html, element, newHTML;

      if (type === 'inc') {

          element = DOMstrings.incomeContainer;

          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

      } else if (type === 'exp'){

          element = DOMstrings.expensesContainer;

          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

      }

      //replace placeholders
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML  = newHTML.replace('%value%', obj.value);

      //insert html
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

    },
      
    // clears entry fields at the top
    clearFields: function(){
        var fields, fieldsArr;
        
        // fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
        fields = document.querySelector(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
        
        //tricking the method into thinking we have an array
        fieldsArr = Array.prototype.slice.call(fields);
        
        //first use of the foreach loop type
        fieldsArr.forEach(function(currentElement) {
            currentElement.value = "";
        });
        
        //Resets focus to the description
        fieldsArr[0].focus();
        
    },

    // makes class hooks publically available
    getDOMstrings: function(){
      return DOMstrings;
    }

  };

})();

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
    UICtrl.addListItem(newItem, input.type);
    //4. Clear fields
    UICtrl.clearFields();
    //5. calculate the budget
    //6. display the bugdget in the ui

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
