import { TemplateStepIcon } from "@prisma/client";
import {
  ALargeSmall,
  BugPlay,
  Database,
  Download,
  Globe,
  Keyboard,
  MousePointerClick,
  Save,
  Server,
  Upload,
  Loader,
  CheckCheck,
} from "lucide-react";

export const KeyToIconTransformer = (key: TemplateStepIcon) => {
  switch (key) {
    case "MOUSE":
      return <MousePointerClick />;
    case "NAVIGATION":
      return <Globe />;
    case "INPUT":
      return <Keyboard />;
    case "DOWNLOAD":
      return <Download />;
    case "API":
      return <Server />;
    case "STORE":
      return <Save />;
    case "FORMAT":
      return <ALargeSmall />;
    case "DATA":
      return <Database />;
    case "UPLOAD":
      return <Upload />;
    case "WAIT":
      return <Loader />;
    case "VALIDATION":
      return <CheckCheck />;
    case "DEBUG":
      return <BugPlay />;
  }
};
