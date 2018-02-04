import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }
  handlePhone = (e) => {
    this.setState({
      phone: e.target.value,
    })
  };
  render() {
    const {
      handleFormSubmit,
    } = this.props;
    const {
      phone,
    } = this.state;
    return (
      <div>
        <Button
          color="primary"
          raised
          onClick={() => handleFormSubmit(phone)}
        >
          확인
        </Button>
      </div>
    )
  }
}
export default Form;
