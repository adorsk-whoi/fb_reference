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

          /*
          $(".fb_reference-autocomplete").suggest().bind("fb-select", function(e, data) {
                  var formatted_selection = data.name + " [mid: " + data.id + "]";
                  $(e.target).attr('value', formatted_selection);
              });
          */


          $(".fb_reference-suggest").each(function(delta, input){

                  // Get the instance id.
                  var instance_id = $(input).attr('fb_reference-instance_id');

                  // Get the settings for the instance.
                  var instance_settings = Drupal.settings.fb_reference["instance_" + instance_id];

                  console.log("is, ", instance_settings);

                  $(input).suggest({
                          service_url: "http://api.freebase.com",
                          service_path: "/api/service/search",
                          flyout_service_url: "http://www.freebase.com",
                              type: instance_settings["fb_type_filter"]

                      });

                  var suggest_data = $(input).data("suggest");
                  //suggest_data.options.ac_param.type = '/games/game';
                  suggest_data.options.ac_param.mql_output = JSON.stringify([{id:null, mid:null, name:null}]);
                  $(input).bind("fb-select", function(e, data) {
                          var formatted_selection = data.name + " [mid: " + data.mid + "]";
                          $(e.target).attr('value', formatted_selection);
                      });

              });

      }

  }
})(jQuery);
