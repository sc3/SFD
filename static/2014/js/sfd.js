(function(g) {

  function _map(f, a) {
    var results = [];

    for (var i = 0, l = a.length; i < l; i++) {
      results.push(f(a[i], i));
    }

    return results;

  }

  var Slider = g.Slider = function (args) {


    this.children_selector = '.' + (args.slides_class || 'slide');

    this.hide_animation = args.hide_animation;
    this.show_animation = args.show_animation;

    this.reset_children(args.container);

    return this;

  };


  Slider.prototype.reset_children = function(container){

    this.children = $(container).children(this.children_selector);
    this.lower_bound = 0;
    this.upper_bound = this.children.length - 1;

    this.hide_all();
    this.show(0);
    this.current_element = 0;


    return this;

  };

  Slider.prototype.ith_child = function(i) {
    return $(this.children[i]);
  };

  Slider.prototype.hide = function(i) {
    this.hide_animation(this.ith_child(i));
  };

  Slider.prototype.hide_all = function() {

    var self = this;

    _map(function(e, i) {

      self.hide(i);

    }, this.children);

  };

  Slider.prototype.show = function(i) {
    this.show_animation(this.ith_child(i));
  };

  Slider.prototype.up = function() {

    this.hide(this.current_element);
    this.current_element += 1;

    if (this.current_element > this.upper_bound) {
      this.current_element = this.lower_bound;
    }

    this.show(this.current_element);

  };

  Slider.prototype.down = function() {


    this.hide(this.current_element);
    this.current_element -= 1;

    if (this.current_element < this.lower_bound) {
      this.current_element = this.upper_bound;
    }

    this.show(this.current_element);

  };

  var sfd_slider = g.sfd_slider = new Slider({

    container: '#img-slider',

    hide_animation: function(el) {
      el.fadeOut();
    },

    show_animation: function(el) {
      el.fadeIn();
    }

  });

  $('#slider-next').click(function() {
    sfd_slider.up();
  });

  $('#slider-prev').click(function() {
    sfd_slider.down();
  });

}(window));
