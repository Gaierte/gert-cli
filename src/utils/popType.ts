import { vueVersions } from './constant'
import spawn from 'cross-spawn'
import fs from 'fs-extra'
import path from 'path'
import inquirer from 'inquirer'

const ejs = require('ejs')
const baseUrl = process.cwd()
const popVersions = {
  [vueVersions[0]]: function () {},
  [vueVersions[1]]: async function () {
    //在指定的目录下循环生成模版文件
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'files',
        message: '请输入需要生成模版文件的目录',
        default: 'components'
      }
    ])
    const templateFiles = 'src/templates'
    const templateFilesArr = templateFiles.split('/')
    try {
      //是否能访问到这个文件，如果能访问到，说明这个文件已经存在，进入循环的下一步。
      //accessSync的第二个参数就是用来判断该文件是否能被读取
      fs.accessSync(baseUrl + templateFiles, fs.constants.R_OK)
    } catch (e) {
      let filesStr = ''
      for (let index = 0; index < templateFilesArr.length; index++) {
        const file = templateFilesArr[index]
        filesStr += '/'
        filesStr += file
        if (fs.existsSync(baseUrl + filesStr)) continue
        fs.mkdirSync(baseUrl + filesStr)
      }
    }
    fs.writeFileSync(
      baseUrl + '/src/templates/component.hbs',
      "<template>\n<div>\n<%= files %>\n</div>\n</template>\n<script lang='ts'  setup>\n\n</script>\n<style lang='less' scoped>\n\n</style>"
    )
    fs.writeFileSync(
      baseUrl + '/plopfile.js',
      "module.exports = plop => {plop.setGenerator('vue3Component', {description: 'vue3组件模版生成器',prompts: [ {type: 'input',name: 'common', message: '请输入公共模版组件名称',default: 'comMon'}], actions: [{ type: 'add',path: 'src/template_components/{{common}}.vue',force: true, templateFile: 'src/templates/component.hbs'}]});}"
    )
    const args = ['run', 'plop', 'vue3Component']
    spawn.sync('npm', args, { stdio: 'inherit' })

    const fileDir = path.join(__dirname, `./../${answer.files}`)
    try {
      fs.accessSync(fileDir, fs.constants.R_OK)
    } catch (e) {
      fs.mkdirSync(fileDir)
    }
    const tempDir = path.join(process.cwd(), '/src/templates/component.hbs')

    fs.readdir(fileDir, (err, files) => {
      if (err) {
        throw err
      }
      files.forEach((file) => {
        ejs.renderFile(tempDir, answer, (err: any, result: string) => {
          if (err) {
            throw err
          }
          fs.writeFileSync(path.join(fileDir, `/${file}/Index.vue`), result)
        })
      })
    })
  }
}

export const classficVue = (version: String) => {
  return popVersions[version as keyof typeof popVersions]()
}
