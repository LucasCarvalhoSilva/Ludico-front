import { useState } from "react";
import logo from "../../assets/logoLudico.png"
import { LabeledInput } from "../../components/Input"
import { PrimaryButton } from "../../components/Button"
import { TextButton } from "../../components/Button"
import axios from 'axios';
import { useNavigate } from "react-router";

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');

  const changeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  }

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  }

  async function userLogin(username, password) {
    try {
      setErrorMessage("")
      console.log("Enviando dados:", { username, password });
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      return response.data
    } catch (error) {
      const _errorMessage = error.response?.data?.message || 'Erro no login';
      setErrorMessage(_errorMessage)
      throw new Error(_errorMessage);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token } = await userLogin(username, password);
      localStorage.setItem('authToken', token);
      navigate('/Ceremony');
      console.log("Em teoria logado com o usuário: ", username)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="h-screen w-screen py-24 bg-zinc-900">
      <div className="max-w-4xl mx-auto bg-zinc-700 rounded-2xl pb-14">

        <img src={logo} alt="" className="w-56 mx-auto" />

        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8">
          <LabeledInput
            description="usuário"
            type="text"
            name="username"
            placeholder="Usuário"
            value={username}
            onChange={changeUsername}
          />
          <LabeledInput
            description="senha"
            type="password"
            name="password"
            placeholder="**********"
            value={password}
            onChange={changePassword}
            errorMessage={errorMessage}
          />
          <div className="mt-10">
            <PrimaryButton text="entrar" type="submit" />
          </div>
          <div>
            <TextButton text="Recuperar senha" onClick={() => console.log("Botão clicado")} />
          </div>
        </form>
      </div>
    </div>
  )
}