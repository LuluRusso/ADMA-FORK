import { UseFormReturnType } from '@mantine/form';
import styles from './hour-select.module.css';
import { NativeSelect } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useEffect, useState } from 'react';
interface props{
  
  form: UseFormReturnType<any>;
}
export function HourSelect(props: props) {
    const maxAppoinmentsPerHour = 10;
    const [disabledSelects, setDisabledSelects] = useState<boolean[]>([
      false,
      false,
      false,
    ]);
    const fetchDisabledHours = async () => {
      if (!props.form.values.date) return;
      const hours = [8, 10, 12];
      const results: boolean[] = [];

      for (let hour of hours) {
        try {
          
          const res = await axios.get('http://localhost:3000/api/appoinment', {
            params: { byHour: `${hour}:00`, byDate: props.form.values.date },
          });

          results.push(res.data.length > maxAppoinmentsPerHour);
        } catch (err) {
          console.error(err);
          results.push(true);
        }
      }

      setDisabledSelects(results);
      if (results.includes(true) && !results.includes(false))
        notifications.show({
          title: 'Sin horarios disponibles',
          message:
            'La fecha seleccionada tiene todos los horarios en su maxima capacidad.',
          color: 'red',
        });
      else if (results.includes(true))
        notifications.show({
          title: 'Algunos horarios no estan disponibles',
          message:
            'En la fecha seleccionada, algunos horarios estan en su maxima capacidad.',
          color: 'yellow',
        });
    };
    useEffect(() => { 
      fetchDisabledHours();
    }, [props.form.values.date]);
  if (props.form.values.date) {
      return (
        <NativeSelect
          label="Hora: "
          key={props.form.key('hour')}
          {...props.form.getInputProps('hour')}
          required
        >
          <option value="" disabled>
            Seleccione Horario
          </option>
          <option value="8:00" disabled={disabledSelects[0]}>
            8:00
          </option>
          <option value="10:00" disabled={disabledSelects[1]}>
            10:00
          </option>
          <option value="12:00" disabled={disabledSelects[2]}>
            12:00
          </option>
        </NativeSelect>
      );
    } else {
      return (
        <NativeSelect label="Hora: " defaultValue="">
          <option value="">Primero debe seleccionar una fecha</option>
        </NativeSelect>
      );
    }
}

export default HourSelect;
