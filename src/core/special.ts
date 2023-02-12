// 一些特殊的处理
import fs from 'fs-extra'
import { env, getPackageJson } from '../utils/env'
import { getPath } from '../utils/path'

export const specialFn = async () => {
  console.log('env', env)
  env.isVue3 = true
  let pkgJson = await getPackageJson()
  pkgJson['dependencies']['vue'] = '^3.0.0'
  fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 })
}
