const db = require('../config/database');

const createProjector = (req, res) => {
  const { name } = req.body;
  
  const sql = 'INSERT INTO projectors (name) VALUES (?)';
  db.run(sql, [name], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error creating projector' });
    }
    res.status(201).json({
      id: this.lastID,
      name,
      message: 'Projector created successfully'
    });
  });
};

const getProjectors = (req, res) => {
  const sql = 'SELECT * FROM projectors';
  db.all(sql, [], (err, projectors) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching projectors' });
    }
    res.json(projectors);
  });
};

const updateProjector = (req, res) => {
  const { id } = req.params;
  const { is_functional } = req.body;
  
  const sql = 'UPDATE projectors SET is_functional = ? WHERE id = ?';
  db.run(sql, [is_functional, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error updating projector' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Projector not found' });
    }
    res.json({ message: 'Projector updated successfully' });
  });
};

const deleteProjector = (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM projectors WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting projector' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Projector not found' });
    }
    res.json({ message: 'Projector deleted successfully' });
  });
};

module.exports = {
  createProjector,
  getProjectors,
  updateProjector,
  deleteProjector
};