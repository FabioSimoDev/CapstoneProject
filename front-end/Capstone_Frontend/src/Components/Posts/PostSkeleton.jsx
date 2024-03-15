export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="flex gap-3 items-center">
        <div className="w-[30px] h-[30px] bg-slate-200 dark:bg-slate-700 rounded-full shrink-0"></div>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <div className="bg-slate-200 dark:bg-slate-700 w-[5rem] h-6 rounded"></div>
            <div className="bg-slate-200 dark:bg-slate-700 w-[3rem] h-6 rounded"></div>
          </div>
          <div className="w-[3rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
      <div className="w-[8rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
      <div className="bg-slate-200 dark:bg-slate-700 w-full h-[30rem] rounded-md"></div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex gap-2 w-full pb-2">
            <div className="w-[24px] h-[24px] bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="w-[24px] h-[24px] bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="w-[8rem] h-[24px] bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            <div className="w-[24px] h-[24px] bg-slate-200 dark:bg-slate-700 rounded-lg ms-auto"></div>
          </div>
          <div className="w-[5rem] h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-[5rem] h-6 bg-slate-200 rounded dark:bg-slate-700"></div>
            <div className="w-[10rem] h-6 bg-slate-200 rounded dark:bg-slate-700"></div>
          </div>
          <div className="w-[6rem] h-6 rounded bg-slate-200 dark:bg-slate-700 "></div>
        </div>
      </div>
    </div>
  );
}
