import type { FileWithPath } from "react-dropzone";

import { Upload, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// Note: You may not need 'react-image' or 'PrimaryLoading' in the final version
// if you choose not to pre-process the video for a static thumbnail.

type VideoUploadProps = {
  maxSizeMB?: number;
  initialVideoUrl?: string | null;
  onFileChange: (file: FileWithPath | null) => void;
  forceRM?: boolean;
  disableX?: boolean;
};

function VideoInput({
  maxSizeMB = 100, // Video max size is usually much larger than images
  initialVideoUrl = null,
  onFileChange,
  forceRM,
  disableX,
}: VideoUploadProps) {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize with existing video URL
  useEffect(() => {
    if (initialVideoUrl) {
      setVideoUrl(initialVideoUrl);
    }
  }, [initialVideoUrl]);

  // Handle force removal from parent and object URL cleanup
  useEffect(() => {
    if (forceRM) {
      setFile(null);
      setVideoUrl(null);
      onFileChange(null);
    }
    // Clean up created blob URL when file is removed or component unmounts
    return () => {
      if (videoUrl && videoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [forceRM, setFile, setVideoUrl, onFileChange, videoUrl]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: unknown[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        setError(
          `File rejected. Max size: ${maxSizeMB}MB, allowed types: MP4/MOV/WebM`,
        );
        return;
      }

      const newFile = acceptedFiles[0] || null;
      setFile(newFile);
      setVideoUrl(newFile ? URL.createObjectURL(newFile) : null);
      onFileChange(newFile);
    },
    [maxSizeMB, onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // ACCEPT ONLY VIDEO TYPES
    accept: { "video/*": [".mp4", ".mov", ".webm", ".avi"] },
    maxSize: maxSizeMB * 1024 * 1024,
    maxFiles: 1,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setVideoUrl(null);
    onFileChange(null);
  };

  const currentVideoUrl = file ? URL.createObjectURL(file) : videoUrl;
  const currentFileName = file?.name || "Existing video";

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
          ${isDragActive
      ? "border-green-500 bg-green-50/50"
      : "border-gray-200 hover:border-gray-300"
    }
          ${error ? "animate-shake border-red-500" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload
            className={`text-3xl ${isDragActive ? "text-green-500" : "text-gray-400"}`}
          />
          <p className="text-gray-600">
            {isDragActive
              ? "Drop your video here"
              : "Drag & drop a video file, or click to browse"}
          </p>
          <p className="text-xs text-gray-400">
            MP4/MOV/WebM, max
            {" "}
            {maxSizeMB}
            {" "}
            MB
          </p>
        </div>
      </div>

      {/* Error Message (Same logic) */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm text-center"
        >
          {error}
        </motion.p>
      )}

      {/* Video Preview */}
      <AnimatePresence>
        {(file || videoUrl) && currentVideoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group rounded-lg overflow-hidden border border-gray-200 mx-auto p-4"
          >
            {/* Display the video with controls */}
            <video

              controls={true}
              muted={true}
              className="w-full h-48 rounded-md object-contain bg-black"
            >
              <source src={currentVideoUrl} type="video/mp4" />
            </video>
            {/* Remove Button */}
            {!disableX && (
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            )}

            {/* File Name Display */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-xs truncate">
                {currentFileName.substring(0, 30)}
                {currentFileName.length > 30 && "..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!file && !videoUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-gray-400"
        >
          <Video className="text-4xl mb-2" />
          <p>No video selected</p>
        </motion.div>
      )}
    </div>
  );
}

export default VideoInput;
