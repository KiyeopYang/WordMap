import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Option from './components/Option';
import OptionMaker from './components/OptionMaker';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyMode: false,
      options: this.props.options || [],
    };
    this.addNewOption = this.addNewOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.modifyOption = this.modifyOption.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ options: nextProps.options || [] });
  }
  addNewOption(name) {
    if (name !== '' && this.state.options.findIndex(o => o.name === name) < 0) {
      this.setState({
        options: this.state.options.concat({ name }).reverse(),
      });
    }
  }
  deleteOption(name) {
    const index = this.state.options.findIndex(o => o.name === name);
    if (index > -1) {
      const options = JSON.parse(JSON.stringify(this.state.options));
      options.splice(index, 1);
      this.setState({
        options,
      });
    }
  }
  modifyOption(option) {
    const index = this.state.options.findIndex(o => o.name === option.name);
    if (index > -1) {
      const options = JSON.parse(JSON.stringify(this.state.options));
      options.splice(index, 1, option);
      this.setState({
        options,
      });
    }
  }
  handleModify() {
    this.setState({ modifyMode: false });
    this.props.handleOptionChange(this.state.options);
  }
  handleCancel() {
    this.setState({ modifyMode: false });
    this.setState({ options: this.props.options || [] });
  }
  render() {
    const { classes, title } = this.props;
    const { modifyMode, options } = this.state;
    return (
      <div>
        <Typography>{title}</Typography>
        {
          modifyMode ?
            <div>
              <Button
                className={classes.button}
                color="primary"
                raised
                onClick={this.handleModify}
              >수정 완료
              </Button>
              <Button
                className={classes.button}
                color="primary"
                onClick={this.handleCancel}
              >취소
              </Button>
              <OptionMaker
                handleInsert={this.addNewOption}
              />
              {
                options.map(o => (
                  <Option
                    key={o.name}
                    option={o}
                    canModify={modifyMode}
                    handleDelete={this.deleteOption}
                    handleModify={this.modifyOption}
                  />
                ))
              }
            </div> :
            <div>
              <Button
                className={classes.button}
                color="primary"
                onClick={() => this.setState({ modifyMode: true })}
              >수정
              </Button>
              {
                options.map(o => (
                  <Option
                    key={o.name}
                    option={o}
                    canModify={modifyMode}
                    handleDelete={this.deleteOption}
                    handleModify={this.modifyOption}
                  />
                ))
              }
            </div>
        }
      </div>
    );
  }
}
export default withStyles(styles)(Options);
