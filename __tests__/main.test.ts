/**
 * Some predefined delay values (in milliseconds).
 */
enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000
}

/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(name: string, delay: number = Delays.Medium): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay)
  )
}

// Below are examples of using ESLint errors suppression
// Here it is suppressing a missing return type definition for the greeter function.

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function greeter(name: string) {
  return await delayedHello(name, Delays.Long)
}

describe('greeter function', () => {
  const name = 'John'
  let hello: string

  let timeoutSpy: jest.SpyInstance

  // Act before assertions
  beforeAll(async () => {
    // Read more about fake timers
    // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
    // Jest 27 now uses "modern" implementation of fake timers
    // https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults
    // https://github.com/facebook/jest/pull/5171
    jest.useFakeTimers()
    timeoutSpy = jest.spyOn(global, 'setTimeout')

    const p: Promise<string> = greeter(name)
    jest.runOnlyPendingTimers()
    hello = await p
  })

  // Teardown (cleanup) after assertions
  afterAll(() => {
    timeoutSpy.mockRestore()
  })

  // Assert if setTimeout was called properly
  it('delays the greeting by 2 seconds', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), Delays.Long)
  })

  // Assert greeter result
  it('greets a user with `Hello, {name}` message', () => {
    expect(hello).toBe(`Hello, ${name}`)
  })
})
