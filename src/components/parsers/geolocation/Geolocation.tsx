import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';

import { api } from '../../../services/api';
import { geolocationValidation } from './geolocation-validation-schema';

import Map from '../../Map/Map';
import DraggableCircle from '../../Map/DraggableCircle';
import SearchControl from '../../Map/SearchControl';
import RoundRadio from '../../ui/roundRadio/RoundRadio';
import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';

import styles from './geolocation.module.sass';
import sharedStyles from '../index.module.sass';

const RADIUSES = [500, 1000, 2000, 3000, 5000] as const;

type FormValues = {
  radius: (typeof RADIUSES)[number];
  name: string;
  marker: [number, number] | null;
};

const Geolocation = () => {
  const isDisabled = useOutletContext<boolean>();
  const [isFetching, setIsFetching] = useState(false);

  const initialValues: FormValues = {
    radius: RADIUSES[0],
    name: '',
    marker: null,
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    setIsFetching(true);
    api
      .post('/telegram/parser/geomembers', {
        task_name: values.name,
        coordinates: [
          {
            latitude: values.marker?.[0],
            longitude: values.marker?.[1],
          },
        ],
        accuracy_radius: values.radius,
        //TODO
        rerun: false,
      })
      .then(() => actions.resetForm())
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={geolocationValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className={sharedStyles.form}>
            <div>
              <h3 className={sharedStyles.header}>Геоточка</h3>
              <div className={styles.mapWrapper}>
                <Map
                  width="610px"
                  height="344px"
                  center={[55.7504461, 37.6174943]}
                  zoom={12}
                >
                  {
                    <>
                      <SearchControl
                        setMarker={(coordinates) =>
                          setFieldValue('marker', coordinates)
                        }
                      />
                      {values.marker && (
                        <DraggableCircle
                          radius={values.radius}
                          center={values.marker}
                          setMarker={(coordinates) =>
                            setFieldValue('marker', coordinates)
                          }
                        />
                      )}
                    </>
                  }
                </Map>
              </div>
              <div className={sharedStyles.errorMessage}>
                {errors.marker && touched.marker ? errors.marker : ''}
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>
                Радиус действия геоточки (метры)
              </h3>
              <div className={styles.radiusSelect}>
                {RADIUSES.map((radius) => (
                  <RoundRadio
                    key={radius}
                    title={String(radius)}
                    name="radius"
                    value={String(radius)}
                    currentValue={String(values.radius)}
                    radioHandler={handleChange}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>Название задачи</h3>
              <TextInput
                style={{ maxWidth: '610px' }}
                name="name"
                type="text"
                placeholder="Придумайте название задачи"
                hintMessage="Название будет видно только Вам"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.name && touched.name ? errors.name : ''}
              />
            </div>
            <Button
              style={{ maxWidth: '610px' }}
              variant={isDisabled ? 'additional' : 'accent'}
              type="submit"
              disabled={isFetching || isDisabled}
            >
              {isDisabled
                ? 'Недоступно для вашего тарифа'
                : 'Начать сбор аудитории'}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Geolocation;
