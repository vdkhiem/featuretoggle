### add new API route throw following error

- error
  throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
  ^
  TypeError: Router.use() requires a middleware function but got a Object

- Cause: missing modules.export = router
- Solution: add modules.export = router and error is gone.
