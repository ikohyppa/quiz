import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    margin: '20px',
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black'
      },
      '&:hover fieldset': {
        borderColor: 'red'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green'
      }
    }
  }
});
