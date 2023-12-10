import '@mui/styled-engine'
import SendIcon from '@mui/icons-material/Send';
import SmsIcon from '@mui/icons-material/Sms';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Icon.css'
// Importez toutes les icônes nécessaires

const Icon = ({ value, size }) => {
    let valueToDisplay;

    switch (value) {
        case 'SendIcon':
            valueToDisplay = <SendIcon />;
            break;
        case 'SmsIcon':
            valueToDisplay = <SmsIcon />;
            break;
        case 'MoreVertIcon':
            valueToDisplay = <MoreVertIcon />;
            break;
        case 'DeleteIcon':
            valueToDisplay = <DeleteIcon />;
            break;
        case 'SearchIcon':
            valueToDisplay = <SearchIcon />;
            break; 
        case 'VisibilityIcon':
            valueToDisplay = <VisibilityIcon />;
            break;
        case 'LogoutIcon':
            valueToDisplay = <PowerSettingsNewRoundedIcon style={{ fontSize: size }}/>;
            break;
        case 'ArrowBackIosIcon':
            valueToDisplay = <ArrowBackIosRoundedIcon style={{ fontSize: size }}/>;
            break;
        case 'AddCircleIcon':
            valueToDisplay = <AddCircleIcon />;
            break;
    
        default:
            valueToDisplay = <span>Icon non trouvé</span>;
            break;
    }

    return valueToDisplay;
};

export default Icon;