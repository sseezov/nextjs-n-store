'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './file-upload-input.module.css';

interface FileUploadInputProps {
  name: string;
  multiple?: boolean;
  accept?: string;
  onFilesChange?: (files: FileList | null) => void;
  resetKey?: string | number; // Используем key для сброса
}

export default function FileUploadInput({
  name,
  multiple = false,
  accept = "image/*",
  onFilesChange
}: FileUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const names = Array.from(files).map(file => file.name);
      setFileNames(names);

      const urls: string[] = [];
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          urls.push(url);
        }
      });
      setPreviewUrls(urls);

      onFilesChange?.(files);
    } else {
      setFileNames([]);
      setPreviewUrls([]);
      onFilesChange?.(null);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setFileNames([]);
      setPreviewUrls([]);
      onFilesChange?.(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.fileInputWrapper}>
        <input
          type="file"
          name={name}
          id={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={multiple}
          accept={accept}
          className={styles.fileInput}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={styles.fileInputLabel}
        >
          {multiple ? 'Выберите файлы' : 'Выберите файл'}
        </button>
        {fileNames.length > 0 && (
          <span className={styles.fileNames}>
            Выбрано: {fileNames.join(', ')}
          </span>
        )}
      </div>

      {previewUrls.length > 0 && (
        <div className={styles.previews}>
          {previewUrls.map((url, index) => (
            <div key={index} className={styles.previewItem}>
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                className={styles.previewImage}
              />
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}