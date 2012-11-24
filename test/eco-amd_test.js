exports['eco-amd'] = {
  compile: function (test) {
    'use strict';

    var context = {};
    var defineBlock = 'define(function () {\nreturn function(__obj) {\n' +
      '    if (!__obj) __obj = {};\n    var __out = [], __capture = function(callback) {\n' +
      '      var out = __out, result;\n' +
      '      __out = [];\n      callback.call(this);\n      result = __out.join(\'\');\n' +
      '      __out = out;\n      return __safe(result);\n' +
      '    }, __sanitize = function(value) {\n' +
      '      if (value && value.ecoSafe) {\n        return value;\n' +
      '      } else if (typeof value !== \'undefined\' && value != null) {\n' +
      '        return __escape(value);\n      } else {\n        return \'\';\n      }\n    },' +
      ' __safe, __objSafe = __obj.safe, __escape = __obj.escape;\n    __safe = __obj.safe = function(value) {\n' +
      '      if (value && value.ecoSafe) {\n        return value;\n      } else {\n' +
      '        if (!(typeof value !== \'undefined\' && value != null)) value = \'\';\n' +
      '        var result = new String(value);\n        result.ecoSafe = true;\n        return result;\n      }\n' +
      '    };\n    if (!__escape) {\n      __escape = __obj.escape = function(value) {\n' +
      '        return (\'\' + value)\n          .replace(/&/g, \'&amp;\')\n          .replace(/</g, \'&lt;\')\n' +
      '          .replace(/>/g, \'&gt;\')\n          .replace(/"/g, \'&quot;\');\n      };\n    }\n' +
      '    (function() {\n      (function() {\n      \n        __out.push(\'<a></a>\');\n      \n' +
      '      }).call(this);\n      \n    }).call(__obj);\n    __obj.safe = __objSafe, __obj.escape = __escape;\n' +
      '    return __out.join(\'\');\n  } \n});\n';

    require('injectr')('tasks/eco-amd.js', {}, context);

    test.expect(1);

    context.compileEco('<a></a>', function (compiled) {
      test.equal(
        compiled,
        defineBlock,
        'should wrap the template with a define'
      );

      test.done();
    });
  }
};
