import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface BlogPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function BlogPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: BlogPageProps) {
  const featured = {
    title: 'The Future of Online Education: Trends for 2025',
    excerpt: 'Explore the latest trends shaping the future of online learning and how EduAid is leading the way.',
    author: 'Dr. Sarah Johnson',
    date: 'Nov 1, 2025',
    image: '📚',
    category: 'Education Trends',
    readTime: '5 min read',
  };

  const posts = [
    {
      title: '10 Tips for Effective Remote Learning',
      excerpt: 'Practical strategies to help your child succeed in online education.',
      author: 'Emily Rodriguez',
      date: 'Oct 28, 2025',
      image: '💡',
      category: 'Tips & Tricks',
      readTime: '4 min read',
    },
    {
      title: 'How Gamification Improves Learning Outcomes',
      excerpt: 'Understanding the science behind game-based learning.',
      author: 'Michael Chen',
      date: 'Oct 25, 2025',
      image: '🎮',
      category: 'Research',
      readTime: '6 min read',
    },
    {
      title: 'Parent Guide: Supporting Your Child\'s Education',
      excerpt: 'Essential tips for parents to create a positive learning environment at home.',
      author: 'Dr. Sarah Johnson',
      date: 'Oct 20, 2025',
      image: '👨‍👩‍👧‍👦',
      category: 'Parenting',
      readTime: '7 min read',
    },
    {
      title: 'The Importance of Social-Emotional Learning',
      excerpt: 'Why SEL skills are just as important as academic knowledge.',
      author: 'David Kim',
      date: 'Oct 15, 2025',
      image: '❤️',
      category: 'Development',
      readTime: '5 min read',
    },
    {
      title: 'New Features: What\'s Coming to EduAid',
      excerpt: 'A sneak peek at the exciting features we\'re working on.',
      author: 'Product Team',
      date: 'Oct 10, 2025',
      image: '✨',
      category: 'Product Updates',
      readTime: '3 min read',
    },
    {
      title: 'Success Stories: How EduAid Changed Lives',
      excerpt: 'Inspiring stories from students and parents in our community.',
      author: 'Community Team',
      date: 'Oct 5, 2025',
      image: '🌟',
      category: 'Success Stories',
      readTime: '8 min read',
    },
  ];

  const categories = ['All', 'Education Trends', 'Tips & Tricks', 'Research', 'Parenting', 'Product Updates'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">EduAid Blog</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of education
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                index === 0
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl overflow-hidden mb-12">
          <div className="p-8 text-white">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs mb-3">
              Featured Post
            </div>
            <div className="text-4xl mb-4">{featured.image}</div>
            <div className="flex items-center gap-3 text-sm text-white/80 mb-3">
              <span>{featured.category}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>
            <h2 className="text-3xl mb-3">{featured.title}</h2>
            <p className="text-lg text-white/90 mb-4 max-w-3xl">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>{featured.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{featured.date}</span>
                </div>
              </div>
              <Button className="bg-white text-indigo-600 hover:bg-white/90" size="sm">
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="p-5">
                <div className="text-4xl mb-3">{post.image}</div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 text-center">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Get the latest articles, tips, and updates delivered to your inbox weekly.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-sm"
            />
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" size="sm">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
