import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from '@enc0der101/common-for-medium-application/dist'
// import * as dotenv from "dotenv"
// dotenv.config()

interface Env {
    JWT_SECRET: any;
    DATABASE_URL: string
}

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()


user.post('/signup', async (c) => {
    try {
        const { env } = c
        const { email, password, name } = await c.req.json()
        const { success } = signupInput.safeParse({ email, password, name })
        if (!success) {
            c.status(500)
            return c.json({
                message: "signup input error"
            })
        }
        const response = await signUpUser(env, email, password, name)
        return c.json({
            message: "signup Success",
            data: response
        })
    } catch (err) {
        return c.json({
            message: "signup error",
            data: err
        })

    }
})

user.post('/signin', async (c) => {
    try {
        const { env } = c
        const { email, password } = await c.req.json()
        const { success } = signinInput.safeParse({email, password});
        if (!success) {
            c.status(500)
            return c.json({
                message: "signin input error"
            })
        }
        const response = await signInUser(env, email, password);
        return c.json({
            message: "signIn Success",
            data: response
        })
    } catch (err) {
        return c.json({
            message: "signIn error",
            data: err
        })

    }
})


user.use('/*', async (c) => {
    return c.text("user end , route Error")
});
export default user

async function signUpUser(
    env: Env,
    email: string,
    password: string,
    name: string) {

    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const data = await prisma.user.create({
            data: {
                email,
                password,
                name
            },
            select: {
                id: true,
                email: true,
                password: true,
                name: true
            }
        })
        const payload = {
            userId: data.id
        }
        const secret = env.JWT_SECRET;
        const token = await sign(payload, secret)
        return token;
    } catch (err) {
        return err
    }

}

async function signInUser(
    env: Env,
    email: string,
    password: string
) {
    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL
    });
    try {
        const data = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })
        if (data) {
            const payload = {
                userId: data.id,
            }
            const secret = env.JWT_SECRET;
            const token = await sign(payload, secret);
            return token;
        } else {
            return {
                message: "user not found"
            }
        }
    } catch (err) {
        return {
            err: err
        };
    }
}