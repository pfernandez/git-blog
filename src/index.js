/* eslint-disable no-undef */

sfunc = x => Array.isArray(x) && typeof x[0] === 'function'

evaluate = ([f, ...a]) =>
  f.apply(undefined, a.map(x => sfunc(x) ? evaluate(x) : x))

// After this is working, move it to a separate file with // @ts-check at the
// top. If the inputs are initialized there should be no type errors.
add = (a, b) => a + b

evaluate(
  [add,
    'h',
    [add,
      'e',
      [add,
        'l',
        [add,
          'l',
          [add,
            'o',
            [add,
              ' ',
              [add,
                'w',
                [add,
                  'o',
                  [add,
                    'r',
                    [add,
                      'l',
                      'd']]]]]]]]]])
