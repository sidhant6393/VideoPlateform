const express = require('express');
const router = express.Router();
const Overlay = require('../model/OverLay');

// Create a new overlay
router.post('/api/overlays', async (req, res) => {
  try {
    // Create a new overlay based on the request body
    const overlay = new Overlay({
      content: req.body.content,
      positionX: req.body.positionX,
      positionY: req.body.positionY,
      size: req.body.size,
    });

    // Save the overlay to the database
    await overlay.save();

    // Respond with a success message and the created overlay
    res.status(201).json(overlay);
   }catch (error) {
    res.status(400).send(error);
    console.log("Something went wrong");
  }
});

// Retrieve all overlays
router.get('/api/overlays', async (req, res) => {
  try {
    const overlays = await Overlay.find();
    res.status(200).send(overlays);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an overlay by ID
router.put('/api/overlays/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['content', 'positionX', 'positionY', 'size'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const overlay = await Overlay.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!overlay) {
      return res.status(404).send();
    }

    res.status(200).send(overlay);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an overlay by ID
router.delete('/api/overlays/:id', async (req, res) => {
  try {
    const overlay = await Overlay.findByIdAndDelete(req.params.id);

    if (!overlay) {
      return res.status(404).send();
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
