/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'
module.exports = {
  supported: '2.6.0',
  createTemplateBodyVisitor (context) {
    /**
     * Reports dynamic argument node
     * @param {VDirectiveKey} dinamicArgument node of dynamic argument
     * @returns {void}
     */
    function reportDynamicArgument (dinamicArgument) {
      context.report({
        node: dinamicArgument,
        message: 'dynamic argument are forbidden.'
      })
    }

    return {
      // "VAttribute[directive=true][key.argument=...]": reportDynamicArgument,

      // for old perser
      'VAttribute[directive=true] > VDirectiveKey[argument=/^\\[.*\\]$/]': reportDynamicArgument
    }
  }
}
