import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
const Header = () => {
    const {data: session, status} = useSession()
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0e0b1f] z-50 border-b border-zinc-800">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-6">
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-md">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h2l4 4H18a2 2 0 012 2v2a2 2 0 01-2 2h-8l-4 4H4a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <span className="text-xl font-semibold">Campus Buzz</span>
          </div>

          {/* Right Section */}
          {status == "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Sign Out
            </button>
          ) : (
            ""
          )}
        </div>
      </header>
  )
}

export default Header