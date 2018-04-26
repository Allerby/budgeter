(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['papaparse'],
      __esModule: true,
    };
  }

  define('papaparse', [], vendorModule);
})();
