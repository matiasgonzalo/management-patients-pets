import React from 'react';
import styles from './customModal.module.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Image from '../../assets/img/dog.jpg';
import PropTypes from 'prop-types';

class CustomModal extends React.Component 
{
    static propTypes = {
        cita: PropTypes.object,
    }

    handleClose = () => {
        this.props.handleClose(false);
    }

    render() {
        const cita = this.props.cita;
        const optionsDate = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            timeZone: 'America/Los_Angeles' 
          };
        const optionsTime = {
            hour: 'numeric', minute: 'numeric',
            hour12: true,
        };
        return ( 
            <>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={styles.modal}
                    open={this.props.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.props.open}>
                        <Card className={styles.root}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={Image}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {cita.mascota}
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        {'Síntomas: '}
                                    </Typography>
                                    <Typography className={styles.pos} color="textSecondary" component="p">
                                        {cita.sintomas}
                                    </Typography>
                                    <Typography className={styles.pos} color="textPrimary" variant="body2">
                                        {'Fecha y Hora de la Cita: '}
                                    </Typography>
                                    <Typography className={styles.pos} color="textSecondary" component="p">
                                        {`${new Intl.DateTimeFormat('en-US', optionsDate).format(cita.fecha)} | ${new Intl.DateTimeFormat('en-US', optionsTime).format(cita.hora)}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Fade>
                </Modal>
            </>
         );
    }
}

export default CustomModal;