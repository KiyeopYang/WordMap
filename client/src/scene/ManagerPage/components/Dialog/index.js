import React from 'react';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import ControlPanel from '../../components/ControlPanel';
import ImageTileList from './components/ImageTileList';
import ImageXaxisList from './components/ImageXaxisList';
import FullSizeImage from './components/FullSizeImage';
import Options from './components/Options';
import './styles.css';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolbar: {
    paddingRight: 2,
  },
  title: {
    flex: '0 0 auto',
  },
  form: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  formInput: {
    marginBottom: theme.spacing.unit,
  },
  imgAddButton: {
    margin: theme.spacing.unit,
  },
});
function isError(obj, value) {
  let r =
    obj.formOptionsRestriction === true
    && value !== undefined
    && value !== null
    && obj.formOptions.findIndex(o => o.value === obj.value) < 0;
  if (value === '') {
    r = !!obj.required;
  }
  return r;
}
function initialize(structure, item) {
  const newArr = [];
  structure.forEach((o) => {
    const obj = o;
    let value;
    if (item) {
      value = _.get(item, o.key);
    } else {
      value = o.defaultValue || '';
    }
    obj.value = value;
    obj.error = isError(o, value);
    newArr.push(obj);
  });
  return newArr;
}
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    const initState = initialize(props.itemStructure, props.item);
    this.state = {
      inputs: initState,
      showImagePicker: false,
      showFullSizeImage: false,
      fullSizeImage: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickControls = this.handleClickControls.bind(this);
    this.handleOpenFullSizeImage = this.handleOpenFullSizeImage.bind(this);
    this.handleCloseFullSizeImage = this.handleCloseFullSizeImage.bind(this);
  }
  componentDidMount() {
    if (this.props.mode === 'modify') {
      this.props.requestItem(this.props.match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const initState = initialize(nextProps.itemStructure, nextProps.item);
    this.setState({
      inputs: initState,
    });
  }
  handleInputChange(value, key) {
    this.setState((prevState) => {
      const prevInputs = prevState.inputs;
      const found = prevInputs.find(o => o.name === key);
      found.value = value;
      found.error = isError(found, value);
      if (found.filterTo) {
        const f = prevInputs.find(o => o.name === found.filterTo);
        f.value = '';
      }
      return { inputs: prevInputs };
    });
  }
  handleClickControls(clicked) {
    const result = {};
    this.state.inputs.forEach(o =>
      _.set(result, o.target, o.value)
    );
    switch (clicked) {
      default:
        this.props.handleClickControls(clicked, result);
        break;
    }
  }
  handleOpenFullSizeImage(image) {
    this.setState({
      showFullSizeImage: true,
      fullSizeImage: image,
    });
  }
  handleCloseFullSizeImage() {
    this.setState({
      showFullSizeImage: false,
    });
  }
  render() {
    const {
      classes, title, item, mode
    } = this.props;
    const {
      inputs: inputState,
    } = this.state;
    const inputs = [];
    inputState.forEach((i) => {
      if (!i.form) {
        inputs.push(
          <TextField
            key={i.name}
            id={i.name}
            label={i.name}
            type={i.type === 'number' ? 'number' : undefined}
            className={classes.formInput}
            multiline={i.multiline}
            fullWidth
            value={!item && i.value === '' ? i.defaultValue || '' : i.value || ''}
            disabled={i.readOnly}
            onChange={e => this.handleInputChange(
              i.onlyNumber ? e.target.value.replace(/\D/g, '') : e.target.value, i.name)}
          />
        );
      } else if (i.form === 'selection') {
        let options = i.formOptions;
        if (i.filteredBy) {
          options = [];
          const found = inputState.find(o => o.name === i.filteredBy);
          if (found && found.value) {
            options = i.formOptions.filter(o => o.filter === found.value);
          }
        }
        inputs.push(
          <TextField
            key={i.name}
            id={i.name}
            label={i.name}
            select
            className={classes.formInput}
            fullWidth
            value={!item && i.value === '' ? i.defaultValue : i.value ? i.value : ''}
            disabled={i.readOnly}
            onChange={e => this.handleInputChange(e.target.value, i.name)}
          >
            {
              options.map(option => (
                <MenuItem key={`${option.label}`} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
          </TextField>
        );
      } else if (i.form === 'pictures') {
        inputs.push(
          <div key={i.name}>
            <Button
              color="primary"
              aria-label="add"
              className={classes.imgAddButton}
              raised
              onClick={
                () => this.setState({ showImagePicker: true })
              }
            >
              이미지
              <AddIcon />
            </Button>
            {
              i.value && i.value.length ?
                <div>
                  <h4>이미지 개수 : {i.value.length}</h4>
                  <ImageXaxisList
                    images={i.value}
                    handleClickImage={this.handleOpenFullSizeImage}
                  />
                </div>
                  : null

            }
            <ImageTileList
              dialog
              selection
              show={this.state.showImagePicker}
              images={i.formOptions}
              handleRequestClose={() => this.setState({ showImagePicker: false })}
              handleOpenFullSizeImage={this.handleOpenFullSizeImage}
              handleImageSelect={s => this.handleInputChange(s, i.name)}
            />
          </div>
        );
      } else if (i.form === 'options') {
        inputs.push(<Options
          key={i.name}
          title={i.name}
          options={i.value}
          handleOptionChange={o => this.handleInputChange(o, i.name)}
        />);
      }
      inputs.push(<br key={`${i.name}br`} />);
    });
    return (
      <div>
        <ControlPanel
          handleClickControls={this.handleClickControls}
          noRemove={!item}
          mode={mode}
          cannotSave={inputState.map(o => o.error).reduce((a, c) => {
            return !!(a || c);
          })}
        />
        <Paper className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography type="title">{title}</Typography>
            </div>
          </Toolbar>
          <form className={classes.form}>
            { inputs }
          </form>
        </Paper>
        <FullSizeImage
          show={this.state.showFullSizeImage}
          image={this.state.fullSizeImage}
          handleRequestClose={this.handleCloseFullSizeImage}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Dialog);
