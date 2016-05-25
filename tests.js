import { expect } from 'chai';

import * as calendar from '../test/calendarSpec';

[
  calendar
]
  .forEach(imports =>
    Object.keys(imports)
      .forEach((name) => {
        try {
          calendar[name](expect)
        }
        catch(e) {
          console.error('Failure:', name, e);
        }
      })
  );
