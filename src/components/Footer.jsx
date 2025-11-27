export default function Footer() {
  return (
    <footer className="border-t bg-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between text-xs text-slate-500 gap-4">
        <div className="space-y-1">
          <p className="font-semibold text-slate-700">Company</p>
          <p>About Us • Careers • Contact</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-slate-700">Resources</p>
          <p>Help Center • Safety • Guidelines</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-slate-700">Legal</p>
          <p>Privacy Policy • Terms of Service</p>
        </div>
        <div className="md:text-right">
          <p>© 2024 ArgoTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
