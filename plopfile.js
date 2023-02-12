module.exports = (plop) => {
  plop.setGenerator('vue3Component', {
    description: 'vue3组件模版生成器',
    prompts: [{ type: 'input', name: 'common', message: '请输入公共模版组件名称', default: 'comMon' }],
    actions: [{ type: 'add', path: 'src/components/{{common}}.vue', force: true, templateFile: 'src/templates/component.hbs' }]
  })
}
