import { Box, Flex, TableOfContents } from '@mantine/core';
import styles from './settings.module.css';
import AddUsers from './sections/data-entities/add-users/add-users';
import { useContext } from 'react';
import { MainColorContext } from '../../contexts/color-context';
import Sesion from './sections/sesion/sesion';
import AddNeighborhood from './sections/data-entities/add-neighborhood/add-neighborhood';
import AddReason from './sections/data-entities/add-reason/add-reason';
import AddSpecie from './sections/data-entities/add-specie/add-specie';
import GlobalVariables from './sections/global-variables/global-variables';
import AddVeterinarian from './sections/data-entities/add-veterinarian/add-veterinarian';
import { AddappointmentSchedule } from './sections/data-entities/add-custom-appointment-schedule/add-custom-appointment-schedule';

export function Settings() {
  const mainColor = useContext(MainColorContext);
  return (
    <Flex justify={'center'} align={'start'} direction={'row'} gap={'xl'}>
      <Box
        style={{
          marginTop: '50px',
          paddingLeft: '20px',
          width: '240px',
          borderLeft: `1px solid ${mainColor}aa`,
          position: 'sticky',
          top: '150px',
          alignSelf: 'flex-start',
          maxHeight: 'calc(100vh - 40px)',
        }}
      >
        <TableOfContents
          style={{ paddingRight: '20px' }}
          getControlProps={({ data }) => ({
            onClick: () => data.getNode().scrollIntoView(),
            children: data.value,
          })}
          size="sm"
          minDepthToOffset={0}
          depthOffset={40}
          classNames={styles}
        />
      </Box>

      <Flex
        h={'120%'}
        w={'50%'}
        direction={'column'}
        gap={'xl'}
        style={{ marginBottom: '700px' }}
      >
        <AddUsers />
        <AddNeighborhood />
        <AddReason />
        <AddSpecie />
        <AddVeterinarian />
        <AddappointmentSchedule />
        <GlobalVariables />
        <Sesion />
      </Flex>
    </Flex>
  );
}

export default Settings;
