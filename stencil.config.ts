import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'silverstone',
  enableCache: false,
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
    ]})
  ]
}