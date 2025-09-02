import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Home, 
  Shield, 
  Settings, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  Building,
  Battery,
  Thermometer,
  Zap,
  Calendar,
  FileCheck,
  TrendingUp,
  Bell,
  Menu,
  X,
  Wifi,
  WifiOff,
  Play,
  Pause,
  Flame,
  ChevronRight,
  ChevronLeft,
  Info,
  MapPin,
  Phone,
  Mail,
  User,
  Wrench,
  Eye,
  Download,
  ArrowLeft,
  Factory,
  Store,
  Package,
  FileText,
  Award,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

// Port Elizabeth Companies/Clients
const clientsData = [
  {
    id: 'CLIENT001',
    name: 'Boardwalk Casino & Hotel',
    type: 'Hospitality',
    location: 'Summerstrand, Port Elizabeth',
    address: 'Beach Road, Summerstrand, Port Elizabeth, 6001',
    contactPerson: 'Johan van der Merwe',
    contactPhone: '+27 41 507 7777',
    contactEmail: 'safety@boardwalkcasino.co.za',
    contractType: 'Premium 24/7',
    status: 'active',
    totalDevices: 89,
    totalPanels: 3,
    activeAlerts: 2,
    lastInspection: '2024-08-15',
    nextMaintenance: '2024-09-15',
    monthlyFee: 'R 12,500',
    contractExpiry: '2025-12-31'
  },
  {
    id: 'CLIENT002',
    name: 'Volkswagen South Africa',
    type: 'Manufacturing',
    location: 'Uitenhage',
    address: 'Kohler Street, Uitenhage, Port Elizabeth, 6229',
    contactPerson: 'Pieter Botha',
    contactPhone: '+27 41 994 2000',
    contactEmail: 'facilities@vw.co.za',
    contractType: 'Enterprise',
    status: 'active',
    totalDevices: 245,
    totalPanels: 8,
    activeAlerts: 5,
    lastInspection: '2024-08-10',
    nextMaintenance: '2024-09-10',
    monthlyFee: 'R 28,900',
    contractExpiry: '2026-06-30'
  },
  {
    id: 'CLIENT003',
    name: 'Greenacres Shopping Centre',
    type: 'Retail',
    location: 'Greenacres',
    address: 'Ascot Road, Greenacres, Port Elizabeth, 6057',
    contactPerson: 'Linda Naidoo',
    contactPhone: '+27 41 363 1995',
    contactEmail: 'security@greenacres.co.za',
    contractType: 'Standard',
    status: 'active',
    totalDevices: 156,
    totalPanels: 4,
    activeAlerts: 0,
    lastInspection: '2024-08-20',
    nextMaintenance: '2024-09-20',
    monthlyFee: 'R 18,750',
    contractExpiry: '2025-09-30'
  },
  {
    id: 'CLIENT004',
    name: 'Nelson Mandela University',
    type: 'Education',
    location: 'Summerstrand',
    address: 'University Way, Summerstrand, Port Elizabeth, 6031',
    contactPerson: 'Prof. Thabo Mthembu',
    contactPhone: '+27 41 504 1111',
    contactEmail: 'safety@mandela.ac.za',
    contractType: 'Premium 24/7',
    status: 'active',
    totalDevices: 312,
    totalPanels: 12,
    activeAlerts: 1,
    lastInspection: '2024-08-18',
    nextMaintenance: '2024-09-18',
    monthlyFee: 'R 35,600',
    contractExpiry: '2027-12-31'
  }
];

// Fire Panels linked to clients
const firePanelsData = [
  // Boardwalk Casino Panels
  {
    id: 'FP001',
    clientId: 'CLIENT001',
    panelName: 'Main Casino Floor Panel',
    location: 'Security Office - Ground Floor',
    model: 'Notifier NFS-640',
    status: 'normal',
    devices: 35,
    activeAlerts: 0,
    batteryLevel: 98,
    connectionStatus: 'online',
    temperature: 22.5,
    signalStrength: 95
  },
  {
    id: 'FP002',
    clientId: 'CLIENT001',
    panelName: 'Hotel Wing Panel',
    location: 'Hotel Reception - 2nd Floor',
    model: 'Notifier NFS-320',
    status: 'warning',
    devices: 42,
    activeAlerts: 2,
    batteryLevel: 85,
    connectionStatus: 'online',
    temperature: 24.1,
    signalStrength: 88
  },
  {
    id: 'FP003',
    clientId: 'CLIENT001',
    panelName: 'Parking Garage Panel',
    location: 'Parking Level B1',
    model: 'Notifier NFS-320',
    status: 'normal',
    devices: 12,
    activeAlerts: 0,
    batteryLevel: 92,
    connectionStatus: 'online',
    temperature: 19.8,
    signalStrength: 82
  },
  // VW Panels
  {
    id: 'FP004',
    clientId: 'CLIENT002',
    panelName: 'Assembly Plant Main',
    location: 'Plant Control Room',
    model: 'Siemens FC2040',
    status: 'critical',
    devices: 89,
    activeAlerts: 3,
    batteryLevel: 45,
    connectionStatus: 'unstable',
    temperature: 28.7,
    signalStrength: 65
  },
  {
    id: 'FP005',
    clientId: 'CLIENT002',
    panelName: 'Paint Shop Panel',
    location: 'Paint Shop Control',
    model: 'Siemens FC2040',
    status: 'warning',
    devices: 67,
    activeAlerts: 2,
    batteryLevel: 78,
    connectionStatus: 'online',
    temperature: 26.3,
    signalStrength: 91
  },
  // Add more panels for other clients...
];

// Devices linked to specific panels and clients
const devicesData = [
  // Boardwalk Casino Devices
  {
    id: 'SM001',
    clientId: 'CLIENT001',
    panelId: 'FP001',
    type: 'Smoke Detector',
    location: 'Casino Floor - Slot Area A',
    status: 'normal',
    battery: 95,
    signal: 98,
    model: 'System Sensor 2451'
  },
  {
    id: 'SM002',
    clientId: 'CLIENT001',
    panelId: 'FP001',
    type: 'Smoke Detector',
    location: 'Casino Floor - Table Games',
    status: 'normal',
    battery: 92,
    signal: 96,
    model: 'System Sensor 2451'
  },
  {
    id: 'HD001',
    clientId: 'CLIENT001',
    panelId: 'FP002',
    type: 'Heat Detector',
    location: 'Hotel Kitchen - Main',
    status: 'warning',
    battery: 78,
    signal: 87,
    model: 'System Sensor 5623'
  },
  // VW Devices
  {
    id: 'SM010',
    clientId: 'CLIENT002',
    panelId: 'FP004',
    type: 'Smoke Detector',
    location: 'Assembly Line 1',
    status: 'critical',
    battery: 23,
    signal: 45,
    model: 'Bosch FAP-425'
  },
  {
    id: 'HD010',
    clientId: 'CLIENT002',
    panelId: 'FP005',
    type: 'Heat Detector',
    location: 'Paint Booth 3',
    status: 'normal',
    battery: 88,
    signal: 92,
    model: 'Bosch FAH-425'
  },
  // Add more devices...
];

