import {FormEvent, useEffect, useState} from 'react';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import {useToast} from '../../shared/hooks/useToast';
import {createUser, updateUser} from '../../services/paciente';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useModal} from '../../shared/hooks/useModal';
import {useRefresh} from '../../shared/hooks/useRefresh';
import CloseIcon from '@mui/icons-material/Close';
import {contornoStyle, radiStyle, titleStyle, typography1} from '../styles';
import {ModalContainer} from '../../components/ModalContainer';

export function CreateUser() {
  const {open, closeModal, setOpen, idObject} = useModal();
  const {actionToast} = useToast();
  const [isEdit, setIsEdit] = useState(0);

  const schema = yup
    .object({
      name: yup.string().required('Nome é um campo obrigatório'),
      surname: yup.string().required('Sobrenome é um campo obrigatório'),
      email: yup.string().required('Email é um campo obrigatório'),
      accessLevel: yup
        .number()
        .required('Nível de Acesso é um campo obrigatório'),
      password: isEdit
        ? yup.string()
        : yup.string().required('Senha é um campo obrigatório'),
      isActive: yup.boolean(),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    isEdit ? handleUpdateUser(data) : handleCreateUser(data);
  };

  useEffect(() => {
    if (idObject) {
      setValue('name', idObject.name);
      setValue('surname', idObject.surname);
      setValue('email', idObject.email);
      setValue('accessLevel', idObject.accessLevel);
      setValue('isActive', idObject.isActive);
      setIsEdit(1);
    } else {
      setIsEdit(0);
    }
  }, [idObject]);
  const {addCount} = useRefresh();

  const handleCreateUser = async (data: yup.InferType<typeof schema>) => {
    try {
      await createUser(data);
      actionToast({
        message: 'Usuário cadastrado com sucesso',
        type: 'success',
      });
      reset();
      addCount();
      closeModal();
    } catch (error: any) {
      actionToast({message: error.response.data.message, type: 'error'});
    }
  };

  const handleUpdateUser = async (data: yup.InferType<typeof schema>) => {
    try {
      await updateUser(idObject.id, data);
      actionToast({
        message: 'Usuário atualizado com sucesso',
        type: 'success',
      });
      reset();
      addCount();
      closeModal();
    } catch (error: any) {
      actionToast({message: error.response.data.message, type: 'error'});
    }
  };

  const handleCancel = async (event: FormEvent) => {
    event.preventDefault();
    reset();
    closeModal();
    setIsEdit(0);
  };

  return (
    <>
      <ModalContainer
        open={open}
        setOpen={setOpen}
        title={'Novo Usuário'}
        actions={false}
        maxWidth="xl">
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          sx={{
            position: 'absolute',
            right: 28,
            top: 18,
            color: theme => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
        <Typography sx={typography1}>DADOS DO USUÁRIO</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={contornoStyle}>
            <Typography sx={titleStyle}>Informações Pessoais:</Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 4,
                flexWrap: 'wrap',
                margin: '20px 0px 20px 0px',
              }}>
              <TextField
                label={errors.name?.message ?? 'Nome'}
                {...register('name')}
                error={!!errors.name?.message}
                size="small"
              />
              <TextField
                label={errors.surname?.message ?? 'Sobrenome'}
                {...register('surname')}
                error={!!errors.surname?.message}
                size="small"
              />
              <TextField
                label={errors.email?.message ?? 'Email'}
                {...register('email')}
                error={!!errors.email?.message}
                size="small"
              />
              {!isEdit && (
                <TextField
                  label={errors.password?.message ?? 'Senha'}
                  {...register('password')}
                  error={!!errors.password?.message}
                  size="small"
                />
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}>
                <Typography sx={{color: 'black'}}>Nível de Acesso :</Typography>

                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="accessLevel"
                    name="accessLevel"
                    defaultValue={idObject?.accessLevel}
                    sx={radiStyle}>
                    <FormControlLabel
                      value={1}
                      control={<Radio {...register('accessLevel')} />}
                      label="Administrativo"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio {...register('accessLevel')} />}
                      label="Comum"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio {...register('accessLevel')} />}
                      label="Convidado"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {!!isEdit && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}>
                  <Typography sx={{color: 'black'}}>Status :</Typography>

                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="isActive"
                      name="isActive"
                      defaultValue={idObject?.isActive}
                      sx={radiStyle}>
                      <FormControlLabel
                        value={true}
                        control={<Radio {...register('isActive')} />}
                        label="Ativo"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio {...register('isActive')} />}
                        label="Inativo"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{display: 'flex', justifyContent: 'flex-end', mt: 3, mr: 0.9}}>
            <Button onClick={handleCancel} sx={{mr: 1}}>
              Cancelar
            </Button>

            <Button type="submit" variant="contained">
              {isEdit ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </Box>
        </Box>
      </ModalContainer>
    </>
  );
}
