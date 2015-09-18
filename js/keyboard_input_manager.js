function KeyboardInputManager() {
  this.events = {};

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event] || [];
  callbacks.forEach(function(callback) {
    callback(data);
  });
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  var map = {
    82: 0, // Top left
    85: 1, // Top right
    70: 2, // Bottom left
    74: 3, // Bottom right
    78: 4  // N (new)
  };

  document.addEventListener("keydown", function (event) {
    var modifiers = event.altKey && event.ctrlKey && event.metaKey &&
                    event.shiftKey;
    var mapped    = map[event.which];

    if (!modifiers && mapped !== undefined) {
      event.preventDefault();
      self.emit("move", mapped);
    }

  });
};