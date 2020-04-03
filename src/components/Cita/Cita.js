import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DogIcon from '@material-ui/icons/Pets';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import styles from './cita.module.css';
import PropTypes from 'prop-types';

class Cita extends React.Component 
{
    static propTypes = {
        cita: PropTypes.object,
    }

    handleOpen = () => {
        this.props.handleOpen(this.props.cita);
    };    

    render() {
        const { cita, deleteCita } = this.props;
        return (
            <ListItem button onClick={this.handleOpen}>
                <ListItemAvatar>
                    <Avatar className={styles.avatar}>
                        <DogIcon />
                    </Avatar>
                    </ListItemAvatar>
                <ListItemText
                primary={cita.mascota}
                secondary={cita.propietario ? cita.propietario : null}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={ () => deleteCita(cita.id) }>
                        <DeleteIcon className={styles.icon}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Cita;