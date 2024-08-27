import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>([]);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);

  const deleteFile = useMutation(api.files.deleteFile);

  const onDeleteFile = async (fileId: string) => {
    try {
      await deleteFile({ _id: fileId });
      setFileList((prevList) => prevList.filter((file) => file._id !== fileId));
      toast.success("File deleted successfully");
    } catch (e) {
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edited
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList &&
              fileList.map((file) => (
                <tr key={file._id} className="odd:bg-gray-50 cursor-pointer">
                  <td
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                    onClick={() => router.push("/workspace/" + file._id)}
                  >
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user?.picture && (
                      <Image
                        src={user.picture}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="gap-3"
                          onClick={() => onDeleteFile(file._id)}
                        >
                          <Archive className="h-4 w-4" /> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
