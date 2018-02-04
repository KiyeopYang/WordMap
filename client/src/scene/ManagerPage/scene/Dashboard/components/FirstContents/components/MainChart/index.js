import React from 'react';
import { withStyles } from 'material-ui/styles';
import Plot from 'react-plotly.js';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Radio, { RadioGroup } from 'material-ui/Radio';

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  period: {
    width: '100px',
  },
};
class MainChart extends React.Component {
  render() {
    const {
      classes,
      view,
      isCumulative,
      switchCumulative,
      date,
      showData,
      graph,
      handleDateSelectionChange,
      handleShowDataChange,
      handleGraphChange,
    } = this.props;
    return (
      <div>
        {
          view ?
            <Plot
              {...view}
            /> : null
        }
        <div className={classes.form}>
          <FormControl component="fieldset">
            <FormGroup>
              <FormLabel component="legend">
                조회 옵션
              </FormLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={isCumulative}
                    onChange={
                      (event, checked) =>
                        switchCumulative(checked)
                    }
                  />
                }
                label="누적 보기"
              />
              <FormControl
                margin="normal"
                className={classes.period}
              >
                <InputLabel htmlFor="date">기간 선택</InputLabel>
                <Select
                  value={date}
                  onChange={e =>
                    handleDateSelectionChange(e.target.value)}
                  inputProps={{
                    name: 'date',
                    id: 'date',
                  }}
                >
                  <MenuItem value={'all'}>전체</MenuItem>
                  <MenuItem value={'7'}>7일</MenuItem>
                  <MenuItem value={'30'}>30일</MenuItem>
                  <MenuItem value={'90'}>90일</MenuItem>
                  <MenuItem value={'180'}>180일</MenuItem>
                  <MenuItem value={'365'}>365일</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              기기
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showData.all}
                    onChange={handleShowDataChange('all')}
                    value="all"
                  />
                }
                label="전체"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showData.desktop}
                    onChange={handleShowDataChange('desktop')}
                    value="desktop"
                  />
                }
                label="데스크탑"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showData.mobile}
                    onChange={handleShowDataChange('mobile')}
                    value="mobile"
                  />
                }
                label="모바일"
              />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">그래프</FormLabel>
            <RadioGroup
              aria-label="graph"
              name="graph1"
              className={classes.group}
              value={graph}
              onChange={handleGraphChange}
            >
              <FormControlLabel value="line" control={<Radio />} label="선" />
              <FormControlLabel value="bar" control={<Radio />} label="막대" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(MainChart);
