import { ArrowLeft, Home } from "lucide-react";

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
  onNavigate?: (href: string) => void;
}

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  backHref,
  backLabel = "Volver",
  action,
  onNavigate,
}: PageHeaderProps) => {
  const handleNavigate = (href: string) => {
    if (onNavigate) return onNavigate(href);
    window.location.href = href;
  };

  const showBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
  const showBack = !showBreadcrumbs && backHref;

  return (
    <header className="mb-8 space-y-3 bg-white rounded-xl p-6 border border-border/60 shadow-md">
      {/* Navigation */}
      {(showBreadcrumbs || showBack) && (
        <nav className="flex items-center text-sm">
          {showBreadcrumbs ? (
            <ol className="flex items-center gap-2">
              <li>
                <button
                  onClick={() => handleNavigate("/")}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                </button>
              </li>

              {breadcrumbs!.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="text-muted-foreground/40">/</span>

                  {item.href ? (
                    <button
                      onClick={() => handleNavigate(item.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span className="text-foreground font-medium">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <button
              onClick={() => handleNavigate(backHref!)}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">{backLabel}</span>
            </button>
          )}
        </nav>
      )}

      {/* Title + Action */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>

          {description && (
            <p className="text-sm text-muted-foreground max-w-xl">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-2 shrink-0">
            {action}
          </div>
        )}
      </div>
    </header>
  );
};