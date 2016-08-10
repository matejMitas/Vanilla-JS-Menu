/**
* Vanilla JS Menu - A JavaScript Responsive Menu Framework
* v0.0.1
*
* http://matejmitas.com
*
* Released under the MIT license
*/
    
var Menu = function(options) {

  this.breakpoint = options.breakpoint;
  this.win = window;
  this.d = document;
  this.state;

  // triggers
  this.triggers = {};
  for (var i = 0; i < options.triggers.length; i++) {
    this.triggers[options.triggers[i]] = this.d.getElementById(options.triggers[i]);
  }

  // elements
  this.elem = this.d.getElementById(options.bindings[0]);
  this.mobileElem = this.d.getElementById(options.bindings[1]);
  this.desktopElem = this.d.getElementById(options.bindings[2]);

  // manipulations
  this.manipulations = options.manipulations;

  // secure succesful menu change on load with user needing to call another method
  this.initialState(true);

  // deal with Javascript's quirky behaviour of "this"
  var self = this;

  // bind changing to the window to ensure
  window.onresize = function() {  
    self.initialState(false);
  };
};

Menu.prototype = {

  getState: function() {
    var width = this.win.innerWidth;
    if (width <= this.breakpoint) {
      return "mobile";
    } else if (width > this.breakpoint) {
      return "desktop";
    } 
  },

  initialState: function(init) {
    // set initial state
    if (init == true) {
      state = this.getState();
      this.changeMenu(state);
    } 

    // set next state
    else {
      var currentState = this.getState();
      // if state changed
      if (state !== currentState){
        state = currentState;
        this.changeMenu(currentState);
      }
    }
  },


  changeMenu: function(state) {
    if (state == 'desktop') {
      this.manipulateDOM(this.elem, this.desktopElem, 'after');
      this.closeMenu(state);
      // close the menus
    } else if (state == 'mobile') {
      this.manipulateDOM(this.elem, this.mobileElem, 'in');
      // close the menus
      }
  },

  // location: in -> insert into the referenceNode, location: after –> insert after the referenceNode
  manipulateDOM: function(newNode, referenceNode, location) {
    if (location == 'in') {
      referenceNode.appendChild(newNode);
    } else if (location == 'after') {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  },


  closeMenu: function(state) {
    if (state == 'desktop') {
      // close the menus
      this.attachEvents('close', this.manipulations);
    } else if (state == 'mobile') {

    // close the menus
    }
  },

  addEvent: function(elem, event, func) {
    elem.addEventListener(event, func);
  },

  attachEvents: function(state, elems) {

    for (var i = 0; i < elems.length; i++) {
      if (state == 'open') {
        elems[i].elem.classList.toggle(elems[i].class);
      } else if (state == 'close') {
        elems[i].elem.classList.remove(elems[i].class);
      } 
    }
  }
}