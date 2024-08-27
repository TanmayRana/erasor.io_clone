"use client";

import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface CanvasProps {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}

const Canvas: React.FC<CanvasProps> = ({ onSaveTrigger, fileId, fileData }) => {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);

  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((result) => {
      console.log(result);
    });
  };

  return (
    <div style={{ height: "100%" }}>
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData.whiteboard && JSON.parse(fileData.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
