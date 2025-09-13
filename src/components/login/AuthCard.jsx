export default function AuthCard({ children }) {
  return (
    <div
      className="
        w-full max-w-md rounded-2xl bg-white
        p-6 sm:p-7 text-center
        shadow-[0_20px_40px_rgba(0,0,0,0.08)]
      "
    >
      {children}
    </div>
  );
}