// Client-specific alerts (initial data)
const initialAlertsData = [
  {
    id: 'ALT001',
    clientId: 'CLIENT002',
    clientName: 'Volkswagen South Africa',
    type: 'Battery Critical',
    device: 'SM010 - Smoke Detector',
    location: 'Assembly Line 1',
    severity: 'critical',
    timestamp: new Date(Date.now() - 3600000),
    acknowledged: false,
    priority: 1,
    description: 'Smoke detector battery at critical level (23%). Production area safety compromised.',
    assignedTechnician: 'Sipho Ndlovu'
  },
  {
    id: 'ALT002',
    clientId: 'CLIENT001',
    clientName: 'Boardwalk Casino & Hotel',
    type: 'Sensor Fault',
    device: 'HD001 - Heat Detector',
    location: 'Hotel Kitchen - Main',
    severity: 'warning',
    timestamp: new Date(Date.now() - 7200000),
    acknowledged: false,
    priority: 2,
    description: 'Heat detector showing intermittent readings in main kitchen area.',
    assignedTechnician: 'Thandi Khumalo'
  },
  {
    id: 'ALT003',
    clientId: 'CLIENT002',
    clientName: 'Volkswagen South Africa',
    type: 'Connection Lost',
    device: 'FP004 - Assembly Plant Main',
    location: 'Plant Control Room',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1800000),
    acknowledged: false,
    priority: 1,
    description: 'Main panel connection unstable. Intermittent communication failures detected.',
    assignedTechnician: 'Johan Kruger'
  }
];

// Client-specific maintenance (initial data)
const initialMaintenanceData = [
  {
    id: 'MAINT001',
    clientId: 'CLIENT001',
    clientName: 'Boardwalk Casino & Hotel',
    title: 'Monthly Fire System Inspection',
    dueDate: '2024-09-15',
    status: 'upcoming',
    priority: 'high',
    technician: 'Sipho Ndlovu',
    estimatedDuration: '4 hours',
    description: 'Complete monthly inspection of all fire safety systems including smoke detectors, heat detectors, and alarm panels.',
    checklist: [
      'Visual inspection of all smoke detectors',
      'Test pull stations functionality',
      'Check alarm horn operation',
      'Verify panel display readings',
      'Battery level assessment',
      'Documentation update'
    ]
  },
  {
    id: 'MAINT002',
    clientId: 'CLIENT002',
    clientName: 'Volkswagen South Africa',
    title: 'Quarterly Compliance Audit',
    dueDate: '2024-09-10',
    status: 'overdue',
    priority: 'critical',
    technician: 'Johan Kruger',
    estimatedDuration: '8 hours',
    description: 'Quarterly fire safety compliance audit for manufacturing facility.',
    checklist: [
      'Review all system logs',
      'Verify compliance documentation',
      'Test emergency evacuation systems',
      'Update compliance certificates'
    ]
  },
  {
    id: 'MAINT003',
    clientId: 'CLIENT003',
    clientName: 'Greenacres Shopping Centre',
    title: 'Annual System Certification',
    dueDate: '2024-09-20',
    status: 'upcoming',
    priority: 'medium',
    technician: 'Thandi Khumalo',
    estimatedDuration: '6 hours',
    description: 'Annual fire system certification and testing.',
    checklist: [
      'Full system functionality test',
      'Update certification documents',
      'Submit compliance reports',
      'Schedule follow-up inspection'
    ]
  }
];

// Compliance data
const complianceData = [
  {
    id: 'COMP001',
    clientId: 'CLIENT001',
    clientName: 'Boardwalk Casino & Hotel',
    type: 'Fire Safety Certificate',
    status: 'valid',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    certNumber: 'FSC-PE-2024-001',
    issuingAuthority: 'Nelson Mandela Bay Fire Department'
  },
  {
    id: 'COMP002',
    clientId: 'CLIENT002',
    clientName: 'Volkswagen South Africa',
    type: 'OHS Compliance Certificate',
    status: 'expiring',
    issueDate: '2023-10-01',
    expiryDate: '2024-10-01',
    certNumber: 'OHS-PE-2023-147',
    issuingAuthority: 'Department of Employment and Labour'
  },
  {
    id: 'COMP003',
    clientId: 'CLIENT003',
    clientName: 'Greenacres Shopping Centre',
    type: 'Annual Inspection Report',
    status: 'overdue',
    issueDate: '2023-08-20',
    expiryDate: '2024-08-20',
    certNumber: 'AIR-PE-2023-089',
    issuingAuthority: 'Approved Inspection Authority'
  }
];

