import { FlaskConical } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center m-2">
      <FlaskConical size={25} className="mr-2 text-primary" />
      <span className="tracking-widest text-xl underline dark:bg-primary dark:text-gray-700 rounded-l-lg pl-1 pb-1 bg-gray-800 text-white">
        app
      </span>
      <span className="tracking-widest text-xl text-primary">raise</span>
    </div>
  );
};

export default Logo;
