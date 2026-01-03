import React, { useState, useEffect } from 'react';
import {
  Search,
  BarChart2,
  Users,
  FileText,
  Database,
  Bell,
  Settings,
  ChevronRight,
  Download,
  MessageSquare,
  LayoutDashboard,
  PieChart,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// --- Mock Data & Scenarios ---

const SCENARIOS = {
  LOW_HOURS: {
    id: 'low_hours',
    query: "今週、労働時間が40時間未満の人は？",
    insight: (
      <span>
        Techチームで<span className="font-bold text-red-600">5名の従業員</span>が今週の基準労働時間（40時間）を満たしていません。
        主な原因は金曜午後の打刻忘れです。
      </span>
    ),
    tags: [
      { text: "Department: Tech", type: "primary" },
      { text: "Threshold: < 40h", type: "warning" }
    ],
    type: 'list'
  },
  COMPARISON: {
    id: 'comparison',
    query: "正社員と臨時社員のパフォーマンス比較",
    insight: (
      <span>
        データによると、<span className="font-semibold text-emerald-700">臨時社員</span>は正社員（8.2時間/日）と比較して、残業が多い傾向（平均9.5時間/日）にあります。
      </span>
    ),
    tags: [
      { text: "Data Source: All", type: "primary" },
      { text: "Status: Approved Only", type: "success" }
    ],
    type: 'chart'
  },
  REPORT: {
    id: 'report',
    query: "マーケティングチームの勤怠レポート出力",
    insight: (
      <span>
        <span className="font-bold text-blue-700">マーケティングチーム</span>の12月の勤怠データを集計しました。
        経理部送付用のExcelファイルを出力可能です。
      </span>
    ),
    tags: [
      { text: "Team: Marketing", type: "primary" },
      { text: "Format: .xlsx", type: "neutral" }
    ],
    type: 'report'
  }
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    neutral: "bg-slate-100 text-slate-600",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    primary: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    danger: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type] || styles.neutral}`}>
      {children}
    </span>
  );
};

export default function HRaiApp() {
  const [activeTab, setActiveTab] = useState('ai_assistant');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(SCENARIOS.COMPARISON);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setShowResult(false);
    setLoadingStep(0);

    // Determine scenario based on query content
    let detectedScenario = SCENARIOS.COMPARISON; // Default
    if (query.includes("40時間")) detectedScenario = SCENARIOS.LOW_HOURS;
    if (query.includes("マーケティング")) detectedScenario = SCENARIOS.REPORT;

    setCurrentScenario(detectedScenario);

    // Simulation steps
    setTimeout(() => setLoadingStep(1), 800);
    setTimeout(() => setLoadingStep(2), 1600);
    setTimeout(() => setLoadingStep(3), 2400);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 3200);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <span className="text-white font-bold text-xl tracking-tight">HR<span className="font-light text-pink-400">.ai</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">メニュー</div>
          <NavItem icon={<Sparkles size={20} />} label="AI 分析 (AI Analysis)" active={activeTab === 'ai_assistant'} onClick={() => { setActiveTab('ai_assistant'); }} />
          <NavItem icon={<LayoutDashboard size={20} />} label="ダッシュボード" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setShowResult(false); }} />
          <NavItem icon={<Database size={20} />} label="データソース" />
          <NavItem icon={<Settings size={20} />} label="Agent設定" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-xs font-bold">QA</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Quoc Anh</p>
              <p className="text-xs text-slate-500 truncate">HR Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            {activeTab === 'ai_assistant' ? (
              <>
                <Sparkles className="text-pink-600" size={20} />
                <span>AI データアシスタント</span>
              </>
            ) : "管理ダッシュボード"}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-6xl mx-auto p-8 space-y-8">

            {/* --- VIEW: AI ASSISTANT --- */}
            {activeTab === 'ai_assistant' && (
              <div className="space-y-6 animate-fade-in-up">
                {/* AI Command Center (Pink/Purple Theme) */}
                <div className="bg-gradient-to-br from-pink-700 via-purple-800 to-indigo-900 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden transition-all duration-500">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                  <div className="relative z-10">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                      <Sparkles className="text-pink-300" />
                      分析アシスタント (AI Analysis)
                    </h2>

                    <div className="relative max-w-3xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className={`w-5 h-5 ${isSearching ? 'text-pink-300 animate-pulse' : 'text-slate-300'}`} />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-12 pr-24 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-pink-200/70 focus:outline-none focus:bg-white/20 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 shadow-inner transition-all text-lg backdrop-blur-md"
                        placeholder="人事データ、勤怠、給与についてHR.aiに質問..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                      />
                      <div className="absolute inset-y-0 right-2 flex items-center">
                        <button
                          onClick={() => handleSearch(searchQuery)}
                          className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors shadow-lg"
                        >
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Loading Indicator */}
                    {isSearching && (
                      <div className="mt-6 max-w-3xl p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="space-y-3">
                          <LoadingStep step={1} current={loadingStep} text="質問の意味を分析中..." color="text-pink-200" />
                          <LoadingStep step={2} current={loadingStep} text="SQLクエリを生成中 (Query Generation)..." color="text-pink-200" />
                          <LoadingStep step={3} current={loadingStep} text="Database & APIからデータを集計中..." color="text-pink-200" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggestions - Distinct Section (Always Visible) */}
                <div className="animate-fade-in-up">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3 ml-1">試してみる (Try these examples):</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => handleSearch(SCENARIOS.LOW_HOURS.query)} className="suggestion-card group hover:border-pink-300 hover:bg-pink-50">
                      <AlertCircle size={18} className="text-pink-500" />
                      <span className="font-semibold text-sm text-slate-700 group-hover:text-pink-700 transition-colors">労働時間不足アラート</span>
                    </button>

                    <button onClick={() => handleSearch(SCENARIOS.COMPARISON.query)} className="suggestion-card group hover:border-emerald-300 hover:bg-emerald-50">
                      <TrendingUp size={18} className="text-emerald-500" />
                      <span className="font-semibold text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">パフォーマンス比較</span>
                    </button>

                    <button onClick={() => handleSearch(SCENARIOS.REPORT.query)} className="suggestion-card group hover:border-blue-300 hover:bg-blue-50">
                      <FileText size={18} className="text-blue-500" />
                      <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-700 transition-colors">レポート出力</span>
                    </button>
                  </div>
                </div>

                {/* AI Results Area */}
                {showResult && (
                  <div className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-700">分析結果</h3>
                    </div>
                    <AIResultView scenario={currentScenario} />
                  </div>
                )}
              </div>
            )}

            {/* --- VIEW: DASHBOARD --- */}
            {activeTab === 'dashboard' && (
              <DashboardOverview />
            )}

          </div>
        </div>
      </main>

      <style>{`
        .suggestion-card {
           @apply p-3 bg-white border border-slate-200 rounded-xl transition-all flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 min-w-[200px] cursor-pointer;
        }
      `}</style>
    </div>
  );
}


// --- Sub Components ---

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm font-medium ${active
      ? 'bg-blue-600 text-white shadow-md'
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const LoadingStep = ({ step, current, text, color = "text-slate-600" }) => {
  let status = 'waiting'; // waiting, active, done
  if (current === step) status = 'active';
  if (current > step) status = 'done';

  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border transition-all ${status === 'done' ? 'bg-green-500 border-green-500 text-white' :
        status === 'active' ? 'border-blue-400 text-blue-400 animate-spin-slow' : 'border-slate-600 text-slate-600'
        }`}>
        {status === 'done' ? <CheckCircle size={12} /> : step}
      </div>
      <span className={`text-sm ${status === 'active' ? 'text-blue-400 font-medium' : status === 'done' ? 'text-slate-500 line-through' : color}`}>
        {text}
      </span>
    </div>
  );
};

