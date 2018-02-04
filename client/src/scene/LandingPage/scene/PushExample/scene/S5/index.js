import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Typist from 'react-typist';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import prefixer from "../../../../../../modules/prefixer";

const styles = theme => prefixer({
  img: {
    width: '30vw',
    maxWidth: '200px',
    height: 'auto',
    cursor: 'pointer',
    padding: 1,
  },
  selected: {
    border: '1px solid black',
    padding: 0,
  },
});

class S5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  render() {
    const { classes, shirts, } = this.props;
    return (
      <div>
        <Typist cursor={{ show: false }}>
          <h1>
            {`구매할 상품을 선택하십시요.`}
          </h1>
        </Typist>
        <div>
          {
            shirts.map(shirt => (
              <img
                key={shirt.src}
                className={
                  this.state.selected === shirt.src ?
                    classNames(classes.img, classes.selected) : classes.img
                }
                alt={shirt.alt}
                src={shirt.src}
                onClick={() => this.setState({
                  selected: shirt.src,
                })}
              />
            ))
          }
        </div>
        <Typography
          type="title"
          align="center">
          {
            this.state.selected ?
              shirts.find(o => o.src === this.state.selected).alt : '선택 중'
          }
        </Typography>
        <Button
          color="primary"
          onClick={() => this.props.onSubmit(this.state.selected)}
          raised
          disabled={!this.state.selected}
        >
          구매
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(S5)));
