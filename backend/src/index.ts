import { Hono } from 'hono'
import user from './user'
import blog from './blog'
import { cors } from 'hono/cors'

const app = new Hono().basePath('/')

app.use(cors())
app.route('api/v1/user', user)
app.route('api/v1/blog', blog)

app.use('/*' , async (c)=>{
    return c.text("please check your route")
})

export default app
