"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FiMoon, FiSun, FiSearch, FiCalendar, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiPlus, FiPaperclip, FiMessageSquare, FiClock } from 'react-icons/fi';
import { FaFire, FaRegStar, FaStar, FaPlay, FaPause, FaStop, FaRegKeyboard } from 'react-icons/fa';

// Team members data
const teamMembers = [
  { id: 1, name: 'John', avatar: '/avatar/john.png' },
  { id: 2, name: 'Sarah', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Mike', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 4, name: 'Emily', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

const priorityOptions = [
  { value: 'low', label: 'Low', icon: <FaRegStar className="text-gray-400" />, activeIcon: <FaStar className="text-yellow-400" />, color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
  { value: 'medium', label: 'Medium', icon: <FiCalendar className="text-blue-400" />, activeIcon: <FiCalendar className="text-blue-500" />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' },
  { value: 'high', label: 'High', icon: <FaFire className="text-orange-400" />, activeIcon: <FaFire className="text-orange-500" />, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200' },
  { value: 'critical', label: 'Critical', icon: <FaFire className="text-red-400" />, activeIcon: <FaFire className="text-red-500" />, color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200' }
];

const TodoApp = () => {
  // State management
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPriority, setCurrentPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeSpent, setTimeSpent] = useState({});
  const [showTaskDetails, setShowTaskDetails] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [fileInputs, setFileInputs] = useState({});
  const timerRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) setTodos(JSON.parse(savedTodos));

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    const savedTimeSpent = localStorage.getItem('timeSpent');
    if (savedTimeSpent) setTimeSpent(JSON.parse(savedTimeSpent));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('timeSpent', JSON.stringify(timeSpent));
  }, [todos, darkMode, timeSpent]);

  // Timer logic
  useEffect(() => {
    if (activeTimer !== null) {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => ({
          ...prev,
          [activeTimer]: (prev[activeTimer] || 0) + 1
        }));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [activeTimer]);

  // Format time (seconds to HH:MM:SS)
  const formatTime = (seconds) => {
    if (!seconds) return '00:00:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs].map(v => v.toString().padStart(2, '0')).join(':');
  };

  // Timer controls
  const handleTimerControl = (taskId, action) => {
    switch (action) {
      case 'start':
        setActiveTimer(taskId);
        addActivity(taskId, 'started timer');
        break;
      case 'pause':
        setActiveTimer(null);
        addActivity(taskId, 'paused timer');
        break;
      case 'stop':
        setActiveTimer(null);
        addActivity(taskId, 'stopped timer');
        break;
      default:
        break;
    }
  };

  // Add new activity log entry
  const addActivity = (taskId, action) => {
    setTodos(todos.map(task =>
      task.id === taskId ? {
        ...task,
        activities: [
          ...(task.activities || []),
          {
            id: Date.now(),
            user: 'You',
            action,
            timestamp: new Date().toISOString()
          }
        ]
      } : task
    ));
  };

  // Add new comment
  const addComment = (taskId) => {
    if (!newComment.trim()) return;

    setTodos(todos.map(task =>
      task.id === taskId ? {
        ...task,
        comments: [
          ...(task.comments || []),
          {
            id: Date.now(),
            user: 'You',
            text: newComment,
            timestamp: new Date().toISOString()
          }
        ]
      } : task
    ));

    setNewComment('');
    addActivity(taskId, 'added a comment');
  };

  // Handle file upload
  const handleFileUpload = (taskId, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setTodos(todos.map(task =>
      task.id === taskId ? {
        ...task,
        attachments: [
          ...(task.attachments || []),
          ...files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file)
          }))
        ]
      } : task
    ));

    addActivity(taskId, `added ${files.length} file(s)`);
    setFileInputs({ ...fileInputs, [taskId]: '' });
  };

  // Add new todo
  const addTodo = () => {
    if (!inputText.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const isDueToday = dueDate === today;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
      category: currentCategory !== 'all' ? currentCategory : null,
      priority: currentPriority,
      dueDate,
      isDueToday,
      notes: notes.trim() || null,
      assignee: selectedAssignee || null,
      createdAt: new Date().toISOString(),
      starred: false,
      timeSpent: 0,
      activities: [
        {
          id: Date.now(),
          user: 'You',
          action: 'created task',
          timestamp: new Date().toISOString()
        }
      ],
      comments: [],
      attachments: []
    };

    setTodos([newTodo, ...todos]);
    resetInputForm();
  };

  // Reset input form
  const resetInputForm = () => {
    setInputText('');
    setDueDate('');
    setNotes('');
    setSelectedAssignee('');
    setCurrentCategory('all');
    setCurrentPriority('medium');
    setShowAdvanced(false);
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const action = todo.completed ? 'marked as incomplete' : 'marked as complete';
        addActivity(id, action);
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  // Toggle star
  const toggleStar = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Edit todo text
  const editTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    const newText = prompt('Edit task:', todo.text);
    if (newText !== null && newText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ));
      addActivity(id, 'edited task');
    }
  };

  // Clear all completed todos
  const clearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    if (completedTodos.length === 0) {
      alert('No completed tasks to clear');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${completedTodos.length} completed tasks?`)) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };

  // Drag and drop functionality
  const handleDragStart = (e, index) => {
    setIsDragging(true);
    setDragItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragItemIndex === null || dragItemIndex === index) return;

    const newTodos = [...todos];
    const [removed] = newTodos.splice(dragItemIndex, 1);
    newTodos.splice(index, 0, removed);
    setTodos(newTodos);
    setDragItemIndex(index);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragItemIndex(null);
  };

  // Filter todos based on current filters
  const filteredTodos = todos.filter(todo => {
    // Apply search filter
    if (searchQuery && !todo.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply category filter
    if (currentCategory !== 'all' && todo.category !== currentCategory) {
      return false;
    }

    // Apply status filter
    switch (currentFilter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      case 'starred': return todo.starred;
      case 'today': return todo.isDueToday;
      default: return true;
    }
  });

  // Calculate stats
  const totalTodos = todos.length;
  const remainingTodos = todos.filter(todo => !todo.completed).length;
  const todayDueTodos = todos.filter(todo => todo.isDueToday && !todo.completed).length;
  const highPriorityTodos = todos.filter(todo => (todo.priority === 'high' || todo.priority === 'critical') && !todo.completed).length;
  const progressPercentage = totalTodos > 0 ? ((totalTodos - remainingTodos) / totalTodos) * 100 : 0;

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: dateString.split('-')[0] !== new Date().getFullYear().toString() ? 'numeric' : undefined
    }).replace(',', '');
  };

  // Priority color classes
  const getPriorityClass = (priority) => {
    const option = priorityOptions.find(opt => opt.value === priority);
    return option ? option.color : '';
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
  };

  // Task Details Modal Component
  const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{task.text}</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                &times;
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className={`px-2 py-1 rounded ${getPriorityClass(task.priority)}`}>
                {priorityOptions.find(p => p.value === task.priority)?.label}
              </span>
              {task.assignee && (
                <div className="flex items-center gap-1">
                  <img
                    src={teamMembers.find(m => m.id === task.assignee)?.avatar}
                    alt="Assignee"
                    className="w-5 h-5 rounded-full"
                  />
                  <span>{teamMembers.find(m => m.id === task.assignee)?.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4">
            {/* Timer Section */}
            <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiClock size={18} />
                  <span className="font-medium">Time Tracking</span>
                </div>
                <span className="font-mono text-lg">
                  {formatTime(timeSpent[task.id] || task.timeSpent || 0)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTimerControl(task.id, 'start')}
                  disabled={activeTimer === task.id}
                  className={`px-3 py-1 rounded flex items-center gap-1 ${activeTimer === task.id ? 'bg-gray-200 dark:bg-gray-600' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'}`}
                >
                  <FaPlay size={12} /> Start
                </button>
                <button
                  onClick={() => handleTimerControl(task.id, 'pause')}
                  disabled={activeTimer !== task.id}
                  className={`px-3 py-1 rounded flex items-center gap-1 ${activeTimer !== task.id ? 'bg-gray-200 dark:bg-gray-600' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'}`}
                >
                  <FaPause size={12} /> Pause
                </button>
                <button
                  onClick={() => handleTimerControl(task.id, 'stop')}
                  className="px-3 py-1 rounded flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                >
                  <FaStop size={12} /> Stop
                </button>
              </div>
            </div>

            {/* Notes Section */}
            {task.notes && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Notes</h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  {task.notes}
                </div>
              </div>
            )}

            {/* Attachments Section */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Attachments</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {task.attachments?.map(file => (
                  <div key={file.id} className="p-2 border rounded flex items-center gap-2">
                    <FiPaperclip />
                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <FiPaperclip />
                <span>Add attachment</span>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(task.id, e)}
                  className="hidden"
                />
              </label>
            </div>

            {/* Comments Section */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Comments</h4>
              <div className="space-y-3 mb-4">
                {task.comments?.map(comment => (
                  <div key={comment.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{comment.user}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  onClick={() => addComment(task.id)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Activity Log Section */}
            <div>
              <h4 className="font-medium mb-2">Activity Log</h4>
              <div className="space-y-2">
                {task.activities?.map(activity => (
                  <div key={activity.id} className="flex items-start gap-2 text-sm">
                    <div className="mt-1 w-2 h-2 rounded-full bg-gray-400"></div>
                    <div>
                      <span className="font-medium">{activity.user}</span> {activity.action}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render individual task item
  const renderTaskItem = (todo, index) => {
    let dueDateDisplay = '';
    let dueDateClass = '';
    if (todo.dueDate) {
      const today = new Date().toISOString().split('T')[0];
      if (todo.dueDate < today && !todo.completed) {
        dueDateDisplay = `${formatDate(todo.dueDate)} (Overdue)`;
        dueDateClass = 'text-red-500 dark:text-red-400';
      } else if (todo.dueDate === today) {
        dueDateDisplay = 'Today';
        dueDateClass = 'text-yellow-500 dark:text-yellow-400';
      } else {
        dueDateDisplay = formatDate(todo.dueDate);
      }
    }

    const priorityOption = priorityOptions.find(opt => opt.value === todo.priority);

    return (
      <li
        key={todo.id}
        draggable
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragEnd={handleDragEnd}
        className={`flex items-center p-2 gap-2 mb-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all ${isDragging && dragItemIndex === index ? 'opacity-50' : ''
          } ${todo.completed ? 'opacity-70' : 'hover:shadow-sm hover:-translate-y-0.5'}`}
      >
        <button
          onClick={() => toggleStar(todo.id)}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
        >
          {todo.starred ? <FaStar className="text-yellow-400" size={14} /> : <FaRegStar size={14} />}
        </button>

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
        />

        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setShowTaskDetails(todo)}
        >
          <div className={`flex items-center text-sm ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-white'}`}>
            {todo.text}
          </div>
          <div className="flex flex-wrap items-center gap-1 mt-1 text-xs">
            {todo.priority && (
              <span className={`px-1.5 py-0.5 rounded flex items-center gap-0.5 ${getPriorityClass(todo.priority)}`}>
                {priorityOption?.activeIcon || priorityOption?.icon}
                {priorityOption?.label}
              </span>
            )}
            {todo.category && (
              <span className={`px-1.5 py-0.5 rounded ${todo.category === 'work' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200' :
                  todo.category === 'personal' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200' :
                    todo.category === 'shopping' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                {todo.category}
              </span>
            )}
            {todo.dueDate && (
              <span className={`flex items-center gap-0.5 ${dueDateClass}`}>
                <FiCalendar size={10} />
                {dueDateDisplay}
              </span>
            )}
            {todo.assignee && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <img
                  src={teamMembers.find(m => m.id === todo.assignee)?.avatar}
                  alt="Assignee"
                  className="w-4 h-4 rounded-full"
                />
                <span className="text-xs">{teamMembers.find(m => m.id === todo.assignee)?.name}</span>
              </div>
            )}
            <span className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <FiClock size={10} />
              {formatTime(timeSpent[todo.id] || todo.timeSpent || 0).split(':')[0] > 0
                ? formatTime(timeSpent[todo.id] || todo.timeSpent || 0)
                : formatTime(timeSpent[todo.id] || todo.timeSpent || 0).substring(3)}
            </span>
            {todo.comments?.length > 0 && (
              <span className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
                <FiMessageSquare size={10} />
                {todo.comments.length}
              </span>
            )}
            {todo.attachments?.length > 0 && (
              <span className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
                <FiPaperclip size={10} />
                {todo.attachments.length}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => editTodo(todo.id)}
            className="p-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="Edit"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Delete"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <header className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <img src="logos/GoalTrack.png" alt="GoalTrack Logo" className="w-12 h-12" />
                GoalTrack
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title={darkMode ? "Light mode" : "Dark mode"}
                >
                  {darkMode ? <FiSun size={18} className="text-yellow-400" /> : <FiMoon size={18} />}
                </button>
                <button
                  onClick={() => setShowShortcuts(true)}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Shortcuts"
                >
                  <FaRegKeyboard size={18} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Keep your goals on track with a streamlined app</p>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a task..."
                className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                onClick={addTodo}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                title="Add task"
              >
                <FiPlus size={18} />
              </button>
            </div>

            {showAdvanced && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3 border border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Project</label>
                    <select
                      value={currentCategory}
                      onChange={(e) => setCurrentCategory(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">No category</option>
                      <option value="work">Work 💼</option>
                      <option value="personal">Personal 🏠</option>
                      <option value="shopping">Shopping 🛒</option>
                      <option value="learning">Learning 📚</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Assignee</label>
                    <select
                      value={selectedAssignee}
                      onChange={(e) => setSelectedAssignee(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Unassigned</option>
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <div className="flex flex-wrap gap-2">
                    {priorityOptions.map(priority => (
                      <button
                        key={priority.value}
                        onClick={() => setCurrentPriority(priority.value)}
                        className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${currentPriority === priority.value
                          ? priority.color + ' ring-1 ring-blue-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                      >
                        {currentPriority === priority.value ? priority.activeIcon : priority.icon}
                        {priority.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add details..."
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 min-h-[60px] focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="relative w-full md:w-40">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1">
                  {['all', 'active', 'completed', 'starred', 'today'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setCurrentFilter(filter)}
                      className={`relative px-2 py-1 text-xs font-medium transition-colors flex items-center gap-1 ${currentFilter === filter
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                      {filter === 'starred' ? (
                        <FaStar className={currentFilter === filter ? 'text-yellow-400' : 'text-gray-400'} size={12} />
                      ) : null}
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-1 w-full md:w-auto mt-2 md:mt-0">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded flex items-center gap-1"
                >
                  {showAdvanced ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                  Options
                </button>
                <button
                  onClick={clearCompleted}
                  className="px-2 py-1 text-xs bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-200 rounded flex items-center gap-1"
                >
                  <FiTrash2 size={12} /> Clear
                </button>
              </div>
            </div>

            {filteredTodos.length > 0 ? (
              <ul className="mb-3">
                {filteredTodos.map((todo, index) => renderTaskItem(todo, index))}
              </ul>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">📝</div>
                <p className="text-sm">
                  {searchQuery
                    ? "No matching tasks"
                    : currentCategory !== "all"
                      ? `No tasks in ${currentCategory}`
                      : currentFilter === "active"
                        ? "No active tasks"
                        : currentFilter === "completed"
                          ? "No completed tasks"
                          : currentFilter === "starred"
                            ? "No starred tasks"
                            : currentFilter === "today"
                              ? "No tasks due today"
                              : "No tasks yet"}
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {remainingTodos} {remainingTodos === 1 ? "task" : "tasks"} remaining
                </span>
                <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 text-xs">
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                  Total: {totalTodos}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                  Today: {todayDueTodos}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200">
                  Priority: {highPriorityTodos}
                </span>
              </div>
            </div>
          </div>

          {/* Shortcuts Modal */}
          {showShortcuts && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
                  <button
                    onClick={() => setShowShortcuts(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Add new task</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Ctrl + Enter</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Toggle dark mode</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Ctrl + D</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Search tasks</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Ctrl + K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Toggle task completion</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Space</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Star/unstar task</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">S</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Delete task</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Del</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
                  Press any key to close
                </div>
              </div>
            </div>
          )}

          {/* Task Details Modal */}
          {showTaskDetails && (
            <TaskDetailsModal
              task={showTaskDetails}
              onClose={() => setShowTaskDetails(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;