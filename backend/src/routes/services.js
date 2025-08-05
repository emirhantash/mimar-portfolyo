const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../utils/prisma');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    
    const where = {};
    if (active === 'true') where.isActive = true;

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create service (admin only)
router.post('/', auth, requireRole(['ADMIN']), [
  body('title').trim().isLength({ min: 1 }),
  body('description').trim().isLength({ min: 1 }),
  body('icon').optional().trim(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = await prisma.service.create({
      data: req.body
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update service (admin only)
router.put('/:id', auth, requireRole(['ADMIN']), [
  body('title').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim().isLength({ min: 1 }),
  body('icon').optional().trim(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    
    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: req.body
    });

    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete service (admin only)
router.delete('/:id', auth, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.service.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 