"use client";

import { uploadFile } from "../../lib/actions";

export default function UploadForm() {
  return (
    <form action={uploadFile} className="flex flex-col gap-4">
      <label>
        <span>Upload a file</span>
        <input type="file" multiple name="file" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}