// Smooth value component
const SmoothValue = ({ value, precision = 0, suffix = '', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef();
  
  useEffect(() => {
    const startValue = displayValue;
    const difference = value - startValue;
    const startTime = Date.now();
    const duration = 1500;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (difference * easeOutCubic);
      
      setDisplayValue(current);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);
  
  return (
    <span className={`transition-all duration-300 ${className}`}>
      {displayValue.toFixed(precision)}{suffix}
    </span>
  );
};

const LiveIndicator = ({ status, className, showText = true }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <div className={`w-2 h-2 rounded-full transition-all duration-1000 ease-out ${
      status === 'online' ? 'bg-emerald-400 shadow-emerald-400/40' :
      status === 'unstable' ? 'bg-amber-400 shadow-amber-400/40' :
      'bg-red-400 shadow-red-400/40'
    }`} 
    style={{
      boxShadow: status === 'online' ? '0 0 8px rgba(52, 211, 153, 0.4)' :
                status === 'unstable' ? '0 0 8px rgba(251, 191, 36, 0.4)' :
                '0 0 8px rgba(248, 113, 113, 0.4)',
      animation: status === 'online' ? 'pulse 3s ease-in-out infinite' :
                status === 'unstable' ? 'pulse 2s ease-in-out infinite' :
                'pulse 1s ease-in-out infinite'
    }} />
    {showText && (
      <span className={`text-xs font-medium transition-all duration-1000 ${
        status === 'online' ? 'text-emerald-400' :
        status === 'unstable' ? 'text-amber-400' :
        'text-red-400'
      }`}>
        {status.toUpperCase()}
      </span>
    )}
  </div>
);

const MetricCard = ({ title, value, icon: Icon, gradient, isAlert = false, trend = null, onClick = null }) => (
  <div 
    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-4 sm:p-6 shadow-2xl border border-white/10 group hover:scale-105 transition-all duration-500 ease-out ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full opacity-50" />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-white/80 ${isAlert ? 'animate-pulse' : ''} transition-all duration-300`} />
        {onClick && (
          <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-all duration-300" />
        )}
      </div>
      <p className="text-white/70 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{title}</p>
      <div className="flex items-end space-x-2">
        <p className="text-xl sm:text-3xl font-bold text-white">
          {typeof value === 'number' ? <SmoothValue value={value} /> : value}
        </p>
        {trend && (
          <span className={`text-xs sm:text-sm transition-colors duration-500 ${trend > 0 ? 'text-emerald-300' : 'text-red-300'}`}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  </div>
);

// Mobile-friendly button component
const MobileButton = ({ onClick, variant = 'primary', size = 'md', children, className = '', disabled = false, fullWidth = false }) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center text-center whitespace-nowrap";
  
  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-400 hover:to-red-400 shadow-lg hover:shadow-orange-500/30 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400",
    secondary: "bg-gray-800/70 text-gray-300 hover:bg-gray-700/70 hover:text-white border border-gray-600/50 hover:border-gray-500/50",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500 shadow-lg hover:shadow-emerald-500/30",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 shadow-lg hover:shadow-red-500/30"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-xs min-h-8",
    md: "px-4 py-2.5 text-sm min-h-10",
    lg: "px-6 py-3 text-base min-h-12"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// Modal component for detailed views
const DetailModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-orange-900/50 via-red-900/30 to-orange-900/50 p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Breadcrumb Navigation Component
const Breadcrumb = ({ currentPage, onNavigate, navigationHistory, selectedClient }) => {
  const navigation = [
    { name: 'Command Center', key: 'dashboard', icon: Home },
    { name: 'Clients', key: 'clients', icon: Users },
    { name: 'Device Grid', key: 'devices', icon: Shield },
    { name: 'Maintenance', key: 'maintenance', icon: Settings },
    { name: 'Alert Center', key: 'alerts', icon: AlertTriangle },
    { name: 'Analytics', key: 'analytics', icon: Activity },
    { name: 'Compliance', key: 'compliance', icon: FileCheck }
  ];
  
  const currentNav = navigation.find(item => item.key === currentPage);
  
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
      <button
        onClick={() => onNavigate('dashboard')}
        className="hover:text-white transition-colors duration-200 flex items-center space-x-1"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>
      {currentPage !== 'dashboard' && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium flex items-center space-x-1">
            {currentNav && (
              <>
                <currentNav.icon className="w-4 h-4" />
                <span>{currentNav.name}</span>
              </>
            )}
          </span>
        </>
      )}
      {selectedClient && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">{selectedClient.name}</span>
        </>
      )}
    </div>
  );
};

function FirePanelApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [navigationHistory, setNavigationHistory] = useState(['dashboard']);
  
  // Stateful data
  const [alerts, setAlerts] = useState(initialAlertsData);
  const [tasks, setTasks] = useState(initialMaintenanceData);
  const [compliance, setCompliance] = useState(complianceData);
  
  // Live values that update smoothly
  const [liveValues, setLiveValues] = useState({
    batteryLevels: {},
    temperatures: {},
    signalStrengths: {},
    totalAlerts: alerts.filter(a => !a.acknowledged).length
  });

  // Interactive functions
  const acknowledgeAlert = useCallback((alertId) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  }, []);
  
  const completeTask = useCallback((taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  }, []);
  
  const renewCompliance = useCallback((compId) => {
    setCompliance(prev => prev.map(comp =>
      comp.id === compId ? { 
        ...comp, 
        status: 'valid',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]
      } : comp
    ));
  }, []);

  // Navigation helper
  const navigateToPage = (page, client = null) => {
    setCurrentPage(page);
    setSelectedClient(client);
    setNavigationHistory(prev => [...prev, page]);
  };

  // Back navigation
  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setCurrentPage(previousPage);
      setNavigationHistory(newHistory);
      if (previousPage !== 'devices') {
        setSelectedClient(null);
      }
    }
  };

  // Smooth background updates
  useEffect(() => {
    if (!isLiveMode) return;
    
    const interval = setInterval(() => {
      setLiveValues(prev => {
        const newValues = { ...prev };
        
        firePanelsData.forEach(panel => {
          const currentBattery = newValues.batteryLevels[panel.id] || panel.batteryLevel;
          newValues.batteryLevels[panel.id] = Math.max(0, currentBattery - Math.random() * 0.005);
          
          const currentTemp = newValues.temperatures[panel.id] || panel.temperature;
          newValues.temperatures[panel.id] = currentTemp + (Math.random() - 0.5) * 0.02;
          
          const currentSignal = newValues.signalStrengths[panel.id] || panel.signalStrength;
          newValues.signalStrengths[panel.id] = Math.max(30, Math.min(100, currentSignal + (Math.random() - 0.5) * 0.1));
        });
        
        return newValues;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isLiveMode]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return 'text-emerald-400 bg-emerald-900/40 border-emerald-500/50';
      case 'warning': return 'text-amber-400 bg-amber-900/40 border-amber-500/50';
      case 'critical': return 'text-red-400 bg-red-900/40 border-red-500/50';
      default: return 'text-gray-400 bg-gray-800/40 border-gray-600/50';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-red-400 bg-red-900/40 border-red-500/60';
      case 'warning': return 'text-amber-400 bg-amber-900/40 border-amber-500/60';
      case 'info': return 'text-blue-400 bg-blue-900/40 border-blue-500/60';
      default: return 'text-gray-400 bg-gray-800/40 border-gray-600/60';
    }
  };

  const getClientTypeIcon = (type) => {
    switch(type) {
      case 'Manufacturing': return Factory;
      case 'Retail': return Store;
      case 'Hospitality': return Building;
      case 'Education': return Users;
      default: return Building;
    }
  };

  const getComplianceStatusColor = (status) => {
    switch(status) {
      case 'valid': return 'text-emerald-400 bg-emerald-900/40 border-emerald-500/50';
      case 'expiring': return 'text-amber-400 bg-amber-900/40 border-amber-500/50';
      case 'overdue': return 'text-red-400 bg-red-900/40 border-red-500/50';
      default: return 'text-gray-400 bg-gray-800/40 border-gray-600/50';
    }
  };

  const navigation = [
    { name: 'Command Center', key: 'dashboard', icon: Home },
    { name: 'Clients', key: 'clients', icon: Users },
    { name: 'Device Grid', key: 'devices', icon: Shield },
    { name: 'Maintenance', key: 'maintenance', icon: Settings },
    { name: 'Alert Center', key: 'alerts', icon: AlertTriangle },
    { name: 'Analytics', key: 'analytics', icon: Activity },
    { name: 'Compliance', key: 'compliance', icon: FileCheck }
  ];

  // Enhanced Dashboard
  const Dashboard = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* FireWeb Control Header */}
      <div className="bg-gradient-to-r from-red-900/60 via-orange-900/50 to-red-900/60 backdrop-blur-md border border-red-500/30 text-white p-4 sm:p-6 rounded-2xl shadow-2xl">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
            <div>
              <span className="font-bold text-lg sm:text-xl">FireWeb Control System</span>
              <div className="flex items-center space-x-3 mt-1">
                <LiveIndicator status="online" showText={false} />
                <span className="text-xs sm:text-sm text-orange-200">Monitoring {clientsData.length} clients across Port Elizabeth</span>
                {isLiveMode && <span className="text-xs text-orange-300/80">• Live updates active</span>}
              </div>
            </div>
          </div>
          <MobileButton
            onClick={() => setIsLiveMode(!isLiveMode)}
            variant="secondary"
            size="md"
          >
            {isLiveMode ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isLiveMode ? 'Pause' : 'Resume'}
          </MobileButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <MetricCard 
          title="Active Clients" 
          value={clientsData.filter(c => c.status === 'active').length} 
          icon={Building} 
          gradient="from-slate-700 via-slate-800 to-slate-900"
          onClick={() => navigateToPage('clients')}
        />
        <MetricCard 
          title="Total Fire Panels" 
          value={firePanelsData.length} 
          icon={Shield} 
          gradient="from-blue-800 via-blue-900 to-black"
          onClick={() => navigateToPage('devices')}
        />
        <MetricCard 
          title="Active Alerts" 
          value={alerts.filter(a => !a.acknowledged).length} 
          icon={Bell} 
          gradient="from-red-800 via-red-900 to-black"
          isAlert={alerts.filter(a => !a.acknowledged).length > 0}
          onClick={() => navigateToPage('alerts')}
        />
        <MetricCard 
          title="Devices Monitored" 
          value={devicesData.length} 
          icon={Activity} 
          gradient="from-emerald-800 via-emerald-900 to-black"
          onClick={() => navigateToPage('devices')}
        />
      </div>

      {/* Top Alerts by Client */}
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-red-900/40 via-orange-900/20 to-red-900/40 p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Critical Alerts by Client</h3>
            </div>
            <MobileButton
              onClick={() => navigateToPage('alerts')}
              variant="secondary"
              size="sm"
            >
              View All Alerts
            </MobileButton>
          </div>
        </div>
        <div className="divide-y divide-gray-700/30">
          {alerts.filter(a => !a.acknowledged).slice(0, 3).map((alert) => (
            <div 
              key={alert.id} 
              className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-red-900/15 hover:to-transparent transition-all duration-700 ease-out cursor-pointer"
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`px-2 sm:px-3 py-1 text-xs font-bold rounded-lg border transition-all duration-500 ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-sm sm:text-lg font-semibold text-white">{alert.type}</span>
                    <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-lg border border-blue-500/30">
                      {alert.clientName}
                    </span>
                  </div>
                  <p className="text-gray-200 font-medium text-sm sm:text-base">{alert.device}</p>
                  <p className="text-gray-400 text-sm">{alert.location}</p>
                  <div className="flex items-center space-x-2 mt-2 text-gray-500 text-xs sm:text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{alert.timestamp.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2 sm:ml-4">
                  <MobileButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAlert(alert);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </MobileButton>
                  {!alert.acknowledged && (
                    <MobileButton
                      onClick={(e) => {
                        e.stopPropagation();
                        acknowledgeAlert(alert.id);
                      }}
                      variant="primary"
                      size="sm"
                    >
                      Acknowledge
                    </MobileButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Summary */}
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800/60 via-gray-900/40 to-gray-800/60 p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Client Overview</h3>
            </div>
            <MobileButton
              onClick={() => navigateToPage('clients')}
              variant="secondary"
              size="sm"
            >
              View All Clients
            </MobileButton>
          </div>
        </div>
        <div className="divide-y divide-gray-700/30">
          {clientsData.map((client) => {
            const clientAlerts = alerts.filter(a => a.clientId === client.id && !a.acknowledged).length;
            const TypeIcon = getClientTypeIcon(client.type);
            
            return (
              <div 
                key={client.id} 
                className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-blue-900/15 hover:to-transparent cursor-pointer group transition-all duration-700 ease-out"
                onClick={() => {
                  setSelectedClient(client);
                  navigateToPage('devices', client);
                }}
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <TypeIcon className="w-4 h-4 text-gray-400" />
                        <p className="font-bold text-white text-base sm:text-xl">{client.name}</p>
                        <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700/50">
                          {client.type}
                        </span>
                        {clientAlerts > 0 && (
                          <span className="px-2 py-1 text-xs bg-red-900/40 text-red-400 rounded-lg border border-red-500/50 font-bold">
                            {clientAlerts} ALERTS
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base">{client.location}</p>
                    </div>
                    <div className="sm:ml-4">
                      <MobileButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClient(client);
                          navigateToPage('devices', client);
                        }}
                        variant="secondary"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </MobileButton>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Panels</p>
                      <p className="text-sm sm:text-base font-bold text-white">{client.totalPanels}</p>
                    </div>
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Devices</p>
                      <p className="text-sm sm:text-base font-bold text-white">{client.totalDevices}</p>
                    </div>
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Contract</p>
                      <p className="text-xs sm:text-sm font-bold text-blue-400">{client.contractType}</p>
                    </div>
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Monthly</p>
                      <p className="text-xs sm:text-sm font-bold text-emerald-400">{client.monthlyFee}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Clients Page
  const ClientsPage = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard 
          title="Active Contracts" 
          value={clientsData.filter(c => c.status === 'active').length} 
          icon={CheckCircle2} 
          gradient="from-emerald-600 via-emerald-700 to-emerald-900"
        />
        <MetricCard 
          title="Total Revenue" 
          value="R 95,750" 
          icon={TrendingUp} 
          gradient="from-blue-600 via-blue-700 to-blue-900"
        />
        <MetricCard 
          title="Contract Renewals" 
          value="2" 
          icon={Calendar} 
          gradient="from-amber-600 via-amber-700 to-amber-900"
        />
      </div>

      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800/60 via-gray-900/40 to-gray-800/60 p-4 sm:p-6 border-b border-gray-700/50">
          <h3 className="text-lg sm:text-xl font-bold text-white">Client Portfolio</h3>
        </div>
        <div className="divide-y divide-gray-700/30">
          {clientsData.map((client) => {
            const TypeIcon = getClientTypeIcon(client.type);
            const clientAlerts = alerts.filter(a => a.clientId === client.id && !a.acknowledged).length;
            
            return (
              <div 
                key={client.id} 
                className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-all duration-500 cursor-pointer"
                onClick={() => {
                  setSelectedClient(client);
                  navigateToPage('devices', client);
                }}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <TypeIcon className="w-5 h-5 text-gray-400" />
                        <p className="font-bold text-white text-lg sm:text-xl">{client.name}</p>
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                          client.status === 'active' ? 'text-emerald-400 bg-emerald-900/40 border-emerald-500/50' :
                          'text-gray-400 bg-gray-900/40 border-gray-500/50'
                        }`}>
                          {client.status.toUpperCase()}
                        </span>
                        {clientAlerts > 0 && (
                          <span className="px-3 py-1 text-xs bg-red-900/40 text-red-400 rounded-lg border border-red-500/50 font-bold">
                            {clientAlerts} ACTIVE ALERTS
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400">{client.address}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{client.contactPerson}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{client.contactPhone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 sm:ml-4">
                      <MobileButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClient(client);
                          navigateToPage('devices', client);
                        }}
                        variant="primary"
                        size="sm"
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        View Systems
                      </MobileButton>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Fire Panels</p>
                      <p className="text-base font-bold text-white">{client.totalPanels}</p>
                    </div>
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Total Devices</p>
                      <p className="text-base font-bold text-white">{client.totalDevices}</p>
                    </div>
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Contract Type</p>
                      <p className="text-sm font-bold text-blue-400">{client.contractType}</p>
                    </div>
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Monthly Fee</p>
                      <p className="text-sm font-bold text-emerald-400">{client.monthlyFee}</p>
                    </div>
                    <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                      <p className="text-xs text-gray-400">Contract Expiry</p>
                      <p className="text-sm font-bold text-gray-300">{client.contractExpiry}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Device Grid - Now client-focused
  const DeviceGrid = () => {
    const clientPanels = selectedClient 
      ? firePanelsData.filter(panel => panel.clientId === selectedClient.id)
      : firePanelsData;
      
    const clientDevices = selectedClient
      ? devicesData.filter(device => device.clientId === selectedClient.id)
      : devicesData;

    return (
      <div className="space-y-6">
        {selectedClient && (
          <div className="bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-blue-900/40 backdrop-blur-md border border-blue-500/30 text-white p-4 sm:p-6 rounded-2xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold flex items-center space-x-3">
                  {React.createElement(getClientTypeIcon(selectedClient.type), { className: "w-6 h-6" })}
                  <span>{selectedClient.name}</span>
                </h3>
                <p className="text-blue-200 mt-1">{selectedClient.address}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <MobileButton
                  onClick={() => {
                    navigateToPage('maintenance', selectedClient);
                  }}
                  variant="secondary"
                  size="md"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Maintenance Schedule
                </MobileButton>
                <MobileButton
                  onClick={() => {
                    navigateToPage('alerts', selectedClient);
                  }}
                  variant="secondary"
                  size="md"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Client Alerts
                </MobileButton>
              </div>
            </div>
          </div>
        )}

        {/* Fire Panels */}
        <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800/60 via-gray-900/40 to-gray-800/60 p-4 sm:p-6 border-b border-gray-700/50">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {selectedClient ? `${selectedClient.name} - Fire Panels` : 'All Fire Panels'}
            </h3>
          </div>
          <div className="divide-y divide-gray-700/30">
            {clientPanels.map((panel) => {
              const client = clientsData.find(c => c.id === panel.clientId);
              
              return (
                <div 
                  key={panel.id} 
                  className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-all duration-700 ease-out cursor-pointer"
                  onClick={() => setSelectedPanel(panel)}
                >
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all duration-500 ${getStatusColor(panel.status)}`}>
                            {panel.status.toUpperCase()}
                          </span>
                          <LiveIndicator status={panel.connectionStatus} />
                          {!selectedClient && (
                            <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-lg border border-blue-500/30">
                              {client?.name}
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-white text-lg">{panel.panelName}</p>
                        <p className="text-gray-400">{panel.location}</p>
                        <p className="text-gray-500 text-sm mt-1">Model: {panel.model}</p>
                      </div>
                      <MobileButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPanel(panel);
                        }}
                        variant="secondary"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </MobileButton>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                        <p className="text-xs text-gray-400">Devices</p>
                        <p className="text-sm font-bold text-white">{panel.devices}</p>
                      </div>
                      <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Battery className={`w-3 h-3 transition-all duration-1000 ${
                            (liveValues.batteryLevels[panel.id] || panel.batteryLevel) < 50 ? 'text-red-400' : 
                            (liveValues.batteryLevels[panel.id] || panel.batteryLevel) < 80 ? 'text-amber-400' : 'text-emerald-400'
                          }`} />
                          <p className="text-xs text-gray-400">Battery</p>
                        </div>
                        <p className={`text-xs font-bold transition-all duration-1000 ${
                          (liveValues.batteryLevels[panel.id] || panel.batteryLevel) < 50 ? 'text-red-400' : 
                          (liveValues.batteryLevels[panel.id] || panel.batteryLevel) < 80 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          <SmoothValue value={liveValues.batteryLevels[panel.id] || panel.batteryLevel} precision={0} suffix="%" />
                        </p>
                      </div>
                      <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Thermometer className="w-3 h-3 text-blue-400" />
                          <p className="text-xs text-gray-400">Temp</p>
                        </div>
                        <p className="text-xs text-gray-300 font-medium">
                          <SmoothValue value={liveValues.temperatures[panel.id] || panel.temperature} precision={1} suffix="°C" />
                        </p>
                      </div>
                      {panel.activeAlerts > 0 && (
                        <div className="bg-red-900/30 px-3 py-2 rounded-lg border border-red-500/40 text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                            <p className="text-xs text-gray-400">Alerts</p>
                          </div>
                          <p className="text-xs text-red-400 font-bold">{panel.activeAlerts}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Devices for selected client/panel */}
        {clientDevices.length > 0 && (
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800/60 via-gray-900/40 to-gray-800/60 p-4 sm:p-6 border-b border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {selectedClient ? `${selectedClient.name} - Devices` : 'All Devices'}
              </h3>
            </div>
            <div className="divide-y divide-gray-700/30">
              {clientDevices.map((device) => (
                <div 
                  key={device.id} 
                  className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-all duration-700 ease-out cursor-pointer"
                  onClick={() => setSelectedDevice(device)}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-4 h-4 rounded-full relative transition-all duration-1000 mt-1 flex-shrink-0 ${
                        device.status === 'normal' ? 'bg-emerald-400' : 
                        device.status === 'warning' ? 'bg-amber-400' : 
                        'bg-red-400'
                      }`}
                      style={{
                        boxShadow: device.status === 'normal' ? '0 0 12px rgba(52, 211, 153, 0.4)' :
                                  device.status === 'warning' ? '0 0 12px rgba(251, 191, 36, 0.4)' :
                                  '0 0 12px rgba(248, 113, 113, 0.4)',
                        animation: device.status !== 'normal' ? 'pulse 3s ease-in-out infinite' : 'pulse 6s ease-in-out infinite'
                      }}>
                        {device.status === 'critical' && (
                          <div className="absolute w-4 h-4 rounded-full bg-current animate-ping opacity-40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm sm:text-lg">{device.type}</p>
                        <p className="text-gray-400 text-sm">{device.location}</p>
                        <p className="text-gray-500 text-xs font-mono mt-1">ID: {device.id} | Model: {device.model}</p>
                      </div>
                      <MobileButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDevice(device);
                        }}
                        variant="secondary"
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
                      </MobileButton>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Battery className={`w-3 h-3 ${
                            device.battery < 30 ? 'text-red-400' : 
                            device.battery < 70 ? 'text-amber-400' : 'text-emerald-400'
                          }`} />
                          <p className="text-xs text-gray-400">Battery</p>
                        </div>
                        <p className={`text-xs font-bold ${
                          device.battery < 30 ? 'text-red-400' : 
                          device.battery < 70 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {device.battery}%
                        </p>
                      </div>
                      <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Wifi className={`w-3 h-3 ${
                            device.signal < 50 ? 'text-red-400' : 
                            device.signal < 80 ? 'text-amber-400' : 'text-emerald-400'
                          }`} />
                          <p className="text-xs text-gray-400">Signal</p>
                        </div>
                        <p className="text-xs text-gray-300 font-medium">{device.signal}%</p>
                      </div>
                      <div className="bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/30 text-center">
                        <p className="text-xs text-gray-400 mb-1">Status</p>
                        <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded border ${getStatusColor(device.status)}`}>
                          {device.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Alerts page with client filtering
  const Alerts = () => {
    const clientAlerts = selectedClient 
      ? alerts.filter(alert => alert.clientId === selectedClient.id)
      : alerts;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { title: 'Critical Alerts', count: clientAlerts.filter(a => a.severity === 'critical' && !a.acknowledged).length, gradient: 'from-red-600 via-red-700 to-red-900', icon: XCircle },
            { title: 'Warnings', count: clientAlerts.filter(a => a.severity === 'warning' && !a.acknowledged).length, gradient: 'from-amber-600 via-amber-700 to-amber-900', icon: AlertTriangle },
            { title: 'Info Alerts', count: clientAlerts.filter(a => a.severity === 'info' && !a.acknowledged).length, gradient: 'from-blue-600 via-blue-700 to-blue-900', icon: CheckCircle2 }
          ].map((stat, index) => (
            <div key={stat.title} className="transform transition-all duration-500 hover:scale-105">
              <MetricCard title={stat.title} value={stat.count} icon={stat.icon} gradient={stat.gradient} />
            </div>
          ))}
        </div>

        <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-red-900/40 via-orange-900/20 to-red-900/40 p-4 sm:p-6 border-b border-gray-700/50">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {selectedClient ? `${selectedClient.name} - Alert Feed` : 'All Client Alerts'}
            </h3>
          </div>
          <div className="divide-y divide-gray-700/30">
            {clientAlerts.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <p className="text-lg text-gray-300">No active alerts</p>
                <p className="text-sm text-gray-500 mt-2">All systems operating normally</p>
              </div>
            ) : (
              clientAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-red-900/15 hover:to-transparent transition-all duration-700 ease-out group cursor-pointer"
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all duration-500 ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-lg font-semibold text-white">{alert.type}</span>
                        {!selectedClient && (
                          <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-lg border border-blue-500/30">
                            {alert.clientName}
                          </span>
                        )}
                        {alert.acknowledged && (
                          <span className="px-3 py-1 text-xs bg-emerald-900/50 text-emerald-400 rounded-lg font-medium border border-emerald-500/40">
                            ✓ Resolved
                          </span>
                        )}
                      </div>
                      <p className="text-gray-200 font-medium">{alert.device}</p>
                      <p className="text-gray-400 text-sm">{alert.location}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center space-x-2 text-gray-500 text-xs sm:text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{alert.timestamp.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-xs sm:text-sm">
                          <User className="w-3 h-3" />
                          <span>{alert.assignedTechnician}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 sm:ml-4">
                      <MobileButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAlert(alert);
                        }}
                        variant="secondary"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </MobileButton>
                      {!alert.acknowledged && (
                        <MobileButton
                          onClick={(e) => {
                            e.stopPropagation();
                            acknowledgeAlert(alert.id);
                          }}
                          variant="primary"
                          size="sm"
                        >
                          Acknowledge
                        </MobileButton>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Maintenance with client filtering
  const Maintenance = () => {
    const clientMaintenance = selectedClient 
      ? tasks.filter(task => task.clientId === selectedClient.id)
      : tasks;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { title: 'Due This Week', count: clientMaintenance.filter(t => t.status === 'upcoming').length, gradient: 'from-amber-600 via-amber-700 to-amber-900', icon: Calendar },
            { title: 'Overdue', count: clientMaintenance.filter(t => t.status === 'overdue').length, gradient: 'from-red-600 via-red-700 to-red-900', icon: Clock },
            { title: 'Completed', count: clientMaintenance.filter(t => t.status === 'completed').length, gradient: 'from-emerald-600 via-emerald-700 to-emerald-900', icon: CheckCircle2 }
          ].map((stat, index) => (
            <div key={stat.title} className="transform transition-all duration-500 hover:scale-105">
              <MetricCard title={stat.title} value={stat.count} icon={stat.icon} gradient={stat.gradient} />
            </div>
          ))}
        </div>

        <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800/60 via-gray-900/40 to-gray-800/60 p-4 sm:p-6 border-b border-gray-700/50">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {selectedClient ? `${selectedClient.name} - Maintenance Schedule` : 'All Client Maintenance'}
            </h3>
          </div>
          <div className="divide-y divide-gray-700/30">
            {clientMaintenance.map((task) => (
              <div 
                key={task.id} 
                className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                          task.status === 'completed' ? 'text-emerald-400 bg-emerald-900/40 border-emerald-500/50' :
                          task.status === 'upcoming' ? 'text-amber-400 bg-amber-900/40 border-amber-500/50' :
                          'text-red-400 bg-red-900/40 border-red-500/50'
                        }`}>
                          {task.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                          task.priority === 'critical' ? 'text-red-400 bg-red-900/40 border-red-500/50' :
                          task.priority === 'high' ? 'text-orange-400 bg-orange-900/40 border-orange-500/50' :
                          'text-blue-400 bg-blue-900/40 border-blue-500/50'
                        }`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-bold text-white text-lg">{task.title}</p>
                      <p className="text-gray-400">{task.clientName}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{task.technician}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{task.estimatedDuration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 sm:ml-4">
                      <MobileButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTask(task);
                        }}
                        variant="secondary"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </MobileButton>
                      <MobileButton
                        variant={task.status === 'completed' ? 'secondary' : 'success'}
                        size="sm"
                        disabled={task.status === 'completed'}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (task.status !== 'completed') {
                            completeTask(task.id);
                          }
                        }}
                      >
                        {task.status === 'completed' ? 'Completed' : 'Complete'}
                      </MobileButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Analytics = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
          <h3 className="text-lg sm:text-xl font-bold text-white">System Performance Analytics</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={[
            { time: '00:00', alerts: 2, uptime: 98.2, temperature: 22.1 },
            { time: '04:00', alerts: 1, uptime: 98.5, temperature: 21.8 },
            { time: '08:00', alerts: 3, uptime: 97.8, temperature: 23.2 },
            { time: '12:00', alerts: 0, uptime: 99.1, temperature: 24.1 },
            { time: '16:00', alerts: 2, uptime: 98.7, temperature: 23.8 },
            { time: '20:00', alerts: 1, uptime: 98.9, temperature: 22.5 }
          ]}>
            <defs>
              <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151', 
                borderRadius: '12px',
                color: '#f3f4f6'
              }} 
            />
            <Area type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorUptime)" />
            <Area type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAlerts)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const Compliance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { title: 'Certificates Valid', count: compliance.filter(c => c.status === 'valid').length, gradient: 'from-emerald-600 via-emerald-700 to-emerald-900', icon: Award },
          { title: 'Expiring Soon', count: compliance.filter(c => c.status === 'expiring').length, gradient: 'from-amber-600 via-amber-700 to-amber-900', icon: AlertCircle },
          { title: 'Overdue', count: compliance.filter(c => c.status === 'overdue').length, gradient: 'from-red-600 via-red-700 to-red-900', icon: XCircle }
        ].map((stat, index) => (
          <div key={stat.title} className="transform transition-all duration-500 hover:scale-105">
            <MetricCard title={stat.title} value={stat.count} icon={stat.icon} gradient={stat.gradient} />
          </div>
        ))}
      </div>

      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800/60 via-gray-900/40 to-gray-800/60 p-4 sm:p-6 border-b border-gray-700/50">
          <h3 className="text-lg sm:text-xl font-bold text-white">Compliance Certificates</h3>
        </div>
        <div className="divide-y divide-gray-700/30">
          {compliance.map((cert) => (
            <div 
              key={cert.id} 
              className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-transparent transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedCompliance(cert)}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getComplianceStatusColor(cert.status)}`}>
                        {cert.status.toUpperCase()}
                      </span>
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-lg font-semibold text-white">{cert.type}</span>
                    </div>
                    <p className="text-gray-200 font-medium">{cert.clientName}</p>
                    <p className="text-gray-400 text-sm">Certificate #: {cert.certNumber}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Expires: {cert.expiryDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{cert.issuingAuthority}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 sm:ml-4">
                    <MobileButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCompliance(cert);
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </MobileButton>
                    {cert.status !== 'valid' && (
                      <MobileButton
                        onClick={(e) => {
                          e.stopPropagation();
                          renewCompliance(cert.id);
                        }}
                        variant={cert.status === 'overdue' ? 'danger' : 'primary'}
                        size="sm"
                      >
                        Renew
                      </MobileButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'clients': return <ClientsPage />;
      case 'devices': return <DeviceGrid />;
      case 'maintenance': return <Maintenance />;
      case 'alerts': return <Alerts />;
      case 'analytics': return <Analytics />;
      case 'compliance': return <Compliance />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <style jsx>{`
        @keyframes fireGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(234, 88, 12, 0.2); }
          50% { box-shadow: 0 0 25px rgba(234, 88, 12, 0.4); }
        }
        
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        .smooth-glow {
          animation: fireGlow 4s ease-in-out infinite;
        }
        
        .subtle-pulse {
          animation: subtlePulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900/98 backdrop-blur-xl shadow-2xl border-b border-orange-500/20 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {currentPage !== 'dashboard' && (
              <button
                onClick={goBack}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <Flame className="w-6 h-6 text-orange-400 subtle-pulse flex-shrink-0" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent truncate">
                  FireWeb
                </h1>
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <LiveIndicator status="online" showText={false} />
                <span className="text-xs text-gray-400 transition-all duration-500">
                  {alerts.filter(a => !a.acknowledged).length} active alerts
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 rounded-xl bg-gradient-to-r from-orange-600/80 to-red-600/80 backdrop-blur-sm text-white shadow-lg hover:from-orange-500 hover:to-red-500 transition-all duration-500 border border-orange-500/30 ml-4 flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-500" 
            onClick={() => setSidebarOpen(false)} 
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-gray-900/98 backdrop-blur-xl shadow-2xl border-r border-orange-500/20 transform transition-all duration-500">
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <Flame className="w-5 h-5 text-orange-400 subtle-pulse" />
                <h2 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">FireWeb</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-800/50 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-6 space-y-3">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      navigateToPage(item.key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl text-left transition-all duration-500 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-600/90 to-red-600/90 text-white shadow-lg shadow-orange-500/20'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.name}</span>
                    {item.key === 'alerts' && alerts.filter(a => !a.acknowledged).length > 0 && (
                      <div className="ml-auto">
                        <span className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-full subtle-pulse shadow-lg">
                          {alerts.filter(a => !a.acknowledged).length}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-gray-900/98 backdrop-blur-xl shadow-2xl border-r border-orange-500/20 min-h-screen">
          <div className="p-8 border-b border-gray-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <Flame className="w-8 h-8 text-orange-400 subtle-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                FireWeb Control System
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <LiveIndicator status="online" />
              <span className="text-sm text-gray-400">Port Elizabeth Network</span>
            </div>
          </div>
          <nav className="p-6 space-y-3">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => navigateToPage(item.key)}
                  className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl text-left transition-all duration-500 transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600/90 to-red-600/90 text-white shadow-xl shadow-orange-500/20'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.name}</span>
                  {item.key === 'alerts' && alerts.filter(a => !a.acknowledged).length > 0 && (
                    <div className="ml-auto">
                      <span className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-full subtle-pulse shadow-lg">
                        {alerts.filter(a => !a.acknowledged).length}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-4 sm:p-6 lg:p-10">
            {/* Desktop Breadcrumb & Back Button */}
            <div className="hidden lg:block mb-6">
              {currentPage !== 'dashboard' && (
                <button
                  onClick={goBack}
                  className="mb-4 px-4 py-2 bg-gray-800/70 text-gray-300 hover:bg-gray-700/70 hover:text-white rounded-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
              <Breadcrumb currentPage={currentPage} onNavigate={navigateToPage} navigationHistory={navigationHistory} selectedClient={selectedClient} />
            </div>
            
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {navigation.find(item => item.key === currentPage)?.name}
                {selectedClient && <span className="text-lg sm:text-2xl"> - {selectedClient.name}</span>}
              </h2>
              {currentPage === 'dashboard' && (
                <p className="text-gray-400 mt-2 text-sm sm:text-lg">Real-time fire safety monitoring across Port Elizabeth</p>
              )}
            </div>
            <div className="opacity-100 transition-opacity duration-1000 ease-out">
              {renderPage()}
            </div>
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      <DetailModal 
        isOpen={!!selectedAlert} 
        onClose={() => setSelectedAlert(null)}
        title={`Alert Details - ${selectedAlert?.type}`}
      >
        {selectedAlert && (
          <div className="space-y-6">
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 font-medium flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>{selectedAlert.clientName}</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Alert ID</p>
                  <p className="text-white font-mono">{selectedAlert.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Device</p>
                  <p className="text-white font-medium">{selectedAlert.device}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <p className="text-white">{selectedAlert.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Severity</p>
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Assigned Technician</p>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-green-400" />
                    <p className="text-white">{selectedAlert.assignedTechnician}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Priority</p>
                  <p className="text-white">Priority {selectedAlert.priority}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Timestamp</p>
                  <p className="text-white">{selectedAlert.timestamp.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-2">Description</p>
              <p className="text-gray-200">{selectedAlert.description}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-700/50">
              {!selectedAlert.acknowledged && (
                <MobileButton
                  onClick={() => {
                    acknowledgeAlert(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Acknowledge Alert
                </MobileButton>
              )}
              <MobileButton
                onClick={() => setSelectedAlert(null)}
                variant="secondary"
                size="md"
                fullWidth
              >
                Close
              </MobileButton>
            </div>
          </div>
        )}
      </DetailModal>

      {/* Task Detail Modal */}
      <DetailModal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)}
        title={`Maintenance Task - ${selectedTask?.title}`}
      >
        {selectedTask && (
          <div className="space-y-6">
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 font-medium flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>{selectedTask.clientName}</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Task ID</p>
                  <p className="text-white font-mono">{selectedTask.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                    selectedTask.status === 'completed' ? 'text-emerald-400 bg-emerald-900/40 border-emerald-500/50' :
                    selectedTask.status === 'upcoming' ? 'text-amber-400 bg-amber-900/40 border-amber-500/50' :
                    'text-red-400 bg-red-900/40 border-red-500/50'
                  }`}>
                    {selectedTask.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Priority</p>
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                    selectedTask.priority === 'critical' ? 'text-red-400 bg-red-900/40 border-red-500/50' :
                    selectedTask.priority === 'high' ? 'text-orange-400 bg-orange-900/40 border-orange-500/50' :
                    'text-blue-400 bg-blue-900/40 border-blue-500/50'
                  }`}>
                    {selectedTask.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Due Date</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <p className="text-white">{selectedTask.dueDate}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Assigned Technician</p>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-green-400" />
                    <p className="text-white">{selectedTask.technician}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Estimated Duration</p>
                  <p className="text-white">{selectedTask.estimatedDuration}</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-2">Description</p>
              <p className="text-gray-200">{selectedTask.description}</p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-3">Task Checklist</p>
              <div className="space-y-2">
                {selectedTask.checklist?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-800/30 p-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-700/50">
              {selectedTask.status !== 'completed' && (
                <MobileButton
                  onClick={() => {
                    completeTask(selectedTask.id);
                    setSelectedTask(null);
                  }}
                  variant="success"
                  size="md"
                  fullWidth
                >
                  Mark as Complete
                </MobileButton>
              )}
              <MobileButton
                onClick={() => setSelectedTask(null)}
                variant="secondary"
                size="md"
                fullWidth
              >
                Close
              </MobileButton>
            </div>
          </div>
        )}
      </DetailModal>

      {/* Compliance Detail Modal */}
      <DetailModal 
        isOpen={!!selectedCompliance} 
        onClose={() => setSelectedCompliance(null)}
        title={`Certificate Details - ${selectedCompliance?.type}`}
      >
        {selectedCompliance && (
          <div className="space-y-6">
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 font-medium flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>{selectedCompliance.clientName}</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Certificate Number</p>
                  <p className="text-white font-mono">{selectedCompliance.certNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Type</p>
                  <p className="text-white">{selectedCompliance.type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getComplianceStatusColor(selectedCompliance.status)}`}>
                    {selectedCompliance.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Issue Date</p>
                  <p className="text-white">{selectedCompliance.issueDate}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Expiry Date</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <p className="text-white">{selectedCompliance.expiryDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Issuing Authority</p>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <p className="text-white">{selectedCompliance.issuingAuthority}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-700/50">
              {selectedCompliance.status !== 'valid' && (
                <MobileButton
                  onClick={() => {
                    renewCompliance(selectedCompliance.id);
                    setSelectedCompliance(null);
                  }}
                  variant={selectedCompliance.status === 'overdue' ? 'danger' : 'primary'}
                  size="md"
                  fullWidth
                >
                  Renew Certificate
                </MobileButton>
              )}
              <MobileButton
                onClick={() => {
                  // In a real app, this would download the certificate
                  alert('Certificate download functionality would be implemented here');
                }}
                variant="secondary"
                size="md"
                fullWidth
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </MobileButton>
              <MobileButton
                onClick={() => setSelectedCompliance(null)}
                variant="secondary"
                size="md"
                fullWidth
              >
                Close
              </MobileButton>
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}

export default FirePanelApp;