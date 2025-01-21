import { useNavigate } from "react-router";
import { Header } from "../../components/header"
import { PrimaryButton } from "../../components/primaryButton";
import { useState } from "react";
import { InputWrapper } from "../../components/inputWrapper";
import axios from "axios";

export function NewCeremony() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState()
  const [eventCity, setEventCity] = useState()
  const [eventPlace, setEventPlace] = useState()
  const [eventDate, setEventDate] = useState()
  const [eventStartTime, setEventStartTime] = useState()
  const [eventEndTime, setEventEndTime] = useState()

  const token = localStorage.getItem('authToken');

  const changeEventName = (e) => {
    const value = e.target.value;
    setEventName(value);
  }

  const changeEventCity = (e) => {
    const value = e.target.value;
    setEventCity(value);
  }
  
  const changeEventPlace = (e) => {
    const value = e.target.value;
    setEventPlace(value);
  }

  const changeEventDate = (e) => {
    const value = e.target.value;
    setEventDate(value);
  }

  const changeEventStartTime = (e) => {
    const value = e.target.value;
    setEventStartTime(value);
  }

  const changeEventEndTime = (e) => {
    const value = e.target.value;
    setEventEndTime(value);
  }

  const createEvent = async (e) => {
    e.preventDefault();
    
    console.log("Chegou aqui")
    try{
      console.log("Enviando dados:", {eventName, eventCity, eventPlace, eventDate, eventStartTime, eventEndTime })
      
      const response = await axios.post('http://localhost:8000/ceremony', {
        eventName, 
        eventCity,
        eventPlace,
        eventDate,
        eventStartTime,
        eventEndTime
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Evento cadastrado com sucesso: ", response)
      navigate('/Ceremony');
    }catch(error) {
      console.log(error);
    }
    console.log("Evento criado com sucesso");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-900 px-16">
      <Header className="top-0 left-0"/>
      
      <form  className="w-10/12 flex flex-col gap-4 p-8">
        <InputWrapper description="Evento" placeholder="XXXVII Evento do Lúdico" type="text" name="eventName" value={eventName} onChange={changeEventName}/>
        <InputWrapper description="Cidade" placeholder="Cornélio Procópio" type="text" name="eventCity" value={eventCity} onChange={changeEventCity}/>
        <InputWrapper description="Local" placeholder="Hall da UTFPR de Cornélio Procópio" type="text" name="eventPlace" value={eventPlace} onChange={changeEventPlace}/>
        <div className="flex gap-24 w-full items-center">
          <InputWrapper description="Data" placeholder="20/04/2024" type="date" name="eventDate" value={eventDate} onChange={changeEventDate}/>
          <InputWrapper description="Início" placeholder="13:00" type="time" name="eventStartTime" value={eventStartTime} onChange={changeEventStartTime}/>
          <InputWrapper description="Fim" placeholder="Hall da UTFPR de Cornélio Procópio" type="time" name="eventEndTime" value={eventEndTime} onChange={changeEventEndTime}/>
        </div>
      <div className="w-104 m-auto mt-16">
        <PrimaryButton text="Criar Evento" onClick={createEvent}/>
      </div>
      </form>
    
    </div>
  )
}