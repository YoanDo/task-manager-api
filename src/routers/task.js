const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    creator: req.user._id
  })
  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})


//GET /tasks?done=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
  const { limit, done, skip, sortBy} = req.query
  const match = {}
  const sort = {}
  if (done){ match.done = done === 'true' }

  if (sortBy) {
    const parts = sortBy.split('_')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        sort //createdAt: 1, // 1 = asc, 2 = desc
      }
  }).execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({_id, creator: req.user._id})

    if (!task) return res.status(404).send()
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'done']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (!isValid) return res.status(400).send({ error: 'Invalid updates!' })

  try {
    const task = await Task.findOne({_id, creator: req.user._id})

    if (!task) return res.status(404).send()

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOneAndDelete({_id, creator: req.user._id})
    if (!task) return res.status(404).send()
    res.send(task)

  } catch (e) { res.status(500).send(e) }
})

module.exports = router
