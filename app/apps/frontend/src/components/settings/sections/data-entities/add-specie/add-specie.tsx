import { useDisclosure } from '@mantine/hooks';
import styles from './add-specie.module.css';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../../../contexts/settings-context';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import { UserContext } from '../../../../../contexts/user-context';
import { MainColorContext } from '../../../../../contexts/color-context';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Specie } from '../../../../../types/data-entities.types';
import FormColumn from '../../../../utilities/form-column/form-column';
import { useForm } from '@mantine/form';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export function AddSpecie() {
  const [deleteModal, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [editModal, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [createModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const form = useForm({
    initialValues: {
      specie: '',
    },
    validate: {
      specie: (value) => {
        if (!/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ \s]+$/i.test(value)) {
          return 'Ingresaste un caracter no valido';
        }
        return null;
      },
    },
  });
  const { specieList } = useContext(SettingsContext);
  const [actualSpecie, setActualSpecie] = useState<Specie | null>(null);
  const [species, setSpecie] = specieList;
  const { getData, createNewData, editData } = useDataEntities();
  const { currentUser } = useContext(UserContext);
  const mainColor = useContext(MainColorContext);
  const getSpecies = async () => {
    const { species } = await getData(['species']);
    if (species) {
      setSpecie(species);
    }
  };

  const handleOnCreate = async (values: { specie: string }) => {
    await createNewData({ specie: values.specie }, 'specie');
    closeCreate();
    await getSpecies();
  };

  const handleOnEdit = async (values: { specie: string }) => {
    if (!actualSpecie) return;
    await editData('specie', actualSpecie.ID_specie, {
      specie: values.specie,
    });
    closeEdit();
    await getSpecies();
  };

  const handleOnDelete = async () => {
    if (!actualSpecie) return;
    await editData('specie', actualSpecie.ID_specie, { inUse: false });
    closeDelete();
    await getSpecies();
  };

  const specieItems = species
    ?.filter((v) => v.inUse)
    .map((s) => {
      return {
        name: s.specie,
        edit: (
          <ActionIcon
            color={mainColor}
            onClick={() => {
              setActualSpecie(s);
              openEdit();
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </ActionIcon>
        ),
        delete: (
          <ActionIcon
            color={mainColor}
            onClick={() => {
              setActualSpecie(s);
              openDelete();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        ),
      };
    });
  useEffect(() => {
    if (species !== null) return;
    getSpecies();
  }, []);

  useEffect(() => {
    if (createModal || editModal) return;
    form.reset();
  }, [editModal, createModal]);
  return (
    <div>
      <Modal
        opened={deleteModal}
        onClose={closeDelete}
        title="¿Seguro quiere dar de baja esta especie?"
        centered
      >
        <Flex direction={'row'} align={'center'} justify={'center'} gap={'xl'}>
          <Button
            color={mainColor}
            variant="light"
            onClick={handleOnDelete}
            fullWidth
          >
            Si, estoy seguro
          </Button>
          <Button color={mainColor} onClick={closeDelete} fullWidth>
            Volver
          </Button>
        </Flex>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={editModal}
        onClose={closeEdit}
        title="¿Seguro quiere editar esta especie?"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnEdit)}>
          <Grid>
            <FormColumn
              inputType="text"
              form={form}
              name="specie"
              label="Especie: "
              placeholder="Especie"
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Si, estoy seguro
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button color={mainColor} onClick={closeEdit} fullWidth>
                Volver
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      {/* Create Modal */}
      <Modal
        opened={createModal}
        onClose={closeCreate}
        title="Nueva Especie"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnCreate)}>
          <Grid>
            <FormColumn
              inputType="text"
              form={form}
              name="specie"
              label="Especie: "
              placeholder="Especie"
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Cargar
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button color={mainColor} onClick={closeCreate} fullWidth>
                Volver
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Flex direction={'column'} justify={'center'} align={'start'} gap={'lg'}>
        <Title>Especies</Title>
        <Text>Definir y administrar las especies que pueden ser tratadas.</Text>

        <Box
          style={{
            width: '700px',
            border: '1px solid #ccc',
          }}
        >
          <DataTable value={specieItems} paginator rows={5}>
            <Column
              field="name"
              header="Especie"
              style={{ width: '90%' }}
            ></Column>
            <Column field="edit"></Column>
            <Column field="delete"></Column>
          </DataTable>
        </Box>
        <Button
          bg={mainColor}
          disabled={currentUser?.role === 'user'}
          onClick={openCreate}
        >
          Cargar Especie
        </Button>
      </Flex>
    </div>
  );
}

export default AddSpecie;
