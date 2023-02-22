#!/usr/bin/env node
import inquirer from 'inquirer'
import initCli from './src/cli'
import { answerType } from './src/interface'

const promptList = [
  {
    type: 'confirm',
    message: '是否是Vue3项目？',
    name: 'vue3'
  },
  {
    type: 'confirm',
    message: '是否需要自动生成vue模版文件？',
    name: 'plop'
  },
  // {
  //   type: 'input',
  //   message: '请输入公共组件名称',
  //   name: 'component',
  //   default: 'component',
  //   when: (answers: answerType) => answers.plop
  // },
  {
    type: 'checkbox',
    message: '选择要安装的插件(默认全选)',
    name: 'plugins',
    choices: [
      {
        name: 'eslint注册',
        value: 'eslint',
        checked: true
      },
      {
        name: 'husky注册',
        value: 'husky',
        checked: true
      },
      {
        name: 'commitLint注册',
        value: 'commitLint',
        checked: true
      },
      {
        name: 'vscode格式化注册',
        value: 'vscode',
        checked: true
      }
    ]
  }
]

const question = async () => {
  // 运行时请使用 npm run serve, 避免使用nodemon，会导致arrow key press 无效： https://github.com/SBoudrias/Inquirer.js/issues/844#issuecomment-571412210
  const answers: answerType = await inquirer.prompt(promptList)
  initCli(answers)
}

question()
