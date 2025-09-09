// app/dispositivo/[deviceId]/DeviceDetailsClient.jsx
'use client';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DeviceDetailsClient({ deviceId, initialRegistros }) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres borrar este registro?')) return;
    
    const { error } = await supabase.from('registros_dispositivos').delete().match({ id });

    if (error) {
      alert("Error al borrar el registro: " + error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Link href="/" className="text-blue-500 mb-6 block">&larr; Volver al Dashboard</Link>
      
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{deviceId}</h1>
      </div>

      <div className="space-y-4">
        {initialRegistros.length > 0 ? (
          initialRegistros.map((registro) => (
            <div key={registro.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold">{registro.fecha}</p>
                <ul className="text-sm text-gray-700 grid grid-cols-2 md:grid-cols-3 gap-x-4">
                  <li>Horametro: {registro.horametro}</li>
                  <li>Temp. Motor: {registro.temperatura_motor}</li>
                  <li>Presión Aceite: {String(registro.presion_aceite)}</li>
                  <li>Temp. Transmisión: {registro.temperatura_transmision}</li>
                  <li>Temp. Hidráulico: {registro.temperatura_sistema_hidraulico}</li>
                  <li>Tensión Batería: {registro.tension_carga_bateria}</li>
                </ul>
              </div>
              <button onClick={() => handleDelete(registro.id)} className="text-red-500 p-2 rounded-full hover:bg-red-100">
                🗑️
              </button>
            </div>
          ))
        ) : (
          <p>No hay registros para este dispositivo.</p>
        )}
      </div>
    </div>
  );
}