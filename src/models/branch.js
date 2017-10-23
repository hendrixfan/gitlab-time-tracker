const _ = require('underscore');
const Base = require('./base');

/**
 * branch model
 */
class branch extends Base {
    constructor(config) {
        super(config);
    }

    make(project, id) {
        let promise;
        console.log(project);
       
        promise = this.post(`projects/${encodeURIComponent(project)}/repository/branches`, {branch: id, ref: 'master'});

        return promise;
    }

   

}

module.exports = branch;