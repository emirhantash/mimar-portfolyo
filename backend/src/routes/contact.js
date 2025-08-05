const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../utils/prisma');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Submit contact message (public)
router.post('/', [
  body('name').trim().isLength({ min: 1 }),
  body('email').isEmail().normalizeEmail(),
  body('subject').optional().trim(),
  body('message').trim().isLength({ min: 10 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: req.body
    });

    res.status(201).json({ 
      message: 'Mesajınız başarıyla gönderildi.',
      id: contactMessage.id 
    });
  } catch (error) {
    console.error('Submit contact message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all contact messages (admin only)
router.get('/', auth, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { read, limit } = req.query;
    
    const where = {};
    if (read === 'false') where.isRead = false;

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    });

    res.json(messages);
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark message as read (admin only)
router.patch('/:id/read', auth, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isRead: true }
    });

    res.json(message);
  } catch (error) {
    console.error('Mark message as read error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete message (admin only)
router.delete('/:id', auth, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.contactMessage.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 