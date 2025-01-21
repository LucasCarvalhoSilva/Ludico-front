import { useNavigate } from "react-router";
import { Header } from "../../components/header"
import { PrimaryButton } from "../../components/primaryButton";
import { Table } from "../../components/table"
import { useState, useEffect } from "react";
import { useCeremonyContext } from '../../contexts/CeremonyContext'
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export function Ceremony() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const token = localStorage.getItem('authToken');
  const { setOpenCeremony } = useCeremonyContext()

  const handleRowClick = (_id) => {
    setOpenCeremony(_id)
    navigate('/Ceremony/home');
  }

  const buildObject = (data) => {
    console.log(data)
    const formatedData = data.map((ceremony)=> ({
      _id: ceremony._id,
      eventName: ceremony.eventName,
      eventPlace: ceremony.eventPlace,
      eventDate: format(new Date(ceremony.eventDate), 'd \'de\' MMMM \'de\' yyyy', {locale: ptBR}),
      eventStartTime: ceremony.eventStartTime,
      eventEndTime: ceremony.eventEndTime
    })) 
    
    setData(formatedData)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      let response
      try {
        console.log("Chega aqui")
         response = await axios.get('http://localhost:8000/ceremony', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log("Erro ao carregar os dados!", error); 
      } 
      buildObject(response.data)
    };
    console.log("Token no useEffect:", token);

    fetchData();
  },[])
  

  const column = ['Evento', 'Local', 'Dia', 'Início', 'Fim'];

  const handleEdit = (item) => {
    console.log('Editar:', item);
    // Lógica para editar o item
  };

  const handleDelete = (item) => {
    console.log('Deletar:', item);
    // Lógica para remover o item
    setDados((prevDados) => prevDados.filter((d) => d !== item));
  };

  const navigateToNewCeremony = () => {
    navigate('/Ceremony/NewCeremony')
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-zinc-900 m-0 p-0">
      <Header className="top-0 left-0"/>
      <Table 
        column={column}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        hasAddPresence={false}
        hasEdit={true}
        hasDelete={true}
        onRowClick={handleRowClick}
      />
      <div className="flex justify-end">
        <div className="right-16 w-104 mx-16">
          <PrimaryButton onClick={navigateToNewCeremony} text="Novo Evento" />
        </div>
      </div>
    </div>
  )
}