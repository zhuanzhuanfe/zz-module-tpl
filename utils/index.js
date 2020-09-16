const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn
const lintStyles = ['standard', 'airbnb']

/**
 * Sorts dependencies in package.json alphabetically.
 * They are unsorted because they were grouped for the handlebars helpers
 * @param {object} data Data from questionnaire
 */
exports.sortDependencies = function sortDependencies(data) {
  const packageJsonFile = path.join(
    data.inPlace ? '' : data.destDirName,
    'package.json'
  )
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
  packageJson.devDependencies = sortObject(packageJson.devDependencies || {})
  packageJson.dependencies = sortObject(packageJson.dependencies || {})
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2) + '\n')
}

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.installDependencies = function installDependencies(
  cwd,
  executable = 'npm',
  color
) {
  console.log(`\n\n# ${color('安装项目依赖 ...')}`)
  console.log('# ========================\n')

  return runCommand(executable, ['install'], {
    cwd,
  })
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
exports.printMessageAndCommitGit = async function printMessageAndCommitGit(data, { green, yellow }, cwd) {

  console.log(green('# 执行首次 git commit'))
  console.log('# ========================')
  await runCommand('git', ['add', '-A'], {cwd});
  try {
    await runCommand('git', ['commit', '-m', 'init', '--no-verify'], {cwd})
  } catch (e) {
    console.error(e);
  }
  return Promise.resolve()
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
exports.printMessage = function printMessage(data, { green, yellow }) {
  // console.log(lintMsg, green, yellow);
  const message = `
# ${green('项目初始化完成!')}
# ========================

模版地址：https://github.com/zhuanzhuanfe/zz-module-tpl
`
  console.log(message)
}

/**
 * If the user will have to run lint --fix themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from questionnaire.
 */
function lintMsg(data) {
  return !data.autoInstall &&
    data.lint &&
    lintStyles.indexOf(data.lintConfig) !== -1
    ? 'npm run lint -- --fix (or for yarn: yarn run lint --fix)\n  '
    : ''
}

/**
 * If the user will have to run `npm install` or `yarn` themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from the questionnaire
 */
function installMsg(data) {
  return !data.autoInstall ? 'npm install (or if using yarn: yarn)\n  ' : ''
}

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    if (cmd.indexOf('npm') >= 0 && process.platform === 'win32') cmd = cmd.replace('npm', 'npm.cmd');
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
        },
        options
      )
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}

exports.runCommand = runCommand

function sortObject(object) {
  // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
  const sortedObject = {}
  Object.keys(object)
    .sort()
    .forEach(item => {
      sortedObject[item] = object[item]
    })
  return sortedObject
}
