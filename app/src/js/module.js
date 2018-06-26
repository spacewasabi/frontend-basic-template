var MyApp = MyApp || {};
MyApp.myModule = (function() {
  var test, test2;

  function test() {}

  function init() {
    test();
  }

  return {
    init: init
  };
})();
