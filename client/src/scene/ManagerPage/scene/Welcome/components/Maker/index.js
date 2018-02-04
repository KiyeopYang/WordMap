import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Cropper from '../Cropper';

const styles = theme => ({
  listSection: {
    backgroundColor: 'inherit',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  layout: {
    margin: theme.spacing.unit,
    maxWidth: 550,
    width: '100%',
  },
  input: {
    display: 'none',
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});
class Maker extends React.Component {
  render() {
    const {
      classes,
      title,
      body,
      iconUrlNotForSend,
      redirectUrl,
      isCropOpen,
      handleInputChange,
      handleImgUpload,
      handleCroppedImg,
    } = this.props;
    return (
      <div className={classes.form}>
        <FormControl
          className={classes.layout}
          fullWidth
          aria-describedby="title-helper-text"
        >
          <InputLabel
            htmlFor="title-helper"
          >
            타이틀
          </InputLabel>
          <Input
            id="title-helper"
            value={title}
            onChange={handleInputChange('title')}
          />
          <FormHelperText
            id="title"
          >
            알림의 상단부에 위치하는 타이틀입니다. 타이틀이 장문일 경우 기기에 따라 일정 부분만 표시될 수 있습니다.
          </FormHelperText>
        </FormControl>
        <FormControl
          className={classes.layout}
          fullWidth
          aria-describedby="body-helper-text"
        >
          <InputLabel
            htmlFor="body-helper"
          >
            메시지
          </InputLabel>
          <Input
            id="body-helper"
            value={body}
            onChange={handleInputChange('body')}
          />
          <FormHelperText
            id="body"
          >
            알림의 중간 부분에 표시되는 본문입니다. 본문이 장문일 경우 기기에 따라 일정 부분만 표시될 수 있습니다.
          </FormHelperText>
        </FormControl>
        <FormControl
          className={classes.layout}
          fullWidth
          aria-describedby="redirectUrl-helper-text"
        >
          <InputLabel
            htmlFor="redirectUrl-helper"
          >
            클릭 이벤트
          </InputLabel>
          <Input
            id="redirectUrl-helper"
            value={redirectUrl}
            onChange={handleInputChange('redirectUrl')}
          />
          <FormHelperText
            id="redirectUrl"
          >
            알림을 클릭하였을 시 연결되는 주소입니다. http 또는 https를 포함한 주소 전체를 입력 해 주십시요.
          </FormHelperText>
        </FormControl>
        <FormControl
          className={classes.layout}
          fullWidth
          aria-describedby="icon-helper-text"
        >
          <Typography>
            이미지
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            type="file"
            onChange={handleImgUpload}
          />
          <label htmlFor="raised-button-file">
            <Button
              color="primary"
              id="btn"
              raised
              component="span"
              className={classes.button}
            >
              이미지 업로드
            </Button>
          </label>
          <FormHelperText
            id="icon"
          >
            알림의 좌측편에 표시되는 작은 이미지 혹은 아이콘입니다.
          </FormHelperText>
        </FormControl>
        {
          isCropOpen ?
            <div className={classes.layout}>
              <Cropper
                icon={iconUrlNotForSend}
                handleCroppedImg={handleCroppedImg}
              />
            </div> : null
        }
      </div>
    );
  }
}
export default withStyles(styles)(Maker);
