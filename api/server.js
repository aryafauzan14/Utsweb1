import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let companies = [
  { id: 1, title: "PT. Inovasi Digital", excerpt:"IoT Startup", desc:"Perusahaan IoT modern", img:"inovasi.jpeg" },
  { id: 2, title: "PT. Karya Nusantara", excerpt:"Energi Terbarukan", desc:"Pemasangan solar panel", img:"karya.jpeg" },
  { id: 3, title: "CV. Kreatif Studio", excerpt:"Desain Grafis", desc:"Branding & UI/UX", img:"studio.jpeg" }
];

// CRUD
app.get("/companies", (req, res) => res.json(companies));
app.get("/companies/:id", (req, res) => res.json(companies.find(c => c.id == req.params.id)));
app.post("/companies", (req, res) => {
  const newData = { id: Date.now(), ...req.body };
  companies.push(newData);
  res.json(newData);
});
app.put("/companies/:id", (req, res) => {
  const id = req.params.id;
  const idx = companies.findIndex(c => c.id == id);
  companies[idx] = { ...companies[idx], ...req.body };
  res.json(companies[idx]);
});
app.delete("/companies/:id", (req, res) => {
  companies = companies.filter(c => c.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("API berjalan di http://localhost:3000"));
