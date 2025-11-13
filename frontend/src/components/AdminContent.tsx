import { Clock, Star, Search, Filter, X, Play, Edit, Trash2, Eye, CheckCircle, Calendar, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { lessonsData } from '../data/lessonsData';
import { activitiesData } from '../data/activitiesData';
import { useState, useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

export function AdminContent() {
  const [selectedTab, setSelectedTab] = useState<'lessons' | 'activities'>('lessons');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Get unique categories and difficulties from lessons
  const lessonCategories = Array.from(new Set(lessonsData.map(l => l.category)));
  const lessonDifficulties = Array.from(new Set(lessonsData.map(l => l.difficulty)));

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessonsData.filter(lesson => {
      // Search filter
      if (searchQuery && !lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !lesson.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(lesson.category)) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(lesson.difficulty)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedDifficulty]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activitiesData.filter(activity => {
      // Search filter
      if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !activity.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulty([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedDifficulty.length > 0;

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-slate-800 dark:text-slate-100 mb-1">Content Management</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Manage lessons and activities</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Play className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-slate-800 dark:border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {selectedTab === 'lessons' && (
            <Button 
              variant="outline" 
              className={`dark:bg-slate-800 dark:border-slate-700 ${hasActiveFilters ? 'border-purple-500 text-purple-500' : ''}`}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white rounded-full text-xs">
                  {selectedCategories.length + selectedDifficulty.length}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Filter Panel (for Lessons) */}
        {showFilterPanel && selectedTab === 'lessons' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-800 dark:text-slate-100">Filter Lessons</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-slate-700 dark:text-slate-300 mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {lessonCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedCategories.includes(category)
                          ? 'bg-purple-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-slate-700 dark:text-slate-300 mb-3">Difficulty</h4>
                <div className="flex flex-wrap gap-2">
                  {lessonDifficulties.map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => toggleDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedDifficulty.includes(difficulty)
                          ? 'bg-purple-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'lessons' | 'activities')} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="lessons">Lessons ({filteredLessons.length})</TabsTrigger>
            <TabsTrigger value="activities">Activities ({filteredActivities.length})</TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="mt-0">
            {filteredLessons.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-slate-400 dark:text-slate-500 mb-2">No lessons found</div>
                <div className="text-slate-600 dark:text-slate-400">Try adjusting your filters or search query</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all group"
                  >
                    {/* Card Header with Gradient */}
                    <div className={`bg-gradient-to-br ${lesson.color} p-6 relative`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{lesson.icon}</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-white hover:bg-white/20"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="text-white">
                        <h3 className="mb-2">{lesson.title}</h3>
                        <p className="text-white/80 text-sm">{lesson.description}</p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                          {lesson.category}
                        </Badge>
                        <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                          {lesson.difficulty}
                        </Badge>
                      </div>

                      {/* Lesson Count */}
                      <div className="mb-4">
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {lesson.lessons} lessons
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-slate-800 dark:text-slate-200">{lesson.rating}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-0">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-slate-400 dark:text-slate-500 mb-2">No activities found</div>
                <div className="text-slate-600 dark:text-slate-400">Try adjusting your search query</div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                          {activity.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-slate-800 dark:text-slate-100">{activity.title}</h3>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                {activity.description}
                              </p>
                              <div className="flex items-center gap-3 flex-wrap">
                                <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                                  {activity.type}
                                </Badge>
                                <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                                  {activity.subject}
                                </Badge>
                                {activity.priority === 'high' && (
                                  <Badge className="bg-red-500 hover:bg-red-600">High Priority</Badge>
                                )}
                                {activity.priority === 'medium' && (
                                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
                                )}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-yellow-500">⭐</span>
                                <span>{activity.points} points</span>
                              </div>
                              {activity.relatedLessonId && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>Requires lesson {activity.relatedLessonId}</span>
                                </div>
                              )}
                            </div>
                            <Button 
                              className={`bg-gradient-to-r ${activity.color}`}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
