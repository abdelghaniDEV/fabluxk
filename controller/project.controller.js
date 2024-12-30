const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

// create a new project
const createProject = async (req, res) => {
  try {
    const newData = {
      name: {
        en: req.body.name_en,
        ar: req.body.name_ar,
      },
      description: {
        en:  req.body.description_en,
        ar:  req.body.description_ar,
      },
      type: {
        en: req.body.type_en,
        ar: req.body.type_ar,
      },
      days : req.body.days
    };

    if (req.files) {
      const imagePaths = req.files.map((file) => file.path);
      newData.images = imagePaths;
    }

    const newProject = await prisma.project.create({
      data: newData,
    });
    res.status(201).json(newProject);
  } catch (e) {
    console.error(e);
  }
};

// get all projects

const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json({data : projects});
  } catch (e) {
    console.error(e);
  }
};

// delete project
const deleteProject = async (req, res) => {
  try {
    const id = req.params.projectId;

    // find project
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // delete images
    if (project.images) {
      project.images.forEach((imagePath) => {
        fs.unlinkSync(imagePath);
      });
    }

    await prisma.project.delete({
      where: {
        id: id,
      },
    });

    res.status(204).send("success delete project");
  } catch (e) {
    console.error(e);
  }
};

// update project
const updateProject = async (req, res) => {
  try {
    const id = req.params.projectId;

    const newData = {
      name: {
        en: req.body.name_en,
        ar: req.body.name_ar,
      },
      description: {
        en:  req.body.description_en,
        ar:  req.body.description_ar,
      },
      type: {
        en: req.body.type_en,
        ar: req.body.type_ar,
      },
      days : req.body.days
    };

    if (req.files) {
      const imagePaths = req.files.map((file) => file.path);
      newData.images = imagePaths;
    }

    const exists = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!exists) {
      return res.status(404).json({ message: "Project not found" });
    }

    // handel images
    let updateImages = exists.images;
    if (req.files && req.files.length > 0) {
      exists.images.forEach((imagePath) => {
        fs.unlinkSync(imagePath);
      });
      updateImages = req.files.map((file) => file.path);
    }

    // update project
    const updatedProject = await prisma.project.update({
      where: {
        id: id,
      },
      data: newData
    });
    res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating project" });
  }
};

module.exports = {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
};
