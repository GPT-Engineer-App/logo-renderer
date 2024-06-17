const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.fields([{ name: 'video' }, { name: 'logo' }]), (req, res) => {
  const videoPath = req.files.video[0].path;
  const logoPath = req.files.logo[0].path;
  const outputPath = `uploads/output-${Date.now()}.mp4`;

  ffmpeg(videoPath)
    .input(logoPath)
    .complexFilter([
      {
        filter: 'overlay',
        options: { x: '10', y: '10' },
      },
    ])
    .size('720x720')
    .on('end', () => {
      res.download(outputPath, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
        }
        fs.unlinkSync(videoPath);
        fs.unlinkSync(logoPath);
        fs.unlinkSync(outputPath);
      });
    })
    .on('error', (err) => {
      console.error('Error processing video:', err);
      res.status(500).send('Error processing video');
    })
    .save(outputPath);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});