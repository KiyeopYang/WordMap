import React from 'react';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import DoneIcon from 'material-ui-icons/Done';
import SettingIcon from 'material-ui-icons/Settings';

import Adder from './components/Adder';
import List from './components/List';

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyMode: false,
      selections: this.props.option.selections || [],
    };
    this.addSelection = this.addSelection.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      modifyMode: false,
      selections: nextProps.option.selections || [],
    });
  }
  addSelection(selection) {
    if (selection.name !== '' && this.state.selections.findIndex(o => o.name === selection.name) < 0) {
      this.setState({
        selections: this.state.selections && this.state.selections.length
          ? this.state.selections.concat(selection) : [selection],
      });
    }
  }
  render() {
    const { handleModify, handleDelete, option, canModify } = this.props;
    const { modifyMode, selections } = this.state;
    return (
      <div>
        <Typography type="title">
          { this.props.option.name }
          {
            canModify && modifyMode ?
              <IconButton>
                <DoneIcon onClick={() => {
                  this.setState({ modifyMode: false });
                  handleModify({
                    name: option.name,
                    selections,
                  });
                }}
                />
              </IconButton> :
              canModify && !modifyMode ?
                <div>
                  <IconButton>
                    <SettingIcon onClick={() => this.setState({ modifyMode: true })} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon
                      onClick={() => handleDelete(option.name)}
                    />
                  </IconButton>
                </div> : null
          }
        </Typography>
        { modifyMode ? <Adder handleAdd={this.addSelection} /> : null }
        { selections && selections.length ?
          <List list={selections} /> : null
        }
      </div>
    );
  }
}
export default Option;
