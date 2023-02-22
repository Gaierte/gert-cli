// 一些特殊的处理
import fs from 'fs-extra'
import { getPackageJson } from '../utils/env'
import { getPath } from '../utils/path'
import spawn from 'cross-spawn'
import { env } from '../utils/env'
import { classficVue } from '../utils/popType'
import chalk from 'chalk'
const ora = require('ora')

export const vueTemplateInit = async () => {
  try {
    const spinner = ora()
    spinner.start('模版引擎 loading...')
    spinner.color = 'yellow'
    const plopArgs = ['i', 'plop@3.0.0', '-D']
    const ejsArgs = ['i', 'ejs@3.1.2', '-D']
    spawn.sync('npm', plopArgs, { stdio: 'inherit' })
    spawn.sync('npm', ejsArgs, { stdio: 'inherit' })
    console.log()
    console.log(chalk.yellow('...'))
    console.log(chalk.yellow('...'))
    spinner.succeed('Downloaded')
  } catch (e) {
    throw new Error('err')
  }
  const pkgJson = await getPackageJson()
  pkgJson['scripts']['plop'] = 'plop'
  fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 })
  const { isVue3, isVue2 } = env
  isVue3 && (await classficVue('vue3'))
  isVue2 && (await classficVue('vue2'))
}
