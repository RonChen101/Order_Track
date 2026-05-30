// import express from 'express'

// API routers
import test from './api/model_derivative_api.ts'

// 加载.env
process.loadEnvFile()

// const app = express()
// const port = 3000

// app.use('/model-derivative', modelDerivativeRouter)
const _test = new test()
_test.start('./cad_file/test.zip')

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`)
// });