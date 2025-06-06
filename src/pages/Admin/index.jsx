import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { SubHeader } from '../../components/Header';
import { Header } from '../../components/Header';
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { User } from './Tabs';
import { Tabs } from '../../components/Tabs';

const tabs = [
    { label: 'Usuários', id: 'user' },
    { label: 'Relatórios', id: 'report' },
];

export function Admin() {
    const routerParams = useParams();
    const token = localStorage.getItem('authToken');

    const [data, setData] = useState(null);
    const [lentData, setLentData] = useState([]);
    const [selectedTab, setSelectedTab] = useState("user");
    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                setUsers(response.data?.sort((a, b) => a.name > b.name ? 1 : -1));
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.log(err);
            setUsers([]);
        }
    }

    const buildObject = (ceremony) => {
        console.log(ceremony)
        const formatedData = {
            ...ceremony,
            eventDate: format(new Date(ceremony.eventDate), 'd \'de\' MMMM \'de\' yyyy', { locale: ptBR }),
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
            <div className='w-fit flex items-center'>
                <div className='flex justify-start w-full mt-20  mb-4'>
                    <Tabs
                        tabs={tabs}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                </div>
                <div className='flex w-11/12'>

                </div>
            </div>
            <div className='mx-14 w-full'>
                {selectedTab === "user" && <User data={users} />}
            </div>
        </div >
    );
}