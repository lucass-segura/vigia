// app/login/page.jsx
'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
// Importa tu componente de formulario desde donde lo hayas guardado
// import { LoginForm } from '@/components/LoginForm'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Error: ' + error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Aquí es donde usas el componente de v0. Debes pasarle las funciones. */}
      {/* <LoginForm onSubmit={handleLogin} setEmail={setEmail} setPassword={setPassword} /> */}

      {/* O si prefieres pegar el JSX directamente: */}
      <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Acceso al Panel</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Ingresar</button>
      </form>
    </div>
  );
}