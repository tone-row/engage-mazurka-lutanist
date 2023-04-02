import { create } from "zustand";
import { Project } from "./schema";
import { devtools, subscribeWithSelector } from "zustand/middleware";

type FileState = {
  /** The current project */
  project?: Project;
  /** The previous contents of the file */
  previousContents?: string;
  /** The file handle for the current project */
  fileHandle?: FileSystemFileHandle;
  /** The error that occurred when loading the file */
  loadFileError?: Error;
};

export const baseFileState: FileState = {
  project: undefined,
  previousContents: undefined,
  fileHandle: undefined,
  loadFileError: undefined,
};

/**
 * This is global app state that is not persisted. It's wiped when the app
 * restarts.
 */
export const useFileState = create<FileState>()(
  devtools(
    subscribeWithSelector((set) => ({})),
    {
      name: "File State",
    }
  )
);