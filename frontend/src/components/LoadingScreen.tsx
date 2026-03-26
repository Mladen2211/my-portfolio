export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-ping w-16 h-16 rounded-full bg-blue-500/20" />
        <div className="w-16 h-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin relative z-10" />
      </div>
      <p className="text-blue-400 font-mono text-sm tracking-widest uppercase animate-pulse">
        Initializing Web Environment...
      </p>
    </div>
  );
}
