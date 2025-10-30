import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Check,
  Cpu,
  Download,
  Hexagon,
  Info,
  LineChart,
  MessageSquare,
  Mic,
  Moon,
  RefreshCw,
  Search,
  Shield,
  Sun,
  Wifi,
} from "lucide-react"

export { Button, Badge, Card, CardContent, CardFooter, CardHeader, CardTitle, Progress, Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Avatar, AvatarFallback, AvatarImage, Slider, Switch, Label }
export { Activity, AlertCircle, BarChart3, Check, Cpu, Download, Hexagon, Info, LineChart, MessageSquare, Mic, Moon, RefreshCw, Search, Shield, Sun, Wifi }

// Bezpieczny NavItem z domyślnymi wartościami
export function NavItem({ icon: Icon, label = "Nav Item", active = false }) {
  if (!Icon) return null;
  
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Bezpieczny StatusItem z domyślnymi wartościami
export function StatusItem({ label = "Status", value = 0, color = "cyan" }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-red-500 to-red-700"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-red-600 to-red-800"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-red-500 to-red-700"
    }
  }

  const safeValue = Math.max(0, Math.min(100, value || 0))

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{safeValue}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${safeValue}%` }}></div>
      </div>
    </div>
  )
}

// Bezpieczny MetricCard z domyślnymi wartościami
export function MetricCard({
  title = "Metric",
  value = 0,
  icon: Icon,
  trend = "stable",
  color = "cyan",
  detail = "No details",
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-red-500 to-red-700 border-red-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-red-600 to-red-800 border-red-600/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-red-500 to-red-700 border-red-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-amber-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  if (!Icon) return null;

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value}%
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
        <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-red-500 to-red-700"></div>
    </div>
  )
}

// Bezpieczny PerformanceChart
export function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">100%</div>
        <div className="text-xs text-slate-500">75%</div>
        <div className="text-xs text-slate-500">50%</div>
        <div className="text-xs text-slate-500">25%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
                    <div className="border-b border-slate-700/30 w-full"></div>
                    <div className="border-b border-slate-700/30 w-full"></div>
                    <div className="border-b border-slate-700/30 w-full"></div>
                    <div className="border-b border-slate-700/30 w-full"></div>
                    <div className="border-b border-slate-700/30 w-full"></div>
                  </div>
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          // Zahardcodowane wartości zamiast losowych - tworzą wzór fali
          const cpuHeight = 50 + (i % 3) * 10
          const memHeight = 60 + (i % 4) * 5
          const netHeight = 45 + (i % 5) * 8
          return (
            <div key={i} className="flex space-x-0.5">
                <div className="w-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t-sm" style={{ height: `${cpuHeight}%` }}></div>
                <div className="w-1 bg-gradient-to-t from-red-600 to-red-500 rounded-t-sm" style={{ height: `${memHeight}%` }}></div>
                <div className="w-1 bg-gradient-to-t from-red-700 to-red-600 rounded-t-sm" style={{ height: `${netHeight}%` }}></div>
            </div>
          )
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">00:00</div>
        <div className="text-xs text-slate-500">06:00</div>
        <div className="text-xs text-slate-500">12:00</div>
        <div className="text-xs text-slate-500">18:00</div>
        <div className="text-xs text-slate-500">24:00</div>
      </div>
    </div>
  )
}

// Bezpieczny ProcessRow
export function ProcessRow({ pid = "0", name = "Process", user = "user", cpu = 0, memory = 0, status = "running" }) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-1 text-slate-500">{pid}</div>
      <div className="col-span-4 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-400">{user}</div>
      <div className="col-span-2 text-cyan-400">{cpu}%</div>
      <div className="col-span-2 text-purple-400">{memory} MB</div>
      <div className="col-span-1">
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
          {status}
        </Badge>
      </div>
    </div>
  )
}

// Bezpieczny StorageItem
export function StorageItem({ name = "Storage", total = 100, used = 0, type = "SSD" }) {
  const percentage = Math.round((used / total) * 100)
  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{name}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-slate-500">{used} GB / {total} GB</div>
          <div className="text-xs text-slate-400">{percentage}%</div>
        </div>
        <Progress value={percentage} className="h-1.5 bg-slate-700">
          <div className={`h-full rounded-full ${percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-cyan-500"}`} style={{ width: `${percentage}%` }} />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-slate-500">Free: {total - used} GB</div>
        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100">Details</Button>
      </div>
    </div>
  )
}

// Bezpieczny AlertItem
export function AlertItem({ title = "Alert", time = "00:00", description = "No description", type = "info" }) {
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "warning":
        return { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "error":
        return { icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30" }
      case "success":
        return { icon: Check, color: "text-green-500 bg-green-500/10 border-green-500/30" }
      case "update":
        return { icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" }
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }
  const { icon: Icon, color } = getTypeStyles()
  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{title}</div>
          <div className="ml-2 text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}

// Bezpieczny CommunicationItem
export function CommunicationItem({ sender = "User", time = "00:00", message = "No message", avatar = "", unread = false }) {
  return (
    <div className={`flex space-x-3 p-2 rounded-md ${unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={sender} />
        <AvatarFallback className="bg-slate-700 text-cyan-500">{sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{sender}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{message}</div>
      </div>
      {unread && <div className="flex-shrink-0 self-center"><div className="h-2 w-2 rounded-full bg-cyan-500"></div></div>}
    </div>
  )
}

// Bezpieczny ActionButton
export function ActionButton({ icon: Icon, label = "Action" }) {
  if (!Icon) return null;
  
  return (
    <Button variant="outline" className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full">
        <Icon className="h-5 w-5 text-red-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

