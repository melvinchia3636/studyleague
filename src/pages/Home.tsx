import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
            <div className="bg-gray-900 rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
                <h1 className="text-5xl font-bold text-gray-100 mb-8">Study League</h1>
                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    Welcome to your personal study companion. Track your focus time,
                    manage study sessions, and boost your productivity with our timer tools.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <Link
                        to="/timer"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 block"
                    >
                        <div className="text-2xl mb-2">⏰</div>
                        <div>Start Timer</div>
                    </Link>

                    <Link
                        to="/settings"
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 block"
                    >
                        <div className="text-2xl mb-2">⚙️</div>
                        <div>Settings</div>
                    </Link>
                </div>

                <div className="mt-8">
                    <Link
                        to="/about"
                        className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                        Learn more about Study League
                    </Link>
                </div>
            </div>
        </div>
    )
}