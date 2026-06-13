interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-[#94A3B8] text-sm mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
