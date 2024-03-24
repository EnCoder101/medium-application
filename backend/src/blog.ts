import { createPostInput, updatePostInput } from "@enc0der101/common-for-medium-application/dist";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

interface Env {
    DATABASE_URL: string
}

const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: number
    }
}>()


blog.use('/*', async (c, next) => {
    try {
        const { authorization } = c.req.header()
        const { env } = c
        const token = authorization.split(" ")[1];
        const secret = env.JWT_SECRET
        const verifiedValue = await verify(token, secret);
        if (verifiedValue) {
            c.set('userId', verifiedValue.userId);
            await next()
        }
    }
    catch (err) {
        c.status(401)
        return c.json({
            message: "error middlwware",
            err: err
        })
    }

})

blog.post('/', async (c) => {
    try {
        const { env } = c;
        const userId = c.get('userId');
        const { title, content } = await c.req.json();
        console.log("a");
        const { success } = createPostInput.safeParse({ title, content });
        if (!success) {
            c.status(500)
            return c.json({
                message: "blog input error"
            })
        }
        const response = await postBlog(env, title, content, userId);
        return c.json({
            message: "data inserting success",
            data: response
        })
    } catch (err) {
        return c.json({
            message: "data inserting error",
            error: err
        })
    }
})

blog.get('/bulk', async (c) => {
    try {
        const { env } = c;
        // const userId = c.get('userId');
        const response = await getAllpost(env);
        return c.json({
            message: "bulk data success",
            data: response
        })
    } catch (err) {
        return c.json({
            message: "bulk data error",
            error: err
        })
    }

})

blog.get('/:id', async (c) => {
    try {
        const { env } = c;
        const blogid = parseInt(c.req.param('id'));
        const response = await getPostbyId(env, blogid)
        return c.json({
            message: "blog data success",
            data: response
        })
    } catch (err) {
        return c.json({
            message: "some error",
            error: err
        })
    }
})

blog.put('/', async (c) => {
    try {
        const { env } = c
        const userId = c.get('userId')
        const { title, content, id } = await c.req.json();
        const { success } = updatePostInput.safeParse({ title, content });
        const response = await updateBlog(env, title, content, id, userId);
        if(!success){
            c.status(500)
            return c.json({
                message: "updated blog input error"
            })
        }
        return c.json({
            message: "blog data updated success",
            data: response
        })
    }
    catch (err) {
        return c.json({
            message: "some error in blog put",
            error: err
        })
    }
})


blog.use('/*', async (c) => {
    return c.text("blog end , route Error")
});

export default blog


async function postBlog(
    env: Env,
    title: string,
    content: string,
    userId: number
) {
    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const data = prisma.post.create({
            data: {
                title,
                content,
                authorId: userId
            }
        })
        return data
    } catch (err) {
        return {
            message: "some database error",
            err: err
        }
    }
}

async function getAllpost(
    env: Env,
) {
    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const data = prisma.post.findMany({
            select : {
                id : true,
                content : true,
                title : true,
                published : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return data
    } catch (err) {
        return {
            message: "some database error",
            err: err
        }

    }
}

async function getPostbyId(
    env: Env,
    id: number
) {
    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const data = prisma.post.findUnique({
            where: {
                id
            },
            select : {
                id : true,
                content : true,
                title : true,
                published : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return data;
    }
    catch (err) {
        return {
            message: "some database error",
            err: err
        }
    }
}


async function updateBlog(
    env: Env,
    title: string,
    content: string,
    id: number,
    userId: number
) {
    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const data = await prisma.post.update({
            data: {
                title,
                content
            },
            where: {
                authorId: userId,
                id
            }
        })
        return data;
    } catch (err) {
        return {
            message: "some while changing values",
            err: err
        }
    }
}