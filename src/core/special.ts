// 一些特殊的处理
import fs from 'fs-extra'
import { env, getPackageJson } from '../utils/env'
import { getPath } from '../utils/path'

export const specialFn = async () => {
  env.isVue3 = true
  const pkgJson = await getPackageJson()
  pkgJson['dependencies']['vue'] = '^3.0.0'
  fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 })
}
