import React from 'react';

export function Table({
  column,
  data,
  onEdit,
  onDelete,
  onAddPresence,
  onRowClick,
  hasEdit = true,
  hasDelete = true,
  hasAddPresence = true,
}) {
  const handleRowClick = (eventoId) => {

    onRowClick();
    console.log(`Linha clicada: Evento ID ${eventoId}`);
    console.log(eventoId)
    // Aqui você pode redirecionar para outra página, abrir um modal, etc.
  };

  if (!Array.isArray(data)) {
    return <div>Carregando...</div>; // Ou outro indicador de carregamento
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full min-w-208 my-28 mx-auto border-collapse border border-gray-800">
        <thead>
          <tr className="bg-amber-400 border border-zinc-800 text-black">
            {column.map((coluna, index) => (
              <th key={index} className="px-4 py-2 text-left text-lg">
                {coluna}
              </th>
            ))}
            {(hasEdit || hasDelete || hasAddPresence) && (
              <th className="px-4 py-2 text-left text-lg">Ações</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? 'bg-yellow-50 border border-zinc-800'
                  : 'bg-gray-700 text-white border border-zinc-800'
              }`}
              onClick={() => handleRowClick( item._id )}
            >
              {Object.keys(item).map((key, i) => {
                if (key === '_id') return null;
                return (
                  <td key={i} className="px-4 py-2 text-lg">
                    {item[key]}
                  </td>
                );
              })}
              {(hasEdit || hasDelete || hasAddPresence) && (
                <td className="px-4 py-2 flex gap-4">
                  {hasEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Evita disparar o clique da linha
                        onEdit(item);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>
                  )}
                  {hasDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  )}
                  {hasAddPresence && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddPresence(item);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      ✅
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}