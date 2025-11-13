import { Search, BookOpen, CheckSquare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { lessonsData } from '../data/lessonsData';
import { activitiesData } from '../data/activitiesData';
import { Page } from '../App';

interface SearchBarProps {
  onNavigate: (page: Page) => void;
}

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: 'lesson' | 'activity';
  icon: string;
  page: Page;
}

export function SearchBar({ onNavigate }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create searchable index
  const searchIndex: SearchResult[] = [
    // Add all lessons to the index
    ...lessonsData.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      type: 'lesson' as const,
      icon: lesson.icon,
      page: lesson.id === 4 ? 'lesson-shapes-colors' as Page : 'lessons' as Page,
    })),
    // Add all activities to the index
    ...activitiesData.map(activity => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      type: 'activity' as const,
      icon: activity.icon,
      page: activity.id === 1 ? 'activity-shape-color-sorter' as Page : 'activities' as Page,
    })),
  ];

  // Update dropdown position
  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  // Filter results based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = searchIndex.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setShowResults(true);
      updateDropdownPosition();
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Update position on scroll or resize
  useEffect(() => {
    if (showResults) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition, true);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [showResults]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    onNavigate(result.page);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If there's a result, navigate to the first one
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    }
  };

  const renderDropdown = () => {
    if (!showResults) return null;

    const dropdownContent = (
      <>
        {/* Autocomplete Dropdown */}
        {searchResults.length > 0 && (
          <div 
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 2147483647,
            }}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 px-3 py-2">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              {searchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    result.type === 'lesson' 
                      ? 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30' 
                      : 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30'
                  }`}>
                    {result.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {result.title}
                      </span>
                      {result.type === 'lesson' ? (
                        <BookOpen className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                      ) : (
                        <CheckSquare className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        result.type === 'lesson'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      }`}>
                        {result.type === 'lesson' ? 'Lesson' : 'Activity'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery.trim().length > 0 && searchResults.length === 0 && (
          <div 
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 2147483647,
            }}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">No results found</div>
              <div className="text-xs text-slate-500 dark:text-slate-500">
                Try searching for "Shapes", "Numbers", "Reading", or "Science"
              </div>
            </div>
          </div>
        )}
      </>
    );

    return createPortal(dropdownContent, document.body);
  };

  return (
    <>
      <div ref={searchRef} className="flex-1 max-w-xl relative">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons and activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim().length > 0) {
                setShowResults(true);
                updateDropdownPosition();
              }
            }}
            className="w-full pl-5 pr-14 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white rounded-lg flex items-center justify-center hover:shadow-lg transition-all"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
      {renderDropdown()}
    </>
  );
}
