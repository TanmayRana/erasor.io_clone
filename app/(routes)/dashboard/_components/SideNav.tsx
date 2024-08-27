"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import SideNavBottomSection from "./SideNavBottomSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FilesListContext";

const SideNav = () => {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);

  const convex = useConvex();

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    // console.log(fileName);
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (res) => {
        if (res) {
          getFiles();
          toast("File created successfully!");
        }
      },
      (e) => {
        toast(
          "An error occurred while creating the file. Please try again later."
        );
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    // console.log(result);
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <div
      className=" h-screen fixed w-72 border-r p-6
     border-[1px] flex flex-col"
    >
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
};

export default SideNav;
