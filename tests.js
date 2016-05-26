import { expect } from 'chai'

import * as calendar from '../test/calendarSpec'

[
  calendar
]
  .forEach(imports =>
    Object.keys(imports)
      .forEach((name) => {
        try {
          calendar[name](expect)
          // eslint-disable-next-line no-console
          console.log('Pass:', name)
        }
        catch(e) {
          // eslint-disable-next-line no-console
          console.error('Failure:', name, e)
        }
      })
  )
