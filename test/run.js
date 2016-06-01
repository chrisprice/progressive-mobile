import { expect } from 'chai'

export default (module) =>
  Object.keys(module)
    .forEach((name) => {
      try {
        module[name](expect)
        // eslint-disable-next-line no-console
        console.log('Pass:', name)
      }
      catch(e) {
        // eslint-disable-next-line no-console
        console.error('Failure:', name, e)
      }
    })
