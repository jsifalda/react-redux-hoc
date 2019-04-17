import { connect as redux } from 'react-redux'
import pipe from 'ramda/src/pipe'
import reduce from 'ramda/src/reduce'
import when from 'ramda/src/when'
import isPlainObject from 'is-plain-object'

export const connect = (connector, ...args) => {
  return redux(
    when(isPlainObject, (defs) => {
      return (state, props) => {
        const reducer = (obj, key) => {
          obj[key] = defs[key](state, props)
          return obj
        }

        return pipe(
          Object.keys,
          reduce(reducer, {})
        )(defs)
      }
    })(connector),
    ...args
  )
}
