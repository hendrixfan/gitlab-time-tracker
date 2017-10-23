const program = require('commander');
const colors = require('colors');
const moment = require('moment');
const Table = require('cli-table');


const Config = require('./include/file-config');
const Cli = require('./include/cli');
const Tasks = require('./include/tasks');

program
    .arguments('[project]')
    .option('--verbose', 'show verbose output')
    .option('-t, --type <type>', 'specify resource type: issue, merge_request')
    .option('-c, --closed', 'show closed issues (instead of opened only)')
    .option('--my', 'show only issues assigned to me')
    .parse(process.argv);

Cli.verbose = program.verbose;

let config = new Config(process.cwd()),
    tasks = new Tasks(config),
    type = program.type ? program.type : 'issue',
    project = program.args[0];

tasks.list(project, program.closed ? 'closed' : 'opened', program.my, program.type)
  .then(issues => {
    let table = new Table({
      style : {compact : true, 'padding-left' : 1}
    });
    if (issues.length == 0) {
      console.log("No ${programm.type}s found.");
    }
    issues.forEach(issue => {
      table.push([issue.iid.toString().magenta, issue.title.green + "\n" + issue.data.web_url.gray, issue.state])
    })
    console.log(table.toString());
  })
  .catch(error => Cli.error(error));