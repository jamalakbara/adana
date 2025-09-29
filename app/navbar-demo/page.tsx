import { Navbar } from "@/components/ui/navbar";

export default function NavbarDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Navbar Component Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a demonstration of the responsive navbar component based on the Figma design.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features:</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Responsive design that works on all screen sizes</li>
              <li>• Mobile hamburger menu with smooth transitions</li>
              <li>• Logo with consistent branding</li>
              <li>• Navigation links with hover effects</li>
              <li>• Call-to-action button with custom styling</li>
              <li>• Built with Tailwind CSS and Shadcn/ui components</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}