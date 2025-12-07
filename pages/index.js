// FILE: pages/index.js
// Copy this entire code to your GitHub repository in: pages/index.js

import { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Wallet, Settings, BarChart3, Bot, Plus, Search, Filter, Bell, Clock, Target, TrendingUp, ExternalLink, Copy, Edit, Trash2, Eye, Menu, X, AlertCircle, CheckCircle2, Users, Save, Zap, LogOut } from 'lucide-react';

export default function AirdropFarmerApp() {
  // ============================================
  // LOGIN STATE
  // ============================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Check if already logged in (from session)
  useEffect(() => {
    const session = sessionStorage.getItem('airdrop_session');
    if (session === 'authenticated') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // CREDENTIALS - Ganti disini kalau mau ubah username/password
    const VALID_USERNAME = 'SYH';
    const VALID_PASSWORD = 'apaajaboleh';
    
    if (loginUsername === VALID_USERNAME && loginPassword === VALID_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('airdrop_session', 'authenticated');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password!');
      setLoginPassword('');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('airdrop_session');
    setLoginUsername('');
    setLoginPassword('');
  };

  // ============================================
  // LOGIN PAGE UI
  // ============================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        `}</style>
        
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Airdrop Farmer</h1>
            <p className="text-gray-400 text-sm">Management System</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Login to Continue</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-sm text-red-400">{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors shadow-lg"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Protected access • Authorized users only
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600">
              © 2024 Airdrop Farmer • Made with ❤️
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN APP (After Login) - Same as before
  // ============================================
  return <MainApp onLogout={handleLogout} />;
}

// ============================================
// MAIN APPLICATION COMPONENT
// ============================================
function MainApp({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);
  const [channelEnabled, setChannelEnabled] = useState(false);
  const [showBotCommands, setShowBotCommands] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState({ type: '', message: '' });
  
  // Load data from localStorage
  const loadData = (key, defaultValue) => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  // Save data to localStorage
  const saveData = (key, value) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Bot Configuration
  const [botToken, setBotToken] = useState(loadData('botToken', ''));
  const [channelId, setChannelId] = useState(loadData('channelId', ''));
  const [botConnected, setBotConnected] = useState(loadData('botConnected', false));

  // Projects State
  const [projects, setProjects] = useState(loadData('projects', [
    {
      id: 1,
      name: 'zkSync Era',
      status: 'active',
      priority: 'high',
      progress: 75,
      deadline: '2024-12-15',
      category: 'L2',
      tasks: { completed: 15, total: 20 },
      wallets: 3,
      estimatedValue: '$500-1000',
      website: 'https://zksync.io',
      notes: 'Focus on bridge and DEX interactions'
    }
  ]));

  // Tasks State
  const [tasks, setTasks] = useState(loadData('tasks', [
    { id: 1, projectId: 1, project: 'zkSync Era', task: 'Bridge ETH to zkSync', status: 'done', type: 'daily', date: new Date().toISOString() },
    { id: 2, projectId: 1, project: 'zkSync Era', task: 'Swap on SyncSwap', status: 'pending', type: 'daily', date: new Date().toISOString() }
  ]));

  // Wallets State
  const [wallets, setWallets] = useState(loadData('wallets', [
    { id: 1, name: 'Main Wallet', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f3a4f', balance: '2.5 ETH', projects: 4 }
  ]));

  // Form States
  const [newProject, setNewProject] = useState({
    name: '', category: 'L2', priority: 'medium', deadline: '', 
    estimatedValue: '', website: '', notes: ''
  });

  const [newWallet, setNewWallet] = useState({
    name: '', address: '', balance: ''
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveData('projects', projects);
  }, [projects]);

  useEffect(() => {
    saveData('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveData('wallets', wallets);
  }, [wallets]);

  useEffect(() => {
    saveData('botToken', botToken);
    saveData('channelId', channelId);
    saveData('botConnected', botConnected);
    saveData('channelEnabled', channelEnabled);
  }, [botToken, channelId, botConnected, channelEnabled]);

  // Notification helper
  const showNotif = (type, message) => {
    setNotificationMsg({ type, message });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Bot Connection
  const handleConnectBot = () => {
    if (!botToken) {
      showNotif('error', 'Please enter bot token!');
      return;
    }
    if (channelEnabled && !channelId) {
      showNotif('error', 'Please enter channel ID!');
      return;
    }
    setBotConnected(true);
    showNotif('success', 'Bot connected successfully!');
  };

  const handleDisconnectBot = () => {
    setBotConnected(false);
    showNotif('success', 'Bot disconnected');
  };

  // Execute Bot Command
  const executeBotCommand = (commandLabel) => {
    if (!botConnected) {
      showNotif('error', 'Please connect bot first!');
      return;
    }
    showNotif('success', `Command "${commandLabel}" executed! Check your Telegram.`);
  };

  // Add Project
  const handleAddProject = () => {
    if (!newProject.name) {
      showNotif('error', 'Project name is required!');
      return;
    }

    const project = {
      id: Date.now(),
      ...newProject,
      status: 'active',
      progress: 0,
      tasks: { completed: 0, total: 20 },
      wallets: 0
    };

    setProjects([...projects, project]);
    setNewProject({
      name: '', category: 'L2', priority: 'medium', deadline: '',
      estimatedValue: '', website: '', notes: ''
    });
    setShowAddProject(false);
    showNotif('success', `Project "${project.name}" added!`);
  };

  // Delete Project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setTasks(tasks.filter(t => t.projectId !== id));
    showNotif('success', 'Project deleted!');
  };

  // Update Project
  const handleUpdateProject = () => {
    setProjects(projects.map(p => p.id === selectedProject.id ? selectedProject : p));
    setShowEditProject(false);
    setSelectedProject(null);
    showNotif('success', 'Project updated!');
  };

  // Toggle Task Status
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'done' ? 'pending' : 'done';
        
        const project = projects.find(p => p.id === task.projectId);
        if (project) {
          const projectTasks = tasks.filter(t => t.projectId === task.projectId);
          const completedCount = projectTasks.filter(t => 
            t.id === taskId ? newStatus === 'done' : t.status === 'done'
          ).length;
          
          setProjects(projects.map(p => 
            p.id === task.projectId 
              ? { ...p, tasks: { ...p.tasks, completed: completedCount }, 
                  progress: Math.round((completedCount / p.tasks.total) * 100) }
              : p
          ));
        }
        
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // Add Wallet
  const handleAddWallet = () => {
    if (!newWallet.name || !newWallet.address) {
      showNotif('error', 'Wallet name and address are required!');
      return;
    }

    const wallet = {
      id: Date.now(),
      ...newWallet,
      projects: 0
    };

    setWallets([...wallets, wallet]);
    setNewWallet({ name: '', address: '', balance: '' });
    setShowAddWallet(false);
    showNotif('success', `Wallet "${wallet.name}" added!`);
  };

  // Delete Wallet
  const handleDeleteWallet = (id) => {
    setWallets(wallets.filter(w => w.id !== id));
    showNotif('success', 'Wallet deleted!');
  };

  // Copy to Clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotif('success', 'Copied to clipboard!');
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      waiting: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${colors[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const colors = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      low: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${colors[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  // Stats calculation
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const bottomNavItems = [
    { id: 'dashboard', label: 'Home', icon: Target },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'bot', label: 'Bot', icon: Bot },
    { id: 'more', label: 'More', icon: Menu }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Global Styles */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #111827;
        }
      `}</style>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`px-4 py-3 rounded-xl border flex items-center gap-2 ${
            notificationMsg.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
            notificationMsg.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
            'bg-blue-500/20 border-blue-500/30 text-blue-400'
          }`}>
            {notificationMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
             notificationMsg.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
             <Bell className="w-5 h-5" />}
            <span className="text-sm font-medium">{notificationMsg.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Airdrop Farmer</h1>
              <p className="text-xs text-gray-400">Logged in as SYH</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl relative">
              <Bell className="w-5 h-5 text-gray-300" />
              {botConnected && <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>}
            </button>
            <button 
              onClick={onLogout}
              className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-xl"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Simplified Dashboard View for demo */}
      <main className="px-4 py-4">
        <div className="space-y-4 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <Target className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-2xl font-bold text-white">{activeProjects}</p>
              <p className="text-xs text-gray-400">Active Projects</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <CheckSquare className="w-6 h-6 text-green-400 mb-2" />
              <p className="text-2xl font-bold text-white">{completedTasks}</p>
              <p className="text-xs text-gray-400">Tasks Done ({completionRate}%)</p>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">Successfully Deployed!</h3>
                <p className="text-sm text-gray-300">Your Airdrop Farmer is now live and ready to use. Start by adding your first project!</p>
              </div>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-3 text-sm">🚀 Quick Start</h3>
            <ol className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Add your crypto wallets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Create airdrop projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Setup Telegram bot for notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Start farming! 🌾</span>
              </li>
            </ol>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2 z-20">
        <div className="flex items-center justify-around">
          {bottomNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-xs font-medium`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
    }
