import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SideNavBottomSectionProps {
  onFileCreate: (fileName: string) => void;
  totalFiles: any;
}

const SideNavBottomSection: React.FC<SideNavBottomSectionProps> = ({
  onFileCreate,
  totalFiles,
}) => {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: "",
    },
  ];

  const [fileInput, setFileInput] = useState<string>("");

  const maxFile = Number(process.env.NEXT_PUBLIC_MAX_FREE_FILE);

  const handleCreateNewDocument = () => {
    if (totalFiles >= maxFile) {
      toast("Upgrade to add new file", {
        description:
          "You have reached the maximum file limit. You dont file creation.",
      });
    }
  };

  return (
    <div>
      {menuList.map((item) => (
        <div
          key={item.id}
          className="flex gap-2 items-center p-2 px-2 text-[14px] hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <item.icon className="h-5 w-5" />
          {item.name}
        </div>
      ))}

      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3"
            onClick={handleCreateNewDocument}
          >
            New File
          </Button>
        </DialogTrigger>
        {totalFiles < maxFile ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="Enter File Name"
                  className="mt-3"
                  onChange={(e) => setFileInput(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!(fileInput && fileInput.length > 3)}
                  onClick={() => onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : null}
      </Dialog>

      {/* Progress Bar */}
      <div className="mt-6">
        <Progress value={(totalFiles / maxFile) * 100} />
        <h2 className="text-[12px] mt-3">
          <strong>{totalFiles}</strong> out of <strong>{maxFile}</strong> files
          used
        </h2>
      </div>
    </div>
  );
};

export default SideNavBottomSection;
