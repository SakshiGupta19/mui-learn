export const BoxStyle = {
    height: 600,
    width: 1,
    '& .MuiDataGrid-iconSeparator':{
            height:'50px',
            width:'30px',
          },
          '& .modalButton':{
            textTransform: 'none',
            color: 'black'
          },
          '& .Mui-error': {
            bgcolor: (theme) =>
              `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
            color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
          },
          '& .rowStyling': {
            backgroundColor: '#eeeeee',
            cursor: 'not-allowed',
          },
          '& .pointer-cursor':{
              cursor:'pointer'
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize:'16px',
            backgroundColor: '#78909c',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-sortIcon': {
            color: '#4f5b62',
          },
}

export const DataGridStyle ={
    "& .MuiDataGrid-row:hover": {
        color: "#0288d1",
    },
    "& .MuiDataGrid-row": {
        fontSize: "14px",
        textAlign: "center",
    },
}

export const SearchBarStyle ={
width: {
    xs: 1,
    sm: 'auto',
  },
  m: (theme) => theme.spacing(1, 0.5, 1.5),
  '& .MuiSvgIcon-root': {
    mr: 0.5,
  },
  '& .MuiInput-underline:before': {
    borderBottom: 1,
    borderColor: 'divider',
  },
}

export const SearchBarBox ={
p: 0.5,
pb: 0,
justifyContent: 'flex-end',
display: 'flex',

}