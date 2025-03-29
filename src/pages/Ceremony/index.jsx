import { useNavigate } from "react-router";
import { Header } from "../../components/Header"
import { PrimaryButton } from "../../components/Button";
import { Table } from "../../components/Table"
import { useState, useEffect } from "react";
import { useCeremonyContext } from '../../contexts/CeremonyContext'
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { LabeledSelect } from "../../components/Select";
import { Modal } from "../../components/Modal";

export function Ceremony() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const token = localStorage.getItem('authToken');
  const { setOpenCeremony } = useCeremonyContext()

  const handleRowClick = (_id) => {
    console.log(_id)
    setOpenCeremony(_id)
    navigate(`/Ceremony/${_id}`);
  }

  const buildObject = (data) => {
    console.log(data)
    const formatedData = data.map((ceremony) => ({
      _id: ceremony._id,
      eventName: ceremony.eventName,
      eventPlace: ceremony.eventPlace,
      eventDate: format(new Date(ceremony.eventDate), 'd \'de\' MMMM \'de\' yyyy', { locale: ptBR }),
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
  }, [])


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
    <div className="min-h-screen w-screen flex flex-col items-center bg-zinc-700 m-0 p-0">
      <Header className="top-0 left-0" />
      <div>
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
        <div className="flex w-full justify-end">
          <div className="">
            <PrimaryButton
              className="text-2xl font-bold px-8"
              onClick={navigateToNewCeremony}
              text="Criar Novo Evento"
            />
          </div>
        </div>
        <div className="mt-10 w-1/2">
          <LabeledSelect
            description="Grande opções para serem selecionadas"
            options={[
              { id: "teste1", text: "Primeira opção" },
              { id: "teste2", text: "Segunda opção" },
              { id: "teste3", text: "Terceira opção" },
              { id: "teste4", text: "Quarta opção" }
            ]}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="mt-10 w-1/2">
          <button id="openModal">Open the modal</button>

          <Modal
            openerId="openModal"
            modalId="testingModal"
            content={
              <div className="flex flex-col">
                <span>Teste de passagem de conteudo como prop</span>
                <span>Teste de passagem de conteudo como prop</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}