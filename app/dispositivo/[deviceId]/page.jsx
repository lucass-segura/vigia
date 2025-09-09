// app/dispositivo/[deviceId]/page.jsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DeviceDetailsClient from './DeviceDetailsClient';

export default async function DeviceDetailPage({ params }) {
  const supabase = createServerComponentClient({ cookies });
  
  // ¡CORREGIDO! Ahora 'params.deviceId' existe porque la carpeta se llama [deviceId].
  const deviceId = decodeURIComponent(params.deviceId);
  
  const { data: registros, error } = await supabase
    .from('registros_dispositivos')
    .select('*')
    .eq('id_dispositivo', deviceId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error al cargar registros:", error);
    return <div className="container mx-auto p-8">Error al cargar los registros del dispositivo.</div>;
  }

  return <DeviceDetailsClient deviceId={deviceId} initialRegistros={registros || []} />;
}