const SkeletonProfile = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-24 mx-auto mb-14">
        <div className="w-[10rem] h-[10rem] shrink-0 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        <div className="w-full flex flex-col justify-evenly gap-2">
          <div className="flex gap-8 items-center">
            <div className="w-[10rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="w-[10rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="flex gap-8 items-center">
            <div className="w-[5rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="w-[5rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="w-[5rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="flex flex-col">
            <div className="w-[10rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="w-full h-6 bg-slate-200 dark:bg-slate-700 rounded mt-1"></div>
          </div>
        </div>
      </div>
      <div
        role="menu"
        className="border-t border-black/30 dark:border-white/50 bg-slate-200 dark:bg-slate-700 rounded"
      ></div>
      <div className="flex justify-center gap-10 dark:text-white/50 text-black/50 text-sm">
        <div
          className={`${"dark:border-white/0 border-black/0 bg-slate-200 dark:bg-slate-700 rounded-t border-t pt-1 flex items-center gap-1 cursor-pointer"}`}
        >
          <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="w-[5rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div
          className={`${"dark:border-white/0 border-black/0 bg-slate-200 dark:bg-slate-700 rounded-t border-t pt-1 flex items-center gap-1 cursor-pointer"}`}
        >
          <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="w-[10rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
      <h1 className="text-center mt-6 bg-slate-200 dark:bg-slate-700 rounded"></h1>
    </div>
  );
};

export default SkeletonProfile;
