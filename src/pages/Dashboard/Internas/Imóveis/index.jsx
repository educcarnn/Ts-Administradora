import React, { useState } from 'react';
import axios from 'axios';
import "./style.js"
import { ImoveisDiv, ImoveisForm } from './style';

export default function ImoveisZapPro() {
  const [anuncio, setAnuncio] = useState({
    titulo: 'Anúncio de Teste',
    Tipo: 'Residencial',
    descricao: 'Este é um anúncio de teste',
    preco: 100000,
    localizacao: 'São Paulo',
    quartos: 2,
    banheiros: 1,
  });

  const criarAnuncio = async () => {
    try {
      const response = await axios.post(
        'URL_DO_SEU_WEBHOOK_AQUI',
        anuncio,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Anúncio criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
    }
  };

  return (
    <ImoveisDiv>
      
      <h1>Criar Anúncio</h1>
      <ImoveisForm>
        <label>Título:</label>
        <input
          type="text"
          value={anuncio.titulo}
          onChange={(e) =>
            setAnuncio({ ...anuncio, titulo: e.target.value })
          }
        />

        <label>Descrição:</label>
        <textarea
          value={anuncio.descricao}
          onChange={(e) =>
            setAnuncio({ ...anuncio, descricao: e.target.value })
          }
        ></textarea>

        <label>Preço:</label>
        <input
          type="number"
          value={anuncio.preco}
          onChange={(e) => setAnuncio({ ...anuncio, preco: e.target.value })}
        />

        <label>Localização:</label>
        <input
          type="text"
          value={anuncio.localizacao}
          onChange={(e) =>
            setAnuncio({ ...anuncio, localizacao: e.target.value })
          }
        />

        <label>Quartos:</label>
        <input
          type="number"
          value={anuncio.quartos}
          onChange={(e) =>
            setAnuncio({ ...anuncio, quartos: e.target.value })
          }
        />

        <label>Banheiros:</label>
        <input
          type="number"
          value={anuncio.banheiros}
          onChange={(e) =>
            setAnuncio({ ...anuncio, banheiros: e.target.value })
          }
        />

        <button type="button" onClick={criarAnuncio}>
          Criar Anúncio
        </button>
      </ImoveisForm>
    </ImoveisDiv>
  );
}


