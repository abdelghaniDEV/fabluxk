const express = require('express')
const upload = require('../upload')
const { createProject, deleteProject, getAllProjects, updateProject } = require('../controller/project.controller')

const app = express()

const router = express.Router()

router.route('/').post(upload.array('images', 5) , createProject).get(getAllProjects)
router.route('/:projectId').delete(deleteProject).put(upload.array('images' , 5) , updateProject)




module.exports = router