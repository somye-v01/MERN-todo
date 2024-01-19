const z = require('zod');
const postToDo = z.object({
    title:z.string(),
    description:z.string()
})
const hasCompleted = z.object({
    id:z.string()
})
module.exports = {
    postToDo : postToDo,
    hasCompleted : hasCompleted
}