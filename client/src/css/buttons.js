import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  outlinedButton: {
    background: '#cad6ec',
    borderWidth: '3px',
    borderColor: 'green',
    borderRadius: 3,
    boxShadow: '1px 1px 1px 1px',
    color: 'green',
    height: 48,
    padding: '0 30px',
    margin: '20px'
  },

  quizButton: {
    background: '#1E90FF',
    border: '0',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '20px'
  },

  topBarButton: {
    edge: 'start',
    background: '#1E90FF',
    border: 0,
    borderRadius: 20,
    boxShadow: '0 3px 5px 2px #00BFFF',
    color: 'white',
    height: 50,
    padding: '0 30px',
    margin: '0 70px'
  }
});
