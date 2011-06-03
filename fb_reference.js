/**
 * @file
 * Javascript for fb_reference module.
 */

/**
 * Attach Freebase suggest behavior to fb_reference suggest widgets.
 */
(function ($) {

  Drupal.behaviors.fb_reference = {
    attach: function(context) {

          // Make type suggest widget for settings form.
          $(".fb_reference-type-suggest").each(function(delta, input){
                  console.log($(input));
                  $(input).suggest({
                          service_url: "http://api.freebase.com",
                          service_path: "/api/service/search",
                          flyout_service_url: "http://www.freebase.com",
                          type: "/type/type"
                      });

                  var suggest_data = $(input).data("suggest");
                  suggest_data.options.ac_param.mql_output = JSON.stringify([{id:null, mid:null, name:null}]);
                  $(input).bind("fb-select", function(e, data) {
                          $(".fb_reference-type-id").attr('value', data.id);
                      });
              });



          // Make Freebase suggest widgets for field widgets.
          $(".fb_reference-suggest").each(function(delta, input){

                  // Get the instance id.
                  var instance_id = $(input).attr('fb_reference-instance_id');

                  // Get the settings for the instance.
                  var instance_settings = Drupal.settings.fb_reference["instance_" + instance_id];

                  $(input).suggest({
                          service_url: "http://api.freebase.com",
                          service_path: "/api/service/search",
                          flyout_service_url: "http://www.freebase.com",
                              type: instance_settings["fb_types"]

                      });

                  var suggest_data = $(input).data("suggest");
                  suggest_data.options.ac_param.mql_output = JSON.stringify([{id:null, mid:null, name:null}]);
                  $(input).bind("fb-select", function(e, data) {
                          var formatted_selection = data.name + " [mid: " + data.mid + "]";
                          $(e.target).attr('value', formatted_selection);
                      });

              });

      }

  }
})(jQuery);
