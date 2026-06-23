type EmptyStateProps = {
  title: string;
  message: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-stone-300 bg-white/70 p-8 text-center">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-stone-600">{message}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
