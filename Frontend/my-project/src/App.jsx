import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

export default function App() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setUploadProgress(0);
    setDownloadLink("");
    if (f.type.startsWith("image/")) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://quickshare-e2lz.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (!e.total) return;
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });
      setDownloadLink(res.data.link);
      setTimeout(() => setUploadProgress(0), 1500);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl("");
    setUploadProgress(0);
    setDownloadLink("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-indigo-600 text-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-xl">⚡</div>
            <h1 className="text-xl font-semibold">QuickShare</h1>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">

            {/* Preview */}
            <div className="flex-1 flex items-center justify-center w-full">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-48 md:h-48 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="object-cover w-full h-full" />
                ) : (
                  <div className="text-center px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4 4 4M17 8v8m0 0l4-4m-4 4-4-4" />
                    </svg>
                    <p className="text-sm text-gray-500">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-semibold mb-2">Upload your file</h2>
              <p className="text-sm text-gray-500 mb-4">Select any file and get a sharable link or QR code.</p>

              <label className="block mb-3">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleUpload}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow w-full sm:w-auto justify-center"
                >
                  Upload
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md w-full sm:w-auto justify-center"
                >
                  Reset
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white font-medium transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress}%
                    </div>
                  </div>
                )}

                {/* Download link + QR */}
                {downloadLink && (
                  <div className="mt-4 text-sm break-words">
                    <p className="text-green-600 font-medium">File uploaded successfully ✅</p>
                    <a href={downloadLink} target="_blank" rel="noreferrer" className="text-indigo-600 underline break-all">{downloadLink}</a>

                    {/* QR Code */}
                    <div className="mt-4 flex justify-center">
                      <QRCode value={downloadLink} size={128} />
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-1">Scan QR code to download</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          Made   by Gourav Rajput — QuickShare
        </div>
      </footer>
    </div>
  );
}
