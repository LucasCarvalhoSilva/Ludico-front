import React from 'react';
import { SubHeader } from '../../components/subHeader';
import { Header } from '../../components/header';

export function CeremonyHome() {
  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Eventos', path: '/events' },
    { label: 'Usuários', path: '/users' },
    { label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-zinc-900 m-0 p-0">
      <Header/>
      <SubHeader navigationItems={navigationItems} />
      <div className="p-8">
        <h1 className="text-2xl font-bold">Bem-vindo à página!</h1>
        {/* Conteúdo da página */}
      </div>
    </div>
  );
}