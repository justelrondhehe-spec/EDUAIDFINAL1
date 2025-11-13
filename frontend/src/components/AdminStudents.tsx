import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Filter, UserPlus, Database } from 'lucide-react';

export function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-slate-800 dark:text-slate-100 mb-1">Student Management</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">View and manage all student accounts</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Search Bar */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="px-6 py-3 text-left text-xs text-slate-600 dark:text-slate-400">Student</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 dark:text-slate-400">Progress</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 dark:text-slate-400">Lessons</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 dark:text-slate-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 dark:text-slate-400">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mb-6">
                        <Database className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-lg text-slate-800 dark:text-slate-100 mb-2">
                        Backend Connection Required
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                        Connect your backend database to view and manage student accounts. Student data will be populated from your backend API.
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 max-w-2xl w-full mb-6">
                        <div className="text-left text-sm">
                          <p className="text-slate-700 dark:text-slate-300 mb-2">API Endpoint:</p>
                          <code className="block bg-white dark:bg-slate-800 px-4 py-2 rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 mb-4">
                            GET /api/students
                          </code>
                          <p className="text-slate-700 dark:text-slate-300 mb-2">Expected Response:</p>
                          <pre className="block bg-white dark:bg-slate-800 px-4 py-3 rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 overflow-x-auto text-xs">
{`{
  "students": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "enrollmentDate": "ISO 8601 date",
      "overallProgressPercent": number,
      "totalLessons": number,
      "lastActive": "ISO 8601 date",
      "status": "active" | "inactive"
    }
  ]
}`}
                          </pre>
                        </div>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Connect Backend
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Showing 0 of 0 students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}