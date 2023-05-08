import * as React from 'react';
import { Button, Typography } from '@mui/material';
import {
  //QuestionCircleOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import Stack from '@mui/system/Stack';
import FocusTrap from '@mui/base/FocusTrap';

const SimplePopover = ({ buttonTitle, content }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <span>
      {open ? <br></br> : <span></span>}
      <FocusTrap open={open} disableRestoreFocus disableAutoFocus>
        <Stack alignItems="center" spacing={3} direction="row" justifyContent="baseline">
          <Button type="button" variant="secondary" onClick={() => setOpen(!open)}>
            {open ? (
              <span>
                <UpOutlined /> <b>{buttonTitle}</b>
              </span>
            ) : (
              <span>
                <DownOutlined /> <b>{buttonTitle}</b>
              </span>
            )}
          </Button>
          {open && <Typography>{content}</Typography>}
        </Stack>
      </FocusTrap>
      {open ? <br></br> : <span></span>}
    </span>
  );
};

export default SimplePopover;
