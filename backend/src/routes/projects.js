const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../utils/prisma');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const { featured, category, limit } = req.query;
    
    const where = {};
    if (featured === 'true') where.isFeatured = true;
    if (category) where.category = category;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    });

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create project (admin only)
router.post('/', auth, requireRole(['ADMIN']), [
  body('title').trim().isLength({ min: 1 }),
  body('description').trim().isLength({ min: 1 }),
  body('location').trim().isLength({ min: 1 }),
  body('year').trim().isLength({ min: 1 }),
  body('category').trim().isLength({ min: 1 }),
  body('image').trim().isLength({ min: 1 }),
  body('isFeatured').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await prisma.project.create({
      data: req.body
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update project (admin only)
router.put('/:id', auth, requireRole(['ADMIN']), [
  body('title').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim().isLength({ min: 1 }),
  body('location').optional().trim().isLength({ min: 1 }),
  body('year').optional().trim().isLength({ min: 1 }),
  body('category').optional().trim().isLength({ min: 1 }),
  body('image').optional().trim().isLength({ min: 1 }),
  body('isFeatured').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: req.body
    });

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', auth, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 