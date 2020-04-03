import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Formulario from './components/Formulario/Formulario';
import styles from './app.module.css';
import Cita from './components/Cita/Cita';
import List from '@material-ui/core/List';
import CustomModal from './components/CustomModal/CustomModal';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

class App extends React.Component
{

  state = {
      citas: [],
      title: '',
      cita: {},
      open: false,
  }
  
  componentDidMount() {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales) {
      citasIniciales = [];
      this.setState(() => {
        return {
          citas: citasIniciales
        }
      })
    }else{
      citasIniciales.map(cita => {
        cita.fecha = new Date(cita.fecha);
        cita.hora = new Date(cita.hora);
        return cita;
      });
      this.setState(() => {
        return {
          citas: citasIniciales
        }
      })
    }
    
    if(this.state.citas.length === 0 ){
      this.setState(() => {
        return {
          title: 'No tienes citas'
        }
      })
    }else{
      this.setState(() => {
        return {
          title: 'Administra tus citas'
        }
      })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  createCita = cita => {
    let citas = this.state.citas;
    citas.push(cita);
    this.setState(() => {
      return {
        citas
      }
    });
    this.setState(() => {
      return {
        title: 'Administra tus citas'
      }
    });
  }

  deleteCita = id => {
    const newsCitas = this.state.citas.filter(cita => cita.id !== id);
    this.setState(() => {
      return {
        citas: newsCitas
      }
    });
    if(newsCitas.length === 0 ){
      this.setState(() => {
        return {
          title: 'No tienes citas'
        }
      })
    }
  }

  handleOpen = cita => {
    this.setState(() => {
      return {
        cita
      }
    });
    this.setState(() => {
      return {
        open:true
      }
    });
  }

  handleClose = newState => {
    this.setState(() => {
      return {
        open:newState
      }
    });
  }

  render() {
    return (
      <Fragment>
        <AppBar position="relative" className={styles.header}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"  
            >  
            </IconButton>
            <Typography variant="h6" noWrap>
              Administrador de pacientes mascotas
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={styles.root}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={10} sm={5} lg={4} xl={4}>
              <Paper className={styles.paper} elevation={3}>
                <Formulario createCita={this.createCita}/>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={5} lg={4} xl={4}>
              <Paper className={styles.paper} elevation={3}>
              <Typography justify="center" className={styles.subtitle} component="h1" variant="h6">{this.state.title}</Typography>
                <div className={styles.demo}>
                  <List dense>
                    {this.state.citas.map(cita => (
                      <Cita
                        key={cita.id}
                        cita={cita}
                        deleteCita={this.deleteCita}
                        handleOpen={this.handleOpen}
                      />
                    ))}
                    </List>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <CustomModal cita={this.state.cita} open={this.state.open} handleClose={this.handleClose}/>
      </Fragment>
    );
  }
}

export default App;
