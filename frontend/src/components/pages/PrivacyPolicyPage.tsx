import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function PrivacyPolicyPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: PrivacyPolicyPageProps) {
  const lastUpdated = 'November 4, 2025';

  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
      
• Account information (name, email, grade level)
• Usage data and learning progress
• Communications with our support team
• Payment information (processed securely through third-party providers)

We also automatically collect certain information when you use our services, including device information, log data, and usage statistics.`,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Personalize your learning experience
• Send you important updates and communications
• Analyze usage patterns to enhance our platform
• Ensure the security and integrity of our services
• Comply with legal obligations

We will never sell your personal information to third parties.`,
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: `We may share your information with:

• Service providers who assist in operating our platform
• Educational institutions (with your consent)
• Parents/guardians (for student accounts)
• Law enforcement when required by law

We require all third parties to respect the security of your data and treat it in accordance with the law.`,
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Database,
      title: 'Data Security & Retention',
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:

• Encryption of data in transit and at rest
• Regular security assessments
• Access controls and authentication
• Secure data centers

We retain your information for as long as necessary to provide our services or as required by law. You can request deletion of your data at any time.`,
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="text-center mb-10">
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">Privacy Policy</h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
            At EduAid, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform. Please read this privacy policy carefully.
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            By using EduAid, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-6 mb-10">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl text-slate-800 dark:text-slate-100 mt-1">{section.title}</h2>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Your Rights */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
          <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-4">Your Rights</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>Under data protection laws, you have the following rights:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure of your data</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at privacy@eduaid.com
            </p>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
          <h2 className="text-xl mb-2">Children's Privacy (COPPA Compliance)</h2>
          <p className="text-sm text-white/90 mb-3 leading-relaxed">
            EduAid is designed for children and we take extra precautions to protect children's privacy. We comply with the Children's Online Privacy Protection Act (COPPA) and do not knowingly collect personal information from children under 13 without parental consent.
          </p>
          <p className="text-sm text-white/90 leading-relaxed">
            Parents have the right to review their child's information, request deletion, and refuse further collection or use of their child's information.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-3">Contact Us</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            If you have questions or concerns about this Privacy Policy, please contact us:
          </p>
          <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            <p><strong>Email:</strong> privacy@eduaid.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Education St, San Francisco, CA 94102</p>
          </div>
        </div>
      </div>
    </div>
  );
}
