import { useTheme } from "../contexts/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md bg-accent text-accent-foreground hover:opacity-90 border border-input"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
