'use client';

import { TextInput, Button, Column, Row, FlexGrid, Tile, Dropdown } from '@carbon/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('validation.email_invalid'))
        .required(t('validation.email_required')),
      password: Yup.string()
        .min(8, t('validation.password_length'))
        .required(t('validation.password_required')),
    }),
    onSubmit: (values) => {
      router.push('/dashboard');
    },
  });

  const languageItems = [
    { text: t('languages.english'), id: 'en' },
    { text: t('languages.hindi'), id: 'hi' },
  ];

  const handleLanguageChange = ({ selectedItem }: { selectedItem: any }) => {
    if (selectedItem) {
      i18n.changeLanguage(selectedItem.id).then(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('selectedLanguage', selectedItem.id);
        }
      });
    }
  };

  return (
    <>
      
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
        backgroundColor: '#f4f4f4'
      }}>
        <Dropdown 
          id="language-selector"
          titleText={t('language')}
          label={t('select_language')}
          items={languageItems}
          itemToString={item => item ? item.text : ''}
          initialSelectedItem={languageItems.find(item => item.id === i18n.language) || languageItems[0]}
          onChange={handleLanguageChange}
          style={{ width: '200px' }}
        />
      </div>

      <Tile>
        <FlexGrid fullWidth className="grid-design">
          <h1>{t('login.title')}</h1>
          <form onSubmit={formik.handleSubmit}>
            
            <Row>
              <Column sm={2} md={4} lg={6}>
                <TextInput
                  id="email"
                  name="email"
                  labelText={t('login.email')}
                  placeholder={t('login.email_placeholder')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                ) : null}
              </Column>
            </Row>

            
            <Row>
              <Column sm={2} md={4} lg={6}>
                <TextInput
                  type="password"
                  id="password"
                  name="password"
                  labelText={t('login.password')}
                  placeholder={t('login.password_placeholder')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: 'red' }}>{formik.errors.password}</div>
                ) : null}
              </Column>
            </Row>
            <br />
            
            
            <Row>
              <Column sm={2} md={4} lg={6}>
                <Button type="submit" kind="primary">
                  {t('login.submit')}
                </Button>
              </Column>
            </Row>
          </form>
        </FlexGrid>
      </Tile>
    </>
  );
}