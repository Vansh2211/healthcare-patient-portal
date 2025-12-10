import { useEffect, useState } from "react";

const API = "http://localhost:5000/documents";

function App() {
  const [selected, setSelected] = useState<File | null>(null);
  const [files, setFiles] = useState<Document[]>([]);

  const fetchFiles = async () => {
    const res = await fetch(API);
    setFiles(await res.json());
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async () => {
    if (!selected) return alert("Select a PDF");

    const fd = new FormData();
    fd.append("file", selected);

    await fetch(API + "/upload", {
      method: "POST",
      body: fd,
    });

    setSelected(null);
    fetchFiles();
  };

  interface Document {
    id: number;
  filename: string;
  filesize: number;
  filepath: string;
  created_at: string;
  }

  const deleteFile = async (id: number): Promise<void> => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchFiles();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Patient Document Portal</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setSelected(e.target.files?.[0] || null)}
      />
      <button onClick={uploadFile}>Upload</button>

      <h3>Uploaded Files</h3>
      <ul>
        {files.map((f) => (
          <li key={f.id}>
            {f.filename} ({(f.filesize / 1024).toFixed(1)} KB)
            <button onClick={() => window.open(`${API}/${f.id}`)}>
              Download
            </button>
            <button onClick={() => deleteFile(f.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
