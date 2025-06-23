const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-8 border-t bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} NoteNest. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;