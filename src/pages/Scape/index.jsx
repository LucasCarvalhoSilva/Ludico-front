import { useState, useEffect, useCallback } from "react";
import { Header } from "../../components/Header";
import { LabeledInput } from "../../components/Input";
import { LabeledSelect } from "../../components/Select";
import axios from "axios";
import { PrimaryButton } from "../../components/Button";
import { Table } from "../../components/Table";
import { use } from "react";

export function Scape() {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [duration, setDuration] = useState('');
  const [format, setFormat] = useState('');
  const [minQuantityOfParticipants, setMinQuantityOfParticipants] = useState('');
  const [maxQuantityOfParticipants, setMaxQuantityOfParticipants] = useState('');
  const [addScapeError, setAddScapeError] = useState(false);
  const token = localStorage.getItem('authToken');
  const [scapes, setScapes] = useState([]);

  useEffect(() => {
    getScapes();
  }, []);

  const getScapes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/scapeRoomHistory`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setScapes(response.data);
      } else {
        console.error("Failed to fetch scapes:", response.data);
      }
    } catch (error) {
      console.error("Error fetching scapes:", error);
    }
  }

  const changeRoomName = (e) => {
        const value = e.target.value;
        setRoomName(value);
  }

  const changeDuration = (e) => {
        const value = e.target.value;
        setDuration(value);
  }

  const changeFormat = (e) => {
        const value = e.target.value;
        setFormat(value);
  }

  const changeMinQuantityOfParticipants = (e) => {
        const value = e.target.value;
        setMinQuantityOfParticipants(value);
  }

  const changeMaxQuantityOfParticipants = (e) => {
        const value = e.target.value;
        setMaxQuantityOfParticipants(value);
  }

  const cleanInputs = () => {
    setRoomName('');
    setDuration('');
    setFormat('');
    setMinQuantityOfParticipants('');
    setMaxQuantityOfParticipants(''); 
  }

  const handleAddScape = async() => {
    if (!roomName || !duration || !format || !minQuantityOfParticipants || !maxQuantityOfParticipants) {
      setAddScapeError(true);
      return;
    }

    setAddScapeError(false);
    

    try {
      const response = await axios.post(`http://localhost:8000/scapeRoomHistory`,{
        name: roomName,
        duration: duration,
        minPlayerQuantity: minQuantityOfParticipants,
        maxPlayerQuantity: maxQuantityOfParticipants,
        mode: format
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(response.status === 201) {
        console.log("Scape added successfully");
        cleanInputs();
        setIsCreating(false);
      }else {
        console.error("Failed to add scape:", response.data);
        setAddScapeError(true);
        return;
      }
    }
    catch (error) {
      console.error("Error adding scape:", error);
      setAddScapeError(true);
      return;
    }
  }

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(`http://localhost:8000/scapeRoomHistory/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setScapes((prevScapes) => prevScapes.filter((scape) => scape._id !== item._id));
      } else {
        console.error("Failed to delete scape:", response.data);
      }
    } catch (error) {
      console.error("Error deleting scape:", error);
    }
  }

  return (
    <>
      {isCreating ? 
        <div className="h-screen w-screen bg-zinc-700">
          <Header title="Create Scape" />
          <div className="flex flex-col items-center mt-8">
            <div className="w-1/2 flex flex-col gap-4">
              <LabeledInput
                  description="Nome da Sala"
                  placeholder="Nome da sala do scape"
                  toUppercase={false}
                  value={roomName}
                  onChange={changeRoomName}
              />
              <div className="flex gap-12 items-end">
                <LabeledInput
                  description="Duração"
                  placeholder="Tempo de duração da sala de scape"
                  toUppercase={false}
                  value={duration}
                  onChange={changeDuration}
                />
                <LabeledSelect
                  description="Formato"
                  options={[
                    { id: "", text: "Selecione" },
                    { id: "online", text: "online" },
                    { id: "presencial", text: "presencial" },
                  ]}
                  toUppercase={false}
                  value={format}
                  onChange={changeFormat}
                />
              </div>
              <div className="flex gap-12 items-end">
                <LabeledInput
                  description="Mínimo de Participantes"
                  placeholder="Quantidade mínima de participantes"
                  toUppercase={false}
                  value={minQuantityOfParticipants}
                  onChange={changeMinQuantityOfParticipants}
                />
                <LabeledInput
                  description="Máximo de Participantes"
                  placeholder="Quantidade máxima de participantes"
                  toUppercase={false}
                  value={maxQuantityOfParticipants}
                  onChange={changeMaxQuantityOfParticipants}
                />
              </div>
              {addScapeError &&
                <span className="text-red-400 font-bold text-center">Preencha todos os campos</span>
              }
              <div className="flex justify-center">
                <PrimaryButton
                  className="w-fit text-2xl font-bold px-8 mt-6"
                  onClick={handleAddScape}
                  text="Adicionar ao evento"
                  fullWidth={false}
                />
              </div>
            </div>
          </div>
        </div>
      :
      isEditing ?
        <div>
          <h1>Edit Scape</h1>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Stop Editing' : 'Start Editing'}
          </button>
          
        </div>
      :
      <div className="h-screen w-screen bg-zinc-700 p-0 m-0">
        <Header title="Scape" />
        <div className="w-full flex flex-col px-14 mt-4">
          <Table
            title="Scapes"
            column={["História", "Duração", "Formato", "Limite Mínimo", "Limite Máximo"]}
            data={scapes?.map((scape) => ({
              _id: scape._id,
              history: scape.name,
              duration: scape.duration,
              format: scape.mode,
              minLimit: scape.minPlayerQuantity,
              maxLimit: scape.maxPlayerQuantity
            }))}
            hasEdit={false}
            hasDelete={true}
            onDelete={handleDelete}
            hasAddPresence={false}
            onAddPlayer={() => console.log("Add Player")}
          />
        </div>
      </div>
      
      
    }
    </>
  )
}