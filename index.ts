import { createSignedToken } from '.'

const token = createSignedToken({}, 'secret', { expiresIn: '1h' })

console.log(token)