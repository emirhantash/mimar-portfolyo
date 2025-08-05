const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../utils/prisma');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all team members (public)
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    
    const where = {};
    if (active === 'true') where.isActive = true;

    const teamMembers = await prisma.teamMember.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(teamMembers);
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create team member (admin only)
router.post('/', auth, requireRole(['ADMIN']), [
  body('name').trim().isLength({ min: 1 }),
  body('title').trim().isLength({ min: 1 }),
  body('bio').optional().trim(),
  body('image').optional().trim(),
  body('email').optional().isEmail(),
  body('linkedin').optional().trim(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const teamMember = await prisma.teamMember.create({
      data: req.body
    });

    res.status(201).json(teamMember);
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update team member (admin only)
router.put('/:id', auth, requireRole(['ADMIN']), [
  body('name').optional().trim().isLength({ min: 1 }),
  body('title').optional().trim().isLength({ min: 1 }),
  body('bio').optional().trim(),
  body('image').optional().trim(),
  body('email').optional().isEmail(),
  body('linkedin').optional().trim(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    
    const teamMember = await prisma.teamMember.update({
      where: { id: parseInt(id) },
      data: req.body
    });

    res.json(teamMember);
  } catch (error) {
    console.error('Update team member error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete team member (admin only)
router.delete('/:id', auth, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.teamMember.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 