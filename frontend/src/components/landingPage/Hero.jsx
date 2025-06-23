import Button from "../ui/button";
import { ChevronRight, FolderPlus, File, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Organize your thoughts with NoteNest
        </h1>
        <p className="text-lg text-gray-600 max-w-lg">
          Create folders, add files, and write notes in a simple and intuitive interface. 
          Access your notes from anywhere, anytime.
        </p>
        <div className="pt-4">
          <Link to="/login">
            <Button
              size="lg"
              variant="outline"
              className="group shadow-md text-white bg-black hover:bg-gray-800 px-8 py-3 flex items-center"
            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <div
          className="w-full h-[300px] md:h-[400px] bg-cover bg-center rounded-lg relative overflow-hidden shadow-lg"
          style={{
            backgroundImage: "url('/images/Notenest-logo.png')",
          }}
        >
          {/* <div className="absolute top-8 left-8 p-4 bg-white bg-opacity-90 rounded-md shadow-md">
            <div className="flex items-center gap-2 font-medium mb-2 text-blue-600">
              <FolderPlus className="h-5 w-5" />
              <span>New Folder</span>
            </div>
            <div className="pl-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-700">
                <File className="h-4 w-4" />
                <span>Getting Started.md</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FileText className="h-4 w-4" />
                <span>Project Ideas.md</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
