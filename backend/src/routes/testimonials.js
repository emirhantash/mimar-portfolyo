const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../utils/prisma');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const { active, limit } = req.query;
    
    const where = {};
    if (active === 'true') where.isActive = true;

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    });

    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create testimonial (admin only)
router.post('/', auth, requireRole(['ADMIN']), [
  body('name').trim().isLength({ min: 1 }),
  body('title').trim().isLength({ min: 1 }),
  body('content').trim().isLength({ min: 1 }),
  body('rating').isInt({ min: 1, max: 5 }),
  body('image').optional().trim(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const testimonial = await prisma.testimonial.create({
      data: req.body
    });

    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update testimonial (admin only)
router.put('/:id', auth, requireRole(['ADMIN']), [
  body('name').optional().trim().isLength({ min: 1 }),
  body('title').optional().trim().isLength({ min: 1 }),
  body('content').optional().trim().isLength({ min: 1 }),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('image').optional().trim(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    
    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: req.body
    });

    res.json(testimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', auth, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.testimonial.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 