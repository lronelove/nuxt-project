const test = (id) => (name) => {
  console.log(id + name)
}

test(1)(2)

const myTest = test(1)
myTest('hello jack')
