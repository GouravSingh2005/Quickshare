import path from "path";

export function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  // Generate download link
  const fileLink = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.json({ link: fileLink });
}
