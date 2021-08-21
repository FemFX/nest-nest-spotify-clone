import React, { ReactNode, useRef } from "react";
interface IFileUploadProps {
  setFile: Function;
  accept: string;
  children: ReactNode;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  setFile,
  accept,
  children,
}: IFileUploadProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };
  return (
    <div onClick={() => ref.current.click()}>
      <input
        ref={ref}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {children}
    </div>
  );
};

export default FileUpload;