const StatCard = ({ title, value, trend, trendUp, icon, color }) => (
  <Card className="p-5 flex items-start gap-4">
    <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
      {trend && (
        <p className={`text-xs mt-1 flex items-center gap-1 ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
          {trendUp ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
          {trend}
        </p>
      )}
    </div>
  </Card>
);

const PipelineItem = ({ source, status, time, count }) => {
  const statusColors = {
    active: "text-emerald-600 bg-emerald-50",
    warning: "text-amber-600 bg-amber-50",
    error: "text-red-600 bg-red-50",
  };
  const statusIcons = {
    active: <CheckCircle size={16} />,
    warning: <AlertTriangle size={16} />,
    error: <AlertCircle size={16} />,
  };

  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${statusColors[status]}`}>
          {statusIcons[status]}
        </div>
        <div>
          <p className="font-medium text-slate-700">{source}</p>
          <p className="text-xs text-slate-500">{count} - {time}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-slate-400" />
    </div>
  );
};

const DashboardOverview = () => (
  <div className="animate-fade-in-up">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="総従業員数"
        value="248"
        trend="+12% (今月)"
        trendUp={true}
        icon={<Users className="text-blue-600" />}
        color="blue"
      />
      <StatCard
        title="総労働時間"
        value="14,205 h"
        trend="-5% (前月比)"
        trendUp={false}
        icon={<Clock className="text-purple-600" />}
        color="purple"
      />
      <StatCard
        title="承認待ち (Pending)"
        value="18"
        sub="要対応"
        icon={<AlertTriangle className="text-amber-600" />}
        color="amber"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Database size={18} className="text-slate-400" />
          Data Pipeline
        </h3>
        <div className="space-y-4">
          <PipelineItem source="手入力 (Manual)" status="active" time="たった今" count="45 records" />
          <PipelineItem source="CSVインポート (Batch)" status="active" time="2時間前" count="120 records" />
          <PipelineItem source="API (日本支社)" status="warning" time="昨日" count="0 records" />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-800 mb-4">人員配置</h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-slate-600">
              <span>正社員 (Full-time)</span>
              <span>65%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[65%] rounded-full"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-slate-600">
              <span>臨時社員 (Seasonal)</span>
              <span>25%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[25%] rounded-full"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-slate-600">
              <span>外国籍 (Expat)</span>
              <span>10%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-[10%] rounded-full"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const AIResultView = ({ scenario }) => (
  <div className="animate-fade-in-up space-y-6">
    {/* AI Insight Header */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4">
      <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
        <Sparkles className="text-blue-600 w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-slate-800 text-lg mb-1">分析結果</h3>
        <p className="text-slate-600 leading-relaxed">
          {scenario.insight}
        </p>
        <div className="mt-3 flex gap-2">
          {scenario.tags.map((tag, idx) => (
            <Badge key={idx} type={tag.type}>{tag.text}</Badge>
          ))}
        </div>
      </div>
    </div>

    {/* Visualization Area */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT CONTENT: Dynamic based on scenario type */}
      <Card className="lg:col-span-2 p-6 flex flex-col min-h-[300px]">

        {/* SCENARIO 1: LIST VIEW */}
        {scenario.type === 'list' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" />
                アラートリスト
              </h4>
              <button className="text-slate-400 hover:text-blue-600"><Download size={18} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">氏名</th>
                    <th className="px-4 py-2">総時間</th>
                    <th className="px-4 py-2">ステータス</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-red-50/50">
                    <td className="px-4 py-3 font-mono text-slate-500">NV023</td>
                    <td className="px-4 py-3 font-medium text-slate-700">Nguyen Van A (Dev)</td>
                    <td className="px-4 py-3 text-red-600 font-bold">32h</td>
                    <td className="px-4 py-3"><Badge type="danger">Missed Log</Badge></td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td className="px-4 py-3 font-mono text-slate-500">NV089</td>
                    <td className="px-4 py-3 font-medium text-slate-700">Tran Thi B (Dev)</td>
                    <td className="px-4 py-3 text-red-600 font-bold">35h</td>
                    <td className="px-4 py-3"><Badge type="danger">Missed Log</Badge></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-slate-500">NV104</td>
                    <td className="px-4 py-3 font-medium text-slate-700">Le Hoang C (Design)</td>
                    <td className="px-4 py-3 text-amber-600 font-bold">38h</td>
                    <td className="px-4 py-3"><Badge type="warning">Review</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* SCENARIO 2: CHART VIEW */}
        {scenario.type === 'chart' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-slate-700">総労働時間比較チャート</h4>
              <button className="text-slate-400 hover:text-blue-600"><Download size={18} /></button>
            </div>
            <div className="flex-1 flex items-end gap-8 px-4 pb-4 border-b border-slate-200">
              <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="text-xs font-bold text-slate-700 group-hover:text-blue-600 animate-fade-in-up">4,500h</div>
                <div className="w-full bg-blue-100 rounded-t-lg relative h-32 hover:bg-blue-200 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 h-[80%] rounded-t-lg"></div>
                </div>
                <div className="text-sm text-slate-500 font-medium">正社員</div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="text-xs font-bold text-slate-700 group-hover:text-emerald-600 animate-fade-in-up">3,200h</div>
                <div className="w-full bg-emerald-100 rounded-t-lg relative h-48 hover:bg-emerald-200 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 h-[100%] rounded-t-lg"></div>
                </div>
                <div className="text-sm text-slate-500 font-medium">臨時社員</div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="text-xs font-bold text-slate-700 group-hover:text-purple-600 animate-fade-in-up">1,200h</div>
                <div className="w-full bg-purple-100 rounded-t-lg relative h-20 hover:bg-purple-200 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-purple-500 h-[30%] rounded-t-lg"></div>
                </div>
                <div className="text-sm text-slate-500 font-medium">Expat</div>
              </div>
            </div>
          </>
        )}

        {/* SCENARIO 3: REPORT VIEW */}
        {scenario.type === 'report' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                総合レポート (Preview)
              </h4>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm">
                  <Download size={14} /> Download .XLSX
                </button>
              </div>
            </div>

            {/* Report Preview */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex gap-4 text-xs text-slate-500">
                <span>File: report_mkt_nov2024.xlsx</span>
                <span>Size: 24KB</span>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div className="text-center">
                    <div className="text-xs text-slate-400">人員数</div>
                    <div className="font-bold text-slate-700">12</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">総労働時間</div>
                    <div className="font-bold text-slate-700">2,100h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">残業(OT)</div>
                    <div className="font-bold text-slate-700">45h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">推定コスト</div>
                    <div className="font-bold text-slate-700">$12,000</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="text-xs text-slate-400 italic">...3/12行のプレビューを表示中...</div>
                </div>
              </div>
            </div>
          </>
        )}

      </Card>

      {/* RIGHT CONTENT: SQL & Action */}
      <div className="space-y-6">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <h4 className="font-semibold text-slate-800 mb-2">推奨アクション</h4>
          <div className="text-sm text-slate-600 space-y-3">
            {scenario.type === 'list' && (
              <>
                <p className="flex gap-2">
                  <ArrowRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  労働時間が不足している3名の従業員に自動リマインダーを送信します。
                </p>
                <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                  リマインダーを送信
                </button>
              </>
            )}
            {scenario.type === 'chart' && (
              <p className="flex gap-2">
                <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                来期の臨時社員採用計画の調整を検討してください。
              </p>
            )}
            {scenario.type === 'report' && (
              <p className="flex gap-2">
                <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                ファイル送信前に "Manual" データの2件を再確認してください。
              </p>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="font-semibold text-slate-800 mb-3">SQL Query</h4>
          <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
            <code className="text-xs font-mono text-green-400">
              {scenario.type === 'list' && `SELECT * FROM work_logs\nWHERE hours < 40\nAND week = CURRENT_WEEK`}
              {scenario.type === 'chart' && `SELECT type, SUM(hours)\nFROM work_logs\nGROUP BY type`}
              {scenario.type === 'report' && `SELECT * FROM work_logs\nJOIN employees ON...\nWHERE dept = 'MKT'`}
            </code>
          </div>
        </Card>
      </div>
    </div>
  </div>
);


