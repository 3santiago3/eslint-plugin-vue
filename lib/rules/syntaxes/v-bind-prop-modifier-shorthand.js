/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'
module.exports = {
  supported: '2.6.0',
  createTemplateBodyVisitor (context) {
    /**
     * Reports `.prop` shorthand node
     * @param {VDirectiveKey} bindPropKey node of `.prop` shorthand
     * @returns {void}
     */
    function reportPropModifierShorthand (bindPropKey) {
      context.report({
        node: bindPropKey,
        message: '`.prop` shorthand are forbidden.',
        // fix to use `:x.prop` (downgrade)
        fix: fixer => fixer.replaceText(bindPropKey, `:${bindPropKey.argument}.prop`)
      })
    }

    return {
      // "VAttribute[directive=true][key.name='bind']": reportPropModifierShorthand,

      // for old perser
      'VAttribute[directive=false] > VIdentifier[name=/^\\./]': node => {
        reportPropModifierShorthand({
          range: node.range,
          loc: node.loc,
          modifiers: ['prop'],
          argument: node.name.slice(1)
        })
      }
    }
  }
}
