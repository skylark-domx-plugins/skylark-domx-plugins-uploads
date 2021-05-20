define([
    "skylark-langx/skylark",
    "skylark-domx-files/dropzone",
    "skylark-domx-files/pastezone",
    "skylark-domx-files/picker"
], function(skylark) {

    var uploads = function() {
        return uploads;
    };

    return skylark.attach("domx.plugins.uploads", uploads);
});