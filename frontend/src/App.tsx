import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/documents";

interface FileData {
  id: string;
  filename: string;
  filesize: number;
}

function App() {
  const [selected, setSelected] = useState<File | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);

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

interface DeleteFileFn {
    (id: string): Promise<void>;
}

const deleteFile: DeleteFileFn = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchFiles();
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Patient Document Portal</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const files = e.target.files;
          setSelected(files && files.length > 0 ? files[0] : null);
        }}
      />

      <button onClick={uploadFile}>Upload</button>

      <h3>Uploaded Documents</h3>
      <ul>
        {files.map((f) => (
          <li key={f.id}>
            {f.filename} ({(f.filesize / 1024).toFixed(1)} KB)
            &nbsp;
            <button onClick={() => window.open(`${API}/${f.id}`)}>
              Download
            </button>
            &nbsp;
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
