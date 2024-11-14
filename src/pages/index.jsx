import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Heading, Text, Button, Input, Stack } from '@chakra-ui/react';

function Filmes() {
    const [filmes, setFilmes] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [diretor, setDiretor] = useState('');
    const [anoLancamento, setAnoLancamento] = useState('');
    const [genero, setGenero] = useState('');
    const [editando, setEditando] = useState(false);
    const [filmeIdEditando, setFilmeIdEditando] = useState(null);
  
    useEffect(() => {
      fetchFilmes();
    }, []);
  
    const fetchFilmes = async () => {
      try {
        const response = await api.get('/filmes');
        setFilmes(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    const handleAddFilme = async () => {
        if (titulo && diretor && anoLancamento && genero) {
          try {
            const response = await api.post('/filmes', { titulo, diretor, ano_lancamento: anoLancamento, genero });
            fetchFilmes();
            resetForm();
          } catch (error) {
            console.error('Erro ao adicionar filme:', error);
          }
        } else {
          console.log('Por favor, preencha todos os campos!');
        }
      };
  
    const handleEditFilme = async () => {
      if (titulo && diretor && anoLancamento && genero) {
        try {
          await api.put(`/filmes/${filmeIdEditando}`, { titulo, diretor, ano_lancamento: anoLancamento, genero });
          setFilmes(filmes.map(filme => filme.id === filmeIdEditando ? { ...filme, titulo, diretor, ano_lancamento: anoLancamento, genero } : filme));
          resetForm();
          setEditando(false);
        } catch (error) {
          console.error('Erro ao editar filme:', error);
        }
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await api.delete(`/filmes/${id}`);
        setFilmes(filmes.filter((filme) => filme.id !== id));
      } catch (error) {
        console.error('Erro ao excluir filme:', error);
      }
    };
  
    const startEdit = (filme) => {
      setTitulo(filme.titulo);
      setDiretor(filme.diretor);
      setAnoLancamento(filme.ano_lancamento);
      setGenero(filme.genero);
      setEditando(true);
      setFilmeIdEditando(filme.id);
    };
  
    const resetForm = () => {
      setTitulo('');
      setDiretor('');
      setAnoLancamento('');
      setGenero('');
    };

  return (
    <Box p={5}>
      <Heading mb={4}>{editando ? 'Editar Filme' : 'Adicionar Filme'}</Heading>
      <Stack spacing={3} mb={6}>
        <Input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <Input
          placeholder="Diretor"
          value={diretor}
          onChange={(e) => setDiretor(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Ano Lançamento"
          value={anoLancamento}
          onChange={(e) => setAnoLancamento(e.target.value)}
        />
         <Input
          placeholder="Gênero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <Button
          onClick={editando ? handleEditFilme : handleAddFilme}
        >
          {editando ? 'Atualizar Filme' : 'Adicionar Filme'}
        </Button>
      </Stack>
      <Heading size="md">Lista de Filmes</Heading>
      {filmes.map((filme) => (
        <Box key={filme?.id} borderWidth="1px" borderRadius="lg" p={4} mt={4} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="xl">{filme?.titulo}</Text>
            <Text>{filme?.diretor}</Text>
            <Text>{filme?.ano_lancamento}</Text>
            <Text>{filme?.genero}</Text>
          </Box>
          <Stack direction="row" spacing={3}>
            <Button onClick={() => startEdit(filme)}>
              Editar
            </Button>
            <Button bg={"#ff0000"} onClick={() => handleDelete(filme.id)}>
              Excluir
            </Button>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

export default Filmes;
