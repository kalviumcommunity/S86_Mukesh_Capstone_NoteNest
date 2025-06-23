// src/components/home/Features.jsx
import { Card, CardContent } from "../ui/card";
import { Code, FileText, FolderPlus, Edit } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 px-6 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Powerful Features for Your Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FolderPlus className="h-10 w-10 text-primary" />}
            title="Organize with Folders"
            description="Create folders to organize your notes by project, topic, or any structure you prefer."
          />
          <FeatureCard
            icon={<FileText className="h-10 w-10 text-primary" />}
            title="Rich Text Notes"
            description="Write beautiful notes with formatting options to highlight important information."
          />
          <FeatureCard
            icon={<Edit className="h-10 w-10 text-primary" />}
            title="Quick Editing"
            description="Edit your notes instantly with our intuitive and responsive editor."
          />
          <FeatureCard
            icon={<Code className="h-10 w-10 text-primary" />}
            title="Code Documentation"
            description="Write and document code with our split-view editor for coding explanations."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 bg-primary/10 p-3 rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Features;


// import { Card, CardContent } from "@/components/ui/card";
// import { Code, FileText, FolderPlus, Edit } from "lucide-react";

// const Features = () => {
//   return (
//     <section className="py-16 px-6 md:px-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           Powerful Features for Your Notes
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <FeatureCard
//             icon={<FolderPlus className="h-10 w-10 text-primary" />}
//             title="Organize with Folders"
//             description="Create folders to organize your notes by project, topic, or any structure you prefer."
//           />
//           <FeatureCard
//             icon={<FileText className="h-10 w-10 text-primary" />}
//             title="Rich Text Notes"
//             description="Write beautiful notes with formatting options to highlight important information."
//           />
//           <FeatureCard
//             icon={<Edit className="h-10 w-10 text-primary" />}
//             title="Quick Editing"
//             description="Edit your notes instantly with our intuitive and responsive editor."
//           />
//           <FeatureCard
//             icon={<Code className="h-10 w-10 text-primary" />}
//             title="Code Documentation"
//             description="Write and document code with our split-view editor for coding explanations."
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// const FeatureCard = ({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) => {
//   return (
//     <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
//       <CardContent className="p-6 flex flex-col items-center text-center">
//         <div className="mb-4 bg-primary/10 p-3 rounded-full">{icon}</div>
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//       </CardContent>
//     </Card>
//   );
// };

// export default Features;
