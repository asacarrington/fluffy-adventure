  /**
  * @author Asa Carrington
  * A module that provides crud operations for audit data
  * @module auditService
  */
var auditSchema = require('../schemas/audit-schema').Audit;

var auditService = {
  /**
   * logs audit information to the database.
   * @function log
   * @param {object} objName - The object containing audit information.
   * @param {object} interactionName - The name describing the type of intraction.
   */
  log: function(objName, interactionName){
    /**
     * @namespace
     * @property {string}  userRef                - The current user (hardcoded untill auth introduced).
     * @property {string}  objRef                 - The object containing audit information stored as string.
     * @property {string}  interaction            - The name of the interaction type the audit object refers to.
     */
    var obj = {
      userRef: 'asacarrington',
      objRef: JSON.stringify(objName),
      interaction: interactionName,
    }

    auditSchema.create(obj, function (err, doc) {
       if (err) console.log(err);
        return true;
      })
  }
}
/** export auditService*/
module.exports = auditService;
