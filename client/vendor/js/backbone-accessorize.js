(function (Backbone) {
  var oldConstructor = Backbone.Model.prototype.constructor;

  Backbone.Model.extendAndAccessorize = function (protoProps, staticProps) {
    var accessors = protoProps.accessors || [];
    _(accessors).each(defineAccessor, protoProps);
    delete protoProps.accessors;
    return Backbone.Model.extend(protoProps, staticProps);
  };

  function defineAccessor (accessor) {
    preventOverwrite(this, accessor)
    this[accessor] = createAccessorFunction(accessor);
  }

  function preventOverwrite (model, accessor) {
    if (!_(model[accessor]).isUndefined()) {
      throw "can't overwrite '"+accessor+"' property";
    }
  }

  function createAccessorFunction (accessor) {
    return function () {
      if (arguments.length > 0) {
        return this.set(accessor, arguments[0]);
      }
      return this.get(accessor);
    };
  }

})(Backbone);
