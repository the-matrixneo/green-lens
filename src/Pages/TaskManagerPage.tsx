import React, { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Trash2,
  Edit3,
  Bell,
  Droplets,
  Sprout,
  Eye,
  Scissors,
  AlertCircle,
} from "lucide-react";
import { format, addDays, isToday, isTomorrow, isPast } from "date-fns";
import { TaskReminder } from "../types";

const TaskManagerPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskReminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskReminder | null>(null);
  const [filter, setFilter] = useState<
    "all" | "pending" | "completed" | "overdue"
  >("all");

  const taskCategories = [
    {
      id: "watering",
      name: "Watering",
      emoji: "💧",
      icon: Droplets,
      color: "blue",
    },
    {
      id: "fertilizing",
      name: "Fertilizing",
      emoji: "🌱",
      icon: Sprout,
      color: "green",
    },
    {
      id: "monitoring",
      name: "Monitoring",
      emoji: "👁️",
      icon: Eye,
      color: "purple",
    },
    {
      id: "harvesting",
      name: "Harvesting",
      emoji: "🌾",
      icon: Scissors,
      color: "yellow",
    },
    { id: "other", name: "Other", emoji: "📝", icon: Circle, color: "gray" },
  ];

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    category: "watering" as TaskReminder["category"],
    priority: "medium" as TaskReminder["priority"],
  });

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem("farmTasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }));
      setTasks(parsedTasks);
    } else {
      // Add some sample tasks
      const sampleTasks: TaskReminder[] = [
        {
          id: "1",
          title: "Water tomato plants",
          description: "Check soil moisture and water if needed",
          dueDate: new Date(),
          category: "watering",
          completed: false,
          priority: "high",
          emoji: "🍅",
        },
        {
          id: "2",
          title: "Apply fertilizer to wheat field",
          description: "Apply NPK fertilizer as per soil test recommendations",
          dueDate: addDays(new Date(), 2),
          category: "fertilizing",
          completed: false,
          priority: "medium",
          emoji: "🌾",
        },
        {
          id: "3",
          title: "Check for pest damage",
          description: "Inspect leaves for signs of pest infestation",
          dueDate: addDays(new Date(), 1),
          category: "monitoring",
          completed: false,
          priority: "medium",
          emoji: "🐛",
        },
      ];
      setTasks(sampleTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage
    localStorage.setItem("farmTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const task: TaskReminder = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      emoji:
        taskCategories.find((cat) => cat.id === newTask.category)?.emoji ||
        "📝",
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(),
      category: "watering",
      priority: "medium",
    });
    setShowAddForm(false);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      case "overdue":
        return tasks.filter(
          (task) =>
            !task.completed && isPast(task.dueDate) && !isToday(task.dueDate)
        );
      default:
        return tasks;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDateStatus = (date: Date, completed: boolean) => {
    if (completed) return { text: "Completed", color: "text-green-600" };
    if (isToday(date)) return { text: "Today", color: "text-blue-600" };
    if (isTomorrow(date)) return { text: "Tomorrow", color: "text-purple-600" };
    if (isPast(date)) return { text: "Overdue", color: "text-red-600" };
    return { text: format(date, "MMM dd"), color: "text-gray-600" };
  };

  const filteredTasks = getFilteredTasks();
  const pendingTasks = tasks.filter((task) => !task.completed);
  const overdueTasks = tasks.filter(
    (task) => !task.completed && isPast(task.dueDate) && !isToday(task.dueDate)
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4 animate-slideInLeft">
            Farm Task Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideInRight">
            Stay organized with your farming activities and never miss important
            tasks
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-100 p-4 shadow-lg animate-fadeInUp">
            <div className="flex items-center space-x-2">
              <Circle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">
                Total Tasks
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {tasks.length}
            </div>
          </div>

          <div
            className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-100 p-4 shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-600">Pending</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {pendingTasks.length}
            </div>
          </div>

          <div
            className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-100 p-4 shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">
                Completed
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {tasks.filter((t) => t.completed).length}
            </div>
          </div>

          <div
            className="bg-white/70 backdrop-blur-sm rounded-xl border border-green-100 p-4 shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-gray-600">Overdue</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {overdueTasks.length}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Task List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters and Add Button */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {[
                  { key: "all", label: "All Tasks" },
                  { key: "pending", label: "Pending" },
                  { key: "completed", label: "Completed" },
                  { key: "overdue", label: "Overdue" },
                ].map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === filterOption.key
                        ? "bg-green-600 text-white"
                        : "bg-white/70 text-gray-600 hover:bg-green-50"
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {filteredTasks.map((task, index) => {
                const dateStatus = getDateStatus(task.dueDate, task.completed);
                const category = taskCategories.find(
                  (cat) => cat.id === task.category
                );

                return (
                  <div
                    key={task.id}
                    className={`bg-white/70 backdrop-blur-sm rounded-xl border p-4 shadow-lg transition-all duration-200 hover:shadow-xl animate-slideInLeft ${
                      task.completed
                        ? "border-green-200 bg-green-50/50"
                        : "border-green-100 hover:border-green-200"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 transition-colors ${
                          task.completed
                            ? "text-green-600"
                            : "text-gray-400 hover:text-green-600"
                        }`}
                      >
                        {task.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{task.emoji}</span>
                          <h3
                            className={`font-semibold ${
                              task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        {task.description && (
                          <p
                            className={`text-sm mb-2 ${
                              task.completed ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className={dateStatus.color}>
                              {dateStatus.text}
                            </span>
                          </div>

                          {category && (
                            <div className="flex items-center space-x-1">
                              <category.icon className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {category.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tasks found
                  </h3>
                  <p className="text-gray-600">
                    {filter === "all"
                      ? "Add your first task to get started!"
                      : `No ${filter} tasks at the moment.`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Add/Edit Task Form */}
          <div className="space-y-6">
            {(showAddForm || editingTask) && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight">
                <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingTask ? editingTask.title : newTask.title}
                      onChange={(e) =>
                        editingTask
                          ? setEditingTask({
                              ...editingTask,
                              title: e.target.value,
                            })
                          : setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Water tomato plants"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={
                        editingTask
                          ? editingTask.description
                          : newTask.description
                      }
                      onChange={(e) =>
                        editingTask
                          ? setEditingTask({
                              ...editingTask,
                              description: e.target.value,
                            })
                          : setNewTask({
                              ...newTask,
                              description: e.target.value,
                            })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                      placeholder="Task details..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={
                        editingTask
                          ? format(editingTask.dueDate, "yyyy-MM-dd")
                          : format(newTask.dueDate, "yyyy-MM-dd")
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        editingTask
                          ? setEditingTask({ ...editingTask, dueDate: date })
                          : setNewTask({ ...newTask, dueDate: date });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={
                        editingTask ? editingTask.category : newTask.category
                      }
                      onChange={(e) => {
                        const category = e.target
                          .value as TaskReminder["category"];
                        editingTask
                          ? setEditingTask({ ...editingTask, category })
                          : setNewTask({ ...newTask, category });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {taskCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.emoji} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={
                        editingTask ? editingTask.priority : newTask.priority
                      }
                      onChange={(e) => {
                        const priority = e.target
                          .value as TaskReminder["priority"];
                        editingTask
                          ? setEditingTask({ ...editingTask, priority })
                          : setNewTask({ ...newTask, priority });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        if (editingTask) {
                          setTasks(
                            tasks.map((task) =>
                              task.id === editingTask.id ? editingTask : task
                            )
                          );
                          setEditingTask(null);
                        } else {
                          addTask();
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                      {editingTask ? "Update Task" : "Add Task"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTask(null);
                        setNewTask({
                          title: "",
                          description: "",
                          dueDate: new Date(),
                          category: "watering",
                          priority: "medium",
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 p-6 shadow-lg animate-slideInRight"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-green-600" />
                Quick Actions
              </h3>

              <div className="space-y-3">
                {taskCategories.slice(0, 4).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setNewTask({
                        ...newTask,
                        category: category.id as TaskReminder["category"],
                        title: `${category.name} task`,
                      });
                      setShowAddForm(true);
                    }}
                    className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-200 hover:scale-105"
                  >
                    <span className="text-lg">{category.emoji}</span>
                    <span className="font-medium text-gray-700">
                      Add {category.name} Task
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerPage;
