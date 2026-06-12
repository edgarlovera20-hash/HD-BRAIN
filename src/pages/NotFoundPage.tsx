import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1C] text-[#F9FAFB]">
      <p className="text-6xl font-bold text-[#0066FF]" style={{ fontFamily: "Poppins, sans-serif" }}>
        404
      </p>
      <h1 className="text-2xl font-semibold mt-4 mb-2">Página no encontrada</h1>
      <p className="text-[#9CA3AF] mb-8 text-sm">La ruta que buscas no existe.</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-medium transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  );
}
