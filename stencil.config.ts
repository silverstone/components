import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import alias from 'rollup-plugin-alias'

export const config: Config = {
  namespace: 'silverstone',
  srcDir: 'src',
  globalStyle: 'src/global/app.scss',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  plugins: [
    sass({injectGlobalPaths: [
      'src/global/app.scss'
    ]}),
    // allow for @/foo/bar imports
    alias({
      '@': 'src'
    })
  ]
}