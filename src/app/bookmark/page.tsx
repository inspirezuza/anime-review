import dynamic from "next/dynamic";
const SwitchTheme = dynamic(
  () => import("@/components/component/switchtheme"),
  {
    ssr: false,
  }
);

export default function BookMark() {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-black border-b-2">
      <div className="text-xl font-bold">Profile</div>
      <SwitchTheme />
    </div>
  );
}
