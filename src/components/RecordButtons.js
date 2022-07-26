import Edit from '@mui/icons-material/Edit';
import ListAlt from '@mui/icons-material/ListAlt';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import EditDropdownDialog from './EditDropdownDialog';

export const OpenTableButton = ({ table }) => {
  return (
    <Tooltip title="Open table">
      <IconButton onClick={() => window.open(`/table/${table}`, '_blank')}>
        <ListAlt />
      </IconButton>
    </Tooltip>
  );
};

export const OpenRecordButton = ({ table, id }) => {
  return (
    <Tooltip title="Open Record">
      <IconButton
        onClick={() => window.open(`/table/${table}/${id}`, '_blank')}
      >
        <OpenInNew />
      </IconButton>
    </Tooltip>
  );
};

export const EditDropdownButton = ({ dropdown, reloadField }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    reloadField();
  };
  return (
    <>
      {open && <EditDropdownDialog dropdown={dropdown} close={handleClose} />}

      <Tooltip title="Edit dropdown">
        <IconButton onClick={() => setOpen(true)}>
          <Edit />
        </IconButton>
      </Tooltip>
    </>
  );
};
