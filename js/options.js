
$(function() {
    // Show options
    $(".options").css({display: 'block'});

    // (not so) fancy toggle slider
    $(".options-toggle").click(function () {
        $(".options").animate({
            right: parseInt($(".options").css("right"), 10) == 0 ?
                -$(".options").outerWidth() :
                0
        });
        $(".options-toggle").children().hasClass('rotate') ?
            $(".options-toggle").children().removeClass('rotate') :
            $(".options-toggle").children().addClass('rotate');
    });

    // Shininess slider
    $("#shininess-slider").slider({
        range: "min",
        value: 500,
        min: 0,
        max: 5000,
        slide: function(event, ui) {
            $("#shininess").val(ui.value);
            material.shininess = ui.value;
        }
    });
    $("#shininess").val($("#shininess-slider").slider("value"));

    // Fog, near slider
    $("#fog-near-slider").slider({
        range: "min",
        value: 500,
        min: 0,
        max: 25000,
        slide: function(event, ui) {
            $("#fog-near").val(ui.value);
            scene.fog.near = ui.value;
        }
    });
    $("#fog-near").val($("#fog-near-slider").slider("value"));

    // Fog, far slider
    $("#fog-far-slider").slider({
        range: "min",
        value: 15000,
        min: 0,
        max: 25000,
        slide: function(event, ui) {
            $("#fog-far").val(ui.value);
            scene.fog.far = ui.value;
        }
    });
    $("#fog-far").val($("#fog-far-slider").slider("value"));

    // Position Wave Multiplier slider
    $("#position-wave-muliplier-slider").slider({
        range: "min",
        value: 1,
        min: 0,
        max: 15,
        slide: function(event, ui) {
            $("#position-wave-muliplier").val(ui.value);
            position_wave_multiplier = ui.value;
        }
    });
    $("#position-wave-muliplier").val($("#position-wave-muliplier-slider").slider("value"));

    // Position Step Multiplier slider
    $("#position-step-muliplier-slider").slider({
        range: "min",
        value: 1,
        min: 0,
        max: 15,
        slide: function(event, ui) {
            $("#position-step-muliplier").val(ui.value);
            position_step_multiplier = ui.value;
        }
    });
    $("#position-step-muliplier").val($("#position-step-muliplier-slider").slider("value"));

    // Rotation Step Multiplier slider
    $("#rotation-step-muliplier-slider").slider({
        range: "min",
        value: 1,
        min: 0,
        max: 15,
        slide: function(event, ui) {
            $("#rotation-step-muliplier").val(ui.value);
            rotation_step_multiplier = ui.value;
        }
    });
    $("#rotation-step-muliplier").val($("#rotation-step-muliplier-slider").slider("value"));
});