import { Button, Flex, Modal } from '@mantine/core';
import styles from './delete-modal.module.css';
import { useContext } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';

interface props{
  opened: boolean;
  onClose: () => void;
  handleOnDelete: () => void;
}
export function DeleteModal(props: props) {
  const mainColor = useContext(MainColorContext);
  return (
    <Modal
          opened={props.opened}
          onClose={props.onClose}
          title="¿Seguro quiere borrar este registro?"
          centered
        >
          <Flex gap="xl" justify="center" align="center">
            <Button variant="light" color={mainColor} onClick={props.handleOnDelete}>
              Sí, estoy seguro
            </Button>
            <Button
              variant="filled"
              color={mainColor}
              onClick={props.onClose}
            >
              Cancelar
            </Button>
          </Flex>
        </Modal>
  );
}

export default DeleteModal;
