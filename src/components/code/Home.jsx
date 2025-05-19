import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import {
  FiCheck, FiZap, FiBarChart2, FiSun, FiMoon, FiX, FiMenu,
  FiMail, FiGithub, FiTwitter, FiLinkedin, FiArrowRight,
  FiStar, FiKey, FiLock, FiHelpCircle, FiExternalLink
} from 'react-icons/fi';
import { FiPlayCircle } from "react-icons/fi";
import { FaPuzzlePiece, FaRocket, FaBrain, FaRegLightbulb } from 'react-icons/fa';
import { GiAchievement, GiProgression } from 'react-icons/gi';

import { FaPlay, FaTimes } from 'react-icons/fa';


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [puzzle, setPuzzle] = useState({ question: '', answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);



  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
  };

  // Generate math puzzles
  const generatePuzzle = () => {
    const operations = [
      { symbol: '+', func: (a, b) => a + b },
      { symbol: '-', func: (a, b) => a - b },
      { symbol: '×', func: (a, b) => a * b }
    ];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;

    setPuzzle({
      question: `What is ${a} ${op.symbol} ${b}?`,
      answer: op.func(a, b).toString()
    });
  };

  const checkPuzzle = () => {
    if (userAnswer === puzzle.answer) {
      setShowEmail(true);
      generatePuzzle();
    } else {
      alert('❌ Incorrect answer. Try again!');
      setUserAnswer('');
    }
  };

  useEffect(() => {
    generatePuzzle();
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>GoalTracker 🚀 | Smart Task Management</title>
        <meta name="description" content="The ultimate productivity app to track your goals and achievements" />
      </Head>

      {/* Animated Background */}
      <div className={`fixed inset-0 -z-10 opacity-20 ${darkMode ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-emerald-900/30' : 'bg-gradient-to-br from-purple-100 via-blue-100 to-emerald-100'}`}></div>

      {/* Floating Rounded Navbar */}
      <header className={`fixed w-full transition-all duration-500 ${scrolled ? (darkMode ? 'bg-gray-800/90 backdrop-blur-md py-2 shadow-xl' : 'bg-white/90 backdrop-blur-md py-2 shadow-xl') : 'py-4'} max-w-6xl mx-4 lg:mx-auto left-0 right-0 rounded-full mt-4`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center`}>
              <img src="/logos/gttt.png" alt="Logo" className="h-8 w-8" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              GoalTracker<span className="text-indigo-400">✨</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/features" className={`font-medium hover:text-indigo-500 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Features <FiZap className="inline ml-1" />
            </a>
            <a href="#about" className={`font-medium hover:text-indigo-500 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              About <FiHelpCircle className="inline ml-1" />
            </a>
            <a href="#contact" className={`font-medium hover:text-indigo-500 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Contact <FiMail className="inline ml-1" />
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

            <a
              href="/goaltrack"
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center group"
            >
              Launch App <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FiX className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            ) : (
              <FiMenu className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`md:hidden px-6 pt-4 pb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl mt-2 mx-4 shadow-xl`}>
            <div className="flex flex-col space-y-4">
              <a
                href="/features"
                className={`px-4 py-3 rounded-lg flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => setMenuOpen(false)}
              >
                <FiZap className="mr-3" /> Features
              </a>
              <a
                href="#about"
                className={`px-4 py-3 rounded-lg flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => setMenuOpen(false)}
              >
                <FiHelpCircle className="mr-3" /> About
              </a>
              <a
                href="#contact"
                className={`px-4 py-3 rounded-lg flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => setMenuOpen(false)}
              >
                <FiMail className="mr-3" /> Contact
              </a>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center">
                  {darkMode ? <FiMoon className="mr-3" /> : <FiSun className="mr-3" />}
                  Dark Mode
                </span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <a
                href="/goaltrack"
                className="px-4 py-3 text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Launch App <FiArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-indigo-500/10 text-indigo-500 font-medium">
              <span className="flex items-center">
                <FaRocket className="mr-2" /> Introducing v1.0
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Achieve More <GiProgression className="inline" />
              </span> <br />
              With <span className="underline decoration-indigo-400 decoration-wavy">Smart</span> Task Management 🚀
            </h1>
            <p className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              GoalTracker helps you organize, prioritize, and accomplish what matters most with intuitive workflows and powerful analytics. <FaRegLightbulb className="inline" />
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/goaltrack"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center group"
              >
                Get Started Free <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/features"
                className={`px-8 py-4 rounded-full font-bold text-lg border-2 ${darkMode ? 'border-gray-600 hover:border-indigo-500 text-white' : 'border-gray-300 hover:border-indigo-400 text-gray-800'} transition flex items-center justify-center`}
              >
                Explore Features <FiStar className="ml-2 text-yellow-400" />
              </a>
            </div>
          </div>






          {/* App Preview */}

          <section id='demo' className={`py-10  px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
            <div className="w-full pt-16">
              {/* Video Thumbnail */}
              <div
                className="relative w-full max-w-3xl mx-auto cursor-pointer group"
                onClick={handleOpen}
              >
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:border-indigo-200">
                  {/* Replace with your actual video thumbnail */}
                  <img
                    src="/images/app.jpg"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all rounded-2xl flex items-center justify-center">
                    <div className="bg-white/90 group-hover:bg-white p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-all">
                      <FaPlay className="text-indigo-600 text-xl" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center text-gray-500 font-normal">
                  Click to watch demo
                </div>
              </div>

              {/* Video Dialog Modal */}
              {isOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                  onClick={handleClose}
                >
                  <div
                    className="relative w-full max-w-4xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={handleClose}
                      className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                      aria-label="Close video"
                    >
                      <div className="bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm">
                        <FaTimes className="text-xl" />
                      </div>
                    </button>

                    {/* Video Player Container */}
                    <div className="relative aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow-2xl">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        playsInline
                      >
                        {/* Replace with your actual video source */}
                        <source src="/videos/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    {/* Video Info (optional) */}
                    <div className="mt-4 text-center text-white">
                      <h3 className="text-xl font-semibold">Demo Video</h3>
                      <p className="text-gray-300 mt-1">1:10 min</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>


          {/*       End Preview  */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Features Header */}
          <div className="text-center mb-16">
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${darkMode ? 'bg-gray-800 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
              PRODUCTIVITY POWERED
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Features Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Your Success</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Tools that adapt to your workflow and help you achieve more with less effort.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Feature 1 */}
            <div className={`p-8 rounded-xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-300'} hover:shadow-lg`}>
              <div className={`w-14 h-14 rounded-lg ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center mb-6`}>
                <FiCheck className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Goal Tracking</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Break down objectives into manageable tasks with milestones and progress tracking.
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={`p-8 rounded-xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'} hover:shadow-lg`}>
              <div className={`w-14 h-14 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} flex items-center justify-center mb-6`}>
                <FiZap className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Prioritization</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                AI that learns your patterns to surface what's most important.
              </p>
              <div className="flex space-x-1">
                {['M', 'T', 'W', 'T', 'F'].map((day, i) => (
                  <div key={i} className="flex-1">
                    <div className={`h-8 rounded-t-sm ${i === 2 ? 'bg-purple-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 3 */}
            <div className={`p-8 rounded-xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-300'} hover:shadow-lg`}>
              <div className={`w-14 h-14 rounded-lg ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'} flex items-center justify-center mb-6`}>
                <FiBarChart2 className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Analytics Dashboard</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Visualize your productivity trends with actionable insights.
              </p>
              <div className="flex space-x-1">
                {[3, 5, 2, 6, 4].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-t-sm ${i === 3 ? 'bg-emerald-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                      style={{ height: `${value * 8}px` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meet the Developer Section */}
          <div id='dev' className={`py-16 px-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} flex flex-col md:flex-row items-center gap-12`}>
            <div className="md:w-1/3">
              <div className={`w-64 h-64 rounded-full mx-auto overflow-hidden border-4 ${darkMode ? 'border-indigo-500' : 'border-indigo-300'}`}>
                <img
                  src={darkMode ? "/images/me.jpg" : "/images/me.jpg"}
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                CREATOR SPOTLIGHT
              </span>
              <h3 className="text-3xl font-bold mb-4">Meet the Developer</h3>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I’m Arijit Roy, passionate about development with a focus on websites and applications. My hands-on
                experience with personal projects has sharpened my skills and creativity.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="flex items-center text-sm font-medium px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition">
                  <FiMail className="mr-2" /> Contact Me
                </a>
                <a href="https://github.com/arijiiiitttt/GoalTrack" target='_blank' className={`flex items-center text-sm font-medium px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} border border-gray-300 dark:border-gray-600 transition`}>
                  <FiGithub className="mr-2" /> View Code
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-24 px-4">
            <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 sm:p-12 shadow-xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20"></div>

              {/* Glowing dot */}
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-indigo-400 rounded-full filter blur-md animate-pulse"></div>

              <div className="relative z-10 text-center">
                <h3 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  Supercharge Your Workflow
                  <span className="inline-block ml-2 animate-bounce">⚡</span>
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                  Experience the <span className="font-semibold text-indigo-500 dark:text-indigo-400">next generation</span> of productivity tools.
                  Start in seconds, see results immediately.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/goaltrack"
                    className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center overflow-hidden group"
                  >
                    {/* Animated background effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center">
                      <FiZap className="mr-3 text-yellow-200 group-hover:animate-ping" />
                      Launch Now
                      <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>

                  <a
                    href="#demo"
                    className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center group relative overflow-hidden border ${darkMode
                      ? 'border-gray-700 hover:border-indigo-500 text-white hover:bg-gray-800/50'
                      : 'border-gray-200 hover:border-indigo-400 text-gray-800 hover:bg-gray-50'
                      }`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white dark:to-gray-900 opacity-0 group-hover:opacity-10 transition-opacity"></span>
                    <FiPlayCircle className="mr-3 text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    <span className="relative">
                      See Magic in Action
                    </span>
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <div className="flex -space-x-2 mr-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 border-2 border-white dark:border-gray-800"></div>
                      ))}
                    </div>
                    <span>Join 10k+ users</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-1 text-gray-500 dark:text-gray-400">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Ultra Improved */}
      <section id="about" className={`py-24 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
        {/* Floating animated elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full ${darkMode ? 'bg-indigo-900/10' : 'bg-indigo-100/30'} blur-[100px] animate-float1`}></div>
          <div className={`absolute top-1/3 right-0 w-64 h-64 rounded-full ${darkMode ? 'bg-purple-900/10' : 'bg-purple-100/30'} blur-[90px] animate-float2`}></div>
          <div className={`absolute bottom-20 left-1/4 w-56 h-56 rounded-full ${darkMode ? 'bg-emerald-900/10' : 'bg-emerald-100/30'} blur-[80px] animate-float3`}></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 dark:from-gray-900/80 dark:to-gray-800/90 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/5 rounded-full"></div>
            <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <span className={`inline-block px-5 py-1.5 rounded-full ${darkMode ? 'bg-gray-800 text-indigo-400 border border-gray-700' : 'bg-indigo-100 text-indigo-600'} text-sm font-medium mb-4 shadow-sm`}>
                  Why We're Different ✨
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  Built for Achievers
                </h2>
                <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Traditional todo apps just manage tasks. GoalTracker transforms how you achieve meaningful progress.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column - Visual Card (Enhanced) */}
                <div className="lg:w-1/2 relative group">
                  <div className={`rounded-3xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800/70' : 'bg-white'} border ${darkMode ? 'border-gray-700/50' : 'border-gray-200'} transform transition-all duration-500 group-hover:scale-[1.02]`}>
                    <div className="relative">
                      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-8">
                        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-cover"></div>
                        <div className="text-center relative z-10">
                          <div className="text-6xl mb-4 animate-bounce">🚀</div>
                          <p className="text-white font-medium text-xl tracking-wide">Your Success Journey Visualized</p>
                        </div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className={`px-4 py-1.5 rounded-full ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border shadow-md flex items-center`}>
                          <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                          <span className="text-xs font-medium">Active Tracking</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-500'} mr-2`}></div>
                          <span className="font-medium">Quarterly Goals</span>
                        </div>
                        <span className="text-sm font-mono">75% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8">
                        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full relative overflow-hidden" style={{ width: '75%' }}>
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-blue-500/30 animate-progress"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { icon: '📝', title: 'Planning', desc: 'Strategic roadmap' },
                          { icon: '⚡', title: 'Execution', desc: 'Daily progress' },
                          { icon: '🏆', title: 'Achievement', desc: 'Celebrate wins' }
                        ].map((item, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-lg text-center transition-all hover:-translate-y-1 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} hover:shadow-md`}
                          >
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <p className="font-medium">{item.title}</p>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Features (Enhanced) */}
                <div className="lg:w-1/2">
                  <div className="space-y-6">
                    {[
                      {
                        icon: <FiCheck className="h-6 w-6 text-indigo-500" />,
                        bg: darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100/80',
                        title: "Outcome-Focused Approach",
                        desc: "We help you focus on meaningful results, not just activities. Track progress toward your actual goals with measurable milestones.",
                        emoji: "🎯"
                      },
                      {
                        icon: <FiZap className="h-6 w-6 text-purple-500" />,
                        bg: darkMode ? 'bg-purple-900/30' : 'bg-purple-100/80',
                        title: "Smart Prioritization",
                        desc: "Our system learns your work patterns to automatically surface what's most important based on deadlines and energy levels.",
                        emoji: "🧠"
                      },
                      {
                        icon: <FiBarChart2 className="h-6 w-6 text-emerald-500" />,
                        bg: darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100/80',
                        title: "Beautiful Analytics",
                        desc: "Get crystal-clear visualizations of your productivity trends and personalized insights to optimize your workflow.",
                        emoji: "📊"
                      }
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800/40 border-gray-700 hover:border-indigo-500/50' : 'bg-white/90 border-gray-200 hover:border-indigo-300'} hover:shadow-lg transition-all duration-300 group backdrop-blur-sm`}
                      >
                        <div className="flex items-start">
                          <div className={`p-3 rounded-lg ${feature.bg} mr-4 group-hover:scale-110 transition-transform shadow-sm`}>
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2 flex items-center">
                              {feature.title} <span className="ml-2 transform group-hover:scale-110 transition-transform">{feature.emoji}</span>
                            </h3>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* CTA Buttons */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href="/goaltrack"
                        className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/30' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-indigo-400/30'} shadow-lg hover:shadow-xl`}
                      >
                        <span className="relative z-10 flex items-center">
                          Start Free Trial
                          <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </a>
                      <a
                        href="/features"
                        className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center group border-2 ${darkMode ? 'border-gray-700 hover:border-indigo-500 text-white hover:bg-gray-800/50' : 'border-gray-300 hover:border-indigo-400 text-gray-800 hover:bg-gray-100'} hover:shadow-md`}
                      >
                        <span className="flex items-center">
                          Explore Features
                          <FiStar className="ml-3 text-yellow-400 group-hover:rotate-12 transition-transform" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Ultra Improved */}
      <section id="contact" className={`py-24 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'} relative overflow-hidden`}>
        {/* Floating animated elements */}
        <div className="absolute top-0  left-0 w-full h-full overflow-hidden -z-10">
          <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full ${darkMode ? 'bg-indigo-900/10' : 'bg-indigo-100/20'} blur-[120px] animate-float2`}></div>
          <div className={`absolute bottom-0 left-1/4 w-80 h-80 rounded-full ${darkMode ? 'bg-purple-900/10' : 'bg-purple-100/20'} blur-[100px] animate-float3`}></div>
        </div>

        <div className="max-w-6xl bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto">
          <div className="relative  z-10 dark:from-gray-900/80 dark:to-gray-800/90 rounded-3xl p-8 sm:p-12  overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/5 rounded-full"></div>
      <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full"></div>
       
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <span className={`inline-block px-5 py-1.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-indigo-100 text-indigo-600'} text-sm font-medium mb-4 shadow-sm`}>
                  Get In Touch 💬
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  Lets Build Something Cool !!
                </h2>
                <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Have questions or feedback? We'd love to hear from you!
                </p>
              </div>

              <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white border-gray-200'} border backdrop-blur-sm shadow-xl`}>
                <div className="p-10 flex flex-col lg:flex-row gap-12">
                  {/* Left Column - Puzzle Challenge (Enhanced) */}
                  <div className="lg:w-1/2">
                    <div className="flex flex-col h-full">
                      <div className="w-24 h-24 mb-6 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto lg:mx-0 shadow-inner border border-indigo-500/20 group hover:bg-indigo-500/20 transition-all">
                        <FaPuzzlePiece className="h-10 w-10 text-indigo-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-center lg:text-left flex items-center">
                        Solve the Puzzle <span className="ml-2 text-indigo-400 animate-bounce">🔐</span>
                      </h3>
                      <p className={`mb-8 text-center lg:text-left ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Complete this fun challenge to reveal our contact email address.
                      </p>

                      <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-200'} border mb-8 flex-grow flex flex-col justify-center shadow-inner`}>
                        <div className="flex items-center justify-between mb-6">
                          <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Challenge:</span>
                          <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-600 text-indigo-300' : 'bg-gray-200 text-indigo-600'} shadow-sm`}>
                            Math Puzzle
                          </span>
                        </div>
                        <p className={`text-2xl font-mono text-center py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'} bg-gradient-to-r ${darkMode ? 'from-indigo-400/20 to-purple-400/20' : 'from-indigo-100 to-purple-100'} rounded-lg mx-4`}>
                          {puzzle.question}
                        </p>
                        <div className="flex justify-center">
                          <div className={`w-16 h-1 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} bg-gradient-to-r from-indigo-400 to-purple-400`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Form (Enhanced) */}
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    {!showEmail ? (
                      <div className="space-y-6">
                        <div>
                          <label className={`block mb-3 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                            <FiKey className="mr-2 text-indigo-500" /> Your Answer
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={userAnswer}
                              onChange={(e) => setUserAnswer(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && checkPuzzle()}
                              className={`w-full px-5 py-4 rounded-xl border-2 focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-indigo-500 focus:ring-indigo-900 text-white placeholder-gray-500' : 'bg-white border-gray-300 focus:border-indigo-400 focus:ring-indigo-200 text-gray-800 placeholder-gray-400'} shadow-sm hover:shadow-md`}
                              placeholder="Enter your solution"
                            />
                            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'} shadow-inner`}>
                              {userAnswer.length}/10
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={checkPuzzle}
                          disabled={!userAnswer.trim()}
                          className={`w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/30' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-indigo-400/30'} shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                          <span className="relative z-10 flex items-center">
                            Submit Answer
                            <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>

                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} text-center border ${darkMode ? 'border-gray-600' : 'border-gray-200'} shadow-inner`}>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center justify-center`}>
                            <FiHelpCircle className="mr-2 text-indigo-500" />
                            Hint: It's a simple math calculation!
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-200'} border text-center h-full flex flex-col justify-center shadow-inner`}>
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 relative group">
                          <div className="relative">
                            <FiCheck className="h-10 w-10 text-green-500 group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
                          Success! <span className="ml-2 animate-bounce">🎉</span>
                        </h3>
                        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          You solved the puzzle! Here's how to reach us:
                        </p>

                        <div className="mb-8">
                          <a
                            href="mailto:contact@goaltracker.app"
                            className="inline-block px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 rounded-lg font-mono transition flex items-center justify-center mx-auto group border border-indigo-500/20 hover:border-indigo-500/30 shadow-sm hover:shadow-md"
                          >
                            contact@goaltracker.app
                            <FiMail className="ml-3 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button
                            onClick={() => {
                              setShowEmail(false);
                              setUserAnswer('');
                              generatePuzzle();
                            }}
                            className={`px-5 py-2.5 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-indigo-400' : 'bg-gray-200 hover:bg-gray-300 text-indigo-600'} transition flex items-center justify-center border ${darkMode ? 'border-gray-600' : 'border-gray-300'} shadow-sm hover:shadow-md`}
                          >
                            Try Another Puzzle
                            <FaPuzzlePiece className="ml-2 group-hover:rotate-12 transition-transform" />
                          </button>
                          <a
                            href="/app"
                            className={`px-5 py-2.5 rounded-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'} transition flex items-center justify-center shadow-sm hover:shadow-md group`}
                          >
                            Launch App
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awesome Footer */}
      <footer className={`py-16 px-6 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className={`p-2 rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-indigo-100'}`}>
                  <img
                    src="/logos/gttt.png"
                    alt="GoalTracker Logo"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold">
                  GoalTracker<span className="text-indigo-400">✨</span>
                </span>
              </div>
              <p className="mb-4">
                The ultimate productivity app to track your goals and achievements. <span className="text-indigo-400">#GoalTracker</span>
              </p>
              <div className="flex space-x-4">
                <a href="https://x.com/arijiiiitttt" target='_blank' className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} shadow`}>
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a href="https://github.com/arijiiiitttt"  target='_blank'  className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} shadow`}>
                  <FiGithub className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/realarijiiiitttt/" target='_blank' className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} shadow`}>
                  <FiLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                Product <FiZap className="ml-2" />
              </h3>
              <ul className="space-y-2">
                <li><a href="/features" className="hover:text-indigo-500 transition">Features</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Changelog</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                Resources <FiHelpCircle className="ml-2" />
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-500 transition">Documentation</a></li>
                <li><a href="#demo" className="hover:text-indigo-500 transition">Tutorials</a></li>
                <li><a href="#dev" className="hover:text-indigo-500 transition">Blog</a></li>
                <li><a href="#contact" className="hover:text-indigo-500 transition">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                Company <FiMail className="ml-2" />
              </h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-indigo-500 transition">About</a></li>
                <li><a href="#contact" className="hover:text-indigo-500 transition">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Legal</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-700 text-center">
            <p className="mb-2">
              © {new Date().getFullYear()} GoalTracker. All rights reserved. <span className="text-indigo-400">Made with ❤️ by arijiiiitttt</span>
            </p>
            <p className="text-sm">
              <a href="#" className="hover:text-indigo-500 transition">Privacy Policy</a> •
              <a href="#" className="hover:text-indigo-500 transition ml-2">Terms of Service</a> •
              <a href="#" className="hover:text-indigo-500 transition ml-2">Cookie Policy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}