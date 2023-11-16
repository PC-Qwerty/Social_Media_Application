import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploadProps = {
  fieldChange: (files: File[]) => void;
  mediaURL: string;
};

const FileUploader = ({ fieldChange, mediaURL }: FileUploadProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileURL, setFileURL] = useState(mediaURL);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileURL(URL.createObjectURL(acceptedFiles[0]));
    },
    [file] //eslint-disable-line react-hooks/exhaustive-deps
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".png", ".jpeg", ".svg", ".gif"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileURL ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileURL} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-3 mt-5">
            Drag n Drop here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from device</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
