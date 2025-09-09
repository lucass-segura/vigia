// app/page.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  
  const { data: latestRecords, error } = await supabase
    .from('ultimos_registros_por_dispositivo')
    .select('*');

  if (error) {
    console.error("Error fetching latest records:", error);
    return <p className="container mx-auto p-8">Error al cargar los dispositivos.</p>;
  }

  if (!latestRecords || latestRecords.length === 0) {
    return <p className="container mx-auto p-8">Aún no se han recibido datos de ningún dispositivo.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Dispositivos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestRecords.map((record) => (
          <div key={record.id_dispositivo} className="border p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{record.id_dispositivo}</h2>
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Última lectura:</strong> {record.fecha}</p>
                
                {/* --- CAMBIO AQUÍ: Mostramos la lista completa --- */}
                <ul className="mt-2 space-y-1">
                  <li><strong>Horametro:</strong> {record.horametro ?? 'N/A'}</li>
                  <li><strong>Temp. Motor:</strong> {record.temperatura_motor ?? 'N/A'}</li>
                  <li><strong>Presión Aceite:</strong> {String(record.presion_aceite) ?? 'N/A'}</li>
                  <li><strong>Temp. Transmisión:</strong> {record.temperatura_transmision ?? 'N/A'}</li>
                  <li><strong>Temp. Hidráulico:</strong> {record.temperatura_sistema_hidraulico ?? 'N/A'}</li>
                  <li><strong>Tensión Batería:</strong> {record.tension_carga_bateria ?? 'N/A'}</li>
                </ul>
                {/* --- FIN DEL CAMBIO --- */}

              </div>
            </div>
            <Link href={`/dispositivo/${encodeURIComponent(record.id_dispositivo)}`} className="mt-4 text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Ver Historial
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}