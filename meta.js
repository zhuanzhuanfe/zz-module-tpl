const path = require('path')
const fs = require('fs')
// const utils = require('@zz-common/cli-utils')

const {
  sortDependencies,
  installDependencies,
  runCommand,
  printMessageAndCommitGit,
  runLintFix,
  printMessage,
} = require('./utils')

module.exports = {
  helpers: {
    if_or: function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  prompts: {
    line: {
      type: 'list',
      required: true,
      message:'请选择业务线',
      // choices: utils.lineOfBusinessChoiceName,
    },
    name: {
      type: "string",
      required: true,
      message: "填写项目名称"
    },
    description: {
      type: "string",
      required: false,
      message: "填写项目描述",
      default: "转转FE打包模版"
    },
    version: {
      type: "string",
      required: false,
      message: "填写版本号",
      default: "0.0.1"
    },
    author: {
      type: "string",
      message: "作者"
    },
    autoInstall: {
      type: 'list',
      message:'是否需要下载模版完成后立即执行 \'npm install\' 命令安装依赖? (命令)',
      choices: [
        {
          name: '使用 NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: '使用 Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: '不，自行安装',
          value: false,
          short: 'no',
        },
      ],
    }
  },
  filters: {

  },
  importChoices: function(name, choices) {
    if (this.prompts[name]) {
      this.prompts[name].choices = choices
    }
  },
  complete: async function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    console.log()
    console.log(chalk.green('# 初始化git...'))
    console.log('# ========================')
    await runCommand('git', ['init'], {cwd})

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return printMessageAndCommitGit(data, green, cwd)
        })
        .then(() => {
          printMessage(data, chalk)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
};
