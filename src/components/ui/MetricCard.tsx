import { TrendingUp, TrendingDown, Minus } from "../../design-system/icons";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  downIsGood?: boolean;
  icon: React.ElementType;
  color?: string;
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  downIsGood = false,
  icon: Icon,
  color = "#0066FF",
  description,
}: MetricCardProps) {
  const isPositive = downIsGood ? changeType === "down" : changeType === "up";
  const isNegative = downIsGood ? changeType === "up" : changeType === "down";

  const changeColor = isPositive
    ? "text-[#10B981]"
    : isNegative
      ? "text-[#EF4444]"
      : "text-[#94A3B8]";

  const changeBg = isPositive
    ? "bg-[#10B981]/10"
    : isNegative
      ? "bg-[#EF4444]/10"
      : "bg-white/5";

  const TrendIcon =
    changeType === "up" ? TrendingUp : changeType === "down" ? TrendingDown : Minus;

  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4 hover:border-white/[0.15] transition-all duration-200">
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}22` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${changeColor} ${changeBg}`}>
          <TrendIcon className="w-3 h-3" />
          {change}
        </div>
      </div>
      <div>
        <p className="text-[#94A3B8] text-sm font-medium">{title}</p>
        <p className="text-white text-2xl font-bold mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>
          {value}
        </p>
        {description && (
          <p className="text-[#94A3B8] text-xs mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
