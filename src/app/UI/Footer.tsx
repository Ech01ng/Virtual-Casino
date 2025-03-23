import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-yellow-500 text-lg font-semibold mb-4">About The Virtual Casino</h3>
            <p className="text-gray-300">
              Experience the thrill of casino games from the comfort of your home. 
              Play classic games like Blackjack and Slot Machine with virtual chips.
            </p>
          </div>

          {/* Quick Links 
          <div>
            <h3 className="text-yellow-500 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/games/blackjack" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Blackjack
                </Link>
              </li>
              <li>
                <Link href="/games/slot-machine" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Slot Machine
                </Link>
              </li>
            </ul>
          </div>*/}

          {/* Contact Info */}
          <div>
            <h3 className="text-yellow-500 text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@virtualcasino.com</li>
              <li>Hours: 24/7</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Virtual Casino. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 