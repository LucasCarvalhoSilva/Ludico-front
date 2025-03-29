import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { SubHeader } from '../../components/Header';
import { Header } from '../../components/Header';
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { CeremonyManaging, GamesList, ParticipantRegister, OneShotsList } from './Tabs';

const tabs = [
  { label: 'Gestão do evento', id: 'ceremonyManaging' },
  { label: 'Cadastrar participante', id: 'participantRegister' },
  { label: 'Lista de jogos', id: 'gamesList' },
  { label: 'Lista de oneshots', id: 'oneShotsList' },
  { label: 'Lista de atividades', id: 'activitiesList' },
  { label: 'Escape', id: 'scape' },
];

export function CeremonyHome() {
  const routerParams = useParams();
  const token = localStorage.getItem('authToken');

  const [data, setData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("ceremonyManaging");


  useEffect(() => {
    fetchData();
  }, []);

  const buildObject = (ceremony) => {
    console.log(ceremony)
    const formatedData = {
      _id: ceremony._id,
      eventName: ceremony.eventName,
      eventPlace: ceremony.eventPlace,
      eventDate: format(new Date(ceremony.eventDate), 'd \'de\' MMMM \'de\' yyyy', { locale: ptBR }),
      eventStartTime: ceremony.eventStartTime,
      eventEndTime: ceremony.eventEndTime
    };

    setData(formatedData)
  }

  const fetchData = async () => {
    let response
    try {
      response = await axios.get(`http://localhost:8000/ceremony/${routerParams.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Erro ao carregar os dados!", error);
    }
    buildObject(response.data)
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-zinc-700 m-0 p-0">
      <Header />
      {/* <SubHeader navigationItems={navigationItems} /> */}
      <span className='py-6 text-amber-400 text-3xl'>{data?.eventName}</span>
      <div className="flex gap-6">
        {
          tabs.map(item =>
            <span
              className={`${selectedTab === item.id ? "text-amber-400 font-bold" : "text-zinc-50"} text-2xl cursor-pointer hover:opacity-70`}
              onClick={() => setSelectedTab(item.id)}
            >
              {item.label}
            </span>
          )
        }
      </div>
      <div className='mx-14 my-7 w-full'>
        {selectedTab === "ceremonyManaging" && <CeremonyManaging data={data} />}
        {selectedTab === "participantRegister" && <ParticipantRegister data={data} />}
        {selectedTab === "gamesList" && <GamesList data={data} />}
        {selectedTab === "oneShotsList" && <OneShotsList data={data} />}
      </div>
    </div >
  );
}