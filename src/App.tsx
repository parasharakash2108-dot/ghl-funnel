import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  PhoneCall,
  MessageSquare,
  Calendar,
  BarChart3,
  Globe,
  Headphones,
  ArrowRight,
  Play,
  Menu,
  X,
  Zap,
  Shield,
  Target,
  Award,
  Mic,
  Bot,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Timer,
  DollarSign,
  TrendingDown,
  Building,
  Heart,
  UserCheck,
  PhoneOff,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  Activity,
  PieChart,
  BarChart,
  LineChart,
  Briefcase
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);
  const [selectedPopup, setSelectedPopup] = useState<string | null>(null);
  const [chartData, setChartData] = useState({
    callVolume: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 50),
    conversionRate: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 60),
    responseTime: Array.from({ length: 24 }, () => Math.floor(Math.random() * 3) + 1),
    satisfaction: Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 80),
    revenue: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000) + 25000)
  });

  useEffect(() => {
    // Update charts every 3 seconds
    const interval = setInterval(() => {
      setChartData(prev => ({
        callVolume: prev.callVolume.map(() => Math.floor(Math.random() * 100) + 50),
        conversionRate: prev.conversionRate.map(() => Math.floor(Math.random() * 40) + 60),
        responseTime: prev.responseTime.map(() => Math.floor(Math.random() * 3) + 1),
        satisfaction: prev.satisfaction.map(() => Math.floor(Math.random() * 20) + 80),
        revenue: prev.revenue.map(() => Math.floor(Math.random() * 50000) + 25000)
      }));
    }, 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openPopup = (popupId: string) => {
    setSelectedPopup(popupId);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setSelectedPopup(null);
    document.body.style.overflow = 'unset';
  };

  // Live Chart Component
  const LiveChart = ({ data, title, color, type = 'bar', unit = '' }: {
    data: number[];
    title: string;
    color: string;
    type?: 'bar' | 'line' | 'pie' | 'area' | 'donut';
    unit?: string;
  }) => {
    const maxValue = Math.max(...data);
    const total = data.reduce((sum, val) => sum + val, 0);
    
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <div className={`w-3 h-3 rounded-full ${color} mr-2 animate-pulse`}></div>
          {title}
        </h3>
        
        {type === 'pie' || type === 'donut' ? (
          <div className="h-32 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                {data.slice(0, 6).map((value, index) => {
                  const percentage = (value / total) * 100;
                  const strokeDasharray = `${percentage * 2.51} ${251 - percentage * 2.51}`;
                  const strokeDashoffset = -data.slice(0, index).reduce((sum, val) => sum + val, 0) / total * 251;
                  const colors = ['stroke-cyan-500', 'stroke-blue-500', 'stroke-purple-500', 'stroke-green-500', 'stroke-yellow-500', 'stroke-red-500'];
                  
                  return (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth={type === 'donut' ? "8" : "20"}
                      className={`${colors[index]} transition-all duration-1000`}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{data[0]}{unit}</span>
              </div>
            </div>
          </div>
        ) : type === 'line' || type === 'area' ? (
          <div className="h-32 relative">
            <svg className="w-full h-full" viewBox="0 0 300 100">
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0%\" y1="0%\" x2="0%\" y2="100%">
                  <stop offset="0%" className="stop-cyan-500" stopOpacity="0.8"/>
                  <stop offset="100%" className="stop-cyan-500" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              
              {/* Area fill for area chart */}
              {type === 'area' && (
                <path
                  d={`M 0 ${100 - (data[0] / maxValue) * 80} ${data.map((value, index) => 
                    `L ${(index / (data.length - 1)) * 300} ${100 - (value / maxValue) * 80}`
                  ).join(' ')} L 300 100 L 0 100 Z`}
                  fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
                  className="transition-all duration-1000"
                />
              )}
              
              {/* Line path */}
              <path
                d={`M 0 ${100 - (data[0] / maxValue) * 80} ${data.map((value, index) => 
                  `L ${(index / (data.length - 1)) * 300} ${100 - (value / maxValue) * 80}`
                ).join(' ')}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-cyan-500 transition-all duration-1000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              {data.map((value, index) => (
                <circle
                  key={index}
                  cx={(index / (data.length - 1)) * 300}
                  cy={100 - (value / maxValue) * 80}
                  r="2"
                  fill="currentColor"
                  className="text-cyan-400 transition-all duration-1000"
                />
              ))}
            </svg>
          </div>
        ) : (
          // Bar chart (existing)
          <div className="h-32 flex items-end justify-between space-x-1">
            {data.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div 
                    className={`w-full ${color} rounded-t transition-all duration-1000 ease-out hover:opacity-80`}
                    style={{ 
                      height: `${(value / maxValue) * 100}%`,
                      minHeight: '4px'
                    }}
                  ></div>
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {value}{unit}
                   </div>
                </div>
                <span className="text-xs text-gray-400 mt-1">{value}{unit}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Chart statistics */}
        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <span>Min: {Math.min(...data)}{unit}</span>
          <span>Avg: {Math.round(data.reduce((a, b) => a + b, 0) / data.length)}{unit}</span>
          <span>Max: {Math.max(...data)}{unit}</span>
        </div>
      </div>
    );
  };

  // Popup content data
  const popupContent = {
    'human-ai-voice': {
      title: 'Human-like AI Voice Agents',
      icon: Bot,
      description: 'Our advanced AI voice technology creates natural, engaging conversations that customers can\'t distinguish from human interactions.',
      stats: [
        { label: 'Voice Quality Score', value: '9.8/10' },
        { label: 'Human-like Rating', value: '96%' },
        { label: 'Language Support', value: '25+' },
        { label: 'Accent Variations', value: '50+' }
      ],
      features: ['Natural speech patterns', 'Emotional intelligence', 'Context awareness', 'Personality customization'],
      benefits: ['Higher customer satisfaction', 'Reduced call abandonment', 'Professional brand image', 'Consistent quality']
    },
    'lead-qualification': {
      title: 'Lead Qualification & Follow-up',
      icon: Target,
      description: 'Intelligent lead scoring and automated follow-up sequences ensure no potential customer falls through the cracks.',
      stats: [
        { label: 'Qualification Accuracy', value: '94%' },
        { label: 'Follow-up Rate', value: '100%' },
        { label: 'Conversion Increase', value: '340%' },
        { label: 'Response Time', value: '< 30 sec' }
      ],
      features: ['Smart lead scoring', 'Automated follow-ups', 'CRM integration', 'Custom qualification criteria'],
      benefits: ['Higher conversion rates', 'Better lead quality', 'Reduced manual work', 'Improved sales pipeline']
    },
    'appointment-booking': {
      title: 'Appointment Booking & CRM Sync',
      icon: Calendar,
      description: 'Seamless calendar integration with real-time availability checking and automatic CRM updates for perfect synchronization.',
      stats: [
        { label: 'Booking Success Rate', value: '98%' },
        { label: 'Calendar Accuracy', value: '100%' },
        { label: 'No-show Reduction', value: '45%' },
        { label: 'Integration Speed', value: '< 1 sec' }
      ],
      features: ['Real-time calendar sync', 'Multiple calendar support', 'Automated confirmations', 'Rescheduling handling'],
      benefits: ['Reduced scheduling conflicts', 'Improved efficiency', 'Better customer experience', 'Automated workflows']
    },
    'call-transfers': {
      title: 'Real-time Call Transfers',
      icon: PhoneCall,
      description: 'Intelligent call routing ensures customers reach the right person at the right time with full context preservation.',
      stats: [
        { label: 'Transfer Success Rate', value: '99%' },
        { label: 'Context Retention', value: '100%' },
        { label: 'Transfer Time', value: '< 5 sec' },
        { label: 'Customer Satisfaction', value: '97%' }
      ],
      features: ['Smart routing logic', 'Context preservation', 'Skill-based routing', 'Escalation protocols'],
      benefits: ['Seamless customer experience', 'Reduced call handling time', 'Improved resolution rates', 'Better resource utilization']
    },
    'recordings-analytics': {
      title: 'Call Recordings & Analytics',
      icon: BarChart3,
      description: 'Comprehensive call analytics and recordings provide deep insights into customer interactions and business performance.',
      stats: [
        { label: 'Recording Quality', value: 'HD Audio' },
        { label: 'Analytics Depth', value: '50+ Metrics' },
        { label: 'Insight Accuracy', value: '99%' },
        { label: 'Report Generation', value: 'Real-time' }
      ],
      features: ['HD call recordings', 'Sentiment analysis', 'Performance metrics', 'Custom dashboards'],
      benefits: ['Data-driven decisions', 'Quality improvement', 'Compliance support', 'Training insights']
    },
    'multi-language': {
      title: 'Multi-language Support',
      icon: Globe,
      description: 'Serve customers in their preferred language with native-level fluency and cultural understanding.',
      stats: [
        { label: 'Languages Supported', value: '25+' },
        { label: 'Fluency Rating', value: '9.7/10' },
        { label: 'Cultural Accuracy', value: '95%' },
        { label: 'Translation Speed', value: 'Real-time' }
      ],
      features: ['Native-level fluency', 'Cultural adaptation', 'Real-time translation', 'Accent recognition'],
      benefits: ['Global market reach', 'Better customer connection', 'Increased accessibility', 'Competitive advantage']
    },
    '24-7-availability': {
      title: '24/7 Availability',
      icon: Clock,
      description: 'Round-the-clock service ensures your business never sleeps and opportunities are never missed.',
      stats: [
        { label: 'Uptime Guarantee', value: '99.9%' },
        { label: 'After-hours Calls', value: '35%' },
        { label: 'Revenue Recovery', value: '£25k+' },
        { label: 'Global Coverage', value: '24/7/365' }
      ],
      features: ['Always-on service', 'Global time zone support', 'Holiday coverage', 'Emergency protocols'],
      benefits: ['Never miss opportunities', 'Global customer service', 'Increased revenue', 'Competitive edge']
    },
    'local-numbers': {
      title: 'Local Numbers & Voicemail',
      icon: Headphones,
      description: 'Professional local presence with intelligent voicemail management and callback scheduling.',
      stats: [
        { label: 'Local Numbers', value: '100+ Cities' },
        { label: 'Voicemail Accuracy', value: '98%' },
        { label: 'Callback Success', value: '94%' },
        { label: 'Professional Rating', value: '9.6/10' }
      ],
      features: ['Local phone numbers', 'Smart voicemail', 'Callback scheduling', 'Message transcription'],
      benefits: ['Local market presence', 'Professional image', 'Better customer trust', 'Improved accessibility']
    },
    // Why Choose Us popups
    'enterprise-security': {
      title: 'Enterprise-Grade Security',
      icon: Shield,
      description: 'Bank-level encryption and security protocols protect your business data and customer information with military-grade protection.',
      stats: [
        { label: 'Data Encryption', value: 'AES-256' },
        { label: 'Uptime SLA', value: '99.9%' },
        { label: 'Security Audits', value: 'Monthly' },
        { label: 'Compliance', value: 'GDPR, SOC2' }
      ],
      features: ['End-to-end encryption', 'Regular security audits', 'GDPR compliant', 'Secure data centers'],
      benefits: ['Complete data protection', 'Regulatory compliance', 'Customer trust', 'Risk mitigation']
    },
    'lightning-setup': {
      title: 'Lightning-Fast Setup',
      icon: Zap,
      description: 'Get your AI receptionist up and running in minutes, not weeks. Our streamlined onboarding process gets you operational instantly.',
      stats: [
        { label: 'Setup Time', value: '5 mins' },
        { label: 'Integration Speed', value: '< 1 hour' },
        { label: 'Training Required', value: '0 hours' },
        { label: 'Go-Live Time', value: 'Same day' }
      ],
      features: ['One-click integration', 'Pre-configured templates', 'Automated testing', 'Instant activation'],
      benefits: ['Immediate ROI', 'No downtime', 'Quick deployment', 'Instant results']
    },
    'dedicated-support': {
      title: 'Dedicated Support Team',
      icon: Headphones,
      description: 'Our expert support team is available 24/7 to ensure your AI receptionist performs flawlessly and your business never misses a beat.',
      stats: [
        { label: 'Response Time', value: '< 2 mins' },
        { label: 'Resolution Rate', value: '98%' },
        { label: 'Availability', value: '24/7/365' },
        { label: 'Satisfaction', value: '4.9/5' }
      ],
      features: ['24/7 live support', 'Dedicated account manager', 'Priority assistance', 'Proactive monitoring'],
      benefits: ['Peace of mind', 'Expert guidance', 'Quick resolution', 'Continuous optimization']
    },
    'real-analytics': {
      title: 'Real-time Analytics',
      icon: TrendingUp,
      description: 'Comprehensive insights and analytics help you understand your customers better and optimize your business performance continuously.',
      stats: [
        { label: 'Data Points', value: '50+' },
        { label: 'Report Types', value: '15+' },
        { label: 'Update Frequency', value: 'Real-time' },
        { label: 'Export Formats', value: '5+' }
      ],
      features: ['Live dashboards', 'Custom reports', 'Performance metrics', 'Trend analysis'],
      benefits: ['Data-driven decisions', 'Performance optimization', 'Business insights', 'Competitive advantage']
    },
    // Benefits popups
    'no-missed-calls': {
      title: 'Never Miss Another Call',
      icon: Phone,
      description: 'Every call is answered instantly, ensuring no potential customer is ever lost due to busy lines or after-hours timing.',
      stats: [
        { label: 'Calls Answered', value: '100%' },
        { label: 'Response Time', value: '< 1 sec' },
        { label: 'Lost Revenue Recovered', value: '£50k+' },
        { label: 'Customer Satisfaction', value: '96%' }
      ],
      features: ['Instant call pickup', 'No busy signals', '24/7 availability', 'Multiple line handling'],
      benefits: ['Zero missed opportunities', 'Increased revenue', 'Better customer experience', 'Competitive advantage']
    },
    'instant-booking': {
      title: 'Instant Booking & Enquiries',
      icon: Calendar,
      description: 'Customers can book appointments and make enquiries instantly, even outside business hours, increasing your conversion rates significantly.',
      stats: [
        { label: 'Booking Success Rate', value: '94%' },
        { label: 'After-hours Bookings', value: '40%' },
        { label: 'Conversion Increase', value: '250%' },
        { label: 'No-show Reduction', value: '60%' }
      ],
      features: ['Real-time calendar sync', 'Automated confirmations', 'Reminder systems', 'Rescheduling handling'],
      benefits: ['Higher conversion rates', 'Reduced no-shows', '24/7 booking capability', 'Improved efficiency']
    },
    'save-costs': {
      title: 'Save Time & Staff Costs',
      icon: DollarSign,
      description: 'Reduce staffing costs while improving service quality. RingBot handles routine calls, freeing your team for high-value activities.',
      stats: [
        { label: 'Cost Savings', value: '70%' },
        { label: 'Time Saved', value: '8 hrs/day' },
        { label: 'Staff Efficiency', value: '+150%' },
        { label: 'ROI Timeline', value: '30 days' }
      ],
      features: ['Automated call handling', 'Reduced staffing needs', 'Improved productivity', 'Cost optimization'],
      benefits: ['Lower operational costs', 'Better resource allocation', 'Increased profitability', 'Scalable solution']
    }
  };

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Human-like AI Voice Agents",
      description: "Natural conversations that your customers won't believe are AI",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Lead Qualification & Follow-up",
      description: "Automatically qualify leads and nurture prospects with smart follow-ups",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Appointment Booking & CRM Sync",
      description: "Seamless calendar integration and customer data synchronization",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Call Transfers",
      description: "Smart routing to the right person when human intervention is needed",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Call Recordings & Analytics",
      description: "Detailed insights and recordings to optimize your customer interactions",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-language Support",
      description: "Serve customers in their preferred language, expanding your reach",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Never miss an opportunity with round-the-clock call handling",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Local Numbers & Voicemail",
      description: "Professional local presence with intelligent voicemail management",
      gradient: "from-rose-500 to-pink-500"
    }
  ];

  const benefits = [
    {
      icon: <TrendingDown className="w-16 h-16" />,
      title: "No More Missed Calls",
      subtitle: "No More Lost Customers",
      description: "Every call is answered professionally, ensuring zero missed opportunities and maximum customer satisfaction.",
      stat: "0%",
      statLabel: "Missed Calls"
    },
    {
      icon: <Timer className="w-16 h-16" />,
      title: "Instant Booking & Enquiries",
      subtitle: "Even After Hours",
      description: "Customers can book appointments and get answers instantly, whether it's 3 PM or 3 AM, boosting your revenue potential.",
      stat: "24/7",
      statLabel: "Availability"
    },
    {
      icon: <DollarSign className="w-16 h-16" />,
      title: "Save Time & Costs",
      subtitle: "While Boosting Revenue",
      description: "Reduce staff costs while increasing efficiency and revenue through automated, intelligent call handling.",
      stat: "60%",
      statLabel: "Cost Savings"
    }
  ];

  const testimonials = [
    {
      name: "Mike Thompson",
      business: "Thompson Plumbing",
      role: "Master Plumber",
      quote: "RingBot has transformed my business. No more missing emergency calls at night - it's like having a full-time receptionist without the overhead.",
      rating: 5,
      avatar: "MT",
      result: "+40% Revenue"
    },
    {
      name: "Sarah Chen",
      business: "Brew & Beans Café",
      role: "Café Owner",
      quote: "Our reservation bookings increased by 40% since implementing RingBot. Customers love being able to book tables even when we're closed.",
      rating: 5,
      avatar: "SC",
      result: "+40% Bookings"
    },
    {
      name: "James Wilson",
      business: "Wilson Electrical",
      role: "Licensed Electrician",
      quote: "The lead qualification feature is incredible. RingBot screens calls and only forwards serious inquiries, saving me hours every week.",
      rating: 5,
      avatar: "JW",
      result: "5hrs/week Saved"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "£79",
      period: "/month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 200 calls/month",
        "Basic AI voice agent",
        "Appointment booking",
        "Email notifications",
        "Standard support"
      ],
      popular: false,
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Professional",
      price: "£179",
      period: "/month",
      description: "Most popular for growing businesses",
      features: [
        "Up to 500 calls/month",
        "Advanced AI voice agent",
        "Lead qualification",
        "CRM integration",
        "Call recordings",
        "Priority support"
      ],
      popular: true,
      gradient: "from-[#00D1FF] to-blue-600"
    },
    {
      name: "Enterprise",
      price: "£349",
      period: "/month",
      description: "For businesses with high call volumes",
      features: [
        "Unlimited calls",
        "Multiple voice agents",
        "Custom integrations",
        "Advanced analytics",
        "Multi-language support",
        "Dedicated account manager"
      ],
      popular: false,
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Calls Handled", icon: <Phone className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> },
    { number: "500+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <Headphones className="w-6 h-6" /> }
  ];

  const aboutStats = [
    { number: "2024", label: "Founded", icon: <Building className="w-6 h-6" /> },
    { number: "50+", label: "Team Members", icon: <Users className="w-6 h-6" /> },
    { number: "15+", label: "Countries", icon: <Globe className="w-6 h-6" /> },
    { number: "99.8%", label: "Customer Satisfaction", icon: <Heart className="w-6 h-6" /> }
  ];

  const whyChooseReasons = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and GDPR compliance ensure your customer data is always protected.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Lightning-Fast Setup",
      description: "Get your AI receptionist up and running in under 5 minutes with our simple onboarding process.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <UserCheck className="w-12 h-12" />,
      title: "Dedicated Support Team",
      description: "Our expert team provides 24/7 support to ensure your AI calling system runs smoothly.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Activity className="w-12 h-12" />,
      title: "Real-Time Analytics",
      description: "Track performance, monitor call quality, and optimize your customer interactions with detailed insights.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const beforeAfterData = [
    {
      category: "Missed Calls",
      before: { value: "30%", color: "text-red-500", icon: <XCircle className="w-6 h-6" /> },
      after: { value: "0%", color: "text-green-500", icon: <CheckCircle2 className="w-6 h-6" /> }
    },
    {
      category: "Response Time",
      before: { value: "5+ mins", color: "text-red-500", icon: <Clock className="w-6 h-6" /> },
      after: { value: "< 3 secs", color: "text-green-500", icon: <Zap className="w-6 h-6" /> }
    },
    {
      category: "After Hours Service",
      before: { value: "None", color: "text-red-500", icon: <PhoneOff className="w-6 h-6" /> },
      after: { value: "24/7", color: "text-green-500", icon: <Clock className="w-6 h-6" /> }
    },
    {
      category: "Monthly Cost",
      before: { value: "£2,500+", color: "text-red-500", icon: <ArrowUp className="w-6 h-6" /> },
      after: { value: "£179", color: "text-green-500", icon: <ArrowDown className="w-6 h-6" /> }
    }
  ];

  const comparisonData = [
    {
      feature: "Availability",
      aiCalling: { value: "24/7", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
      regularCalling: { value: "Business Hours Only", icon: <XCircle className="w-5 h-5 text-red-500" /> },
      callTeam: { value: "Limited Hours", icon: <Minus className="w-5 h-5 text-yellow-500" /> }
    },
    {
      feature: "Response Time",
      aiCalling: { value: "Instant", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
      regularCalling: { value: "Variable", icon: <XCircle className="w-5 h-5 text-red-500" /> },
      callTeam: { value: "2-5 minutes", icon: <Minus className="w-5 h-5 text-yellow-500" /> }
    },
    {
      feature: "Cost per Month",
      aiCalling: { value: "£179", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
      regularCalling: { value: "£0 (but lost revenue)", icon: <XCircle className="w-5 h-5 text-red-500" /> },
      callTeam: { value: "£2,500+", icon: <XCircle className="w-5 h-5 text-red-500" /> }
    },
    {
      feature: "Consistency",
      aiCalling: { value: "Perfect Every Time", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
      regularCalling: { value: "Inconsistent", icon: <XCircle className="w-5 h-5 text-red-500" /> },
      callTeam: { value: "Human Variation", icon: <Minus className="w-5 h-5 text-yellow-500" /> }
    },
    {
      feature: "Scalability",
      aiCalling: { value: "Unlimited", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
      regularCalling: { value: "Not Scalable", icon: <XCircle className="w-5 h-5 text-red-500" /> },
      callTeam: { value: "Expensive to Scale", icon: <XCircle className="w-5 h-5 text-red-500" /> }
    },
    {
      feature: "Lead Qualification",
      aiCalling: { value: "Automated & Smart", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
      regularCalling: { value: "None", icon: <XCircle className="w-5 h-5 text-red-500" /> },
      callTeam: { value: "Manual Process", icon: <Minus className="w-5 h-5 text-yellow-500" /> }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins'] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-[#00D1FF]/25">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">RingBot</span>
                <div className="text-xs text-[#00D1FF] font-medium">AI Calling Service</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-[#00D1FF] transition-all duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D1FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#features" className="text-gray-300 hover:text-[#00D1FF] transition-all duration-300 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D1FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#why-choose" className="text-gray-300 hover:text-[#00D1FF] transition-all duration-300 relative group">
                Why Choose Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D1FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#comparison" className="text-gray-300 hover:text-[#00D1FF] transition-all duration-300 relative group">
                Comparison
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D1FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-[#00D1FF] transition-all duration-300 relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D1FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button className="px-6 py-3 text-[#00D1FF] border border-[#00D1FF]/30 hover:border-[#00D1FF] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00D1FF]/25">
                Book a Demo
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#00D1FF] to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-[#00D1FF]/25 transition-all duration-300 transform hover:scale-105">
                Try RingBot
              </button>
            </div>

            <button 
              className="md:hidden relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gray-800">
            <div className="px-4 py-8 space-y-6">
              <a href="#about" className="block text-gray-300 hover:text-[#00D1FF] transition-colors text-lg">About</a>
              <a href="#features" className="block text-gray-300 hover:text-[#00D1FF] transition-colors text-lg">Features</a>
              <a href="#why-choose" className="block text-gray-300 hover:text-[#00D1FF] transition-colors text-lg">Why Choose Us</a>
              <a href="#comparison" className="block text-gray-300 hover:text-[#00D1FF] transition-colors text-lg">Comparison</a>
              <a href="#pricing" className="block text-gray-300 hover:text-[#00D1FF] transition-colors text-lg">Pricing</a>
              <div className="pt-6 space-y-4">
                <button className="w-full px-6 py-3 text-[#00D1FF] border border-[#00D1FF]/30 rounded-xl transition-colors">
                  Book a Demo
                </button>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#00D1FF] to-blue-500 text-white rounded-xl transition-colors">
                  Try RingBot
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D1FF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-75"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">AI-Powered Business Communication</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Never Miss a Call Again —<br />
              <span className="bg-gradient-to-r from-[#00D1FF] via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
                Let RingBot Answer 24/7
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              RingBot is your AI-powered receptionist that never sleeps. We handle inbound and outbound calls for your business — answering enquiries, booking appointments, qualifying leads, and following up automatically. 
              <span className="text-[#00D1FF] font-semibold"> No more lost revenue from missed calls.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-[#00D1FF] to-blue-500 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-[#00D1FF]/25 transition-all duration-300 transform hover:scale-105 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Phone className="w-7 h-7 animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <span>Try RingBot — Call Now</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 blur group-hover:blur-md transition-all"></div>
              </button>
              
              <button className="group flex items-center space-x-4 px-10 py-5 border-2 border-gray-600 hover:border-[#00D1FF] text-gray-300 hover:text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00D1FF]/10">
                <div className="w-12 h-12 bg-gray-800 group-hover:bg-[#00D1FF]/20 rounded-full flex items-center justify-center transition-all duration-300">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span>Book a Demo</span>
              </button>
            </div>

            {/* Hero Visual with Chart */}
            <div className="relative max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Phone Hub */}
                <div className="relative">
                  <div className="mx-auto w-80 h-80 relative">
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#00D1FF]/30 animate-ping"></div>
                    <div className="absolute inset-8 rounded-full border-2 border-[#00D1FF]/40 animate-ping animation-delay-75"></div>
                    <div className="absolute inset-16 rounded-full border-2 border-[#00D1FF]/50 animate-ping animation-delay-150"></div>
                    
                    {/* Center Hub */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-[#00D1FF]/25 animate-bounce">
                        <Phone className="w-16 h-16 text-white" />
                      </div>
                    </div>

                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                          <MessageSquare className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-float animation-delay-75">
                          <Calendar className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-float animation-delay-150">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                          <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Performance Chart */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <BarChart className="w-8 h-8 text-[#00D1FF] mr-3" />
                    Performance Metrics
                  </h3>
                  
                  {/* Mock Chart */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Call Answer Rate</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-[#00D1FF] to-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-[#00D1FF] font-bold">100%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Customer Satisfaction</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div className="w-[98%] h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        </div>
                        <span className="text-green-500 font-bold">98%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Lead Conversion</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div className="w-[85%] h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        </div>
                        <span className="text-purple-500 font-bold">85%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Cost Reduction</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div className="w-[75%] h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-500 font-bold">75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
                    <div className="text-[#00D1FF] mb-3 flex justify-center">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <Building className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">About RingBot</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Revolutionizing Business Communication
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Founded in 2024, RingBot is at the forefront of AI-powered business communication, helping thousands of businesses never miss another opportunity.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  We believe every business deserves professional, 24/7 customer service without the overhead costs. Our AI-powered calling solution bridges the gap between exceptional customer service and business efficiency.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  From small local businesses to growing enterprises, we're committed to helping you capture every opportunity and grow your revenue through intelligent call handling.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Our Technology</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Built on cutting-edge AI and natural language processing, RingBot delivers human-like conversations that your customers will love. Our technology learns and adapts to your business needs, ensuring every interaction is professional and effective.
                </p>
              </div>
            </div>

            {/* Right side - Stats and Visual */}
            <div className="space-y-8">
              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4">
                {aboutStats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 text-center hover:border-[#00D1FF]/50 transition-all duration-300">
                    <div className="text-[#00D1FF] mb-3 flex justify-center">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Growth Chart Visualization */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <LineChart className="w-6 h-6 text-[#00D1FF] mr-3" />
                  Growth Trajectory
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Q1 2024</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-[25%] h-full bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-[#00D1FF] text-sm">50 clients</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Q2 2024</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-[#00D1FF] text-sm">150 clients</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Q3 2024</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-[#00D1FF] text-sm">350 clients</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Q4 2024</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-[#00D1FF] text-sm">500+ clients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <Award className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">Why Choose RingBot</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              The Smart Choice for Modern Businesses
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover what sets RingBot apart from traditional calling solutions
            </p>
          </div>

          {/* Live Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <LiveChart 
              data={chartData.callVolume} 
              title="Call Volume (Live)" 
              color="bg-gradient-to-t from-cyan-500 to-blue-500"
              type="line"
            />
            <LiveChart 
              data={chartData.conversionRate} 
              title="Conversion Rate" 
              color="bg-gradient-to-t from-green-500 to-emerald-500"
              type="pie"
              unit="%"
            />
            <LiveChart 
              data={chartData.responseTime} 
              title="Response Time" 
              color="bg-gradient-to-t from-purple-500 to-pink-500"
              type="line"
              unit="s"
            />
            <LiveChart 
              data={chartData.satisfaction} 
              title="Customer Satisfaction" 
              color="bg-gradient-to-t from-orange-500 to-red-500"
              type="donut"
              unit="%"
            />
            <div className="md:col-span-2 lg:col-span-1">
              <LiveChart 
                data={chartData.revenue} 
                title="Revenue Impact" 
              type="area"
                type="donut"
                unit="£"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseReasons.map((reason, index) => (
              <div 
                key={index}
                id={`reason-${index}`}
                className={`group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-[#00D1FF]/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#00D1FF]/10 transition-all duration-500 transform hover:scale-105 ${isVisible[`reason-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${reason.gradient} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {reason.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00D1FF] transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{reason.description}</p>
                  
                  <div className="mt-6 flex items-center text-[#00D1FF] group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section id="before-after" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <TrendingUp className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">Transformation Results</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Before vs After RingBot
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See the dramatic improvement in your business metrics with RingBot
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                {/* Headers */}
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-400">Metric</h3>
                </div>
                <div className="p-8 text-center bg-red-500/10">
                  <h3 className="text-2xl font-bold text-red-400 flex items-center justify-center">
                    <XCircle className="w-6 h-6 mr-2" />
                    Before RingBot
                  </h3>
                </div>
                <div className="p-8 text-center bg-green-500/10">
                  <h3 className="text-2xl font-bold text-green-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 mr-2" />
                    After RingBot
                  </h3>
                </div>

                {/* Data Rows */}
                {beforeAfterData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="p-6 flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">{item.category}</span>
                    </div>
                    <div className="p-6 text-center bg-red-500/5">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="text-red-400">{item.before.icon}</div>
                        <span className={`text-2xl font-bold ${item.before.color}`}>
                          {item.before.value}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 text-center bg-green-500/5">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="text-green-400">{item.after.icon}</div>
                        <span className={`text-2xl font-bold ${item.after.color}`}>
                          {item.after.value}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="mt-16 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <PieChart className="w-8 h-8 text-[#00D1FF] mr-3" />
                ROI Calculator
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-red-400">£2,500</div>
                  <div className="text-gray-400">Monthly Staff Cost</div>
                  <div className="text-sm text-gray-500">Traditional receptionist</div>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-[#00D1FF]">£179</div>
                  <div className="text-gray-400">RingBot Cost</div>
                  <div className="text-sm text-gray-500">Professional plan</div>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-green-400">£2,321</div>
                  <div className="text-gray-400">Monthly Savings</div>
                  <div className="text-sm text-gray-500">93% cost reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <BarChart3 className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">Solution Comparison</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Calling vs Traditional Solutions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how RingBot compares to other calling solutions
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="p-6 text-left text-lg font-semibold text-white">Feature</th>
                      <th className="p-6 text-center text-lg font-semibold text-[#00D1FF] bg-[#00D1FF]/10">
                        <div className="flex items-center justify-center space-x-2">
                          <Bot className="w-6 h-6" />
                          <span>AI Calling</span>
                        </div>
                      </th>
                      <th className="p-6 text-center text-lg font-semibold text-gray-400">
                        <div className="flex items-center justify-center space-x-2">
                          <PhoneOff className="w-6 h-6" />
                          <span>Regular Calling</span>
                        </div>
                      </th>
                      <th className="p-6 text-center text-lg font-semibold text-gray-400">
                        <div className="flex items-center justify-center space-x-2">
                          <Users className="w-6 h-6" />
                          <span>Call Team</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="p-6 font-medium text-white">{row.feature}</td>
                        <td className="p-6 text-center bg-[#00D1FF]/5">
                          <div className="flex items-center justify-center space-x-2">
                            {row.aiCalling.icon}
                            <span className="font-medium text-white">{row.aiCalling.value}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {row.regularCalling.icon}
                            <span className="font-medium text-gray-300">{row.regularCalling.value}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {row.callTeam.icon}
                            <span className="font-medium text-gray-300">{row.callTeam.value}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gradient-to-br from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-2xl p-8 text-center">
                <Bot className="w-16 h-16 text-[#00D1FF] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">AI Calling (RingBot)</h3>
                <p className="text-gray-300 mb-4">Perfect solution for modern businesses</p>
                <div className="text-3xl font-bold text-[#00D1FF]">Winner</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
                <PhoneOff className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Regular Calling</h3>
                <p className="text-gray-500 mb-4">Limited and unreliable</p>
                <div className="text-3xl font-bold text-red-500">Poor</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Call Team</h3>
                <p className="text-gray-500 mb-4">Expensive and inconsistent</p>
                <div className="text-3xl font-bold text-yellow-500">Costly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <Target className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">Transform Your Business</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Key Benefits
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform these common business challenges into competitive advantages
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                id={`benefit-${index}`}
                className={`group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-[#00D1FF]/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#00D1FF]/10 transition-all duration-500 transform hover:scale-105 ${isVisible[`benefit-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="text-[#00D1FF] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-white mb-2">{benefit.stat}</div>
                    <div className="text-sm text-[#00D1FF] font-medium">{benefit.statLabel}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-lg text-[#00D1FF] font-semibold mb-4">{benefit.subtitle}</p>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  
                  <div className="mt-6 flex items-center text-[#00D1FF] group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <Zap className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">Powerful Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Revolutionary AI technology that transforms your customer communications
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                id={`feature-${index}`}
                className={`group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-[#00D1FF]/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#00D1FF]/10 transition-all duration-300 transform hover:scale-105 ${isVisible[`feature-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-[#00D1FF] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <Award className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">Client Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how RingBot is transforming businesses like yours
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
                    <div className="text-[#00D1FF] font-medium">{testimonials[currentTestimonial].business}</div>
                  </div>
                  <div className="ml-8 text-center">
                    <div className="text-2xl font-bold text-[#00D1FF]">{testimonials[currentTestimonial].result}</div>
                    <div className="text-xs text-gray-400">Result</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#00D1FF] scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00D1FF]/20 to-blue-500/20 border border-[#00D1FF]/30 rounded-full px-6 py-3 mb-6">
              <DollarSign className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm font-medium text-[#00D1FF]">Simple Pricing</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transparent pricing that scales with your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                id={`plan-${index}`}
                className={`relative bg-gradient-to-br from-gray-900 to-black border rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-105 ${isVisible[`plan-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                  plan.popular 
                    ? 'border-[#00D1FF] shadow-[#00D1FF]/25 scale-105' 
                    : 'border-gray-800 hover:border-[#00D1FF]/50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#00D1FF] to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-xl mb-6 text-white shadow-lg`}>
                    <Phone className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 text-lg">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#00D1FF] flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-[#00D1FF] to-blue-500 text-white shadow-lg shadow-[#00D1FF]/25' 
                      : 'border-2 border-gray-600 hover:border-[#00D1FF] text-gray-300 hover:text-white'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6 text-lg">Need a custom solution for your enterprise?</p>
            <button className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-bold text-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF] via-blue-500 to-cyan-400"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform<br />Your Business?
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of businesses already using RingBot to capture every opportunity and never miss another call
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-12 py-6 bg-white text-[#00D1FF] rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Phone className="w-7 h-7 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span>Try RingBot — Call Now</span>
              </div>
            </button>
            
            <button className="group flex items-center space-x-4 px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-[#00D1FF] rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-white/20 group-hover:bg-[#00D1FF]/20 rounded-full flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span>Book a Demo</span>
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">No Setup Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-[#00D1FF]/25">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">RingBot</span>
                <div className="text-xs text-[#00D1FF] font-medium">AI Calling Service</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2 text-lg">Never miss a call again</p>
              <p className="text-sm text-gray-500">© 2024 RingBot. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App