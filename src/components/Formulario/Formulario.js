import 'date-fns';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import PetsIcon from '@material-ui/icons/Pets';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextareaAutosize } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ValidatedDatePicker, { ValidatedTimePicker } from './ValidatedPicker';
import {v4 as uuid} from 'uuid';
import styles from './formulario.module.css';

class Formulario extends React.Component 
{
  state = {
    cita: {
      mascota: '',
      propietario: '',
      fecha: new Date(),
      hora: new Date(),
      sintomas: '',
    },
    disabled: false
  };

  handleDateChange = date => {
    this.setState(() => {
      return {
        cita: {
          ...this.state.cita,
          fecha: date,
          hora: date
        }
      }
    });
  }

  handlerChange = event => {
    const {name, value} = event.target;
    this.setState(() => {
      return {
        cita: {
          ...this.state.cita,
          [name]: value
        }
      }
    })
  }
  
  submitCita = event => {
    event.preventDefault();
    const { disabled } = this.state.cita;
    //validar
    if(!this.form.isValid || disabled) {
      this.setState(() => {
        return {
          disabled: true
        }
      });
    }
    //asignar un id
    let cita = this.state.cita;
    cita.id = uuid();
    //crear la cita
    this.props.createCita(this.state.cita);
    //reiniciar el form
    this.setState(() => {
      return {
        cita: {
          mascota: '',
          propietario: '',
          fecha: new Date(),
          hora: new Date(),
          sintomas: ''
        }
      }
    });
    this.form.resetValidations();
  }

  validatorListener = result => {
    this.setState(() => {
      return {
        disabled: !result
      }
    });
  }

  render() {
    const { error, helperText } = this.props;
    const { isValid } = this.state.cita;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <PetsIcon className={styles.icon}/>
          </Avatar>
          <Typography component="h1" variant="h6"> Crear Cita
          </Typography>
          <ValidatorForm onSubmit={this.submitCita} ref={r => (this.form = r)} className={styles.form} noValidate>
            <TextValidator
              margin="normal"
              required
              fullWidth
              id="mascota"
              label="Nombre de la Mascota"
              name="mascota"
              autoComplete="mascota"
              onChange={this.handlerChange}
              value={this.state.cita.mascota}
              autoFocus
              placeholder="Nombre de la Mascota"
              error={isValid || error}
              helperText={(!isValid && this.errorMessage) || helperText}
              validators={['required','minStringLength:2', 'maxStringLength:40', 'isString']}
              errorMessages={['El nombre de la mascota es requerido','Debe tener como mínimo 2 letras', 'Debe tener como máximo 40 letras', 'Debe ser una cadena de caracteres']}
              validatorListener={this.validatorListener}
            />
            <TextValidator
              margin="normal"
              required
              fullWidth
              name="propietario"
              label="Nombre del Dueño"
              id="propietario"
              autoComplete="propietario"
              onChange={this.handlerChange}
              value={this.state.cita.propietario}
              placeholder="Nombre del Dueaño"
              error={isValid || error}
              helperText={(!isValid && this.errorMessage) || helperText}
              validators={['required','minStringLength:4', 'maxStringLength:60', 'isString']}
              errorMessages={['El nombre del propietario es requerido','Debe tener como mínimo 4 letras', 'Debe tener como máximo 60 letras', 'Debe ser una cadena de caracteres']}
              validatorListener={this.validatorListener}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ValidatedDatePicker
                  margin="normal"
                  required
                  fullWidth
                  label="Fecha"
                  format="MM/dd/yyyy"
                  value={ this.state.cita.fecha }
                  onChange={ this.handleDateChange }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  placeholder="Fecha"
                  error={isValid || error}
                  helperText={(!isValid && this.errorMessage) || helperText}
                  validators={['required']}
                  errorMessages={['La fecha es requerida']}
                  validatorListener={this.validatorListener}
                />
                <ValidatedTimePicker
                  margin="normal"
                  required
                  fullWidth
                  id="time-picker"
                  label="Hora"
                  value={ this.state.cita.hora }
                  onChange={ this.handleDateChange }
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  placeholder="Hora"
                  error={isValid || error}
                  helperText={(!isValid && this.errorMessage) || helperText}
                  validators={['required']}
                  errorMessages={['La hora es requerida']}
                  validatorListener={this.validatorListener}
                />
            </MuiPickersUtilsProvider>
            <TextareaAutosize
              className={styles.textarea}
              label="Síntomas"
              rowsMin={3}
              name="sintomas"
              rowsMax={4}
              onChange={this.handlerChange}
              value={this.state.cita.sintomas}
              aria-label="maximum height"
              placeholder="Síntomas reconocidos..."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={this.state.disabled}
              className={styles.submit}
            > Agregar Cita
            </Button>
          </ValidatorForm>
        </div>
      </Container>
    )
  }
}

export default Formulario;
