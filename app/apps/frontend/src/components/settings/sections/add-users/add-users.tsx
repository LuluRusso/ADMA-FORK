import { Box, Button, Flex, Grid, Modal, Table, Text, Title, Tooltip } from '@mantine/core';
import styles from './add-users.module.css';
import useLogin from '../../../../hooks/general/login/use-login';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MainColorContext } from '../../../../contexts/color-context';
import { UserContext } from '../../../../contexts/user-context';
import { useDisclosure } from '@mantine/hooks';
import FormColumn from '../../../utilities/form-column/form-column';
import { useForm } from '@mantine/form';
import { SelectData } from '../../../../hooks/appointment/use-selects-data/use-selects-data';
import { notifications } from '@mantine/notifications';

interface porps {
  id: string;
}
export function AddUsers(props: porps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      role: ''
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address',
    }
  })
  const editForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      role: ''
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address',
    }
  })
  const [editModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const mainColor = useContext(MainColorContext);
  const { getUsers, createUser, editUser, deleteUser } = useLogin();
  const [users, setUsers] = useState<
    { ID_user: number; email: string; role: 'admin' | 'main' | 'user' }[]
  >([]);
  const { currentUser } = useContext(UserContext);
  const roleData: SelectData[] = [
    { value: "", text: "Seleccione un Rol", disabled: true },
    { value: "admin", text: "Administrador" },
    { value: "user", text: "Usuario" },
  ]
  const [visible, { open, close }] = useDisclosure(false);
  const [deleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false)
  const [actualUser, setActualUser] = useState<
    { ID_user: number; email: string; role: 'admin' | 'main' | 'user' } | null
  >(null)
  const UsersItems = () =>
    users.map((user) => {
      const disabled = currentUser?.role !== 'main' || user.role === "main";
      const disabledLabel = disabled ? "No puedes realizar esta accion." : false;
      return (
        <Table.Tr
          key={user.ID_user}
          style={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <Table.Td>{user.email}</Table.Td>
          <Table.Td>{user.role}</Table.Td>
          <Table.Td>
            <Tooltip label={disabledLabel || "Editar"}>
              <Button bg={mainColor} disabled={disabled} onClick={() => {
                setActualUser(user);
                openEditModal();
                editForm.setValues({ email: user.email, role: user.role })
              }}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Tooltip>
          </Table.Td>
          <Table.Td>
            <Tooltip label={disabledLabel || "Eliminar"}>
              <Button bg={mainColor} disabled={disabled} onClick={() => {
                openDeleteModal()
                setActualUser(user)
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Tooltip>

          </Table.Td>
        </Table.Tr>
      );
    });
  const handleOnCreateUser = async (values: { email: string, role: string }) => {
    try {
      const newUser = await createUser(values.email, values.role);
      setUsers(await getUsers())
      close()
      form.reset()
    } catch (err) {
      console.log(err);
      close()
    }
  }
  const handleOnEditUser = async (values: { email: string, role: string }) => {
    if (actualUser) await editUser(actualUser?.ID_user, values.email, values.role)
    setUsers(await getUsers())
    closeEditModal()

  }

  const handleOnDelete = async (id: number) => {
    const res = await deleteUser(id);

  }
  const getUsersList = async () => {
    const users = await getUsers();
    setUsers(users);
  };
  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <div>

      {/*Modal de eliminacion*/}
      <Modal centered opened={deleteModal} onClose={closeDeleteModal} title="¿Seguro quiere eliminar este usuario?(Esta acción no puede deshacerse)">

        <Flex direction={"row"} justify={"center"} align="center" pt={"10px"} gap={"md"}>
          <Button variant="light" color={mainColor} onClick={async () => {
            console.log(actualUser, "actualUser")
            if (actualUser) await handleOnDelete(actualUser?.ID_user);
            closeDeleteModal();
            setUsers(await getUsers())

          }}>
            Sí, estoy seguro
          </Button>
          <Button color={mainColor} onClick={closeDeleteModal}>
            Cancelar
          </Button>
        </Flex>
      </Modal>


      {/*Modal de edicion*/}
      <Modal centered opened={editModal} onClose={closeEditModal} title="Cargar Usuario">
        <form onSubmit={editForm.onSubmit(handleOnEditUser)}>
          <Grid>
            <FormColumn
              form={editForm}
              inputType='text'
              name='email'
              label='Ingrese Email: '
              placeholder='ejemplo@gmail.com'
              span={12}
            />
            <FormColumn
              form={editForm}
              inputType='select'
              name='role'
              label='Ingrese Rol: '
              data={roleData}
              span={12}
            />
            <Grid.Col span={12}>
              <Button

                bg={mainColor}
                type='submit'

              >
                Editar Usuario
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      {/*modal de creacion */}
      <Modal opened={visible} onClose={close} title="Cargar Usuario">
        <form onSubmit={form.onSubmit(handleOnCreateUser)}>
          <Grid>
            <FormColumn
              form={form}
              inputType='text'
              name='email'
              label='Ingrese Email: '
              placeholder='ejemplo@gmail.com'
              span={12}
            />
            <FormColumn
              form={form}
              inputType='select'
              name='role'
              label='Ingrese Rol: '
              data={roleData}
              span={12}
            />
            <Grid.Col span={12}>
              <Button

                bg={mainColor}
                type='submit'
              >
                Cargar Usuario
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>


      <Flex
        id={props.id}
        direction={'column'}
        justify={'center'}
        align={'start'}
        gap={'lg'}
      >
        <Title>Usuarios</Title>
        <Text>Definir y administrar los usuarios y sus roles.</Text>
        <Table
          style={{
            border: '1px solid #e8e8e8',
            width: '500px',
            maxHeight: '200px',
          }}
        >
          <Table.Thead style={{}}>
            <Table.Tr>
              <Table.Td>Email</Table.Td>
              <Table.Td>Rol</Table.Td>
            </Table.Tr>

          </Table.Thead>
          <Table.Tbody>
            <UsersItems />
          </Table.Tbody>
        </Table>
        <Button bg={mainColor} disabled={currentUser?.role === "user"} onClick={open}>
          Cargar Usuario
        </Button>
      </Flex>
    </div>

  );
}

export default AddUsers;
