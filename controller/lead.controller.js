const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// create a new lead
const createLead = async (req, res) => {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      },
    });
    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating lead" });
  }
};

// get all leads
const getAllLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany();
    res.json({data : leads});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching leads" });
  }
};

//delet lead
const deleteLead = async (req, res) => {
  try {
    const leadId = req.params.leadId;
    const lead = await prisma.lead.findUnique({
      where: {
        id: leadId,
      },
    });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    await prisma.lead.delete({
      where: {
        id: leadId,
      },
    });
    res.status(204).send("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting lead" });
  }
};

// update lead
const updateLead = async (req, res) => {
  console.log(req.body);

  try {
    const leadId = req.params.leadId;
    const leadExists = await prisma.lead.findUnique({
      where: {
        id: leadId,
      },
    });
    if (!leadExists) {
      return res.status(404).json({ message: "Lead not found" });
    }
    const lead = await prisma.lead.update({
      where: {
        id: leadId,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      },
    });
    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating lead" });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  deleteLead,
  updateLead,
};
